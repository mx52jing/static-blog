---
layout: doc
---

# 数组、切片、Map

## 数组

:::tip
数组是`值类型`，`不是引用类型`
:::

**数组是一个由`固定长度`的`特定类型元素`组成的序列，一个数组可以由`零个`或`多个`元素组成。由于长度固定，所以在实际应用中很少使用，一般都使用`Slice(切片)`，它是可以`动态的增长和收缩的序列`。**

### 数组声明

声明数组的几种方式

```Go
var variable_name [arr_length]value_type
var variable_name = [arr_length]value_type{val1, val2, ...}
variable_name := [arr_length]value_type{val1, val2, ...}
variable_name := [...]value_type{val1, val2, ...}
```

> 示例

```Go
package main

import "fmt"

func testArr() {
	// var 变量名 [数组长度]数组值类型
	// 数组值为int类型，如果不指定值，默认为0
	// 数组值为string类型，如果不指定值，默认为空字符串
	var arr_init [6]int
	var arr_string [5]string
	arr_no_value := [6]int{}
	// 打印 [0 0 0 0 0 0] [    ] [0 0 0 0 0 0]
	fmt.Println(arr_init, arr_string, arr_no_value)

	// 在声明数组时赋值
	// var 变量名 = [数组长度]数组值类型{val1, val2, ...}
	var ages = [2]int{22, 66}
	// 短声明
	short_name := [3]string{"赵", "孙", "李"}
	// 打印 [22 66] [赵 孙 李]
	fmt.Println(ages, short_name)
	
	// int类型的数组 未赋值的元素默认值为 0
	var some_num = [6]int{22, 66}
	some_str := [6]string{"周", "吴"}
	// 打印 [22 66 0 0 0 0] [周 吴    ]
	fmt.Println(some_num, some_str)

	// 为指定的索引赋值
	idx_num := [6]int{1: 22, 5: 88}
	idx_str := [8]string{2: "李", 6: "孙"}
	// 打印 [0 22 0 0 0 88] [  李    孙 ]
	fmt.Println(idx_num, idx_str)

	// 如果不想写数组长度，可以使用 ...，让go自己去计算长度
	like := [...]string{"篮球","足球","乒乓球", "羽毛球"}
	// 打印 [篮球 足球 乒乓球 羽毛球]
	fmt.Println(like)
}

func main() {
	testArr()
}
```

### 获取数组长度

**使用`len`函数来获取数组的长度**

> 示例

```Go
package main

import "fmt"

func testArrLength() {
	names := [2]string{"张环", "李朗"}
	// 数组names的长度为: 2
	fmt.Println("数组names的长度为:", len(names))
}
func main() {
	testArrLength()
}
```

### 遍历数组

**使用`for range`来遍历数组**

> 示例

```Go
package main

import "fmt"

func arrayTraverse() {
	likes := [6]string{"篮球", "乒乓球", "羽毛球", "台球", "足球", "网球"}
  // 打印如下
  // likes[0]=篮球
  // ikes[1]=乒乓球
  // likes[2]=羽毛球
  // likes[3]=台球
  // likes[4]=足球
  // likes[5]=网球
	for idx, value := range likes {
		fmt.Printf("likes[%d]=%s\n", idx, value)
	}

  // 打印如下
  // value=篮球
  // value=乒乓球
  // value=羽毛球
  // value=台球
  // value=足球
  // value=网球
	for _, value := range likes {
		fmt.Printf("value=%s\n", value)
	}
}

func main() {
	arrayTraverse()
}
```

### 数组是值类型

**当把数组赋值给一个新变量时，该变量会的到原始数组的`副本`，修改该副本不会影响原来的数组**

> 示例

```Go
package main

import "fmt"

func testArrValue() {
	likes := [6]string{"篮球", "乒乓球", "羽毛球", "台球", "足球", "网球"}
	likes_one := likes;
	likes_one[2] = "溜溜球"
	likes_one[5] = "排球"
	// likes的值为 [篮球 乒乓球 羽毛球 台球 足球 网球]
	fmt.Println("likes的值为", likes)
	// likes_one的值为 [篮球 乒乓球 溜溜球 台球 足球 排球]
	fmt.Println("likes_one的值为", likes_one)
}

func main() {
	testArrValue()
}
```

## `Slice`切片

**`切片`是对`数组的一个连续片段的引用`，所以切片是一个`引用类型`。切片本身不拥有任何数据，它们只是`对现有数组的引用`，每个切片值都会`将数组作为其底层的数据结构`。`slice`的语法和数组很像，只是`没有固定长度`而已**

### 创建切片

- **声明方式和数组一样，但是永远都不用指明`切片长度`**
- **使用`make`方法来创建切片**

```Go
// len 表示数组的长度
// cap 表示数组的容量
slice_one := make([]Type, len, cap)
```


> 示例

