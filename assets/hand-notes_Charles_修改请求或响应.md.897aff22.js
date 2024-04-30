import{_ as e,c as i,o as t,e as o}from"./app.7b877ca7.js";const u=JSON.parse('{"title":"修改请求或响应","description":"","frontmatter":{"layout":"doc"},"headers":[{"level":2,"title":"修改接口请求/响应数据","slug":"修改接口请求-响应数据","link":"#修改接口请求-响应数据","children":[]},{"level":2,"title":"修改响应文件内容","slug":"修改响应文件内容","link":"#修改响应文件内容","children":[]}],"relativePath":"hand-notes/Charles/修改请求或响应.md"}'),a={name:"hand-notes/Charles/修改请求或响应.md"},s=o('<h1 id="修改请求或响应" tabindex="-1">修改请求或响应 <a class="header-anchor" href="#修改请求或响应" aria-hidden="true">#</a></h1><h2 id="修改接口请求-响应数据" tabindex="-1">修改接口请求/响应数据 <a class="header-anchor" href="#修改接口请求-响应数据" aria-hidden="true">#</a></h2><ul><li>打开<code>Charles</code>，请求接口后，选中要修改的接口，<code>右键</code>，点击<code>Breakpoints</code></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/breakpoints.png" alt="breakpoints"></p><ul><li>打开<code>Charles</code>的<code>Proxy</code> =&gt; <code>Breakpoint Settings</code></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/breakpoint-settings.png" alt="breakpoint-settings"></p><ul><li>打开后展示如下，这里可以看到添加的要拦截的接口，想拦截哪个接口就<code>双击</code>哪个</li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/open-breaking-settings.png" alt="open-breaking-settings"></p><ul><li>双击后打开窗口如下</li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/edit-breakpoint.png" alt="edit-breakpoint"></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><ul><li><p>请求的<code>query</code>中如果有随机字符串最好去掉，不然不同的参数就不会拦截，也可以把<code>query</code>整体删掉</p></li><li><p>如果要修改请求的数据，勾选<code>Request</code></p></li><li><p>如果要修改接口响应数据，勾选<code>Response</code></p></li></ul></div><ul><li><p>在<code>APP/网页</code>中<code>重新请求接口</code>，这里演示的是修改<code>Response</code></p></li><li><p>响应数据返回后会自动锁定到如下图，等待修改<code>Response</code>，点击<code>Edit Response</code></p></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/edit-response.png" alt="install"></p><ul><li>修改完毕后，点击<code>Excute</code>即可</li></ul><h2 id="修改响应文件内容" tabindex="-1">修改响应文件内容 <a class="header-anchor" href="#修改响应文件内容" aria-hidden="true">#</a></h2><ul><li>点击<code>Charles</code>的<code>Tools</code> =&gt; <code>Map Local</code></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/map-local.png" alt="map-local"></p><ul><li>勾选<code>Enable Map Local</code>，添加拦截的文件路径</li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/map-local-settings.png" alt="map-local-settings"></p><ul><li><p>填写文件路径<code>Path</code>，如<code>/a/b.txt</code>，然后选择本地替换文件路径</p></li><li><p>其他<code>Host</code>、<code>Port</code>等想限制也可以填写</p></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/mapping-edit.png" alt="mapping-edit"></p>',21),c=[s];function l(n,d,r,p,g,h){return t(),i("div",null,c)}const _=e(a,[["render",l]]);export{u as __pageData,_ as default};
