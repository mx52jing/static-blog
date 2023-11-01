---
layout: doc
---

# esbuild相关

## `esbuild`使用

先初始化一个项目

```shell
pnpm init
```

安装依赖

```shell
pnpm install esbuild -D
pnpm install react react-dom
```

创建`src/index.jsx`

```jsx
import * as React from 'react'
import * as Server from 'react-dom/server'
let Greet = () => <h1>Hello, world!</h1>
console.log(Server.renderToString(<Greet />))
```

使用`esbuild`有`2`种方式，分别是`命令行调用`和`代码调用`

## 命令行调用

命令行中`cd`到项目跟目录，执行下面打包命令

```shell
./node_modules/.bin/esbuild src/index.jsx --bundle --outfile=dist/index.js
```

![](/image/Vite/usage-esbuild/1.png)

如上图，已经成功打包了，不过这种方式不够灵活，通常情况下还是会使用`代码调用`

## 代码调用

`esbuild`暴露了一系列`API`，主要包括两类: `Build API`和`Transform API`，可以调用这些`API`来使用`esbuild`

### **Build API**

`Build API`主要用于项目打包，提供了`build`、`buildSync`方法来对项目打包，提供`serve`方法来启动开发服务器

:::tip
`build`方法是`异步`的，`buildSync`是`同步`的，但是一般使用`build`方法，使用`buildSync`方法有以下限制

- 由于插件是`异步`的，所以使用`buildSync`同步方法不能使用插件

- 使用`buildSync`同步方法会阻塞当前线程
- 使用`buildSync`同步方法会阻碍`esbuild API`并行调用

