---
layout: doc
---

# strings包

`Go`中使用`strings`包来完成对字符串的操作

## 判断前缀/后缀

### HasPrefix

- 使用`strings.HasPrefix`判断字符串`str`是否以`prefix`开头

```Go
strings.HasPrefix(str, prefix string) bool
```

> 代码示例

```Go
str1 := "hash是开发计划"
fmt.Println(strings.HasPrefix(str1, "hash")) // true
fmt.Println(strings.HasPrefix(str1, "ha")) // true
fmt.Println(strings.HasPrefix(str1, "hashs")) // false
```

### HasSuffix

- 使用`strings.HasSuffix`判断字符串`str`是否以`suffix`结尾

```Go
strings.HasSuffix(s, suffix string) bool
```

> 代码示例

```Go
str2 := "asd是否会words"
fmt.Println(strings.HasSuffix(str2, "s")) // true
fmt.Println(strings.HasSuffix(str2, "wo")) // false
fmt.Println(strings.HasSuffix(str2, "会words")) // true
```

## 字符串包含

- 使用`strings.Contains`判断字符串`str`是否包含`substr`

```Go
strings.Contains(s, substr string) bool
```

> 代码示例

```Go
str3 := "whatgowotk"
fmt.Println(strings.Contains(str3, "go")) // true
fmt.Println(strings.Contains(str3, "og")) // false
fmt.Println(strings.Contains(str3, "wotk")) // true
```

## 字符串索引

### Index

- 使用`strings.Index`返回字符串`substr`在字符串`str`中的索引，该索引是`substr`中第一个字符在`str`中的索引，如果`str`中不包含`substr`，返回`-1`

```Go
strings.Index(s, str string) int
```

> 代码示例

```Go
str5 := "shfwuebrqr"
fmt.Println(strings.Index(str5, "ud")) // -1
fmt.Println(strings.Index(str5, "fwu")) // 2
fmt.Println(strings.Index(str5, "r")) // 7
```
### LastIndex

- 使用`strings.LastIndex`返回字符串`substr`在字符串`str`中`最后出现位置的索引`，该索引是`substr`中`第一个字符`在`str`中的索引，如果`str`中不包含`substr`，返回`-1`

```Go
strings.LastIndex(s, str string) int
```

> 代码示例

```Go
str6 := "shfwuebrqr"
fmt.Println(strings.Index(str6, "r")) // 7
fmt.Println(strings.Index(str6, "she")) // -1
fmt.Println(strings.Index(str6, "s")) // 0
```

## 字符串替换

- 使用`strings.Replace`方法把字符串`str`中的前`n`个`old`字符串替换为字符串`new`，并`返回一个新的字符串`

- 如果`n`为`-1`，则将所有的`old`替换为`new`

```Go
strings.Replace(str, old, new string, n int) string
```

> 代码示例

```Go
str7 := "abgcuyabiucu"
fmt.Println(strings.Replace(str7, "ab", "--", 1)) // --gcuyabiucu
fmt.Println(strings.Replace(str7, "ab", "--", 2)) // --gcuy--iucu
fmt.Println(strings.Replace(str7, "u", "=", -1)) // abgc=yabi=c=
```

## 统计字符串出现次数

- `strings.Count`用于计算字符串`substr`在字符串`str`中出现的次数

```Go
strings.Count(str, substr string) int
```

> 代码示例

```Go
str8 := "abgcuyabiucudd"
fmt.Println(strings.Count(str8, "a")) // 2
fmt.Println(strings.Count(str8, "ab")) // 2
fmt.Println(strings.Count(str8, "u"))  // 3
fmt.Println(strings.Count(str8, "d")) // 2
fmt.Println(strings.Count(str8, "dd")) // 1
```

## 重复字符串

- `strings.Repeat`用于重复`count`次字符串`str`并返回一个`新的字符串`

```Go
strings.Repeat(str, count int) string
```

> 代码示例

```Go
fmt.Println(strings.Repeat("a", 2)) // aa
fmt.Println(strings.Repeat("a-b", 2)) // a-ba-b
fmt.Println(strings.Repeat("a b", 2)) // a ba b
```

## 转换大小写

- `strings.ToLower`将字符串中的`Unicode`字符全部转换为相应的`小写字符`

- `strings.ToUpper`将字符串中的`Unicode`字符全部转换为相应的`大写字符`

```Go
strings.ToLower(str) string
strings.ToUpper(str) string
```

> 代码示例

```Go
str9 := "UhtKWlwTsO"
fmt.Println(strings.ToLower(str9)) // uhtkwlwtso
fmt.Println(strings.ToUpper(str9)) // UHTKWLWTSO
```

## 字符串格式化

- `strings.TrimSpace`移除字符串`前后空格`

- `strings.Trim` 移除字符串`开头`和`结尾`的`xxx`
- `strings.TrimLeft` 移除字符串`开头`的`xxx`
- `strings.TrimRight` 移除字符串`结尾`的`xxx`

```Go
strings.TrimSpace(str)
strings.Trim(str, "xxx")
strings.TrimLeft(str, "xxx")
strings.TrimRight(str, "xxx")
```

> 代码示例

```Go
str10 := " ehe ll o world e"
str11 := "hell o world eh"
fmt.Println(strings.TrimSpace(str10)) // "ehe ll o world e"
fmt.Println(strings.Trim(str11, "h")) // "ell o world e"
fmt.Println(strings.TrimLeft(str11, "e")) // "hell o world eh"
fmt.Println(strings.TrimRight(str11, "eh")) // "hell o world"
```

## 字符串切割

- `strings.Fields`，按`空格`分割字符串，返回`slcie`，如果是`空字符串`，返回`空slice`

- `strings.Split`，基于自定义`分割符号step`对字符串分割，返回`slice`

```Go
strings.Fields(str) slice
strings.Split(str, step)
```

> 代码示例

```Go
str12 := "hello world"
str13 := "张,李,孙,"
str14 := ""
fmt.Printf("值为 %v, 类型为 %T\n", strings.Fields(str12), strings.Fields(str12))  // 值为 [hello world], 类型为 []string
fmt.Printf("值为 %v, 类型为 %T\n", strings.Fields(str14), strings.Fields(str14)) // 值为 [], 类型为 []string
fmt.Printf("值为 %v, 类型为 %T\n", strings.Split(str13, ","), strings.Split(str13, ",")) // 值为 [张 李 孙 ], 类型为 []string
```

## 拼接`slice`到字符串

- `strings.Join`用于将元素类型为`string`的`slice`使用分割符号来拼接组成一个`字符串`

```Go
strings.Join(sl []string, step string) string
```

> 代码示例

```Go
name := []string{"张环", "李朗", "沈韬", "肖豹"}
fmt.Println(strings.Join(name, "-")) // "张环-李朗-沈韬-肖豹"
fmt.Println(strings.Join(name, " ")) // "张环 李朗 沈韬 肖豹"
fmt.Println(strings.Join(name, "%")) // "张环%李朗%沈韬%肖豹"
```
