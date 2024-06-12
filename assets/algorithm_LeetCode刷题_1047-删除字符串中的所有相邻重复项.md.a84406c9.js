import{_ as p,c as o,a as s,b as n,d as l,e,o as t,r as c}from"./app.ddcb6e99.js";const _=JSON.parse('{"title":"1047-删除字符串中的所有相邻重复项","description":"","frontmatter":{"layout":"doc"},"headers":[{"level":2,"title":"题目信息","slug":"题目信息","link":"#题目信息","children":[]},{"level":2,"title":"题解","slug":"题解","link":"#题解","children":[{"level":3,"title":"解法一","slug":"解法一","link":"#解法一","children":[]},{"level":3,"title":"解法二","slug":"解法二","link":"#解法二","children":[]}]}],"relativePath":"algorithm/LeetCode刷题/1047-删除字符串中的所有相邻重复项.md"}'),r={name:"algorithm/LeetCode刷题/1047-删除字符串中的所有相邻重复项.md"},y=s("h1",{id:"_1047-删除字符串中的所有相邻重复项",tabindex:"-1"},[n("1047-删除字符串中的所有相邻重复项 "),s("a",{class:"header-anchor",href:"#_1047-删除字符串中的所有相邻重复项","aria-hidden":"true"},"#")],-1),F=e(`<h2 id="题目信息" tabindex="-1">题目信息 <a class="header-anchor" href="#题目信息" aria-hidden="true">#</a></h2><p><strong>题目地址</strong>： <a href="https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/description/" target="_blank" rel="noreferrer">1047. 删除字符串中的所有相邻重复项</a></p><p><strong>题目内容：</strong></p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">给出由小写字母组成的字符串S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。</span></span>
<span class="line"><span style="color:#A6ACCD;">在S上反复执行重复项删除操作，直到无法继续删除。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">示例：</span></span>
<span class="line"><span style="color:#A6ACCD;">    输入：</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">abbaca</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    输出：</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ca</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">解释：</span></span>
<span class="line"><span style="color:#A6ACCD;">    例如，在 </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">abbaca</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> 中，我们可以删除 </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bb</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> 由于两字母相邻且相同，</span></span>
<span class="line"><span style="color:#A6ACCD;">    这是此时唯一可以执行删除操作的重复项。</span></span>
<span class="line"><span style="color:#A6ACCD;">    之后我们得到字符串 </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">aaca</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">，其中又只有 </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">aa</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> 可以执行重复项删除操作，</span></span>
<span class="line"><span style="color:#A6ACCD;">    所以最后的字符串为 </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ca</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">。</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">提示：</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;=</span><span style="color:#A6ACCD;"> S</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length </span><span style="color:#89DDFF;">&lt;=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20000</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、S 仅由小写英文字母组成。</span></span>
<span class="line"></span></code></pre></div><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-hidden="true">#</a></h2><h3 id="解法一" tabindex="-1">解法一 <a class="header-anchor" href="#解法一" aria-hidden="true">#</a></h3><p><strong>思路：</strong></p><blockquote><p>定义一个最终结果字符串<code>res = &#39;&#39;</code></p><p>遍历原字符串<code>s</code>，比较<code>res</code>的<code>末位(最后一位)</code>也就是上一次遍历到的字符串和<code>s</code>当前遍历的字符串<code>curStr</code>是否相等</p><p>如果相等，就将<code>res</code>末位去掉，继续下一次遍历</p><p>如果不相等，就讲当前遍历的字符串<code>curStr</code>拼接到<code>res</code>后面</p><p>最后返回<code>res</code>即可</p></blockquote><p><strong>代码实现：</strong></p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">string</span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">s</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">return</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">string</span><span style="color:#89DDFF;font-style:italic;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> removeDuplicates </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">s</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 取上次遍历的字符串</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">prevStr</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 取当前遍历的字符串</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">curStr</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">prevStr</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">curStr</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">substring</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">continue</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`\${</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">}\${</span><span style="color:#A6ACCD;">curStr</span><span style="color:#89DDFF;">}\`</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><h3 id="解法二" tabindex="-1">解法二 <a class="header-anchor" href="#解法二" aria-hidden="true">#</a></h3><p><strong>思路：</strong></p><blockquote><p>使用<code>栈</code>来解决</p><p>定义一个数组<code>res</code>，也就是栈结构</p><p>遍历字符串<code>s</code>，获得当前遍历的字符串，然后获取<code>栈顶元素</code></p><p>如果<code>栈顶元素</code>和当前遍历到的字符串相等，就让<code>栈顶元素出栈</code></p><p>否则就将当前遍历的字符串放到栈顶，直到遍历结束</p><p>最后返回数组拼接的字符串</p></blockquote><p><strong>代码实现：</strong></p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">string</span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">s</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">return</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">string</span><span style="color:#89DDFF;font-style:italic;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> removeDuplicates </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">s</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">]) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">pop</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">continue</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">s</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">join</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div>`,15);function D(i,C,A,d,f,u){const a=c("Badge");return t(),o("div",null,[y,s("p",null,[n("标签："),l(a,{type:"tip",text:"栈"}),n(),l(a,{type:"tip",text:"字符串"})]),F])}const g=p(r,[["render",D]]);export{_ as __pageData,g as default};
