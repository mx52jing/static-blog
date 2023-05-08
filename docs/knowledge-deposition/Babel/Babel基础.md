---
layout: doc
---

# Babel基础

## 相关工具文档

- [babylon](https://www.npmjs.com/package/babylon)
  - `Babylon`是`Babel`的解析器。最初是`Acorn`的一份`fork`，它非常快，易于使用，并且针对非标准特性（以及那些未来的标准特性）设计了一个基于插件的架构。

- [@babel/traverse](https://www.npmjs.com/package/@babel/traverse)
  - `Babel Tranverse`（遍历）模块维护了整棵树的状态，并且负责替换、移除和添加节点。
- [@babel/types](https://www.npmjs.com/package/@babel/types)
  - [babel-types-api文档](https://babeljs.io/docs/en/babel-types.html#api)
  - `Babel Types`（类型）模块是一个用于`AST`节点的`Lodash`式工具库。 它包含了`构造`、`验证`以及`变换AST节点`的方法。 其设计周到的工具方法有助于编写清晰简单的`AST`逻辑。

- [@babel/generator](https://www.npmjs.com/package/@babel/generator)
  - `Babel Generator`是`Babel`的`代码生成器`。它将`AST输出为代码`并包括`源码映射（sourcemaps）`。

- [@babel/template](https://www.npmjs.com/package/@babel/template)
  - `Babel Template`模块是一个很小但却非常有用的模块。它能让你编写带有占位符的字符串形式的代码，你可以用此来替代大量的手工构建的`AST`。

## 相关Api

### Visitor

- `visitor`是一个对象，对象中定义了用于`获取AST中具体节点`的方法

### Path

- `visitor`中对象定义的方法的`第一个参数`，`path`是一个`对象`，它表示`两个节点之间的连接`

- `path`的属性和方法
  - `node`：当前AST节点
  - `parent`：父AST节点  
  - `parentPath`：父AST节点的路径  
  - `scope`：作用域  
  - `get(key)`：获取某个属性的`path`
  - `set(key, node)`：设置某个属性  
  - `is类型(opts)`： 判断当前节点是否是某个类型  
  - `find(callback)`： 从当前节点一直向上找到根节点(包括自己)  
  - `findParent(callback)`：从当前节点一直向上找到根节点(不包括自己)  
  - `insertBefore(nodes)`：在之前插入节点  
  - `insertAfter(nodes)`：在之后插入节点  
  - `replaceWith(replacement)`：用某个节点替换当前节点  
  - `replaceWithMultiple(nodes)`： 用多个节点替换当前节点  
  - `replaceWithSourceString(replacement)`：把源代码转成AST节点再替换当前节点  
  - `remove()`：删除当前节点  
  - `traverse(visitor, state)`： 遍历当前节点的子节点,`第1个参数是节点`，第2个参数是用来`传递数据的状态`
  - `skip()`：跳过`当前节点子节点的遍历` 
  - `stop()`：结束所有的遍历  

### Scope（作用域）
- `scope`的属性和方法
  - `scope.bindings`：当前作用域内声明所有变量
  - `scope.path`：生成作用域的节点对应的路径
  - `scope.references`：所有的变量引用的路径
  - `getAllBindings()`：获取从当前作用域一直到根作用域的集合
  - `getBinding(name)`：从当前作用域到根使用域查找变量
  - `getOwnBinding(name)`：在当前作用域查找变量
  - `parentHasBinding(name, noGlobals)`：从当前父作用域到根使用域查找变量
  - `removeBinding(name)`：删除变量
  - `hasBinding(name, noGlobals)`：判断是否包含变量
  - `moveBindingTo(name, scope)`：把当前作用域的变量移动到其它作用域中
  - `generateUid(name)`：生成作用域中的唯一变量名,如果变量名被占用就在前面加下划线

## 插件选项

### 插件编写和调用几种方法

```js
const code = `
    function foo(a, b) {
	    console.log(a, b);
    }
`;
```

#### 第一种

> 使用插件的时候，使用调用插件函数的方法，传入参数，此时函数接受的`opts`就是函数传的参数

```js
const addCodePlugin = (opts) => {
	console.log(opts) // { city: 'shanghai' }
	return {
		visitor: {
			FunctionDeclaration(path, state) {
				console.log(state.opts, 'state.opts'); // { like: 'pingPang' }
			}
		}
	}
}
const res = babel.transform(code, {
	plugins: [
		[
			addCodePlugin({ city: 'shanghai' }),
			{
				like: 'pingPang',
			}
		]
	]
})
```

#### 第二种

> 使用插件的时候，不使用调用插件函数的方法，此时函数中接受的`opts`就是默认参数，其中的`types`最常用，它其实就是`@babel/types`这个包的所有方法集合

```js
const addCodePlugin = ({ types }) => {
	return {
		visitor: {
			FunctionDeclaration(path, state) {
				console.log(state.opts, 'state.opts'); // { like: 'pingPang' }
			}
		}
	}
}
const res = babel.transform(code, {
	plugins: [
		[
			addCodePlugin,
			{
				like: 'pingPang',
			}
		]
	]
})
```

## 相关网站

- [AST节点查看网站](https://astexplorer.net/)
- [babel-plugin-handbook](https://github.com/brigand/babel-plugin-handbook)
