---
layout: doc
---

# HTTP

## HTTP服务端

- 一个最简单的服务

```Go
package main

import (
	"fmt"
	"net/http"
)

func UserHandler(res http.ResponseWriter, req *http.Request) {
	fmt.Println("req method", req.Method)
	fmt.Println("req url", req.URL)
	// 返回响应
	res.Write([]byte ("请求到了"))
}

func main() {
	// 绑定回调
	http.HandleFunc("/user", UserHandler)
	// 监听并启动服务
	fmt.Println("Server is Running at http://127.0.0.1:9100")
	http.ListenAndServe(":9100", nil)
}
```

- 根据不同请求方法执行不同操作

```Go
package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)


func UserHandler(res http.ResponseWriter, req *http.Request) {
	fmt.Println("req method", req.Method)
	fmt.Println("req url", req.URL)
	// 返回响应
	res.Write([]byte ("请求到了"))
}

func HomeHandler(res http.ResponseWriter, req *http.Request) {
	switch req.Method {
		case http.MethodGet:
			html, err := os.ReadFile("home.html")
			if err != nil {
				fmt.Println("read home.html err", err)
				return
			}
			res.Write(html)
		case http.MethodPost:
			res.Header().Set("admin-token", "JFH)Y*#%HBJBFEGJ")
			res.Write([]byte("返回了数据。并在响应头添加了token"))
	}
}

func main() {
	// 绑定回调
	http.HandleFunc("/user", UserHandler)
	http.HandleFunc("/home", HomeHandler)
	// 监听并启动服务
	fmt.Println("Server is Running at http://127.0.0.1:9100")
	http.ListenAndServe(":9100", nil)
}
```

- 返回`JSON`数据

```Go
func GetJsonHandler(res http.ResponseWriter, req *http.Request) {
	jsonData := make(map[string]string)
	jsonData["name"] = "张环"
	jsonData["like"] = "跟随元芳"
	respData, err := json.Marshal(jsonData)
	if err != nil {
		fmt.Println("转换json数据失败", err)
		return
	}
	res.Header().Set("Content-Type", "application/json; charset=utf-8")
	res.Write(respData)
}

func main() {
	// 绑定回调
	http.HandleFunc("/get_json", GetJsonHandler)
	// 监听并启动服务
	fmt.Println("Server is Running at http://127.0.0.1:9100")
	http.ListenAndServe(":9100", nil)
}
```

- 返回结构体声明的`JSON`，结构体中`字段名首字母`一定要`大写`，不然返回为`空JSON`

```GO
func GetStructJson(res http.ResponseWriter, req *http.Request) {
	type UserInfo struct {
		UserName string // UserName 首字母一定要大写
		Age int   // Age 首字母一定要大写
		Like []string
	}
	userInfo := UserInfo{
		UserName: "张三",
		Age: 22,
		Like: []string {"篮球", "乒乓球", "羽毛球"},
	}
	respData, err := json.Marshal(userInfo)
	if err != nil {
		fmt.Println("转换json数据失败", err)
		return
	}	
	res.Header().Set("Content-Type", "application/json; charset=utf-8")
	res.Write(respData)
}

func main() {
	// 绑定回调
	http.HandleFunc("/user", UserHandler)
	http.HandleFunc("/home", HomeHandler)
	http.HandleFunc("/get_json", GetJsonHandler)
	http.HandleFunc("/get_struct_json", GetStructJson)
	// 监听并启动服务
	fmt.Println("Server is Running at http://127.0.0.1:9100")
	http.ListenAndServe(":9100", nil)
}
```

## HTTP客户端

```Go
package main

import (
	"fmt"
	"io"
	"net/http"
)

func main() {
	res, err := http.Get("http://127.0.0.1:9100/get_struct_json")
	if err != nil {
		fmt.Println("http.Get err", err)
		return
	}
	data, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println("read data err", err)
		return
	}
	// {"UserName":"张三","Age":22,"Like":["篮球","乒乓球","羽毛球"]}
	fmt.Println(string(data)) 
}
```

## HTTP常用状态码

```Go
http.StatusContinue     = 100
http.StatusOK           = 200
http.StatusMovedPermanently = 301
http.StatusFound        = 302
http.StatusBadRequest       = 400
http.StatusUnauthorized     = 401
http.StatusForbidden        = 403
http.StatusNotFound     = 404
http.StatusMethodNotAllowed = 405
http.StatusInternalServerError  = 500
http.StatusBadGateway  = 502
http.StatusGatewayTimeout = 504
```
