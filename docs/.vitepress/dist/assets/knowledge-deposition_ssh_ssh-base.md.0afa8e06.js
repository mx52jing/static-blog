import{_ as s,c as a,o as n,a as l}from"./app.dff534f5.js";const D=JSON.parse('{"title":"SSH相关基础","description":"","frontmatter":{},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"登录服务器","slug":"登录服务器","link":"#登录服务器","children":[{"level":3,"title":"通过密码登录","slug":"通过密码登录","link":"#通过密码登录","children":[]},{"level":3,"title":"修改密钥权限，以防他人读取","slug":"修改密钥权限-以防他人读取","link":"#修改密钥权限-以防他人读取","children":[]},{"level":3,"title":"通过自定义配置文件快速登录","slug":"通过自定义配置文件快速登录","link":"#通过自定义配置文件快速登录","children":[]},{"level":3,"title":"通过密钥登录","slug":"通过密钥登录","link":"#通过密钥登录","children":[]},{"level":3,"title":"关闭密码登录","slug":"关闭密码登录","link":"#关闭密码登录","children":[]}]},{"level":2,"title":"自动上传公钥","slug":"自动上传公钥","link":"#自动上传公钥","children":[]},{"level":2,"title":"SSH配置相关文件解析","slug":"ssh配置相关文件解析","link":"#ssh配置相关文件解析","children":[]},{"level":2,"title":"SSH-keygen命令常用参数解析","slug":"SSH-keygen命令常用参数解析","link":"#SSH-keygen命令常用参数解析","children":[{"level":3,"title":"-b指定密钥的二进制位数","slug":"b指定密钥的二进制位数","link":"#b指定密钥的二进制位数","children":[]},{"level":3,"title":"-C为密钥文件指定新的注释","slug":"c为密钥文件指定新的注释","link":"#c为密钥文件指定新的注释","children":[]},{"level":3,"title":"-f指定生成的密钥文件路径","slug":"f指定生成的密钥文件路径","link":"#f指定生成的密钥文件路径","children":[]},{"level":3,"title":"-F查询是否存在某个服务","slug":"f查询是否存在某个服务","link":"#f查询是否存在某个服务","children":[]},{"level":3,"title":"-R 删除某个服务","slug":"r-删除某个服务","link":"#r-删除某个服务","children":[]},{"level":3,"title":"-t 指定生成密钥的算法","slug":"t-指定生成密钥的算法","link":"#t-指定生成密钥的算法","children":[]}]},{"level":2,"title":"配置多个ssh-key适配github多账号","slug":"配置多个ssh-key适配github多账号","link":"#配置多个ssh-key适配github多账号","children":[]}],"relativePath":"knowledge-deposition/SSH/SSH-base.md"}'),e={name:"knowledge-deposition/ssh/ssh-base.md"},o=l(`<h1 id="ssh相关基础" tabindex="-1">SSH相关基础 <a class="header-anchor" href="#ssh相关基础" aria-hidden="true">#</a></h1><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-hidden="true">#</a></h2><p><code>SSH</code>是<code>Linux</code>系统的登录工具，广泛用于服务器登录和各种加密通信。</p><p><code>OpenSSH</code>的客户端是二进制程序<code>ssh</code>。它在 <code>Linux/Unix</code>系统的位置是<code>/usr/bin/ssh</code>。</p><p><code>Linux</code>一般都自带<code>ssh</code>，如果没有可以安装。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Ubuntu 和 Debian</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apt</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">openssh-client</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Centos</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dnf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">openssh-clients</span></span>
<span class="line"></span></code></pre></div><p>安装成功后，查看<code>ssh</code>版本号</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-V</span></span>
<span class="line"></span></code></pre></div><h2 id="登录服务器" tabindex="-1">登录服务器 <a class="header-anchor" href="#登录服务器" aria-hidden="true">#</a></h2><p><code>ssh</code>最常见的用途就是登录服务器</p><h3 id="通过密码登录" tabindex="-1">通过密码登录 <a class="header-anchor" href="#通过密码登录" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user@hostname</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 另外一种写法</span></span>
<span class="line"><span style="color:#FFCB6B;">ssh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-l</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">username</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hostname</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 指定端口号</span></span>
<span class="line"><span style="color:#FFCB6B;">ssh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-l</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">username</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">port</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hostname</span></span>
<span class="line"></span></code></pre></div><ul><li><code>username</code>就是服务器用户名</li><li><code>hostname</code>是<code>主机名</code>，它可以是<code>ip地址</code>，也可以是<code>域名</code></li><li><code>-p</code>指定登录的<code>端口号</code>，端口号默认是<code>22</code></li></ul><h3 id="修改密钥权限-以防他人读取" tabindex="-1">修改密钥权限，以防他人读取 <a class="header-anchor" href="#修改密钥权限-以防他人读取" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">600</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/id_rsa</span></span>
<span class="line"><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">600</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/id_rsa.pub</span></span>
<span class="line"></span></code></pre></div><h3 id="通过自定义配置文件快速登录" tabindex="-1">通过自定义配置文件快速登录 <a class="header-anchor" href="#通过自定义配置文件快速登录" aria-hidden="true">#</a></h3><p>用户个人配置文件是<code>~/.ssh/config</code>，可以添加配置如下</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">Host</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">myServer</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#FFCB6B;">HostName</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hostname</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#FFCB6B;">User</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#FFCB6B;">Port</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">22</span></span>
<span class="line"><span style="color:#FFCB6B;">Host</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">myServer1</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#FFCB6B;">HostName</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hostname1</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#FFCB6B;">User</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user1</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#FFCB6B;">Port</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">22</span></span>
<span class="line"><span style="color:#82AAFF;">......</span></span>
<span class="line"></span></code></pre></div><p>上述配置完成后可以使用<code>ssh myServer</code>命令登录服务器，不用每次都输入<code>用户名</code>和<code>hostname</code>了，而且可以配置多个服务器信息</p><h3 id="通过密钥登录" tabindex="-1">通过密钥登录 <a class="header-anchor" href="#通过密钥登录" aria-hidden="true">#</a></h3><p>通过以下配置步骤来配置密钥登录</p><ul><li>通过<code>ssh-keygen</code>命令生成密钥</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh-keygen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ras</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-C</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">youremail@example.com</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><ul><li>将生成的公钥上传到服务器</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 复制公钥</span></span>
<span class="line"><span style="color:#FFCB6B;">pbcopy</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/id_rsa.pub</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 登录服务器，并粘贴公钥</span></span>
<span class="line"><span style="color:#FFCB6B;">ssh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user@hostname</span></span>
<span class="line"><span style="color:#FFCB6B;">vim</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/authorized_keys</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 将复制的公钥粘贴到(~/.ssh/authorized_keys)文件内，保存并退出</span></span>
<span class="line"></span></code></pre></div><ul><li>退出服务器后，重新登录服务器</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user@hostname</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 或者如果配置了~/.ssh/config文件的话，可以直接用下面这种方式</span></span>
<span class="line"><span style="color:#FFCB6B;">ssh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">myServer</span></span>
<span class="line"></span></code></pre></div><p><strong>如果还是需要输入密码可以从以下几个方面排查</strong></p><ul><li>登录服务器检查<code>/etc/ssh/sshd_config</code>文件，查看<code>/etc/ssh/sshd_config</code>文件是否满足以下配置：</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">PubkeyAuthentication</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yes</span></span>
<span class="line"><span style="color:#FFCB6B;">AuthorizedKeysFile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.ssh/authorized_keys</span></span>
<span class="line"></span></code></pre></div><ul><li>同时修改<code>/etc/ssh/authorized_keys</code>文件权限，因为如果权限不对，<code>SSH</code>服务器可能会拒绝读取该文件</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">644</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/authorized_keys</span></span>
<span class="line"></span></code></pre></div><ul><li>重新启动<code>sshd</code></li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sshd.service</span></span>
<span class="line"></span></code></pre></div><h3 id="关闭密码登录" tabindex="-1">关闭密码登录 <a class="header-anchor" href="#关闭密码登录" aria-hidden="true">#</a></h3><p>为了安全性，启用密钥登录之后，最好关闭服务器的密码登录。 打开服务器<code>sshd</code>的配置文件<code>/etc/ssh/sshd_config</code>，将<code>PasswordAuthentication</code>这一项设为<code>no</code>，然后<code>重新启动sshd</code></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">PasswordAuthentication</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">no</span></span>
<span class="line"></span></code></pre></div><h2 id="自动上传公钥" tabindex="-1">自动上传公钥 <a class="header-anchor" href="#自动上传公钥" aria-hidden="true">#</a></h2><p>上面在上传公钥的时候，是手动<code>copy</code>并且登录服务器上传的，我们还可以使用<code>ssh-copy-id</code>自动上传</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh-copy-id</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">本机电脑公钥文件名</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">一般是id_rsa</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user@hostname</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 公钥文件可以不指定路径和.pub后缀名，ssh-copy-id会自动在~/.ssh目录里面寻找，如下示例</span></span>
<span class="line"><span style="color:#FFCB6B;">ssh-copy-id</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">id_rsa</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user@hostname</span></span>
<span class="line"></span></code></pre></div><ul><li><code>-i</code>参数用来指定公钥文件</li><li><code>ssh-copy-id</code>会采用密码登录，系统会提示输入远程服务器的密码</li><li><code>ssh-copy-id</code>直接将公钥添加到远程服务器<code>authorized_keys</code>文件的末尾，务必保证<code>authorized_keys</code>文件的末尾是换行符（假设该文件已经存在）</li></ul><h2 id="ssh配置相关文件解析" tabindex="-1">SSH配置相关文件解析 <a class="header-anchor" href="#ssh配置相关文件解析" aria-hidden="true">#</a></h2><ul><li><code>/etc/ssh/ssh_config</code>：SSH全局配置文件位置是</li><li><code>~/.ssh/config</code>：用户个人的配置文件，这个文件优先级大于全局配置文件，该文件没有的话可以自己创建一个</li><li><code>~/.ssh/id_rsa.pub</code>：储存SSH公钥的文件</li><li><code>~/.ssh/id_rsa</code>：储存SSH私钥的文件</li><li><code>~/.ssh/known_hosts</code>：登录过的SSH服务器的公钥指纹</li></ul><p><strong><code>known_hosts</code>文件解析</strong></p><p><code>~/.ssh/known_hosts</code>文件中储存的是<code>服务器指纹</code>，服务器指纹其实就是<code>SSH服务器公钥的哈希值</code>，每登录过一台服务器后，就会向这个文件添加一个服务器指纹，首次登录时，会验证是否登录的是陌生服务器(从未使用登录过，在<code>~/.ssh/known_hosts</code>文件中没有记录)，如果是的话，会有以下输出：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">The</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">authenticity</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">of</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">host</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ip (ip)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">can</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">t be established.</span></span>
<span class="line"><span style="color:#C3E88D;">ECDSA key fingerprint is SHA256:xxxxxxxxxxxx.</span></span>
<span class="line"><span style="color:#C3E88D;">Are you sure you want to continue connecting (yes/no/[fingerprint])? connect to server......</span></span>
<span class="line"><span style="color:#C3E88D;">Please type </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">yes</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">, </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">no</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> or the fingerprint:</span></span>
<span class="line"></span></code></pre></div><p>选择<code>yes</code>后即可走下面的登录流程了。 如果服务器的密钥发生变更(比如重装了SSH服务器)，客户端再次连接时，就会发生公钥指纹不吻合的情况。这时，客户端就会中断连接，并显示一段警告信息。为了顺利登录，有两种办法：</p><ol><li>手动修改<code>~/.ssh/known_hosts</code>文件，删除该服务器对应的公钥哈希</li><li>执行<code>ssh-keygen -R hostname</code>命令，<code>hostname</code>是该服务器的<code>主机名/ip</code></li></ol><h2 id="ssh-keygen命令常用参数解析" tabindex="-1">ssh-keygen命令常用参数解析 <a class="header-anchor" href="#ssh-keygen命令常用参数解析" aria-hidden="true">#</a></h2><h3 id="b指定密钥的二进制位数" tabindex="-1"><code>-b</code>指定密钥的二进制位数 <a class="header-anchor" href="#b指定密钥的二进制位数" aria-hidden="true">#</a></h3><ul><li>这个参数值越大，密钥就越不容易破解，但是加密解密的计算开销也会加大。</li><li><code>-b</code>至少为<code>1024</code>，为了更安全可以设置为<code>2048</code>甚至更高。</li></ul><h3 id="c为密钥文件指定新的注释" tabindex="-1"><code>-C</code>为密钥文件指定新的注释 <a class="header-anchor" href="#c为密钥文件指定新的注释" aria-hidden="true">#</a></h3><p><code>-C</code>后面一般是写自己的邮箱</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh-keygen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rsa</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-C</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">youremail@example.com</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><h3 id="f指定生成的密钥文件路径" tabindex="-1"><code>-f</code>指定生成的密钥文件路径 <a class="header-anchor" href="#f指定生成的密钥文件路径" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh-keygen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rsa</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/mykey</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-C</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">xx@aa.com</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><p>上面命令会在<code>~/.ssh</code>文件夹下面生成<code>mykey</code>和<code>mykey.pub</code>文件</p><h3 id="f查询是否存在某个服务" tabindex="-1"><code>-F</code>查询是否存在某个服务 <a class="header-anchor" href="#f查询是否存在某个服务" aria-hidden="true">#</a></h3><p><code>-F</code>参数查询<code>~/.ssh/known_hosts</code>文件内是否存在某个服务(域名/IP)</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh-keygen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-F</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">66.88.66.8</span></span>
<span class="line"></span></code></pre></div><ul><li>如果没找到，什么也不输出</li><li>如果找到相关服务，会输出如下所示：</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Host 66.88.66.8 found: line 13</span></span>
<span class="line"><span style="color:#A6ACCD;">66.88.66.8 ecdsa-sha2-nistp256 xxx</span></span>
<span class="line"></span></code></pre></div><h3 id="r-删除某个服务" tabindex="-1">-R 删除某个服务 <a class="header-anchor" href="#r-删除某个服务" aria-hidden="true">#</a></h3><p><code>-R</code>参数将已经存在<code>~/.ssh/known_hosts</code>文件内的某个<code>服务器指纹</code>删除</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh-keygen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-R</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">66.88.66.8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># # Host 66.88.66.8 found: line 13</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># /Users/xxx/.ssh/known_hosts updated.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Original contents retained as /Users/xxx/.ssh/known_hosts.old</span></span>
<span class="line"></span></code></pre></div><h3 id="t-指定生成密钥的算法" tabindex="-1">-t 指定生成密钥的算法 <a class="header-anchor" href="#t-指定生成密钥的算法" aria-hidden="true">#</a></h3><p><code>-t</code>参数用于指定生成密钥的加密算法，一般是<code>rsa</code>或者<code>dsa</code>，现在也可以使用新的加密方式<code>ed25519</code></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh-keygen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ed25519</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-C</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">your_email@example.com</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><h2 id="配置多个ssh-key适配github多账号" tabindex="-1">配置多个ssh-key适配github多账号 <a class="header-anchor" href="#配置多个ssh-key适配github多账号" aria-hidden="true">#</a></h2><ul><li>使用<code>ssh-keygen</code>命令生成两个不同的密钥</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">ssh-keygen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rsa</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/id_rsa_exampl1</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-C</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">exampl1.com</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">ssh-keygen</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rsa</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/id_rsa_exampl2</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-C</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">exampl2.com</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><ul><li>配置<code>~/.ssh/config</code>文件</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">Host</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">github.example1.com</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#FFCB6B;">HostName</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">github.com</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#FFCB6B;">PreferredAuthentications</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">publickey</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#FFCB6B;">IdentityFile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/id_rsa_example1</span></span>
<span class="line"><span style="color:#FFCB6B;">Host</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">github.example2.com</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#FFCB6B;">HostName</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">github.com</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#FFCB6B;">PreferredAuthentications</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">publickey</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#FFCB6B;">IdentityFile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">~/.ssh/id_rsa_example2</span></span>
<span class="line"></span></code></pre></div><p>如果要使用<code>example1.com</code>邮箱生成的<code>ssh-key</code>添加远程链接，修改<code>github.com</code>为该邮箱的<code>ssh-key</code>对应的<code>Host</code>，如下：</p><p>原先添加远程<code>remote</code>的命令为</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">remote</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">origin</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git@github.com:username/projectName.git</span></span>
<span class="line"></span></code></pre></div><p>修改为</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">remote</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">origin</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git@github.exampl1.com:username/projectName.git</span></span>
<span class="line"></span></code></pre></div>`,78),p=[o];function c(t,i,r,d,C,y){return n(),a("div",null,p)}const A=s(e,[["render",c]]);export{D as __pageData,A as default};
