import{_ as s,c as a,o as l,a as n}from"./app.ac721814.js";const A=JSON.parse('{"title":"Babel基础","description":"","frontmatter":{"layout":"doc"},"headers":[{"level":2,"title":"相关工具文档","slug":"相关工具文档","link":"#相关工具文档","children":[]},{"level":2,"title":"相关Api","slug":"相关api","link":"#相关api","children":[{"level":3,"title":"Visitor","slug":"visitor","link":"#visitor","children":[]},{"level":3,"title":"Path","slug":"path","link":"#path","children":[]},{"level":3,"title":"Scope（作用域）","slug":"scope-作用域","link":"#scope-作用域","children":[]}]},{"level":2,"title":"插件选项","slug":"插件选项","link":"#插件选项","children":[{"level":3,"title":"插件编写和调用几种方法","slug":"插件编写和调用几种方法","link":"#插件编写和调用几种方法","children":[]}]},{"level":2,"title":"相关网站","slug":"相关网站","link":"#相关网站","children":[]}],"relativePath":"knowledge-deposition/Babel/Babel基础.md"}'),o={name:"knowledge-deposition/Babel/Babel基础.md"},e=n(`<h1 id="babel基础" tabindex="-1">Babel基础 <a class="header-anchor" href="#babel基础" aria-hidden="true">#</a></h1><h2 id="相关工具文档" tabindex="-1">相关工具文档 <a class="header-anchor" href="#相关工具文档" aria-hidden="true">#</a></h2><ul><li><p><a href="https://www.npmjs.com/package/babylon" target="_blank" rel="noreferrer">babylon</a></p><ul><li><code>Babylon</code>是<code>Babel</code>的解析器。最初是<code>Acorn</code>的一份<code>fork</code>，它非常快，易于使用，并且针对非标准特性（以及那些未来的标准特性）设计了一个基于插件的架构。</li></ul></li><li><p><a href="https://www.npmjs.com/package/@babel/traverse" target="_blank" rel="noreferrer">@babel/traverse</a></p><ul><li><code>Babel Tranverse</code>（遍历）模块维护了整棵树的状态，并且负责替换、移除和添加节点。</li></ul></li><li><p><a href="https://www.npmjs.com/package/@babel/types" target="_blank" rel="noreferrer">@babel/types</a></p><ul><li><a href="https://babeljs.io/docs/en/babel-types.html#api" target="_blank" rel="noreferrer">babel-types-api文档</a></li><li><code>Babel Types</code>（类型）模块是一个用于<code>AST</code>节点的<code>Lodash</code>式工具库。 它包含了<code>构造</code>、<code>验证</code>以及<code>变换AST节点</code>的方法。 其设计周到的工具方法有助于编写清晰简单的<code>AST</code>逻辑。</li></ul></li><li><p><a href="https://www.npmjs.com/package/@babel/generator" target="_blank" rel="noreferrer">@babel/generator</a></p><ul><li><code>Babel Generator</code>是<code>Babel</code>的<code>代码生成器</code>。它将<code>AST输出为代码</code>并包括<code>源码映射（sourcemaps）</code>。</li></ul></li><li><p><a href="https://www.npmjs.com/package/@babel/template" target="_blank" rel="noreferrer">@babel/template</a></p><ul><li><code>Babel Template</code> 模块是一个很小但却非常有用的模块。它能让你编写带有占位符的字符串形式的代码，你可以用此来替代大量的手工构建的<code>AST</code>。</li></ul></li></ul><h2 id="相关api" tabindex="-1">相关Api <a class="header-anchor" href="#相关api" aria-hidden="true">#</a></h2><h3 id="visitor" tabindex="-1">Visitor <a class="header-anchor" href="#visitor" aria-hidden="true">#</a></h3><ul><li><code>visitor</code>是一个对象，对象中定义了用于<code>获取AST中具体节点</code>的方法，例如<code>ImportDeclaration</code>、<code>CallExpression</code>等等</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> addCodePlugin </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">({</span><span style="color:#A6ACCD;font-style:italic;">types</span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        visitor</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            ImportDeclaration</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">path</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">node</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">                </span><span style="color:#676E95;font-style:italic;">// ......</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">            ObjectMethod</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">path</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">state</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">types</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isIdentifier</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">opts</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><h3 id="path" tabindex="-1">Path <a class="header-anchor" href="#path" aria-hidden="true">#</a></h3><ul><li><p><code>visitor</code>中对象定义的方法的<code>第一个参数</code>，<code>path</code>是一个<code>对象</code>，它表示<code>两个节点之间的连接</code></p></li><li><p><code>path</code>的属性和方法</p><ul><li><code>node</code>：当前AST节点</li><li><code>parent</code>：父AST节点</li><li><code>parentPath</code>：父AST节点的路径</li><li><code>scope</code>：作用域</li><li><code>get(key)</code>：获取某个属性的<code>path</code></li><li><code>set(key, node)</code>：设置某个属性</li><li><code>is类型(opts)</code>： 判断当前节点是否是某个类型</li><li><code>find(callback)</code>： 从当前节点一直向上找到根节点(包括自己)</li><li><code>findParent(callback)</code>：从当前节点一直向上找到根节点(不包括自己)</li><li><code>insertBefore(nodes)</code>：在之前插入节点</li><li><code>insertAfter(nodes)</code>：在之后插入节点</li><li><code>replaceWith(replacement)</code>：用某个节点替换当前节点</li><li><code>replaceWithMultiple(nodes)</code>： 用多个节点替换当前节点</li><li><code>replaceWithSourceString(replacement)</code>：把源代码转成AST节点再替换当前节点</li><li><code>remove()</code>：删除当前节点</li><li><code>traverse(visitor, state)</code>： 遍历当前节点的子节点,<code>第1个参数是节点</code>，第2个参数是用来<code>传递数据的状态</code></li><li><code>skip()</code>：跳过<code>当前节点子节点的遍历</code></li><li><code>stop()</code>：结束所有的遍历</li></ul></li></ul><h3 id="scope-作用域" tabindex="-1">Scope（作用域） <a class="header-anchor" href="#scope-作用域" aria-hidden="true">#</a></h3><ul><li><code>scope</code>的属性和方法 <ul><li><code>scope.bindings</code>：当前作用域内声明所有变量</li><li><code>scope.path</code>：生成作用域的节点对应的路径</li><li><code>scope.references</code>：所有的变量引用的路径</li><li><code>getAllBindings()</code>：获取从当前作用域一直到根作用域的集合</li><li><code>getBinding(name)</code>：从当前作用域到根使用域查找变量</li><li><code>getOwnBinding(name)</code>：在当前作用域查找变量</li><li><code>parentHasBinding(name, noGlobals)</code>：从当前父作用域到根使用域查找变量</li><li><code>removeBinding(name)</code>：删除变量</li><li><code>hasBinding(name, noGlobals)</code>：判断是否包含变量</li><li><code>moveBindingTo(name, scope)</code>：把当前作用域的变量移动到其它作用域中</li><li><code>generateUid(name)</code>：生成作用域中的唯一变量名,如果变量名被占用就在前面加下划线</li></ul></li></ul><h2 id="插件选项" tabindex="-1">插件选项 <a class="header-anchor" href="#插件选项" aria-hidden="true">#</a></h2><h3 id="插件编写和调用几种方法" tabindex="-1">插件编写和调用几种方法 <a class="header-anchor" href="#插件编写和调用几种方法" aria-hidden="true">#</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> code </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">    function foo(a, b) {</span></span>
<span class="line"><span style="color:#C3E88D;">	    console.log(a, b);</span></span>
<span class="line"><span style="color:#C3E88D;">    }</span></span>
<span class="line"><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h4 id="第一种" tabindex="-1">第一种 <a class="header-anchor" href="#第一种" aria-hidden="true">#</a></h4><blockquote><p>使用插件的时候，使用调用插件函数的方法，传入参数，此时函数接受的<code>opts</code>就是函数传的参数</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> addCodePlugin </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">opts</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">opts</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// { city: &#39;shanghai&#39; }</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        visitor</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            FunctionDeclaration</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">path</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">state</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">opts</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">state.opts</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// { like: &#39;pingPang&#39; }</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> res </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> babel</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">transform</span><span style="color:#A6ACCD;">(code</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">        [</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#82AAFF;">addCodePlugin</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">city</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">shanghai</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#F07178;">like</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pingPang</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h4 id="第二种" tabindex="-1">第二种 <a class="header-anchor" href="#第二种" aria-hidden="true">#</a></h4><blockquote><p>使用插件的时候，不使用调用插件函数的方法，此时函数中接受的<code>opts</code>就是默认参数，其中的<code>types</code> 最常用，它其实就是<code>@babel/types</code>这个包的所有方法集合，传入的参数就可以通过函数第二个参数<code>state.opts</code>来获取</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> addCodePlugin </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">({</span><span style="color:#A6ACCD;font-style:italic;">types</span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        visitor</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            FunctionDeclaration</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">path</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">state</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">opts</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">state.opts</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// { like: &#39;pingPang&#39; }</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> res </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> babel</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">transform</span><span style="color:#A6ACCD;">(code</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">        [</span></span>
<span class="line"><span style="color:#A6ACCD;">            addCodePlugin</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#F07178;">like</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pingPang</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="相关网站" tabindex="-1">相关网站 <a class="header-anchor" href="#相关网站" aria-hidden="true">#</a></h2><ul><li><a href="https://astexplorer.net/" target="_blank" rel="noreferrer">AST节点查看网站</a></li><li><a href="https://github.com/brigand/babel-plugin-handbook" target="_blank" rel="noreferrer">babel-plugin-handbook</a></li></ul>`,22),p=[e];function t(c,r,i,y,D,F){return l(),a("div",null,p)}const C=s(o,[["render",t]]);export{A as __pageData,C as default};
