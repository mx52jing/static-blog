import{_ as e,c as i,o as a,e as t}from"./app.7b877ca7.js";const u=JSON.parse('{"title":"Charles配置","description":"","frontmatter":{"layout":"doc"},"headers":[{"level":2,"title":"电脑端操作","slug":"电脑端操作","link":"#电脑端操作","children":[{"level":3,"title":"安装证书","slug":"安装证书","link":"#安装证书","children":[]},{"level":3,"title":"查找证书","slug":"查找证书","link":"#查找证书","children":[]},{"level":3,"title":"信任证书","slug":"信任证书","link":"#信任证书","children":[]},{"level":3,"title":"设置支持HTTPS","slug":"设置支持https","link":"#设置支持https","children":[]},{"level":3,"title":"查看IP","slug":"查看ip","link":"#查看ip","children":[]}]},{"level":2,"title":"手机端设置","slug":"手机端设置","link":"#手机端设置","children":[{"level":3,"title":"IOS","slug":"ios","link":"#ios","children":[]},{"level":3,"title":"安卓","slug":"安卓","link":"#安卓","children":[]}]}],"relativePath":"hand-notes/Charles/抓包配置.md"}'),l={name:"hand-notes/Charles/抓包配置.md"},o=t('<h1 id="charles配置" tabindex="-1"><code>Charles</code>配置 <a class="header-anchor" href="#charles配置" aria-hidden="true">#</a></h1><h2 id="电脑端操作" tabindex="-1">电脑端操作 <a class="header-anchor" href="#电脑端操作" aria-hidden="true">#</a></h2><h3 id="安装证书" tabindex="-1">安装证书 <a class="header-anchor" href="#安装证书" aria-hidden="true">#</a></h3><ul><li>打开<code>Charles</code>，选择<code>Help</code> =&gt; <code>SSL Proxying</code> =&gt; <code>Install Charles Root Certificate</code>，安装完成后，会启动<code>钥匙串访问</code></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/install.jpg" alt="install"></p><h3 id="查找证书" tabindex="-1">查找证书 <a class="header-anchor" href="#查找证书" aria-hidden="true">#</a></h3><ul><li>在<code>钥匙串访问</code>程序中，找到刚才的证书<code>Charles Proxy CA</code></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/proxyCA.png" alt="install"></p><h3 id="信任证书" tabindex="-1">信任证书 <a class="header-anchor" href="#信任证书" aria-hidden="true">#</a></h3><ul><li>选中该证书，<code>右键</code> =&gt; <code>显示简介</code> =&gt; <code>信任</code> =&gt; 在<code>使用此证书时</code>选项中选择<code>始终信任</code></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/getInfo.png" alt="install"></p><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/always-trust.png" alt="install"></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><strong>上述操作完成后，关闭窗口，此时会提示输入<code>电脑密码</code>，按照提示输入即可</strong></p></div><h3 id="设置支持https" tabindex="-1">设置支持<code>HTTPS</code> <a class="header-anchor" href="#设置支持https" aria-hidden="true">#</a></h3><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/ssl-setting.jpg" alt="HTTPS"></p><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/enable-ssl.jpg" alt="HTTPS"></p><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/add-ssl-port.jpg" alt="HTTPS"></p><h3 id="查看ip" tabindex="-1">查看IP <a class="header-anchor" href="#查看ip" aria-hidden="true">#</a></h3><ul><li>使用<code>Charles</code>查看电脑<code>IP</code></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/local-ip.jpg" alt="local-ip"></p><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/ip-address.jpg" alt="local-ip"></p><h2 id="手机端设置" tabindex="-1">手机端设置 <a class="header-anchor" href="#手机端设置" aria-hidden="true">#</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>保证手机和电脑连接同一个WIFI</p></div><h3 id="ios" tabindex="-1">IOS <a class="header-anchor" href="#ios" aria-hidden="true">#</a></h3><hr><h4 id="进入wifi设置" tabindex="-1">进入<code>WIFI</code>设置 <a class="header-anchor" href="#进入wifi设置" aria-hidden="true">#</a></h4><ul><li>进入<code>设置</code> =&gt; <code>无线局域网</code>，找到当前手机链接的<code>wifi</code>，点击后面的<code>info icon</code>进入<code>wifi</code>详情</li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/wifi-info.png" alt="wifi-info"></p><h4 id="设置代理ip" tabindex="-1">设置代理<code>IP</code> <a class="header-anchor" href="#设置代理ip" aria-hidden="true">#</a></h4><ul><li><code>WIFI</code>详情滑动到最下面，找到<code>HTTP Proxy</code></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/http-proxy.png" alt="http-proxy"></p><ul><li><p>进入，选择<code>手动(Manual)</code>，设置<code>Server</code>和<code>port</code></p><ul><li><p><code>Server</code>就是刚才查看的<code>本机IP</code></p></li><li><p><code>port</code>一直都是<code>8888</code></p></li></ul></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/configure-proxy.png" alt="configure-proxy"></p><h4 id="下载证书" tabindex="-1">下载证书 <a class="header-anchor" href="#下载证书" aria-hidden="true">#</a></h4><ul><li><p>打开<code>Safari</code>浏览器，访问：<code>chls.pro/ssl</code>，此时电脑上会有连接提示，点击<code>allow</code>允许，然后在手机端下载证书</p></li><li><p>电脑端展示</p></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/connect-from.png" alt="connect-from"></p><ul><li>手机端下载确认</li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/download.png" alt="download"></p><h4 id="信任证书-1" tabindex="-1">信任证书 <a class="header-anchor" href="#信任证书-1" aria-hidden="true">#</a></h4><ul><li>证书下载完成后，点击<code>设置</code> =&gt; <code>通用</code> =&gt; <code>VPN和设备管理</code>，找到刚才的证书，并下载</li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/device-manage.png" alt="device-manage"></p><ul><li>点击<code>下载</code></li></ul><p><img src="https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Charles/install-profile.png" alt="install-profile"></p><ul><li>完成上述步骤就可以进行抓包了</li></ul><h3 id="安卓" tabindex="-1">安卓 <a class="header-anchor" href="#安卓" aria-hidden="true">#</a></h3><ul><li><p>设置手机<code>wifi</code>代理和<code>IOS</code>的操作基本一样，设置完<code>wifi</code>代理后进行下一步</p></li><li><p>本人使用的<code>小米6</code>自带的浏览器是下载不下来证书的，最后下载了<code>Edge</code>浏览器，访问：<code>chls.pro/ssl</code>，此时电脑上会有连接提示，点击<code>allow</code>允许，然后在手机端下载证书并且安装</p></li><li><p>然后就可以使用了</p></li></ul>',46),c=[o];function s(d,n,r,h,g,p){return a(),i("div",null,c)}const f=e(l,[["render",s]]);export{u as __pageData,f as default};