```Go
package main

import "fmt"

func createSlice() {
	var slice_one []int
	fmt.Println(slice_one) // []

	slice_two := []int{}
	fmt.Println(slice_two) // []
  
	var slice_three = []string{"张环", "李朗"} 
	fmt.Println(slice_three) // [张环 李朗]

	slice_four := []int{22, 66, 88} 
	fmt.Println(slice_four) // [22 66 88]
	
	// 通过指定索引为slice中的元素赋值
	slice_five := []int{1: 22, 5: 88}
	fmt.Println(slice_five) // [0 22 0 0 0 88]
	
	// int类型的slice 未赋值的元素默认值为 0
	slice_six := make([]int, 3, 3)
	fmt.Println(slice_six) // [0 0 0]

	slice_seven := make([]int, 2, 6)
	fmt.Println(slice_seven) // [0 0]
  
  // 使用append方法向slice中添加元素
	slice_seven = append(slice_seven, 2)
	slice_seven = append(slice_seven, 4)
	slice_seven = append(slice_seven, 6)
	slice_seven = append(slice_seven, 8)
	fmt.Println(slice_seven, len(slice_seven), cap(slice_seven)) // [0 0 2 4 6 8] 6 6
}

func main() {
	createSlice()
}
```

### 切片的长度和容量

- **一个`slice`由三个部分构成：`指针`、`长度`、`容量`。**

- **`指针`指向`第一个slice元素`对应的`底层数组元素的地址`，注意：`slice`的`第一个元素`并`不一定就是数组的第一个元素`。**
- **`长度`对应`slice`中`元素的数目`，长度不能超过容量**
- **`容量`一般是从`slice`的`开始位置`到`底层数据的结尾位置`。**
- **`容量`就是从`创建切片索引开始的底层数组中的元素个数`，而`长度是切片中的元素个数`。**
- **切片之间不能比较，因此不能使用`==`操作符来判断两个`slice`是否`含有全部相等元素`**
- **如果需要测试一个`slice`是否是`空`的，使用`len(s) == 0`来判断，而不应该用`s == nil`来判断。**

> 示例

```Go
package main

import "fmt"

func testLenCap() {
	age := make([]int, 2, 6)
	fmt.Println(age, len(age), cap(age)) // [0 0] 2 6
}

func main() {
	testLenCap()
}
```

如果切片操作超出容量上限将导致一个`panic`异常

```Go
package main

import "fmt"

func testLenCap() {
	age := make([]int, 2, 6)
	fmt.Println(age, len(age), cap(age)) // [0 0] 2 6
	
	// 超出切片容量会报错 panic: runtime error: index out of range [7] with length 2
	fmt.Println(age[7]) 
}

func main() {
	testLenCap()
}
```

:::warning
由于`slice`是`引用类型`，所以你不对它进行赋值的话，它的默认值是`nil`
:::

> 示例

```Go
package main

import "fmt"

func slice_no_value() {
	var like []string
	fmt.Println(like, like == nil) // [] true
}

func main() {
	slice_no_value()
}
```

### 获取切片元素

- `slice[:]`  返回切片的所有元素
- `slice[1:]` 返回从切片索引为`1`到切片末尾的元素
- `slice[m:n]` 从切片索引为`m`的元素开始，截取到第`n`个元素
- `slice[:n]` 从切片索引为`0`开始，截取到第`n`个元素

> 示例

```Go
package main

import "fmt"

func testGetValue() {
	names := []string{"张环", "李朗", "沈韬", "肖豹", "杨方", "仁阔"}
	
	// 返回切片所有元素
	fmt.Println(names[:]) // [张环 李朗 沈韬 肖豹 杨方 仁阔]
	// 返回从索引2开始到切片结尾的所有元素
	fmt.Println(names[2:]) // [沈韬 肖豹 杨方 仁阔]
	// 返回从索引2开始到切片的第5个元素(也就是索引为4的元素)
	fmt.Println(names[2:5]) // [沈韬 肖豹 杨方]
	// 返回从索引0开始到切片的第五个元素(也就是索引为4的元素)
	fmt.Println(names[:5]) // [张环 李朗 沈韬 肖豹 杨方]
}

func main() {
	testGetValue()
}
```

### 为切片追加元素

`append`方法如下所示：
```Go
func append(slice []Type, elems ...Type) []Type

slice = append(slice, elem1, elem2)
slice = append(slice, anotherSlice...)
```

- `append`内置函数将元素附加到`切片的末尾`;

- 如果切片`容量不足`，会`创建一个新的数组`，现有数组的元素被`复制`到这个新数组中，并`返回新的引用`;
- `append`返回`更新后的切片`。因此，通常需要在保存切片本身的变量中存储`append`的结果;

> 示例

```Go
package main

import "fmt"

func sliceAppend() {
	age := []int{18}
	// [18] 1 1
	fmt.Println(age, len(age), cap(age))
  
  // 通过append方法向切片中添加元素后，切片的长度和容量都会自动增大
	age = append(age, 22)
	// [18 22] 2 2
	fmt.Println(age, len(age), cap(age))

	age = append(age, 33, 66)
	// [18 22 33 66] 4 4
	fmt.Println(age, len(age), cap(age))

	age = append(age, []int{2, 5, 8, 0}...)
	// [18 22 33 66 2 5 8 0] 8 8
	fmt.Println(age, len(age), cap(age))
}


func main() {
	sliceAppend()
}
```

### 多维切片

```Go
package main

import "fmt"

func multidimensionalSlice(){
	str := [][]string{ {"包子", "饺子"},{"硬币", "鞭炮"}}
	str1 := [][]string{
		{"包子", "饺子"},
		{"硬币", "鞭炮"}, // 换行写的话最后一行也要加上逗号
	}
	fmt.Println(str) // [[包子 饺子] [硬币 鞭炮]]
}

func main() {
	multidimensionalSlice()
}
```
