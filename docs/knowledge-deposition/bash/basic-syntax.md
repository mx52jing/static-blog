---
layout: doc
---

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
::: warning
`变量名`和`等号`之间`不能有空格`
:::
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
echo `expr index.md "$string" io`  # 输出 4
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

### 定义数组

`Shell`中，用`()`来表示数组，数组元素用`空格`符号分割开

```shell
arr=(值1 值2 ... 值n)
```
### 读取数组

```shell
${数组名[下标]}

arr=(1 2 3 4 5 6)
echo "${arr[2]}" // 3
```

#### 获取数组中的所有元素

- 使用`@`或者`*`可以获取数组中的所有元素

```shell
arr=(1 2 3 4 5 6)
echo "${arr[@]}" // 1 2 3 4 5 6
echo "${arr[*]}" // 1 2 3 4 5 6
```

#### 获取数组的长度

```shell
arr=(1 2 3 4 5 6)
echo "数组的长度为${#arr[@]}" // 数组的长度为6
echo "数组的长度为${#arr[*]}" // 数组的长度为6
```
## `Shell`传递参数

脚本内获取参数的格式为：`$n`，n代表一个数字，
- 1 为执行脚本的第一个参数
- 2 为执行脚本的第二个参数
- 以此类推……

## `Shell`基本运算符

支持多种运算符
- 算数运算符
- 关系运算符
- 布尔运算符
- 字符串运算符
- 文件测试运算符

原生`bash`不支持简单的数学运算，但是可以通过其他命令来实现，例如`awk`和`expr`，`expr`最常用

```shell
val=`expr 2 + 2`
echo "两数之和为: $val" // 两数之和为: 4
```

`表达式`和`运算符`之间要有`空格`，例如`2+2`是不对的，必须写成`2 + 2`，完整的表达式要被`反引号(``)`包裹

### 算术运算符

```shell
a=10
b=20
```

|运算符|说明|举例
|:-:|:-:|:-:|
|+|加法|`echo expr ${a} + ${b}`，结果为30|
|-|减法|`echo expr ${a} - ${b}`，结果为-10|
|*|减法|`echo expr ${a} \* ${b}`，结果为200|
|/|除法|`echo expr ${a} / ${b}`，结果为0.5|
|%|取余|`echo expr ${a} % ${b}`，结果为10|
|=|赋值|`a=${b}`，a为10|
|==|用于比较两个数字是否相等|`[ $a == $b ]`，返回 false|
|!=|用于比较两个数字是否不相等|`[ $a != $b ]`，返回 true|

::: warning
- 条件表达式要放在方括号之间，并且要有空格，例如: `[$a==$b]`是错误的，必须写成`[ $a == $b ]`才行

- `乘号(*)`前边必须加`反斜杠(\)`才能实现乘法运算
:::

### 关系运算符

|运算符|说明|举例
|:-:|:-:|:-:|
|-eq|检测两个数是否相等，相等返回 true|`[ $a -eq $b ]` 返回 false
|-ne|检测两个数是否不相等，不相等返回 true|`[ $a -ne $b ]` 返回 true
|-gt|检测左边的数是否大于右边的，如果是，则返回 true|`[ $a -gt $b ]` 返回 false
|-lt|检测左边的数是否小于右边的，如果是，则返回 true|`[ $a -lt $b ]` 返回 true
|-ge|检测左边的数是否大于等于右边的，如果是，则返回 true|`[ $a -ge $b ]` 返回 false
|-le|检测左边的数是否小于等于右边的，如果是，则返回 true|`[ $a -le $b ]` 返回 true

### 布尔运算符

|运算符|说明|举例
|:-:|:-:|:-:|
|!|非运算，表达式为 true 则返回 false，否则返回 true|`[ ! false ]` 返回true
|-o|或运算，有一个表达式为 true 则返回 true|`[ $a -lt 20 -o $b -gt 100 ]` 返回true
|-a|与运算，两个表达式都为 true 才返回 true|`[ $a -lt 20 -a $b -gt 100 ]` 返回false

