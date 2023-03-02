# Bash 基础语法

## 文件格式

文件第一行`#!/bin/bash`或者`#!/bin/sh`，`#!`告诉系统其后路径所指定的程序即是解释此脚本文件的`Shell程序`。

## 运行`bash`脚本

- 作为可执行程序
```shell
chmod u+x ./test.sh // 添加运行权限
./test.sh // 运行脚本
```
- 作为解释器参数
```shell
/bin/sh test.sh
/bin/bash test.sh
```

## 变量

### 定义变量
定义变量时，变量名`不加$`
```shell
#!/bin/bash
name="haha"
```
注意⚠️：`变量名`和`等号`之间`不能有空格`

**变量命名规则：**
- 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头
- 中间不能有空格，可以使用下划线_
- 不能使用标点符号
- 不能使用bash里的关键字（可用help命令查看保留关键字）

除了显式地直接赋值，还可以用语句给变量赋值

```shell
#!/bin/bash
for file in `ls /etc`
或
for file in $(ls /etc)
```

### 使用变量
使用一个定义过的变量，只要在变量名前面加`$`即可
```shell
#!/bin/bash
your_name="bash"
echo $your_name
echo ${your_name}
```
变量名外面的`{}`是可选的，加不加都行，推荐给所有变量加上花括号
```shell
#!/bin/bash
name="hi rose"
for str in $name
do
	echo "当前str为 $str"
	echo "当前str为 ${str}"
done
```
### 定义只读变量
使用`readonly`关键字可以将变量定义为`只读变量`
```shell
#!/bin/bash
myUrl="https://www.google.com"
readonly myUrl
```

### 删除变量
使用`unset`删除变量

```shell
#!/bin/bash
unset variable_name
```
### 变量类型
- `局部变量`：局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量
- `环境变量`：所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
- `shell变量`：shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

## 字符串

### 单引号字符串
```shell
#!/bin/bash
str='str'
```
- 单引号里的任何字符都会原样输出，单引号字符串中的`变量是无效`的
- 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用
### 双引号字符串

- 双引号里可以有`变量`
- 双引号里可以出现`转义字符`
```shell
#!/bin/bash
str="str"
age=22
cur_age="${age}"
```
### 拼接字符串

```shell
#!/bin/bash
your_name="runoob"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting  $greeting_1
# 使用单引号拼接
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2  $greeting_3
```
### 获取字符串长度

- 使用`${#string}`
```shell
#!/bin/bash
age="qwer"
echo "${#age}" // 4
```
### 提取子字符串

从字符串`第2个字符`开始`截取6个字符`
```shell
#!/bin/bash
a="hello world"
echo "${a:1:6}" // ello w
```
### 查找子字符串
查找字符`i`或`o`的位置(哪个字母先出现就计算哪个)

```shell
#!/bin/bash
string="runoob is a great site"
echo `expr index "$string" io`  # 输出 4
```
### 提取字符串

#### 使用符号
- `#`：表示从左边算起第一个
- `%`：表示从右边算起第一个
- `##`：表示从左边算起最后一个
- `%%`：表示从右边算起最后一个

#### 使用方法

- 使用`${var##*symbol}`

`从左向右`开始，提取字符串中`最后一个symbol`符号`右边`的字符串，`不包含symbol符号本身`
```shell
#!/bin/bash
str="/a1/b1/c1/foo.png"
# 输出foo.png
echo "${str##*/}"
# 输出png
echo "${str##*.}"
```
- 使用`${var#*symbol}`

`从左向右`开始，提取字符串中`第一个symbol`符号`右边`的字符串，`不包含symbol符号本身`
```shell
str="/a1/b1/c1/foo.png"
# 输出 a1/b1/c1/foo.png
echo "${str#*/}
# 输出 /b1/c1/foo.png
echo "${str#*1}"
# 输出 png
echo "${str#*.}"
```
- 使用`${var%%symbol*}`

`从右向左`开始，提取字符串中`最后一个symbol`符号`到字符串开头`的字符，`不包含symbol符号本身`
```shell
str="/a1/b1/c1/foo.png"
# 输出/a1/b1/c1/foo
echo "${str%%.*}"
# 输出 /a
echo "${str%%1*}"
```
- 使用`${var%symbol*}`

`从右向左`开始，提取字符串中`第一个symbol符号`到`字符串开头`的字符，`不包含symbol符号本身`
```shell
str="/a1/b1/c1/foo.png"
# 输出 /a1/b1/c1/foo
echo "${str%.*}"
# 输出 /a1/b1/c1
echo "${str%/*}"
# 输出 /a1/b1/c1/fo
echo "${str%o*}"
```

## 数组
`bash`支持`一维数组（不支持多维数组）`，并且没有限定数组的大小
