---
layout: doc
---

# Mac环境初始化

## `Mac`软件
### `Homebrew`

[官网地址](https://brew.sh/)

```shell
/bin/Bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
`brew`所有命令执行完注意查看`warning`或相应提示，避免掉坑，例如`M1`环境安装后会有以下提示

```shell
==> Next steps:
- Run these two commands in your terminal to add Homebrew to your PATH:
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
```
如安装后`cask`包不完整，可以再进一步执行

```shell
brew tap homebrew/cask
```

#### `brew`一些操作

- 树型展示依赖关系
```shell
brew deps --tree --installed
```
- 删除包后自动清理无用的依赖项
```shell
brew autoremove
```

### `iterm2`

[官网地址](https://iterm2.com/)

**好用的插件**
- `zsh-autosuggestions`根据历史命令自动补全，查看详情点击[这里](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)
- `zsh-syntax-highlighting`高亮输入的命令，查看详情点击[这里](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)

**配置参考**：
- [终极 Shell](https://macshuo.com/?p=676)
- [iTerm2 + Oh My Zsh 打造舒适终端体验](https://segmentfault.com/a/1190000014992947)

### `Bob`

- [官网](https://bobtranslate.com/)

::: tip
轻量级翻译软件
:::

推荐配置（翻译）`彩云小译`、`Google翻译插件`；`（OCR）百度云`

**配置参考**：

- [macOS 翻译工具 Bob配置](https://sspai.com/post/62721)
- [OpenAI Translator Bob Plugin(ChatGPT翻译插件)](https://github.com/yetone/bob-plugin-openai-translator)

### `lrzsz`
**配置参考**：

- [使用rz和sz来实现文件上传下载](https://segmentfault.com/a/1190000012166969)

### `Hammerspoon`
::: tip
好用的窗口管理软件，快速切换应用
:::

[官网地址](https://www.hammerspoon.org/)

**配置参考**：
- [Hammerspoon - 岂止于窗口管理](https://zhuanlan.zhihu.com/p/72499152)
- [免费又强大的 macOS 自动化工具Hammerspoon](https://sspai.com/post/53992)

### charles

::: tip
抓包工具
:::

- [charles破解码](https://www.zzzmode.com/mytools/charles/)


## 开发环境配置

### `fnm`
::: tip
Node版本管理工具
:::

- [官方地址](https://github.com/Schniz/fnm)

### `pnpm`

- [官方地址](https://pnpm.io/)

### `yarn`

- [官方地址](https://yarnpkg.com/)

### `docker`

- [官方地址](https://www.docker.com/)

### `neovim`

- [官方地址](https://neovim.io/)

### `Android Studio`

- [Android官网](https://developer.android.com/?hl=zh-cn)


### `Conda`
::: tip
快速启动一个Python虚拟环境
:::
- [Conda](https://docs.conda.io/en/latest/)

### `jenv`

::: tip
帮助我们管理 JAVA_HOME 的命令行工具
:::
- [github地址](https://github.com/jenv/jenv)
- [安装配置参考](https://tobebetterjavaer.com/overview/jdk-install-config.html#macos-%E7%94%A8%E6%88%B7)

**安装配置步骤：**
- 安装
```shell
brew install jenv
```

- 安装`JDK`
  - [JDK8地址](https://www.oracle.com/java/technologies/downloads/#java8)
  - [JDK11地址](https://www.oracle.com/java/technologies/downloads/#java11)

- 配置
```shell
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(jenv init -)"' >> ~/.zshrc
```
- 添加`JDK`版本
```shell
jenv add /usr/local/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home/
```
- 管理`JDK`版本
```shell
jenv versions
jenv global 17.0.3
```

**配置参考**：

- [Mac的JDK配置](https://cloud.tencent.com/developer/article/1782923)
- [Linux使用Jenv优雅配置多版本JDK](https://juejin.cn/post/7060142839694852127#heading-10)

## 其他软件

|软件名称|说明|
|:-:|:-:|
|istat-menus|监控神器，展示电脑CPU占用，内存占用等|
|artpip|每日自动更换壁纸|
|wpsoffice-cn|WPS|
|logitech-options|罗技鼠标用户必装，否则无法开启高dpi|
|asciiquarium|命令行水族馆|
|iina|mac视频播放神器|
|fliqlo|锁屏画面展示当前时间，[地址](https://fliqlo.com/)|

## 其他收藏/参考

- [i5ting-mac-init](https://github.com/i5ting/i5ting-mac-init)