### 逻辑运算符

::: warning
**注意改表达式需要被两个`[]`包裹**
:::

|运算符|说明|举例
|:-:|:-:|:-:|
|&&|逻辑的`AND`|`[[ $a -lt 100 && $b -gt 100 ]]` 返回false
|\|\||逻辑的`OR`|`[[ $a -lt 100 \|\| $b -gt 100 ]]` 返回true

### 字符串运算符

|运算符|说明|举例
|:-:|:-:|:-:|
|=|检测两个字符串是否相等，相等返回 true|`[ $a = $b ]` 返回 false
|!=|检测两个字符串是否不相等，不相等返回 true|`[ $a != $b ]` 返回 true
|-z|检测字符串长度是否为0，为0返回 true|`[ -z $a ]` 返回 false
|-n|检测字符串长度是否不为0，不为 0 返回true|`[ -n $a ]` 返回 true
|$|检测字符串是否为空，不为空返回 true|`[ $a ]` 返回 true

### 文件测试运算符

|运算符|说明|举例
|:-:|:-:|:-:|
|-b file|检测文件是否是块设备文件，如果是，则返回true|`[ -b $file ]` 返回true/false|
|-c file|检测文件是否是字符设备文件 ，如果是，则返回true|`[ -c $file ]`返回true/false|
|-d file|检测文件是否是目录 ，如果是，则返回 true|`[ -d $file ]`返回true/false|
|-f file|检测文件是否是普通文件（既不是目录，也不是设备文件，如果是，则返回 true|`[ -f $file ]`返回true/false|
|-g file|检测文件是否设置了SGID位 ，如果是，则返回true|`[ -g $file ]`返回true/false|
|-k file|检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true|`[ -k $file ]`返回true/false|
|-p file|检测文件是否是有名管道 ，如果是，则返回 true|`[ -p $file ]`返回true/false|
|-u file|检测文件是否设置了SUID位 ，如果是，则返回 true|`[ -u $file ]`返回true/false|
|-r file|检测文件是否可读 ，如果是，则返回true|`[ -r $file ]`返回true/false|
|-w file|检测文件是否可写 ，如果是，则返回true|`[ -w $file ]`返回true/false|
|-x file|检测文件是否可执行 ，如果是，则返回true|`[ -x $file ]`返回true/false|
|-s file|检测文件是否为空（文件大小是否大于0），不为空返回true|`[ -s $file ]`返回true/false|
|-e file|检测文件（包括目录）是否存在 ，如果是，则返回true|`[ -e $file ]`返回true/false|

## echo命令

### 显示普通字符串

```shell
echo "str"
```

### 显示转义字符

```shell
echo "\"It is a test\""
```

### 显示变量

```shell
name="sdfsd"
echo "${name} as" # sdfsd as
```
### 显示换行
```shell
echo -e "1 \n2" # -e 开启转义
# 1
# 2
```

### 显示不换行
```shell
echo -e "OK! \c" # -e 开启转义 \c 不换行
echo "It is a test"
```

### 显示结果定向至文件

```shell
echo "It is a test" > myfile
```

### 原样输出字符串，不进行转义或取变量(`用单引号`)

```shell
echo '$name\"' # $name\"
```

### 显示命令执行结果

