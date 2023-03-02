# Bash实践中用到的方法记录

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
注意⚠️：该方法不仅可以提取文件所在的目录，还能提取目录所在的目录
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

注意⚠️： `date`后面有一个空格，否则无法识别命令

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
