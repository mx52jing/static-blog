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

## 实战

> 实现功能：请求接口，解析接口数据，然后筛选出符合条件的数据，将数据写入`json`文件中

```Go
package main

import (
	"bufio"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
)

const requestUrl = "https://xxxxxxxxxx?mobileType=-1&mobileArea=-1&isLength=1&startTime=2024-06-10+00:00:00&endTime=2024-06-26+23:59:59&ecid=108683&msgtype=0&page=1&limit=100"

// 接口请求会来的数据结构
type ResponseData struct {
	Code int     `json:"code"`
	Msg  string  `json:"msg"`
	Data ResData `json:"data"`
}

type ResData struct {
	Records []Record `json:"records"`
}

type Record struct {
	UserID     string  `json:"userid"`
	Phone      string  `json:"phone"`
	MobileType int     `json:"mobileType"`
	MobileArea int     `json:"mobileArea"`
	IsLength   int     `json:"isLength"`
	ErrorCode  string  `json:"errorCode"`
	ErrorDesc  *string `json:"errorDesc"` // 使用指针以允许 null 值
	CustID     string  `json:"custid"`
	PtMsgID    string  `json:"ptmsgid"`
	SendTime   string  `json:"sendTime"`
	RecvTime   string  `json:"recvTime"`
	Message    string  `json:"message"`
	PkTotal    int     `json:"pktotal"`
	Strip      *string `json:"strip"` // 使用指针以允许 null 值
	WordNum    int     `json:"wordNum"`
	TotalWords int     `json:"totalwords"`
	MsgSrcIP   string  `json:"msgsrcip"`
}

func fetchSmsSendData() {
	req, err := http.NewRequest("GET", requestUrl, nil)
	// 设置需要的请求头
	req.Header.Add("Authorization", "Authorization")
	req.Header.Add("Cookie", "Cookie")
	if err != nil {
		log.Printf("构建请求失败：%s", err)
		return
	}
	res, err := http.DefaultClient.Do(req)
	log.Println("请求中.............")
	if err != nil {
		log.Printf("请求失败=> %s", err)
		return
	}
	log.Println("请求完成")
	body, err := io.ReadAll(res.Body)
	if err != nil {
		log.Printf("读取res.body失败=> %s", err)
		return
	}
	// 解析响应 并获得想要的数据
	var responseData ResponseData
	err = json.Unmarshal(body, &responseData)
	if err != nil {
		log.Printf("序列化res.body失败=> %s", err)
		return
	}
	records := responseData.Data.Records
	if len(records) == 0 {
		log.Printf("<<<<<<<<<<<<<没有符合的数据>>>>>>>>>>>>>")
		return
	}
	result := make([]Record, 0)
	for _, record := range records {
		if record.ErrorCode == "M2:0010" {
			result = append(result, record)
		}
	}
	log.Printf("<<<<<<<<<<<<<文件筛选完毕，准备写入文件>>>>>>>>>>>>>")
	// 将筛选出来的数组写入 json文件中
	writeDataToFile(result)
}

func writeDataToFile(data []Record) {
	// MarshalIndent 第二个参数表示 新的一行以什么开头 第三个参数表示开头后面跟着的缩进
	jsonByteData, err := json.MarshalIndent(data, "", "    ")
	if err != nil {
		log.Printf("data 转换byte失败%s\n", err)
		return
	}
	file, err := os.Create("records.json")
	if err != nil {
		log.Printf("创建records.json文件失败=> %s\n", err)
		return
	}
	defer file.Close()
	// 使用 bufio.Writer 提高写入效率
	writer := bufio.NewWriter(file)
	// 将 JSON 数据写入文件
	_, err = writer.Write(jsonByteData)
	if err != nil {
		log.Printf("文件写入失败%s\n", err)
		return
	}
	// 刷新 确保所有缓冲数据都写入文件
	writer.Flush()
	log.Printf("<<<<<<<<<<<<<文件写入完成>>>>>>>>>>>>>")
}

func main() {
	fetchSmsSendData()
}
```