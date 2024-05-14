import{_ as s,c as n,o as a,e as o}from"./app.a07671de.js";const i=JSON.parse('{"title":"Hook","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"knowledge-deposition/GoLang/Logger/Logrus/Hook.md"}'),l={name:"knowledge-deposition/GoLang/Logger/Logrus/Hook.md"},p=o(`<h1 id="hook" tabindex="-1">Hook <a class="header-anchor" href="#hook" aria-hidden="true">#</a></h1><ul><li><p>通过使用<code>hook</code>，可以扩展<code>logrus</code>的功能</p></li><li><p>可以为<code>logrus</code>设置<code>hook</code>，每条日志输出前都会执行<code>hook</code>的特定方法</p></li><li><p><a href="https://github.com/sirupsen/logrus/blob/master/hooks.go#L8" target="_blank" rel="noreferrer">点击</a>查看更多</p></li></ul><blockquote><p><code>Hook</code>定义如下</p></blockquote><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Hook</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#82AAFF;">Levels</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;">Level</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#82AAFF;">Fire</span><span style="color:#89DDFF;">(*</span><span style="color:#A6ACCD;">Entry</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">error</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><ul><li><p><code>Levels()</code>方法返回要执行<code>Fire</code>方法的日志级别，只有输出<code>Levels</code>方法中返回的日志级别时才会执行<code>Fire</code>方法</p></li><li><p><code>Fire</code>是日志输出前调用的方法</p></li></ul><blockquote><p>示例</p></blockquote><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">package</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">github.com/sirupsen/logrus</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyHook</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">mHook </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">MyHook</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Levels</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;">logrus</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Level </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;">logrus</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Level</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">logrus</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">InfoLevel</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 返回InfoLevel 只有输出Info级别的日志才会执行Fire方法</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">mHook </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">MyHook</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Fire</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">entry </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">logrus</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Entry</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">error</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	entry</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Data</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">app</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	logrus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddHook</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">MyHook</span><span style="color:#89DDFF;">{})</span></span>
<span class="line"><span style="color:#A6ACCD;">	logrus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">SetFormatter</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">logrus</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">TextFormatter</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		FullTimestamp</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">	logrus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Errorln</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">logrus =&gt; Error</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	logrus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Warningln</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">logrus =&gt; Warn</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	logrus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Infoln</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">logrus =&gt; Info</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	logrus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Debugln</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">logrus =&gt; Debug</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">ERRO[2023-08-08T22:59:39+08:00] logrus =&gt; Error                              </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">WARN[2023-08-08T22:59:39+08:00] logrus =&gt; Warn                               </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">INFO[2023-08-08T22:59:39+08:00] logrus =&gt; Info        name=app</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"></span></code></pre></div><blockquote><p>上面的自定义<code>Hook</code>在<code>Levels</code>中只返回了<code>logrus.InfoLevel</code>，所以只有输出<code>Info</code>日志时，才会执行<code>Fire</code>方法，带上额外的<code>name</code>字段</p></blockquote>`,8),e=[p];function t(c,r,D,F,y,A){return a(),n("div",null,e)}const u=s(l,[["render",t]]);export{i as __pageData,u as default};