::: tip
这里使用的是反引号(\`), 而不是单引号 (`'`)
:::

结果将显示当前日期

```shell
echo `date`
```

## 流程控制

### if else

```shell
if condition
then
    command1 
    command2
    ...
    commandN 
fi
```

```shell
if condition
then
    command1 
    command2
    ...
    commandN
else
    command
fi
```

```shell
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi
```

### for 循环

```shell
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done
```

### while 语句

while 循环用于`不断执行一系列命令`，也用于从输入文件中读取数据

```shell
while condition
do
    command
done
```

### until 循环

util循环执行一系列命令直至条件为`true`时停止。
until循环与while循环在处理方式上刚好相反。
一般`while`循环优于`until`循环，但在某些时候—也只是极少数情况下，until循环更加有用。

```shell
until condition
do
    command
done
```

### case ... esac

类似`switch case`

- bash中的每个`case`语句均以`case`关键字开头，后接`case表达式`和`in`关键字。 使用`esac`关键字`关闭case语句`;
- 可以应用以`|`分隔的多个模式运算符，运算符指示模式列表的终止。包含语句的模式称为子句，并且必须以双分号(`;;`)终止;
- 星号(`*`)用作定义默认情况的最终模式。当用作最后一种情况时，它用作默认情况;


```shell
case variable in
  pattern_1)
    command1
    command2
    ...
    commandN
    ;;
  pattern_2)
    command1
    command2
    ...
    commandN
    ;;
esac
```

```shell
case $Paltform in  
    iPhone|iPad)  
        echo "is IOA"  
        echo  
        ;;  
    Android|android)  
        echo "is Android"  
        ;;  
    *)  
        echo "默认情况"  
        ;;  
esac
```

## 函数

### 定义函数

```shell
[ function ] funname [()] {
    action;
    [return int;]
}
```
有两种格式定义

- 以函数名称开头，后跟括号

```shell
function_name(){
  action;
}
```

- 以函数保留字开头，后跟函数名称

```shell
function function_name() {  
    commands  
}
```
- 函数返回值：可以显示加：`return`返回，如果不加，将以最后一条命令运行结果，作为返回值，return后跟数值`n(0-255)`


```shell
demoFun(){
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"

#-----函数开始执行-----
#这是我的第一个 shell 函数!
#-----函数执行完毕-----

function demoFoo(){
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFoo
echo "-----函数执行完毕-----"

#-----函数开始执行-----
#这是我的第一个 shell 函数!
#-----函数执行完毕-----
```

### 函数参数
调用函数时可以向其传递参数。在函数体内部，通过`$n`的形式来获取参数的值，例如，`$1`表示`第一个`参数，`$2`表示`第二个`参数...

```shell
funWithParam(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73

#
#第一个参数为 1 !
#第二个参数为 2 !
#第十个参数为 10 !
#第十个参数为 34 !
#第十一个参数为 73 !
#参数总数有 11 个!
#作为一个字符串输出所有参数 1 2 3 4 5 6 7 8 9 34 73 !
```
## 输入/输出重定向

|设备|	设备文件名|文件描述符|类型
|:-:|:-:|:-:|:-:|
|键盘|`/dev/stdin`|0|标准输入
|显示器|`/dev/stdout`|1|标准输出
|显示器|`/dev/stderr`|2|标准错误输出|

以下是一些常用的命令示意：

|命令|	说明|
|:-:|:-:|
|command > file|将`输出`重定向到file|
|command < file|将`输入`重定向到file|
|command >>	file|将`输出`以`追加`的方式重定向到file|
|n > file|将`文件描述符`为`n`的文件重定向到 file|
|n >> file|`将文件描述符`为`n`的文件以`追加`的方式重定向到 file|
|n >& m|将输出文件`m`和`n`合并|
|n <& m|将输入文件`m`和`n`合并|
|<< tag|将开始标记`tag`和结束标记`tag`之间的内容作为输入|

### `/dev/null` 文件

如果希望执行某个命令，但又不希望在屏幕上显示输出结果，那么可以将输出重定向到`/dev/null`

```shell
command > /dev/null
```
- `/dev/null`是一个特殊的文件，写入到它的内容都会被丢弃，通常也被成为`位桶（bit bucket）`或`黑洞`;
- 如果尝试从该文件读取内容，那么什么也读不到，但是`/dev/null`文件非常有用，将命令的输出重定向到它，会起到`禁止输出`的效果。

如果希望屏蔽`stdout`和`stderr`，可以这样写，表示`命令的输出`和`错误的输出`都重定向到`/dev/null`中

```shell
command > /dev/null 2>&1
```
::: tip
这里的`2`和`>`之间不可以有空格，`2>`是一体的时候才表示错误输出。
:::
