---
layout: doc
---

# Vite插件机制

Vite的插件机制是基于Rollup来设计的，同时它也扩展了Rollup的插件接口，新增了一些特定于Vite的选项。所以，只需编写一次Vite插件，就可以让它同时适用于开发和构建。

## 通用hook

Vite在`开发阶段`会模拟Rollup的行为，Vite Dev Server会创建一个插件容器，以Rollup相同的方式调用[Rollup Build Hooks](https://rollupjs.org/plugin-development/#build-hooks)，这些调用主要分为三个阶段：

1. **`服务器启动阶段`**: 在此阶段，[options](https://rollupjs.org/plugin-development/#options)和[buildStart](https://rollupjs.org/plugin-development/#buildstart) Hook会被调用。
2. **`请求响应阶段`**: 当浏览器发起请求时，Vite 内部依次调用[resolveId](https://rollupjs.org/plugin-development/#resolveid)、[load](https://rollupjs.org/plugin-development/#load)和[transform](https://rollupjs.org/plugin-development/#transform) Hook。
3. **`服务器关闭阶段`**: 在此阶段，Vite会依次调用[buildEnd](https://rollupjs.org/plugin-development/#buildend)和[closeBundle](https://rollupjs.org/plugin-development/#closebundle) Hook。

:::tip
- 为了避免完整的AST解析以获得更好的性能，Vite在dev开发阶段没有调用`moduleParsed` Hook。
- 在Vite dev开发阶段，除了`closeBundle` Hook，Rollup的[Output Generation Hooks](https://rollupjs.org/plugin-development/#output-generation-hooks)都没有被调用，我们可以认为Vite dev server只调用了`rollup.rollup()`，并没有调用`bundle.generate()`
:::

## Vite独有的Hook

这些Hook只会在Vite内部调用

### [config](https://vitejs.dev/guide/api-plugin.html#config)

Vite在读取完配置文件(`vite.config.ts/vite.config.js`和CLI选项的合并)之后，会拿到用户导出的配置对象，然后会执行`config` Hook。在这个Hook里面，我们可以对配置文件导出的对象进行自定义的操作。

该Hook可以返回部分配置对象，返回的对象将会和已存在的配置进行深度合并，也可以直接修改配置对象

> 如下两种情况：第一种返回部分配置对象，第二种直接对配置的某些属性进行修改

```javascript
// return partial config (recommended)
const partialConfigPlugin = () => ({
  name: 'return-partial',
  config: () => ({
    resolve: {
      alias: {
        foo: 'bar',
      },
    },
  }),
})

// mutate the config directly (use only when merging doesn't work)
const mutateConfigPlugin = () => ({
  name: 'mutate-config',
  config(config, { command }) {
    if (command === 'build') {
      config.root = 'foo'
    }
  },
})
```

:::warning
用户定义的插件在config Hook执行前已经被解析了，所以在config Hook中再注入其他插件是不会有效果的
:::

### [configResolved](https://vitejs.dev/guide/api-plugin.html#configresolved)

Vite在解析完配置之后会调用configResolved钩子，这个钩子一般用来记录最终的配置信息，而不建议再修改配置。

当插件需要根据正在运行的命令执行不同的操作时，可以使用该Hook

```javascript
const examplePlugin = () => {
    let config

    return {
        name: 'read-config',

        configResolved(resolvedConfig) {
            // store the resolved config
            config = resolvedConfig
        },

        // use stored config in other hooks
        transform(code, id) {
            if (config.command === 'serve') {
                // dev: plugin invoked by dev server
            } else {
                // build: plugin invoked by Rollup
            }
        },
    }
}
```

### [configureServer](https://vitejs.dev/guide/api-plugin.html#configureserver)

查看更多[ViteDevServer](https://vitejs.dev/guide/api-javascript.html#vitedevserver)

:::warning
`configureServer` Hook只有在dev环境调用，不会在生产构建时调用
:::

- 该Hook用来配置dev Server，最常见的使用场景是添加自定义中间件

```javascript
const myPlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // custom handle request...
    })
  },
})
```

- 注入后置中间件

configureServer Hook在内部其他中间件安装之前调用，所以自定义的中间件默认是在其他内部中间件之前执行，如果想让自定义中间件在内部中间件之后执行，可以返回一个函数。

```javascript
const myPlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    // return a post hook that is called after internal middlewares are
    // installed
    return () => {
      server.middlewares.use((req, res, next) => {
        // custom handle request...
      })
    }
  },
})
```

- 在某些情况下，其他Hook可能需要访问dev服务器实例(例如`访问websocket服务器`、`文件系统监视器`或`模块图`)。这个钩子还可以用来`存储服务器实例`，以便在其他钩子中访问:

```javascript
const myPlugin = () => {
  let server
  return {
    name: 'configure-server',
    configureServer(_server) {
      server = _server
    },
    transform(code, id) {
      if (server) {
        // use server...
      }
    },
  }
}
```

### [configurePreviewServer](https://vitejs.dev/guide/api-plugin.html#configurepreviewserver)

查看更多[configurePreviewServer](https://vitejs.dev/guide/api-javascript.html#previewserverforhook)

该Hook是用来启动预览服务，和`configureServer`相似，该Hook中添加的中间件调用顺序也是在内部中间件之前的，如果想在内部中间件之后调用，也是需要返回一个函数

```javascript
const myPlugin = () => ({
  name: 'configure-preview-server',
  configurePreviewServer(server) {
    // return a post hook that is called after other middlewares are
    // installed
    return () => {
      server.middlewares.use((req, res, next) => {
        // custom handle request...
      })
    }
  },
})
```

### [transformIndexHtml](https://vitejs.dev/guide/api-plugin.html#transformindexhtml)

该Hook用来获取HTML的内容，并且可以对HTML内容进行修改。

该Hook可返回以下选项中的一项：

- 返回转换过后的HTML字符串内容

- 返回一个数组，该数组包含标签描述对象(`{ tag, attrs, children, injectTo }`)，其中的内容会被注入到已有的HTML中，还可在对象中指定标签要插入的位置，默认插入到`<head>`中

- 返回一个同时包含HTML和tag的对象(`{ html, tag }`)

> 基础示例：

```javascript
const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(
        /<title>(.*?)<\/title>/,
        `<title>Title replaced!</title>`,
      )
    },
  }
}
```

> 类型详解

```typescript
type IndexHtmlTransformHook = (
  html: string,
  ctx: {
    path: string
    filename: string
    server?: ViteDevServer
    bundle?: import('rollup').OutputBundle
    chunk?: import('rollup').OutputChunk
  },
) =>
  | IndexHtmlTransformResult
  | void
  | Promise<IndexHtmlTransformResult | void>

type IndexHtmlTransformResult =
  | string
  | HtmlTagDescriptor[]
  | {
      html: string
      tags: HtmlTagDescriptor[]
    }

interface HtmlTagDescriptor {
  tag: string
  attrs?: Record<string, string | boolean>
  children?: string | HtmlTagDescriptor[]
  /**
   * default: 'head-prepend'
   */
  injectTo?: 'head' | 'body' | 'head-prepend' | 'body-prepend'
}
```

### [handleHotUpdate](https://vitejs.dev/guide/api-plugin.html#handlehotupdate)

该Hook会在Vite服务端处理热更新时被调用，我们可以在这个Hook中拿到热更新相关的上下文信息，进行热更模块的过滤，或者进行自定义热更处理。

## 插件执行顺序

与webpack loader相似，可以通过`enforce`属性来指定插件执行的顺序，`enforce`的值可以是`pre`或者`post`。

解析后的插件将以以下顺序执行：

1. Alias (路径别名)相关的插件
2. 配置`enforce: pre`的用户插件
3. Vite核心插件
4. 未配置`enforce`属性的用户插件
5. Vite 生产环境构建用的插件
6. 配置`enforce: post`的用户插件
7. Vite 后置构建插件(如压缩插件)

## 插件Hook执行顺序

- 服务启动阶段依次执行`config`、`configResolved`、`options`、`configureServer`、`buildStart` Hook

- 请求响应阶段:
    - 如果是`HTML`文件，仅执行`transformIndexHtml` Hook
  
    - 对于`非HTML`文件，则依次执行`resolveId`、`load`和`transform` Hook

- 热更新阶段，执行`handleHotUpdate` Hook
- 服务关闭阶段，依次执行`buildEnd`和`closeBundle` Hook

## 插件应用条件

默认情况下，Vite插件会同时被应用在`开发环境`和`生产环境`，有时需要只在开发环境或者只在生产环境应用，可以使用`apply`属性设置在哪个环境应用。

- `apply`属性可以是一个字符串

```javascript
function myPlugin() {
  return {
    name: 'build-only',
    apply: 'build', // or 'serve'  'serve' 表示仅用于开发环境，'build'表示仅用于生产环境
  }
}
```

- `apply`属性还可以是一个函数

```javascript
apply(config, { command }) {
  // apply only on build but not for SSR
  return command === 'build' && !config.build.ssr
}
```