import{_ as s,c as a,o as n,e as l}from"./app.f3311744.js";const i=JSON.parse('{"title":"ProTable","description":"","frontmatter":{"layout":"doc"},"headers":[{"level":2,"title":"表格搜索修改","slug":"表格搜索修改","link":"#表格搜索修改","children":[]}],"relativePath":"hand-notes/React/ProComponents/ProTable.md"}'),p={name:"hand-notes/React/ProComponents/ProTable.md"},o=l(`<h1 id="protable" tabindex="-1">ProTable <a class="header-anchor" href="#protable" aria-hidden="true">#</a></h1><h2 id="表格搜索修改" tabindex="-1">表格搜索修改 <a class="header-anchor" href="#表格搜索修改" aria-hidden="true">#</a></h2><blockquote><p><code>ProTable</code>高级表格添加<code>search={true}</code>后，默认所有的<code>column</code>都会支持搜索，搜索的<code>key</code>就是<code>dataIndex</code>字段，</p><p>例如：下面的<code>column</code>的<code>dataIndex</code>为<code>realName</code>，那么启用搜索后，传入的<code>params</code>就是<code>{realName: &quot;输入的值&quot;&quot;}</code>，如果想改变传给接口的<code>key</code>需要进一步处理</p></blockquote><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> columns </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxxxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">dataIndex</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">realName</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">fieldProps</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">showSearch</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 启用select的搜索</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">debounceTime</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">500</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 使用防抖</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">valueType</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">select</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">request</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">params</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">fetchLeaderShipName</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                current</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                limit</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                page</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                pageSize</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                pageType</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                positionIdList</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                realName</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">params</span><span style="color:#89DDFF;">?.</span><span style="color:#A6ACCD;">keyWords</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">?.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> []</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">item</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                label</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`\${</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">realName</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">-</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">userId</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                value</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">userId</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span></span>
<span class="line"></span></code></pre></div><blockquote><p>进行如下处理后，可以将传给后端的<code>{realName: &quot;输入的值&quot;&quot;}</code>修改为<code>{userId: &quot;输入的值&quot;&quot;}</code></p></blockquote><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>关键的配置是<code>search.transform</code>的转换实现了该功能</p></div><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> columns </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxxxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">dataIndex</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">realName</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">fieldProps</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">showSearch</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 启用select的搜索</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">debounceTime</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">500</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">valueType</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">select</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">request</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">params</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">fetchLeaderShipName</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                current</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                limit</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                page</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                pageSize</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                pageType</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                positionIdList</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                realName</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">params</span><span style="color:#89DDFF;">?.</span><span style="color:#A6ACCD;">keyWords</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">?.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> []</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">item</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                label</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`\${</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">realName</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">-</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">userId</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                value</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">userId</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 使用search.transform 实现 表格搜索姓名时，搜索字段不使用column的dataIndex，而使用自定义的key</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 默认表格搜索传的params是 { realName: &quot;xxx&quot; }, 使用transform转换后，搜索传的param是 { userId: &quot;xxx&quot; }</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">search</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  [Chart]</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">..%2F..%2FChart</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">          transform: </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#FFCB6B;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">userId</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">value</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span></span>
<span class="line"></span></code></pre></div>`,7),e=[o];function t(c,r,F,y,D,C){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};
