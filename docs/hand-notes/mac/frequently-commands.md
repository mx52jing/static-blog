---
layout: doc
---
# Mac 使用小记

## 电脑没声音，播放不出声音
- 重启电脑声音

```shell
sudo killall coreaudiod
```
## 设置mac光标移动速度

```shell
defaults write NSGlobalDomain KeyRepeat -int 1
```
`KeyRepeat`对应的是`按键重复`，系统设置里调到最快对应的值是`2`，你可以调成`0`或者`1`（建议调为`1`，`0`可能会太快）

```shell
defaults write NSGlobalDomain InitialKeyRepeat -int 15
```

`InitialKeyRepeat`对应的是`重复前延迟`，系统设置里调到最快对应的值是`15`，可以尝试调成`10`或者更小，不过建议保持15，因为反应时间太快会容易导致误操作(比如`Esc`键和`Command-Z`这样的快捷键)

## 安装软件失败问题解决

问题：
安装一些软件可能会出现这个报错：`「xxx.app已损坏，打不开。你应该将它移到废纸篓」`，并非你安装的软件已损坏，而是`Mac系统的安全设置`问题

解决方法：
```shell
sudo spctl --master-disable
```

## 命令行关机
- 立即关机

```shell
sudo halt 或者 sudo shutdown -h now
```
- `10分钟后`关机

```shell
sudo shutdown -h +10
```

- `晚上8点`关机

```shell
sudo shutdown -h 20:00
```

- 立即重启

```shell
sudo reboot 
#或者 
sudo shutdown -r now
```

## Mac中开启一个`不存在跨域的Chrome窗口`

::: tip
`/Users/username/Documents/ChromeDevUserData`这个文件夹如果没有自己创建一个就行
:::

```shell
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/username/Documents/ChromeDevUserData
```

## 解决`Mac`升级为`Big Sur`系统后`brew`命令失效的问题

执行命令：

```shell
brew update-reset
```

## 电脑连接`WIFI`失败

连接`WIFI`提示以下错误：
::: danger
Wi-Fi有自分配的IP地址"xxx.xxx.xxx.xxx"，将无法接入互联网
:::

原因：`防火墙首选项很可能已损坏`

解决方法如下：

参考文章：[点击这里查看](https://forums.macrumors.com/threads/mdnsresponder-and-configd.1089090/)

1. 删除系统偏好设置中安全面板中防火墙列表中的所有项目。

2. 关闭防火墙。
3. 删除应用程序防火墙首选项(位于`Library/Preferences/com.apple.alf.plist`)。
4. 重启电脑，打开防火墙，重新配置设置。

## homebrew下载软件出错

执行`brew install xxx`报错如下：

```shell
fatal: Could not resolve HEAD to a revision
Warning: No available formula with the name "watchman".
==> Searching for similarly named formulae...
Error: No similarly named formulae found.
==> Searching for a previously deleted formula (in the last month).
Error: No previously deleted formula found.
==> Searching taps on GitHub...
Error: No formulae found in taps.
```

执行`brew -v`发现如下输出

```shell
Homebrew 3.5.4
Homebrew/homebrew-core (no Git repository)
Homebrew/homebrew-cask (git revision 9a5bb968b6; last commit 2022-07-12)
```
发现`homebrew-core`不存在

解决方法如下([参考链接](https://qiita.com/howaito01/items/799e2cc5a81201c59a47))：

- 先诊断问题，执行`brew doctor`，输出如下：

```shell
Warning: Homebrew/homebrew-core was not tapped properly! Run:
  rm -rf "/opt/homebrew/Library/Taps/homebrew/homebrew-core"
  brew tap homebrew/core

Warning: Some taps are not on the default git origin branch and may not receive
updates. If this is a surprise to you, check out the default branch with:
  git -C $(brew --repo homebrew/core) checkout master
```
- 根据输出提示来修复问题

先执行：
```shell
rm -rf /opt/homebrew/Library/Taps/homebrew/homebrew-core
```
再执行：
```shell
brew tap homebrew/core
```
再次执行`brew -v`发现展示正常
```shell
Homebrew 3.5.4-41-g8b3ff3d
Homebrew/homebrew-core (no Git repository)
Homebrew/homebrew-cask (git revision 9a5bb968b6; last commit 2022-07-12)
```

如果还有第二个`Warning`的问题，再执行一次
```shell
git -C $(brew --repo homebrew/core) checkout master
```
