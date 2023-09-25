---
layout: doc
---

# fmt使用

## `占位符`含义

|格式|含义|
|:-:|-|
|%b|一个`二进制整数值(基数为2)`，或者是一个(高级的)用科学计数法表示的指数为2的浮点数|
|%c|字符型，可以把输入的数字按照`ASCII码`相应转换为对应的字符|
|%d|一个`十进制数值(基数为10)`|
|%f|以`标准记数法`表示的`浮点数`或者`复数值`|
|%o|一个以`八进制`表示的`数字(基数为8)`|
|%p|以`十六进制(基数为16)`表示的一个`值的地址`，前缀为`0x`,字母使用小写的`a-f`表示|
|%q|使用Go语法以及必须时使用转义，以`双引号`括起来的`字符串`或者`字节切片[]byte`，或者是`以单引号括起来的数字`|
|%s|字符串，输出字符串中的字符直至字符串中的空字符(字符串以`’\0‘`结尾，这个`’\0’`即空字符)|
|%t|以`true`或者`false`输出的布尔值|
|%T|使用Go语法输出的`值的类型`|
|%v|输出变量的`值`|
|%x|以`十六进制`表示的`整型值(基数为十六)`，数字`a-f`使用小写表示|
|%X|以`十六进制`表示的`整型值(基数为十六)`，数字`A-F`使用大写表示|

## 方法

### `fmt.Fprintf`

- `Fprintf`函数将格式化的字符串写入`io.Writer`接口实现（如`标准输出`、`文件`等）

```Go
func Fprintf(w io.Writer, format string, a ...interface{}) (n int, err error)
```

> 使用示例

```Go
fmt.Fprintf(os.Stdout, "Hello, %s!\n", "Go")
```

### `fmt.Println`

- `Println`函数将给定的参数`格式化为字符串`并输出到`标准输出`，并在输出后添加一个`换行符`

```Go
func Println(a ...interface{}) (n int, err error)
```

> 使用示例

```Go
fmt.Println("Hello, Go!")
```

### `fmt.Printf`

- `Printf`函数将格式化的字符串输出到标准输出，可以使用`占位符`来表示要输出的值

```Go
func Printf(format string, a ...interface{}) (n int, err error)
```

> 使用示例

```Go
name := "Go"
fmt.Printf("Hello, %s!\n", name)
```

### `fmt.Sprintf`

- `Sprintf`函数将格式化的字符串`返回`，而不会直接输出到标准输出或其他地方。它`返回一个字符串`，而`不是将格式化的内容打印出来`

```Go
func Sprintf(format string, a ...interface{}) string
```

> 使用示例

```Go
name := "Go"
message := fmt.Sprintf("Hello, %s!", name)
fmt.Println(message)
```

### 总结

- `fmt.Fprintf`用于将格式化的内容写入指定的`io.Writer`接口实现（比如文件、网络连接等）

- `fmt.Println`用于将格式化的内容输出到标准输出，并在最后添加一个`换行符`
- `fmt.Printf`用于将格式化的内容输出到标准输出，可以使用`占位符`来表示要输出的值
- `fmt.Sprintf`用于将格式化的内容`返回为一个字符串`，而不是直接输出到标准输出或其他地方