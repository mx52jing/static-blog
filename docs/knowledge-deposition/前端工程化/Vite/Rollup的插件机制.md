---
layout: doc
---

# Rollup的插件机制

类似于Vue、React，在Rollup中也有一套自己的生命周期，从打包开始到产物输出，在每个周期都会执行特有的`钩子函数(Hook)`。

## Rollup 整体构建阶段

Rollup主要经历了`Build`和`Output`两个阶段

对于一次完整的构建过程而言，`Rollup`会先进入到`Build`阶段，解析各模块的`内容`及`依赖关系`，然后进入`Output`阶段，完成打包及输出。在不同的阶段，插件会有不同的工作流程。

## 插件Hook分类

### 根据构建阶段分类

Rollup的主要构建有`Build`和`Output`两大阶段，根据`构建阶段`分类，插件的`Hook`也可分为`Build Hook`和`Output Hook`

- `Build Hook`就是在`Build`阶段执行的钩子函数，在这个阶段主要进行`模块代码的转换`、`AST解析`以及`模块依赖的解析`，那么这个阶段的Hook对于代码的操作粒度一般为`模块`级别，也就是单文件级别

- `Output Hook`主要进行代码的打包，操作粒度一般为`chunk`级别(一个chunk通常指`很多文件打包到一起的产物`)。

### 根据Hook的执行方式分类

根据Hook的执行方式可以分为`Async`、`Sync`、`Parallel`、`Sequential`、`First`这几类

#### **Async & Sync**

Async和Sync钩子函数分别代表`异步`和`同步`的钩子函数，Async钩子需要返回一个Promise，否则该钩子会被认为是Sync同步钩子

#### **First**

如果多个插件都实现了该类型的Hook，那Hook将按顺序执行，直到其中一个Hook返回`非null`或者`非undefined`的值。

:::tip
- 比如`resolveId`这个Hook，如果多个插件都实现了这个hook，其中某个插件的`resolveId`函数返回了一个路径，将停止执行后续插件的`resolveId`方法
:::

#### **Sequential**

- 如果好几个插件实现了该Hook，它们将会按照指定的顺序执行，如果当前Hook是`异步`的，后续的Hook也要等待当前Hook的状态为resolved后才能执行

- 这种类型的Hook也适用于当前插件的Hook依赖上一插件Hook的处理结果，要等上一个插件Hook处理完后才返回处理结果给当前插件的Hook。比如`transform`钩子函数

#### **Parallel**

- 该类型的Hook是指可以并行执行的Hook，如果`多个插件`都实现了该类型的钩子函数，那么这些钩子函数可以同时执行。就算当前Hook是异步的，其他该类型的Hook也不会等待该Hook执行完毕，而是一起执行

:::tip
比如在`Build`阶段的`buildStart`钩子，它的执行时机是在`构建刚开始`的时候，每个插件声明的`buildStart`函数可以做一些状态初始化操作，但这些插件之间的操作并不是相互依赖，是可以并发执行的，从而提升构建性能。反之，对于需要`依赖其他插件处理结果`的情况就不适合用`Parallel`钩子了，比如`transform`钩子函数。
:::

### 拓展

Hook可以是一个函数，也可以是一个对象，如果是一个对象，则对象中必须要有一个`handler`函数，该函数其实相当于实际的Hook，使用对象时，可以在对象中添加一些可选项，如下：

- order: `"pre" | "post" | null`

如果有多个Hook，可以通过`order`选项来设置Hook执行优先级，`pre`先执行，`post`后执行，如果不设置或者设置为`null`，将会在用户指定的位置执行

```javascript
export default function resolveFirst() {
	return {
		name: 'resolve-first',
		resolveId: {
			order: 'pre',
			handler(source) {
				if (source === 'external') {
					return { id: source, external: true };
				}
				return null;
			}
		}
	};
}
```

- sequential: `boolean`

**该选项只能用于`Parallel(并行钩子)`类型的Hook**

当某个Hook使用该选项后，此Hook将会等待前面所有插件的该Hook函数都并行执行完毕后，再执行该Hook函数，然后在并行执行剩余插件的该Hook

> 例如：
> 有5个插件A，B，C，D，E，都实现了相同的Parallel Hook，其中C插件中设置了`sequential: true`，那么Rollup将会先并发执行`A，B`插件的该Hook，然后执行`C`插件的该Hook，当`C`执行完毕后，再并发执行`D，E`插件的该Hook

## 插件工作流
------------------------------------------

### Build阶段工作流

