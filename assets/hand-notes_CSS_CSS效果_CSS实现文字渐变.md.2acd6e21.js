import{_ as s,c as a,o as n,a as e}from"./app.31626a8b.js";const y=JSON.parse('{"title":"CSS实现文字渐变","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"hand-notes/CSS/CSS效果/CSS实现文字渐变.md"}'),l={name:"hand-notes/CSS/CSS效果/CSS实现文字渐变.md"},o=e(`<h1 id="css实现文字渐变" tabindex="-1">CSS实现文字渐变 <a class="header-anchor" href="#css实现文字渐变" aria-hidden="true">#</a></h1><ul><li>关于<code>linear-gradient</code>更多用法详见<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient" target="_blank" rel="noreferrer">这里</a></li><li>关于<code>background-clip</code>更多用法详见<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip" target="_blank" rel="noreferrer">这里</a></li><li>效果预览点击<a href="https://codepen.io/yuanfang666/pen/YzOgaQE" target="_blank" rel="noreferrer">这里</a></li></ul><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">gradient-text</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">linear-gradient</span><span style="color:#89DDFF;">(to</span><span style="color:#A6ACCD;"> right</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> blue </span><span style="color:#F78C6C;">20%</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> red </span><span style="color:#F78C6C;">50%</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">FFFFFF</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> max-content</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> transparent</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-clip</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">-webkit-background-clip</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,3),p=[o];function t(r,c,C,D,i,F){return n(),a("div",null,p)}const A=s(l,[["render",t]]);export{y as __pageData,A as default};
