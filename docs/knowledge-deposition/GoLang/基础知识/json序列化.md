---
layout: doc
---

# json序列化

## json.Marshal

- 可以使用`json.Marshal`方法将`结构体`转换为`二进制流`

```Go
func json.Marshal(v any) ([]byte, error)
```

> 代码示例

```Go
package main

import (
	"encoding/json"
	"fmt"
)

type Student struct {
	StudentId int
	Age int
	UserName string
	IsMonitor bool
}

type ClassOne struct {
	Id int
	Students []Student
}

func main() {
	xiaoMing := Student{ 1, 20, "小明", false }
	xiaoHong := Student{ 2, 22, "小红", true }	
	classOneInstance := ClassOne{
		Id: 1,
		Students: []Student { xiaoMing, xiaoHong },
	}
	// func json.Marshal(v any) ([]byte, error)
	// 将结构体转换为二进制流
	bytes, marshalErr := json.Marshal(classOneInstance)
	if marshalErr != nil {
		fmt.Println("json 序列化失败", marshalErr)
		return
	}
	// {"Id":1,"Students":[{"StudentId":1,"Age":20,"UserName":"小明","IsMonitor":false},{"StudentId":2,"Age":22,"UserName":"小红","IsMonitor":true}]}
	fmt.Println(string(bytes))
}
```

## json.Unmarshal

- 使用`json.Unmarshal`将`二进制流`转成`结构体`

```Go
func json.Unmarshal(data []byte, v any) error
```

> 代码示例

```Go
package main

import (
	"encoding/json"
	"fmt"
)

type Student struct {
	StudentId int
	Age int
	UserName string
	IsMonitor bool
}

type ClassOne struct {
	Id int
	Students []Student
}

func main() {
	xiaoMing := Student{ 1, 20, "小明", false }
	xiaoHong := Student{ 2, 22, "小红", true }
	classOneInstance := ClassOne{
		Id: 1,
		Students: []Student { xiaoMing, xiaoHong },
	}
	// func json.Marshal(v any) ([]byte, error)
	// 将结构体转换为二进制流
	bytes, marshalErr := json.Marshal(classOneInstance)
	if marshalErr != nil {
		fmt.Println("json 序列化失败", marshalErr)
		return
	}
	fmt.Println(bytes)
	fmt.Println(string(bytes))

	var cls ClassOne
	// func json.Unmarshal(data []byte, v any) error
	// 这里必须传结构体cls的指针
	unmarshalErr := json.Unmarshal(bytes, &cls)
	if unmarshalErr != nil {
		fmt.Println("json 反序列化失败", unmarshalErr)
		return
	}
	// cls的值为 {1 [{1 20 小明 false} {2 22 小红 true}]}
	fmt.Printf("cls的值为 %v\n", cls)
}
```

## sonic

上面使用的库是`go`语言提供的`标准库`，字节跳动提供了一个更高效的`json序列化`库`sonic`，地址[点击这里](https://github.com/bytedance/sonic)，也能够实现上面的功能
