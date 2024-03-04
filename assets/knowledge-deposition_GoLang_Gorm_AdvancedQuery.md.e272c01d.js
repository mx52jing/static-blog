import{_ as s,c as a,o as n,d as l}from"./app.b74cd9a3.js";const C=JSON.parse('{"title":"Advanced Query","description":"","frontmatter":{"layout":"doc"},"headers":[{"level":2,"title":"智能选择字段","slug":"智能选择字段","link":"#智能选择字段","children":[]},{"level":2,"title":"子查询","slug":"子查询","link":"#子查询","children":[{"level":3,"title":"FROM子查询","slug":"from子查询","link":"#from子查询","children":[]}]},{"level":2,"title":"命名参数","slug":"命名参数","link":"#命名参数","children":[]},{"level":2,"title":"Find到Map中","slug":"find到map中","link":"#find到map中","children":[]},{"level":2,"title":"Scopes","slug":"scopes","link":"#scopes","children":[]},{"level":2,"title":"Count","slug":"count","link":"#count","children":[]}],"relativePath":"knowledge-deposition/GoLang/Gorm/AdvancedQuery.md"}'),o={name:"knowledge-deposition/GoLang/Gorm/AdvancedQuery.md"},p=l(`<h1 id="advanced-query" tabindex="-1">Advanced Query <a class="header-anchor" href="#advanced-query" aria-hidden="true">#</a></h1><h2 id="智能选择字段" tabindex="-1">智能选择字段 <a class="header-anchor" href="#智能选择字段" aria-hidden="true">#</a></h2><ul><li>选择字段可以使用<code>Select</code>，但是如果有多个<code>Select</code>操作，可以定义一个<code>结构体</code>，查询的时候会自动检索结构体中的字段</li></ul><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SmartFields</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	Name   </span><span style="color:#C792EA;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">	Age    </span><span style="color:#C792EA;">int</span></span>
<span class="line"><span style="color:#A6ACCD;">	Gender </span><span style="color:#C792EA;">int</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> smartT </span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;">SmartFields</span></span>
<span class="line"><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Model</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">Teacher</span><span style="color:#89DDFF;">{}).</span><span style="color:#82AAFF;">Find</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">smartT</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">smartT is=&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> smartT</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// SELECT \`teachers\`.\`name\`,\`teachers\`.\`age\`,\`teachers\`.\`gender\` FROM \`teachers\`</span></span>
<span class="line"></span></code></pre></div><h2 id="子查询" tabindex="-1">子查询 <a class="header-anchor" href="#子查询" aria-hidden="true">#</a></h2><ul><li>使用<code>上次查询的结果</code>作为<code>本次查询的参数</code></li></ul><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> subQueryT </span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;">Teacher</span></span>
<span class="line"><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Where</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">age &gt;= (?)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Model</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">Teacher</span><span style="color:#89DDFF;">{}).</span><span style="color:#82AAFF;">Select</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">AVG(age)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)).</span><span style="color:#82AAFF;">Find</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">subQueryT</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">subQueryT is=&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> subQueryT</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// SELECT * FROM \`teachers\` WHERE age &gt;= (SELECT AVG(age) FROM \`teachers\`)</span></span>
<span class="line"></span></code></pre></div><h3 id="from子查询" tabindex="-1"><code>FROM</code>子查询 <a class="header-anchor" href="#from子查询" aria-hidden="true">#</a></h3><ul><li>可以在<code>Table</code>方法中通过<code>FROM</code>子句使用<code>子查询</code></li></ul><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">(?) as t</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Model</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">Teacher</span><span style="color:#89DDFF;">{}).</span><span style="color:#82AAFF;">Select</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">age</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)).</span><span style="color:#82AAFF;">Where</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">age &gt; ?</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">18</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">Find</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">subQueryT</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// SELECT * FROM (SELECT \`name\`,\`age\` FROM \`teachers\`) as t WHERE age &gt; 18</span></span>
<span class="line"></span></code></pre></div><h2 id="命名参数" tabindex="-1">命名参数 <a class="header-anchor" href="#命名参数" aria-hidden="true">#</a></h2><ul><li><code>GORM</code>支持<code>sql.NamedArg</code>和<code>map[string]interface{}{}</code>形式的命名参数</li></ul><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Where</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name1 = @name OR name2 = @name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> sql</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Named</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">如燕</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)).</span><span style="color:#82AAFF;">Find</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">namedQueryT</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// SELECT * FROM \`teachers\` WHERE name1 = &#39;如燕&#39; OR name2 = &#39;如燕&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Where</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name1 = @name OR name2 = @name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">map[</span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">]interface{}{</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">如燕</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">}).</span><span style="color:#82AAFF;">Find</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">namedQueryT</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// SELECT * FROM \`teachers\` WHERE name1 = &#39;如燕&#39; OR name2 = &#39;如燕&#39;</span></span>
<span class="line"></span></code></pre></div><h2 id="find到map中" tabindex="-1"><code>Find</code>到<code>Map</code>中 <a class="header-anchor" href="#find到map中" aria-hidden="true">#</a></h2><ul><li><code>GORM</code>允许扫描结果至<code>map[string]interface{}</code>或者<code>[]map[string]interface{}</code></li></ul><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> res </span><span style="color:#89DDFF;">map[</span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">]interface{}</span></span>
<span class="line"><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Model</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">Teacher</span><span style="color:#89DDFF;">{}).</span><span style="color:#82AAFF;">Where</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">age &gt;= ?</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">18</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">Take</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// SELECT * FROM \`teachers\` WHERE age &gt;= 18 LIMIT 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> res </span><span style="color:#89DDFF;">[]map[</span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">]interface{}</span></span>
<span class="line"><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Table</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">teachers</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">Where</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">age &gt;= ?</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">18</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">Find</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// SELECT * FROM \`teachers\` WHERE age &gt;= 18</span></span>
<span class="line"></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>使用该查询方法一定要指定<code>Model</code>或者<code>Table</code></p></div><h2 id="scopes" tabindex="-1"><code>Scopes</code> <a class="header-anchor" href="#scopes" aria-hidden="true">#</a></h2><ul><li><code>Scopes</code>允许<code>指定一些常用的查询</code>，可以在<code>调用方法时引用这些查询</code></li></ul><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ageGreaterThan18</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">db </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">gorm</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">gorm</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">DB </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Where</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">age &gt; ?</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">18</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">nameLikeMul</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">db </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">gorm</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">gorm</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">DB </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Where</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name LIKE ?</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">张%</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> scopeT Teacher</span></span>
<span class="line"><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Scopes</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ageGreaterThan18</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">Find</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">scopeT</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// SELECT * FROM \`teachers\` WHERE age &gt; 18</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> scopeT </span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;">Teacher</span></span>
<span class="line"><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Scopes</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ageGreaterThan18</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> nameLikeMul</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">Find</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">scopeT</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// SELECT * FROM \`teachers\` WHERE age &gt; 18 AND name LIKE &#39;张%&#39;</span></span>
<span class="line"></span></code></pre></div><h2 id="count" tabindex="-1"><code>Count</code> <a class="header-anchor" href="#count" aria-hidden="true">#</a></h2><ul><li><p>展示查询结果的条数</p></li><li><p>查询出的结果<code>count</code>是<code>int64</code>类型</p></li></ul><div class="language-Go"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> count </span><span style="color:#C792EA;">int64</span></span>
<span class="line"><span style="color:#A6ACCD;">DB</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Model</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">Teacher</span><span style="color:#89DDFF;">{}).</span><span style="color:#82AAFF;">Where</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">age &gt;= ?</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">18</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">Count</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// SELECT count(*) FROM \`teachers\` WHERE age &gt;= 18</span></span>
<span class="line"></span></code></pre></div>`,23),e=[p];function t(c,r,D,F,y,i){return n(),a("div",null,e)}const d=s(o,[["render",t]]);export{C as __pageData,d as default};