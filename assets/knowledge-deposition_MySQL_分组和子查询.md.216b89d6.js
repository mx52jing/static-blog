import{_ as s,c as a,o as n,a as l}from"./app.0f8b3a4a.js";const d=JSON.parse('{"title":"分组和子查询","description":"","frontmatter":{"layout":"doc"},"headers":[{"level":2,"title":"分组","slug":"分组","link":"#分组","children":[{"level":3,"title":"单列分组","slug":"单列分组","link":"#单列分组","children":[]},{"level":3,"title":"多列分组","slug":"多列分组","link":"#多列分组","children":[]},{"level":3,"title":"分组筛选","slug":"分组筛选","link":"#分组筛选","children":[]}]},{"level":2,"title":"子查询","slug":"子查询","link":"#子查询","children":[{"level":3,"title":"子查询比较运算符","slug":"子查询比较运算符","link":"#子查询比较运算符","children":[]},{"level":3,"title":"ANY、SOME、ALL","slug":"any、some、all","link":"#any、some、all","children":[]}]}],"relativePath":"knowledge-deposition/MySQL/分组和子查询.md"}'),e={name:"knowledge-deposition/MySQL/分组和子查询.md"},p=l(`<h1 id="分组和子查询" tabindex="-1">分组和子查询 <a class="header-anchor" href="#分组和子查询" aria-hidden="true">#</a></h1><h2 id="分组" tabindex="-1">分组 <a class="header-anchor" href="#分组" aria-hidden="true">#</a></h2><blockquote><p>分组语法如下：</p></blockquote><div class="language-SQL"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> 列名,查询表达式</span></span>
<span class="line"><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">表名</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">条件</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F78C6C;">GROUP BY</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">分组字段</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F78C6C;">HAVING</span><span style="color:#A6ACCD;"> 分组后的过滤条件</span></span>
<span class="line"><span style="color:#F78C6C;">ORDER BY</span><span style="color:#A6ACCD;"> 列名 [ASC,DESC]</span></span>
<span class="line"><span style="color:#F78C6C;">LIMIT</span><span style="color:#A6ACCD;"> 偏移量,条数</span></span>
<span class="line"></span></code></pre></div><h3 id="单列分组" tabindex="-1">单列分组 <a class="header-anchor" href="#单列分组" aria-hidden="true">#</a></h3><blockquote><p>根据<code>性别</code>分组，并求出不同性别的年龄的平均值</p></blockquote><div class="language-SQL"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> gender, </span><span style="color:#82AAFF;">AVG</span><span style="color:#A6ACCD;">(age) </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers </span><span style="color:#F78C6C;">GROUP BY</span><span style="color:#A6ACCD;"> gender;</span></span>
<span class="line"></span></code></pre></div><blockquote><p>统计每种性别的最大年龄，并且年龄从大到小排列</p></blockquote><div class="language-SQL"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> gender, </span><span style="color:#82AAFF;">MAX</span><span style="color:#A6ACCD;">(age) </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers </span><span style="color:#F78C6C;">GROUP BY</span><span style="color:#A6ACCD;"> gender </span><span style="color:#F78C6C;">ORDER BY</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MAX</span><span style="color:#A6ACCD;">(age) </span><span style="color:#F78C6C;">DESC</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div><h3 id="多列分组" tabindex="-1">多列分组 <a class="header-anchor" href="#多列分组" aria-hidden="true">#</a></h3><blockquote><p>根据年龄和性别分组，并统计每组的人数</p></blockquote><div class="language-SQL"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">COUNT</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">), age, gender </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers </span><span style="color:#F78C6C;">GROUP BY</span><span style="color:#A6ACCD;"> age, gender;</span></span>
<span class="line"></span></code></pre></div><blockquote><p>根据年龄和性别分组，并统计每组的人数，并按照人数从多到少倒序排列</p></blockquote><div class="language-SQL"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">COUNT</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">), age, gender </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers </span><span style="color:#F78C6C;">GROUP BY</span><span style="color:#A6ACCD;"> age, gender </span><span style="color:#F78C6C;">ORDER BY</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">COUNT</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">) </span><span style="color:#F78C6C;">DESC</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div><h3 id="分组筛选" tabindex="-1">分组筛选 <a class="header-anchor" href="#分组筛选" aria-hidden="true">#</a></h3><blockquote><p>语法如下</p></blockquote><div class="language-SQL"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;">  列名,查询表达式</span></span>
<span class="line"><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">表名</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">条件</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F78C6C;">GROUP BY</span><span style="color:#A6ACCD;"> {col_name|expr|position}</span></span>
<span class="line"><span style="color:#F78C6C;">HAVING</span><span style="color:#A6ACCD;">  {col_name|expr|position}</span></span>
<span class="line"><span style="color:#F78C6C;">ORDER BY</span><span style="color:#A6ACCD;"> {col_name|expr|position} [ASC|DESC]</span></span>
<span class="line"><span style="color:#F78C6C;">LIMIT</span><span style="color:#A6ACCD;"> offset,row_count</span></span>
<span class="line"></span></code></pre></div><ul><li><p><code>WHERE</code>：用于过滤掉不符合条件的记录</p></li><li><p><code>HAVING</code>：用于过滤分组后的记录</p></li><li><p><code>GROUP BY</code>：用于对筛选后的结果进行分组</p></li></ul><blockquote><p>根据年龄和性别分组，并统计每组的人数，并筛选出人数大于等于2的</p></blockquote><div class="language-SQL"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">COUNT</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">), age, gender </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers </span><span style="color:#F78C6C;">GROUP BY</span><span style="color:#A6ACCD;"> age, gender </span><span style="color:#F78C6C;">HAVING</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">COUNT</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div><blockquote><p>先筛选出<code>gender</code>为1的数据，然后根据年龄分组，最后筛出根据年龄分组后的总数大于2的数据</p></blockquote><div class="language-SQL"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">COUNT</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">), age </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> gender </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">GROUP BY</span><span style="color:#A6ACCD;"> age </span><span style="color:#F78C6C;">HAVING</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">COUNT</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="子查询" tabindex="-1">子查询 <a class="header-anchor" href="#子查询" aria-hidden="true">#</a></h2><ul><li>子查询就是指出现在其它SQL语句中的SELECT语句,必须始终出现在圆括号中</li><li>查询可以包含多个关键字或条件</li><li>子查询的外层查询可以是: SELECT、INSERT、UPDATE、SET等</li><li>子查询可以返回常量、一行数据、一列数据或其它子查询</li></ul><h3 id="子查询比较运算符" tabindex="-1">子查询比较运算符 <a class="header-anchor" href="#子查询比较运算符" aria-hidden="true">#</a></h3><table><thead><tr><th style="text-align:center;">运算符</th><th style="text-align:center;">含义</th></tr></thead><tbody><tr><td style="text-align:center;">=</td><td style="text-align:center;">等于</td></tr><tr><td style="text-align:center;">&gt;</td><td style="text-align:center;">大于</td></tr><tr><td style="text-align:center;">&lt;</td><td style="text-align:center;">小于</td></tr><tr><td style="text-align:center;">&gt;=</td><td style="text-align:center;">大于等于</td></tr><tr><td style="text-align:center;">&lt;=</td><td style="text-align:center;">小于等于</td></tr><tr><td style="text-align:center;">&lt;&gt;</td><td style="text-align:center;">不等于</td></tr><tr><td style="text-align:center;">!=</td><td style="text-align:center;">不等于</td></tr><tr><td style="text-align:center;">&lt;=&gt;</td><td style="text-align:center;">安全不等于</td></tr></tbody></table><blockquote><p>查询年龄大于平均年龄的数据</p></blockquote><div class="language-SQL"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> age </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> (</span><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">AVG</span><span style="color:#A6ACCD;">(age) </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers);</span></span>
<span class="line"></span></code></pre></div><h3 id="any、some、all" tabindex="-1">ANY、SOME、ALL <a class="header-anchor" href="#any、some、all" aria-hidden="true">#</a></h3><ul><li><p>ANY：任意一个符合条件即可</p></li><li><p>SOME：只要有符合条件的即可，和<code>ANY</code>一样</p></li><li><p>ALL：所有的都要符合条件</p></li></ul><blockquote><p>查询年龄大于任意一个男性(假设gender = 0 为男性)的数据，只要年龄比其中某个男性的年龄大就行</p></blockquote><div class="language-SQL"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> t.</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers t </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> age </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> ANY (</span><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> age </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> gender </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">0</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#F78C6C;">ORDER BY</span><span style="color:#A6ACCD;"> age </span><span style="color:#F78C6C;">DESC</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> t.</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers t </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> age </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> SOME (</span><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> age </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> gender </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">0</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#F78C6C;">ORDER BY</span><span style="color:#A6ACCD;"> age </span><span style="color:#F78C6C;">DESC</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div><blockquote><p>查询年龄大于所有男性(假设gender = 0 为男性)的数据，年龄比所有男性的年龄都大才会返回</p></blockquote><div class="language-SQL"><button title="Copy Code" class="copy"></button><span class="lang">SQL</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> t.</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers t </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> age </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> ALL (</span><span style="color:#F78C6C;">SELECT</span><span style="color:#A6ACCD;"> age </span><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> teachers </span><span style="color:#F78C6C;">WHERE</span><span style="color:#A6ACCD;"> gender </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">0</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#F78C6C;">ORDER BY</span><span style="color:#A6ACCD;"> age </span><span style="color:#F78C6C;">DESC</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div>`,34),o=[p];function t(c,C,r,y,A,i){return n(),a("div",null,o)}const F=s(e,[["render",t]]);export{d as __pageData,F as default};
