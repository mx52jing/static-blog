---
layout: doc
---

# Bash实践

## 通过路径提取文件名称/目录

### 使用`basename`获取文件名称

使用方法：

```shell
basename NAME [SUFFIX]
```
示例：
```shell
str="/a1/b1/c1/foo.png"
# 输出 foo
echo $(basename $str .png)
# 输出 foo.png
echo $(basename $str)
```
### 使用`echo ${str##*/}`获取文件名称

```shell
str="./a/dsa/fwe/s.pkg"
# 输出 s.pkg
echo ${str##*/}
```
### 使用`dirname`获取文件所在目录
::: tip
该方法不仅可以提取文件所在的目录，还能提取目录所在的目录
:::
使用方法：
```shell
dirname NAME
```
示例：
```shell
str="/a1/b1/c1/foo.png"
# 输出 /a1/b1/c1
echo $(dirname $str)

str1="/a1/b1/c1"
# 输出 /a1/b1
echo $(dirname $str1)
```

## 提取文件后缀

- 使用`${str##*.}`

```shell
str="./a/dsa/fwe/s.pkg"
# 输出pkg
echo ${str##*.}
```
## 判断变量是否包含某个字符串

### 使用`grep`

示例：
```shell
str="/a1/b1/c1/foo.png"
res=$(echo $str | grep "foo")
if [ "$res" != "" ]
then
  echo "包含foo"
else
  echo "不包含foo"
fi
```

### 使用`字符串运算符`

- 利用字符串运算符`=~`直接判断`str`中是否包含`foo`

```shell
str="/a1/b1/c1/foo.png"
if [[ "$res" =~ "foo" ]]
then
  echo "包含foo"
else
  echo "不包含foo"
fi
```

## 检测某个目录是否是git仓库

```shell
isGit=$(git rev-parse --git-dir 2> /dev/null)
echo ${isGit}
```

## 获取命令行参数

### 使用`getopts`方法

```shell
while getopts ":t:p:" opt
do
  case $opt in
    t)
      echo "t为$OPTARG"
      ;;
    p)
      echo "p为$OPTARG"
      ;;
    ?)
      echo "未知参数"
      ;;
  esac
done
# ./test.sh -t debug -p ./app/asd
# 输出 参数t的值为debug 参数p的值为./app/asd
# ./test.sh -a 
# 输出未知参数
```

## 获取当前时间

::: tip
`date` 后面有一个空格，否则无法识别命令
:::

- `Y`显示`4位年份`，例如`2023`
- `y`显示`2位年份`，例如`23`
- `M`表示`分钟`
- `m`表示`数字月份`
- `D`表示`当前日期`，例如`01/05/23`，也就是`23年1月5号`
- `d`表示`天`
- `H`表示`小时`
- `h`表示`英文月份`，例如`Jan`
- `S`表示`当前秒钟`，单位为`秒`
- `s`表示`当前秒钟`，单位为`毫秒`

示例：

```shell
time=$(date "+%Y-%m-%d %H:%M:%S")
day=$(date "+%D")
echo ${time}
echo ${day}
# 打印
# 2023-01-05 16:08:29
# 01/05/23
```

## 使用`read`和用户交互

- `read`命令可以用作与用户的交互中，需要用户去输入一些信息

```shell
read [options] [设置需要获取的变量名]
```
|options|含义|
|:-:|:-:|
|-p|提示信息，在等待`read`输入时的`提示信息`|
|-t|等待用户输入的`秒数`: `read`命令会一直等待用户输入，超过这个时间自动走到下一条命令
|-n|当用户输入的字符等于`n`指定的数字时，就自动进入下一条命令
|-s|隐藏数据，一般在需要`输入密码`时使用

## 重定向输入和输出

将输入/输出内容重定向到`/dev/null`文件中

例如：获取当前登录的`npm`用户，如果没有获取到，就登录

```shell
loginName=$(npm whoami 2>/dev/null)
if [ -z ${loginName} ]
then
    echo "请先登录"
    npm login
fi
```

- 如果当前命令行未登录`npm`账号，会报如下错误，如果已登录，则会返回当前登录的`npm账号名称`
- 我们在上面将`错误输出`重定向到了`/dev/null`文件中，这样如果未登录就避免报错，而是得到了空字符串

```shell
npm ERR! code ENEEDAUTH
npm ERR! need auth This command requires you to be logged in.
npm ERR! need auth You need to authorize this machine using `npm adduser`

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/xxx/.npm/_logs/2023-03-10T15_19_28_286Z-debug-0.log
```
