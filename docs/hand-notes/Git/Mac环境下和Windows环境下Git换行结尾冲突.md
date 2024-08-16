---
layout: doc
---

# Mac环境下和Windows环境下Git换行结尾冲突

> 今天遇到一个问题(我的电脑是`Mac`)

> 基于某个项目的`main`分支开发功能，开发完毕后，合并到基于`main`分支创建的测试分支上，结果发现了上百处冲突，顿时惊呆了

> 比如下面这样的冲突：

![WechatIMG456](https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/Git/WechatIMG456.jpg)

> 看起来内容都没改变，但是就是有冲突

## 原因

> 造成上面的冲突的原因是：文本文件所使用的`换行符`，在`不同的系统平台`上是不一样的

> `UNIX/Linux`使用的是`0x0A(LF)`，早期的`Mac OS`使用的是`0x0D(CR)`，后来的`OS X`在更换内核后与`UNIX`保持一致了

> `DOS/Windows`一直使用`0x0D0A(CRLF)`作为换行符

> 在不同平台上，换行符发生改变时，`Git`会认为整个文件被修改，这就造成我们没法`diff`，不能正确反映本次的修改

## Git配置项

### `eol`

- 设置工作目录中文件的换行符，有三个值`LF`, `CRLF`和`native(默认，跟随操作系统)`

> `Git`还提供了一些配置选项，用于在`提交`和`检出`时`自动转换换行符`

### `autocrlf`

> 该配置可设置为下面几个值：

- `true`: 表示`提交`时转换为`LF`，`检出`时转换为`CRLF`,

- `false`: 表示`提交检出均不转换`
- `input`: 表示`提交时`转换为`LF`，`检出时不转换`

```shell
# 提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true

# 设置提交检出均不自动转换换行符
git config --global core.autocrlf false

# 提交时转换为LF，检出时不转换
git config --global core.autocrlf input
```

### `safecrlf`

> 该配置可设置为下面几个值：

- `true`: 表示`不允许提交时包含不同换行符`
  
- `warn`: 表示只在`有不同换行符`时警告
- `false`: 表示`允许提交时有不同换行符存在`

```shell
# 校验混用则拒绝提交
git config --global core.safecrlf true

# 允许提交包含混合换行符的文件
git config --global core.safecrlf false

# 提交包含混合换行符的文件时给出警告
git config --global core.safecrlf warn
```

## 解决方法

> 我的解决方法如下，先配置`Git`转换和提交的规则

```shell
# 提交时转换为LF，检出时不转换
git config --global core.autocrlf input

# 校验混用则拒绝提交
git config --global core.safecrlf true
```

> 配置完成后，可查看是否配置成功

```shell
git config --global --list

# 如果有下面两项证明配置成功了
core.autocrlf=input
core.safecrlf=true
```

> 上面配置好后还没完，因为我是`Mac`，此时我的分支中(`feature/dev`)的文件中换行符都是`CRLF`，而目标分支(`feature/test`)的文件中都是`LF`

> 我如果直接切到`feature/test`分支`merge`我的`feature/dev`还是会有大量冲突

> 因为我`本地的文件在设置前已经以不一致的换行符格式存在`，为了解决这个问题并让后续的合并顺畅，我需要`重新规范化我的文件并提交一次`。这是一个一次性的操作，确保所有文件的换行符格式一致。

> 重新规范化现有文件可执行如下命令(记得先加上上面的`Git`配置)：

```shell
git add --renormalize .
```

> 这个命令会重新扫描所有的文件，并根据当前的`Git`配置(包括`core.autocrlf`和`.gitattributes(可选，另一种方法，我没配置这个文件)`)规范化它们的换行符。

> 然后我将上面的修改提交后重新`merge`，现在的冲突都是代码层面的冲突，没有格式冲突了，然后就可以正常的修改的代码了

## 参考

- [Git 多平台换行符问题(LF or CRLF)](https://kuanghy.github.io/2017/03/19/git-lf-or-crlf)

- [Windows环境和Mac环境下Git换行结尾冲突](https://blog.asroads.com/post/e037b783.html)