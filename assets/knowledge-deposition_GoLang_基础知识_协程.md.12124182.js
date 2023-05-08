import{_ as s,c as n,o as a,a as l}from"./app.bcaa7172.js";const C=JSON.parse('{"title":"协程Groutine","description":"","frontmatter":{"layout":"doc"},"headers":[{"level":2,"title":"启动一个协程","slug":"启动一个协程","link":"#启动一个协程","children":[]},{"level":2,"title":"启动多个协程","slug":"启动多个协程","link":"#启动多个协程","children":[]}],"relativePath":"knowledge-deposition/GoLang/基础知识/协程.md"}'),o={name:"knowledge-deposition/GoLang/基础知识/协程.md"},p=l(`<h1 id="协程groutine" tabindex="-1">协程Groutine <a class="header-anchor" href="#协程groutine" aria-hidden="true">#</a></h1><ul><li><p><code>Go</code>语言的<code>协程(Groutine)</code>是与其他函数或方法一起<code>并发运行</code>的工作方式</p></li><li><p><code>协程</code>可以看作是<code>轻量级线程</code>，与<code>线程</code>相比，创建一个协程的<code>成本很小</code>，因此在<code>Go</code>应用中，常常会看到会有很多协程并发地运行</p></li></ul><h2 id="启动一个协程" tabindex="-1">启动一个协程 <a class="header-anchor" href="#启动一个协程" aria-hidden="true">#</a></h2><ul><li>调用<code>函数</code>或者<code>方法</code>时，如果在前面加上关键字<code>go</code>，就可以让一个新的<code>Go协程</code>并发地运行</li></ul><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 定义一个函数</span></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">func_name</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">arguments</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> return_value </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 执行一个函数</span></span>
<span class="line"><span style="color:#82AAFF;">func_name</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">arguments</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 开启一个协程执行这个函数</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">go</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">func_name</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">arguments</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><blockquote><p>示例</p></blockquote><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">printText</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello world</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">// 开启一个协程执行 printText 函数</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">go</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">printText</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">// 使主协程休眠 1 秒</span></span>
<span class="line"><span style="color:#A6ACCD;">	time</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Sleep</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">time</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Second </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">printText函数之后</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><ul><li><p><code>主函数(main)</code>运行在一个<code>特殊的协程</code>上，这个协程称之为<code>主协程(Main Goroutine)</code></p></li><li><p>启动一个新的协程时，协程的调用会<code>立即返回</code></p></li><li><p>程序控制不会去等待<code>协程执行完毕</code>，在调用<code>Go协程</code>之后，程序控制会<code>立即返回到代码的下一行</code>，忽略该协程的任何返回值。如<code>Go主协程终止</code>，则<code>程序终止</code>，于是<code>其他Go协程也会终止</code></p></li><li><p>为了让新的协程能继续运行，我们在<code>main</code>函数添加了<code>time.Sleep(time.Second * 1)</code>，使<code>主协程休眠1秒</code>，但这种做法并不推荐</p></li></ul><h2 id="启动多个协程" tabindex="-1">启动多个协程 <a class="header-anchor" href="#启动多个协程" aria-hidden="true">#</a></h2><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">loopPrint</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">num </span><span style="color:#C792EA;">int</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> i</span><span style="color:#89DDFF;">++</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">num</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">		time</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Sleep</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">time</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Millisecond</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 开启一号协程</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">go</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">loopPrint</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 开启二号协程</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">go</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">loopPrint</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">6</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">// 主协程休眠一秒</span></span>
<span class="line"><span style="color:#A6ACCD;">	time</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Sleep</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">time</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Second</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">loopPrint函数之后</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">//打印如下</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">// 2</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">// 6</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">// 6</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">// 2</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">// loopPrint函数之后</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,10),e=[p];function t(c,r,D,y,i,F){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{C as __pageData,d as default};