在Build阶段会执行相关的[Build Hooks](https://rollupjs.org/plugin-development/#build-hooks)，是由`rollup.rollup(inputOptions)`函数触发，构建阶段的第一个Hook是[options](https://rollupjs.org/plugin-development/#options)，最后一个Hook是[buildEnd](https://rollupjs.org/plugin-development/#buildend)，当构建过程出错时，会执行[closeBundle](https://rollupjs.org/plugin-development/#closebundle)

> Build流程如下图：

![](/image/Vite/rollup-plugin/1.png)

:::tip
在`watch`模式下，Rollup内部会初始化一个`watcher`对象，当文件内容发生变化时，watcher对象会同时触发[watchChange Hook](https://rollupjs.org/plugin-development/#watchchange)，对项目进行重新构建。此外，在打包结束时，Rollup会自动清除`watcher`对象，并调用[closeWatcher Hook](https://rollupjs.org/plugin-development/#closewatcher)
:::

> Build阶段流程如下：

- 执行`options` Hook，`替换`或`操作`传递给`rollup.rollup`的配置项

- 调用`buildStart` Hook，正式开始构建流程，**如果只是查看配置项，推荐使用[buildStart](https://rollupjs.org/plugin-development/#buildstart)**
- 调用`resolveId` Hook，开始解析路径(从[input](https://rollupjs.org/configuration-options/#input)配置指定的入口文件开始解析)
- 调用`load` Hook，加载模块内容
- 调用`shouldTransformCachedModule` Hook，这个钩子可以用来找出缓存了哪些模块，并访问它们缓存的元信息。
    - 如果使用了Rollup缓存(例如`watch`模式下或通过`JavaScript API`显式地使用)，如果`load` Hook加载的代码与缓存副本中的相同则跳过`transform` Hook并使用模块缓存的代码，然后执行`moduleParsed` Hook

    - 如果`shouldTransformCachedModule` Hook返回`true`，则从缓存中删除此模块并重新执行`transform` Hook

- 调用`transform` Hook，对模块内容进行转换，例如`babel`转译
- 调用`moduleParsed` Hook（Rollup拿到最后的模块内容，进行`AST`分析，得到所有的`import`内容，然后执行此Hook），执行该Hook后有以下两种情况：
  - 如果是`普通的import`，则跳到`resolveId` Hook流程
  
  - 如果是`动态import`，则执行`resolveDynamicImport` Hook解析路径，如果路径解析成功，就跳到`load` Hook流程，否则就跳到`resolveId` Hook流程

- 直到所有的`import`都解析完毕，Rollup会执行`buildEnd` Hook，Build阶段结束

:::tip
Rollup在解析路径的时候，即执行`resolveId`/`resolveDynamicImport` Hook的时候，如果该路径被标记为`external`(外部模块)，表明该路径内容不用进行Rollup打包，则直接跳转到`buildEnd` Hook，不再执行`load`/`transform`/`resolveId`等Hook
:::

### Output阶段工作流

[Output generation hooks](https://rollupjs.org/plugin-development/#output-generation-hooks)可以提供关于生成的`bundle`的信息并在生成完成后修改构建。它们的工作方式和类型与`Build Hook`相同，但是每次调用`bundle.generate(outputOptions)`或`bundle.write(outputOptions)`时会单独调用，只会调用其中一个

> Output流程如下图：

![](/image/Vite/rollup-plugin/2.png)

> Output阶段流程如下：

- 执行所有插件的`outputoptions` Hook，对[output配置](https://rollupjs.org/configuration-options/#output-dir)进行转换

- 并发执行`renderStart` Hook，正式开始打包
- 从入口模块开始扫描，针对`动态import`语句执行`renderDynamicImport`钩子，来自定义动态import的内容
- 判断是否遇到`import.meta`语句
  - 如果没有遇到`import.meta`语句，则并发执行所有插件的`banner`、`footer`、`intro`、`outro` Hook，向打包产物的固定位置(比如头部和尾部)插入一些`自定义的内容`，比如协议声明内容、项目介绍等等
  
  - 如果遇到`import.meta`语句:
    - 对于`import.meta.url`语句调用`resolveFileUrl`来自定义url解析逻辑

    - 对于`其他import.meta`属性，则调用`resolveImportMeta`来进行自定义的解析。

- 接下来Rollup会生成所有`chunk`的内容，针对每个chunk会依次调用插件的`renderChunk`方法进行自定义操作，在这里就可以直接操作打包产物了。
- 接着调用`augmentChunkHash` Hook，用于扩充单个chunks的hash值，如果该函数返回`false`将不会修改hash值
- 随后会调用`generateBundle` Hook，这个Hook的入参里面会包含所有的打包产物信息，包括`chunk(打包后的代码)`、`asset(最终的静态资源文件)`。我们可以在这里`删除一些chunk`或者`asset`，最终这些内容将不会作为产物输出。
- `rollup.rollup`方法会返回一个`bundle`对象，这个对象是包含`generate`和`write`两个方法
  - 如果输出是通过`bundle.generate(...)`方法成功生成的，那么最后一个Hook就是`generateBundle` Hook
  - 如果输出是通过`bundle.write(...)`方法成功生成的，那么最后一个Hook就是`writeBundle` Hook
  - 如果输出过程中出错，会触发`renderError` Hook，然后执行`closeBundle` Hook 结束打包

:::tip
- bundle.generate(...)和bundle.write(...)的区别是`write`方法会将代码写入到磁盘中，同时触发`writeBundle` Hook，而`generateBundle` Hook执行的时候，产物还并没有输出，
- 以上两个Hook的顺序为`generateBundle => 输出产物到磁盘 => writeBundle`
:::
