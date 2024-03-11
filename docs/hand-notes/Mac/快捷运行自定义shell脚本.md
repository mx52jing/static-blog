---
layout: doc
---

# 快捷使用自定义shell脚本

如果需要在自己的电脑中经常会用到自己写的`shell`脚本，可以将其添加到环境变量中，然后可以像使用`全局命令`一样执行自己的脚本，设置步骤如下：

1. 创建新文件夹

> 新建一个文件夹存放自己的所有`shell`脚本
> 新建一个脚本文件并为其添加`执行权限`

```shell
mkdir ~/.my_scripts
cd ~/.my_scripts
# 编辑完后:wq保存退出
nvim x.sh
chmod u+x x.sh
```

2. 将存放脚本的文件夹路径添加到环境变量中

> 打开`~/.zshrc`文件，将下面的代码添加到文件末尾

```shell
export PATH=$PATH:"$HOME/.my_script"
```

:::tip
- `"$HOME/.my_script"`视情况而定，就是创建的`将存放脚本的文件夹路径`
:::

> 执行`source ~/.zshrc`，或者`Command + Q`退出`iterm2`再重新打开
> 
> `Command + T`新开一个window，就可以直接输入`x.sh`执行脚本代码了
> 
> 设置之后，在命令行中就能在任意路径下执行自己的脚本

> 效果如下：

```shell
➜  ~ reinforcing.sh
I am reinforcing.sh

➜  Downloads reinforcing.sh
I am reinforcing.sh
```