详见[sync](https://esbuild.github.io/api/#js-sync)
:::

#### **build方法常用参数**

`build`方法常见的配置

##### bundle

- `Type: boolean`，表示是否将引入(`import`)的依赖的代码打包到自身文件中，默认为`false`

> 例如：

`src/index.js`

```jsx
import * as React from 'react'
import * as Server from 'react-dom/server'
let Greet = () => <h1>Hello, world!</h1>
console.log(Server.renderToString(<Greet />))
```

> 设置`bundle: false`的情况

`scripts/build.js`

```javascript
import { build } from 'esbuild'

const runBuild = async () => {
    await build({
        // bundle: true,
        absWorkingDir: process.cwd(),
        entryPoints: ["src/index.jsx"],
        outdir: "dist"
    })
}

runBuild();
```

```dist/index.js```

![](/image/Vite/usage-esbuild/2.png)


> 设置`bundle: true`的情况

`scripts/build.js`

```javascript
import { build } from 'esbuild'

const runBuild = async () => {
    await build({
        bundle: true,
        absWorkingDir: process.cwd(),
        entryPoints: ["src/index.jsx"],
        outdir: "dist"
    })
}

runBuild();
```

`dist/index.js`

![](/image/Vite/usage-esbuild/3.png)

可以看到设置`bundle: true`后，会将`react`、`react-dom`的代码打包到`index.js`中，设置为`bundle: false`后，只打包`src/index.jsx`文件的内容

##### splitting

- `Type: boolean`，表示是否开启代码分割

:::warning
- 代码拆分仍在不断改进中，目前，它仅与`esm`输出格式兼容，所以设置此选项为`splitting: true`时，也要同时设置`format: true`，此外，存在与代码拆分块之间的`导入语句排序`问题

- 当设置`splitting: true`时，必须要设置`outdir`选项配置输出目录
:::

##### outfile

- `Type: string`，设置打包输出文件的名称

```javascript
import { build } from 'esbuild'

const runBuild = async () => {
    await build({
        bundle: true,
        absWorkingDir: process.cwd(),
        entryPoints: ["src/index.jsx"],
        // outdir: "dist",
        outfile: 'dist/aaa.js'
    })
}

runBuild();
```

:::warning
- `outfile`字段和`outdir`字段不能同时使用

- `outfile`字段只适用于`单入口`场景，如果是`多入口`，不能使用该字段，要使用`outdir`字段
:::

##### metafile

- `Type: boolean`，这个选项告诉`esbuild`是否以`JSON`格式生成一些关于构建的`元数据`信息，可通过打包结果的`metafile`字段查看

> 示例：

`vite.config.js`

```javascript
import { build } from 'esbuild'

const runBuild = async () => {
    const result = await build({
        bundle: true,
        absWorkingDir: process.cwd(),
        entryPoints: ["src/index.jsx"],
        // outdir: "dist",
        outfile: 'dist/aaa.js',
        metafile: true
    });
    console.log(result)
}

runBuild();
```

设置`metafile: true`后再次打包，打印出`result`如下:

![](/image/Vite/usage-esbuild/4.png)


设置`metafile: false`后再次打包，打印出`result`如下:

![](/image/Vite/usage-esbuild/5.png)


##### outdir

- `Type: string`，表示打包结果要输出的目录

:::tip
- 如果输出目录如果不存在会自动创建该目录

- 如果输出目录已创建，并且里面有文件，重新`build`时不会清空原目录内的文件

- 如果有同名文件，新打包生成的文件会覆盖老的文件
:::

##### outbase

- `Type: string`，该参数适用于`多入口`打包，会将打包结果复制到相对于`outbase`目录的输出目录中

> 例如，项目目录结构如下

```shell
.
├── package.json
├── pnpm-lock.yaml
├── scripts
│   └── build.js
└── src
    ├── index.jsx
    └── pages
        ├── foo
        │   └── index.js
        └── home
            └── index.js
```

`vite.cofig.js`，设置多入口，并且将`outbase`设置为`src`

```javascript
import { build } from 'esbuild'

const runBuild = async () => {
    const result = await build({
        bundle: true,
        absWorkingDir: process.cwd(),
        entryPoints: [
            'src/pages/home/index.js',
            'src/pages/foo/index.js',
        ],
        outdir: "dist",
        // outfile: 'dist/aaa.js',
        metafile: true,
        outbase: 'src',
    });
    console.log(result)
}
runBuild();
```

打包结果`元数据`如下

```json
  metafile: {
    inputs: {
      'src/pages/home/index.js': [Object],
      'src/pages/foo/index.js': [Object]
    },
    outputs: {
      'dist/pages/home/index.js': [Object],
      'dist/pages/foo/index.js': [Object]
    }
  },
```

打包后`dist`目录结构如下：

```shell
dist
└── pages
    ├── foo
    │   └── index.js
    └── home
        └── index.js
```

如果`outbase`胡乱设置为一个不存在的目录，打包后`dist`目录结构如下

```shell
dist
└── _.._
    └── src
        └── pages
            ├── foo
            │   └── index.js
            └── home
                └── index.js
```

##### external

- `Type: string[]`，标记一个文件/依赖包为外部的，在打包时不对其进行打包

##### alias

- `Type: Record<string, string>`，用于在构建时将一个包替换为另一个包

```javascript
import { build } from 'esbuild'

const runBuild = async () => {
    const result = await build({
        bundle: true,
        absWorkingDir: process.cwd(),
        entryPoints: ['src/index.jsx'],
        outdir: "dist",
        metafile: true,
        alias: {
            'oldPkg': 'newPkg'
        }
    });
    console.log(result)
}
runBuild();
```

:::tip
- 这些替换首先发生在`esbuild`的其他路径解析逻辑之前

- 此功能的一个使用场景是使用`浏览器兼容包`替换`仅Node环境可使用的包`，从而替换那些无法控制的第三方代码
- 当使用`Alias`替换导入路径时，生成的导入路径将在`工作目录`中解析，而不是在包含具有导入路径的源文件的目录中解析。如果需要，可以使用[Working directory](https://esbuild.github.io/api/#working-directory)设置`esbuild`所使用的工作目录。
:::

##### loader

- `Type: { [ext: string]: Loader }`

- `type Loader = 'base64' | 'binary' | 'copy' | 'css' | 'dataurl' | 'default' | 'empty' | 'file' | 'js' | 'json' | 'jsx' | 'local-css' | 'text' | 'ts' | 'tsx'`

esbuild内置了一系列的loader，包括`base64、binary、css、dataurl、file、js(x)、ts(x)、text`，针对一些特殊类型的文件，调用不同的`loader`进行加载，[查看完整类型列表](https://esbuild.github.io/content-types/)


##### resolveExtensions

- `Type: string[]`，设置文件的隐式扩展名的顺序，默认为`.tsx`，`.ts`，`.jsx`，`.js`，`.css`，`.json`

##### write

- `Type: boolean`

是否将构建后的产物写入磁盘

##### minify

- `Type: boolean`

是否进行代码压缩

##### watch

- `Type: boolean`

是否开启watch模式，在watch模式下代码变动则会触发重新打包

##### publicPath

- `Type: string`，设置加载loader的`跟路径`

##### chunkNames

- `Type: string`，当启用代码分割`splitting`时，设置生成的共享代码块的文件名，例如`chunks/[name].[hash].[ext]`

字符串中有三个占位符可用

- name：分割的chunk文件名称，第三方库名或者`chunk`

- hash：文件hash
- ext： 文件后缀

##### assetNames

- `Type: string`，静态资源输出的文件名称，有以下几个占位符可用

- dir：相对于`outbase`目录的相对路径
- name：文件原始名称(不包含扩展名)
- hash：
- ext：

> 例如

```javascript
import { build } from 'esbuild'

const runBuild = async () => {
    const result = await build({
        bundle: true,
        absWorkingDir: process.cwd(),
        entryPoints: ['src/index.jsx'],
        // entryPoints: [
        //     'src/pages/home/index.js',
        //     'src/pages/foo/index.js',
        // ],
        outdir: "dist",
        // outfile: 'dist/aaa.js',
        metafile: true,
        // outbase: 'aaa',
        // alias: {
        //     'oldPkg': 'newPkg'
        // }
        splitting: true,
        chunkNames: '[name]/[name].[hash].[ext]',
        assetNames: 'assets/[name].[hash].[ext]',
        format: 'esm',
        loader: { '.webp': 'file', '.JPG': "file" },
    });
    console.log(result)
}

runBuild();
```

##### plugins

- `plugins?: Plugin[]`，插件`API`允许在构建的不同步骤期间注入一些代码

```typescript
export interface Plugin {
    name: string
    setup: (build: PluginBuild) => (void | Promise<void>)
}
```

##### banner 

- `Type: { [type: string]: string }`，使用它可以在生成的`JavaScript`和`CSS`文件的`开头`插入任意字符串

```javascript
import { build } from 'esbuild'

const runBuild = async () => {
    const result = await build({
        banner: {
            js: '/* comment */',
            css: '// css comment'
        }
    });
    console.log(result)
}

runBuild();
```

##### footer

- `Type: { [type: string]: string }`，使用它可以在生成的`JavaScript`和`CSS`文件的`末尾`插入任意字符串

##### absWorkingDir

- `Type: string`，设置当前项目打包的工作目录

##### format

- `Tpye: 'iife' | 'cjs' | 'esm'`，设置生成的`JavaScript`文件的输出格式

##### sourcemap

- `Type: booleab`，是否生成`SourceMap`文件

#### buildSync

`buildSync`方法的使用和`build`几乎相同，如下代码所示:

```javascript
function runBuildSync() {
    // 同步方法
    const result = buildSync({
        // 省略一系列的配置
    })
    console.log(result);
}
runBuildSync()
```

#### serve

- 开启serve模式后，将在指定的端口和目录上搭建一个`静态文件服务`，这个服务器 用原生`Go`语言实现，性能比`Nodejs`更高

- 该服务类似`webpack-dev-server`，所有的产物文件都默认不会写到磁盘，而是放在`内存`中，通过请求服务来访问

- 每次`请求到来`时，都会进行重新构建(rebuild)，永远返回新的产物

```javascript
import * as Esbuild from 'esbuild'

const runServer = async () => {
    try {
        const ctx = await Esbuild.context({
            entryPoints: ['src/index.jsx'],
            outdir: 'dist',
            bundle: true,
            loader: {
                '.webp': "file",
                '.JPG': 'file'
            },
        })
        const serveRes = await ctx.serve({
            servedir: 'dist',
            port: 9527,
        })
        console.log(`HTTP Server starts at port ${serveRes.port}`)
    }catch (e) {
        console.log(e, 'runServer')
    }
}

runServer()
```

serve方法可传参数如下：

```typescript
interface ServeOptions {
  port?: number // 服务端口
  host?: string // 服务host
  servedir?: string // 静态服务目录
  keyfile?: string // https用
  certfile?: string // https用
  fallback?: string // 类似于404页面路径，当传入请求与生成的输出文件路径不匹配时，返回这个文件
  onRequest?: (args: ServeOnRequestArgs) => void // 对于每个传入的带有请求相关信息的请求，都会调用该函数
}
interface ServeOnRequestArgs {
    remoteAddress: string
    method: string
    path: string
    status: number
    timeInMS: number
}
```

:::tip
Serve API 只适合在开发阶段使用，不适用于生产环境。
:::

### **Transform API**

esbuild还专门提供了单文件编译的能力，即`Transform API`，它也包含了同步和异步的两个方法`transformSync`和`transform`，和`build`一样，推荐使用异步方法`transform`

```typescript
import { transform } from "esbuild";

const runTransform = async () => {
    const content = await transform(
        `const delay = (ms: number) => new Promise((resolve) => {
            setTimeout(resolve, ms)
        })`,
        {
            loader: 'ts',
            sourcemap: true
        }
    )
    console.log(content)
}

runTransform()
```

transform函数接受两个参数，第一个参数是`需要转换的源代码`，第二个参数为编译配置

## esbuild插件

插件的作用就是在构建过程中对资源进行解析和处理，esbuild支持我们传入自己的插件，在构建过程中完成自己想要的操作

插件只能和`build API`一起使用，不能和`transform API`一起使用，现有的一些[esbuild 插件](https://github.com/esbuild/community-plugins)

esbuild插件被设计为一个对象，里面有`name`和`setup`两个选项

- name：当前插件的名称

- setup：一个函数，参数是一个`build`对象，这个对象上挂载了一些`钩子`可供我们自定义一些钩子函数逻辑，build的详细字段如下

![](/image/Vite/usage-esbuild/6.png)

### 概念

---------------------

#### Namespaces

每个模块都会有一个关联的`命名空间(namespace)`。默认情况下，esbuild是在文件系统上的文件所对应的`namespace`中运行的，此时`namespace`的值为`file`

esbuild的插件可以创建`虚拟模块(virtual modules)`，虚拟模块(virtual modules)是指在文件系统中不存在的模块，可以自己定义虚拟模块的内容

#### Filters

每个回调函数必须提供一个`filter`，filter的值为一个`正则表达式`，主要用于匹配指定规则的导入（import）路径的模块，当路径不匹配`filter`时，回调函数不会执行，这是一种优化，加速运行速度

:::tip
- filter的正则表达式和`JavaScript`中的是区别的，这个正则表达式是Go语言中的正则实现的，不支持前瞻(`? <=`)、后顾(`?=`)和反向引用(`\1`)这三种规则
:::

#### 钩子函数

-------------------------------

`onResolve`和`onLoad`函数是最常用的函数，接受的第一个参数都是`{ filter: RegExp; namespace?: string }`

##### onResolve

- `onResolve`函数用来控制`路径解析`，该函数会在esbuild解析每个模块的`导入路径`时执行，前提是该路径符合`filter`正则规则，并返回一些字段

```typescript
export interface OnResolveResult {
    pluginName?: string // 插件名称

    errors?: PartialMessage[] // 错误信息
    warnings?: PartialMessage[] // 警告信息

    path?: string // 模块路径
    external?: boolean // 是否需要 external
    sideEffects?: boolean // 设置为 false，如果模块没有被用到，模块代码将会在产物中会删除。否则不会这么做
    namespace?: string // namespace 标识
    suffix?: string // 添加一些路径后缀，如`?xxx`
    pluginData?: any // 额外绑定的插件数据
    /**
     * 仅仅在 Esbuild 开启 watch 模式下生效
     * 告诉 Esbuild 需要额外监听哪些文件/目录的变化
     */
    watchFiles?: string[]
    watchDirs?: string[]
}

export interface PartialMessage {
    id?: string
    pluginName?: string
    text?: string
    location?: Partial<Location> | null
    notes?: PartialNote[]
    detail?: any
}
```


##### onLoad

- `onLoad`钩子函数用来控制模块内容加载，该函数会在`esbuild`解析模块之前调用，主要用来`处理模块的内容并返回自己想要的内容`，并且需要告知`esbuild`要如何解析该内容

返回值详情如下

```typescript
export interface OnLoadResult {
    pluginName?: string // 插件名称

    errors?: PartialMessage[] // 错误信息
    warnings?: PartialMessage[] // 警告信息

    contents?: string | Uint8Array // 模块返回的具体内容
    resolveDir?: string // 基准路径(将导入路径解析为文件系统上实际路径时，要使用的文件系统目录)
    loader?: Loader // 指定解析 loader，如`js`、`ts`、`jsx`、`tsx`、`json`等等
    pluginData?: any // 额外的插件数据
    // 和onResolve中的一样
    watchFiles?: string[]
    watchDirs?: string[]
}
```

##### onStart

- 该函数的执行时机是在每次`build`的时候，包括触发`watch`或者`serve`模式下的重新构建

##### onEnd

- 构建结束时执行

### 插件示例

-------------------------------------

#### 创建虚拟模块并指定虚拟模块返回的内容

`pugins/envPlugin`

```javascript
const envPlugin = {
    name: 'env-plugin',
    setup(build) {
        build.onResolve({ filter: /^my-env$/ }, args => {
            return {
                path: args.path,
                namespace: 'my-env-namespace'
            }
        })
        // 这里也可以去读取文件/请求文件 然后将获取到的文件内容返回
        build.onLoad({ filter: /.*/, namespace: 'my-env-namespace' }, args => {
            return {
                contents: JSON.stringify({ "name": "222222" }),
                loader: 'json',
            }
        })
    }
}

export default envPlugin;
```

`scripts/serve.js`中添加自己写的插件

```javascript
import * as Esbuild from 'esbuild'
import envPlugin from "../plugins/envPlugin.js";
const runServer = async () => {
    try {
        const ctx = await Esbuild.context({
            entryPoints: ['src/index.jsx'],
            outdir: 'dist',
            bundle: true,
            loader: {
                '.webp': "file",
                '.JPG': 'file'
            },
            plugins: [envPlugin]
        })
        const serveRes = await ctx.serve({
            servedir: 'dist',
            port: 9527,
        })
        console.log(`HTTP Server starts at port ${serveRes.port}`)
    }catch (e) {
        console.log(e, 'runServer')
    }
}

runServer()
```

业务代码中打印

```javascript
import myEnv from 'my-env'

console.log({ myEnv }) // myEnv: {name: '222222'}
```

#### 打包完成后自动创建`html`文件

`plugins/autoGenerateHtmlPlugin.js`

```javascript
import path from 'node:path'
import fs from "fs/promises";
const createScript = src => `<script type="module" src="${src}"></script>`;
const createLink = href => `<link rel="stylesheet" href="${href}" />`;

const generateHtml = ({ scripts, links }) => {
    return `
    <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    ${links?.join('\n')}
</head>
<body>
<div class="root"></div>
${scripts?.join('\n')}
</body>
</html>
    `
}

/**
 * 打包结束后自动创建html文件
 * @param options
 * @returns {{name: string, setup(*): void}}
 */
const autoGenerateHtmlPlugin = (options = { outdir: 'dist' }) => {
    return {
        name: 'auto-generate-plugin-html',
        setup(build) {
            build.onEnd(async buildResult => {
                if (buildResult.errors.length) {
                    return;
                }
                const {metafile} = buildResult; // 想获取 metafile，打包配置中必须配置 { metafile: true }
                if (!metafile) return;
                const { outputs} = metafile;
                const { outdir } = options;
                // 输出目录要提取出来
                const outputKeys = Object.keys(outputs).map(i => i.replace(outdir, ''));
                const scripts = [], links = [];
                outputKeys.forEach(item => {
                    if(item.endsWith('.js')) {
                        scripts.push(createScript(item))
                        return;
                    }
                    if(item.endsWith('.css')) {
                        links.push(createLink(item))
                    }
                })
                const htmlContent = generateHtml({ scripts, links });
                const htmlFilePath = path.join(process.cwd(), outdir, 'index.html')
                await fs.writeFile(htmlFilePath, htmlContent)
            })
        }
    }
}

export default autoGenerateHtmlPlugin
```

在`plugins`中添加该插件

```javascript
plugins: [envPlugin, autoGenerateHtmlPlugin()]
```

## 其他

- **相关代码可查看**[usage-esbuild](https://github.com/mx52jing/vite-related/tree/main/usage-esbuild)
