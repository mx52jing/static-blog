---
layout: doc
---

# HTTP请求方法
## GET

GET请求函数源码如下:

```Go
func Get(url string) (resp *Response, err error) {
	return DefaultClient.Get(url)
}
```

### 不带参数的get请求

> 例子：

```Go
func getNoParams() {
	response, err := http.Get(requestUrl + "/user/list")
	if err != nil {
		log.Printf("http Get 请求失败：%s", err)
		return
	}
	// 注意：一定要调用response.Body.Close()，否则会协程泄漏（同时引发内存泄漏）
	defer response.Body.Close()
	viewResponseInfo(response)
}
```

### 带query查询参数

直接将查询参数拼接到请求url后面即可

> 例子：

```Go
// 带参数的get 请求，参数直接拼接在url后面
func getWithParams() {
	response, err := http.Get(requestUrl + "/user/list?name=zhang&memory=256")
	if err != nil {
		log.Printf("http Get 请求失败：%s", err)
		return
	}
	// 注意：一定要调用response.Body.Close()，否则会协程泄漏（同时引发内存泄漏）
	defer response.Body.Close()
	viewResponseInfo(response)
}
```

## HEAD

HEAD 请求类似于GET，不过HEAD方法只能获取到`http response报文头部`，获取不到`response.body`，HEAD请求通常用来验证一个url是否存活

HEAD请求函数源码如下:
```Go
func Head(url string) (resp *Response, err error) {
	return DefaultClient.Head(url)
}
```
> 例子：

```Go
func headRequest() {
	response, err := http.Head(requestUrl + "/user/list")
	if err != nil {
		log.Printf("http Head 请求失败：%s", err)
		return
	}
	// 注意：一定要调用response.Body.Close()，否则会协程泄漏（同时引发内存泄漏）
	defer response.Body.Close()
	//状态码为200就说明url存活
	viewResponseInfo(response)
}
```

## POST

POST请求函数源码如下

```Go
func Post(url, contentType string, body io.Reader) (resp *Response, err error) {
	return DefaultClient.Post(url, contentType, body)
}
```

### 不带请求body的POST

```Go
// POST请求 无请求体 只有query
func postNoBodyRequest() {
	response, err := http.Post(requestUrl+"/user/add?name=li&age=2", "application/json", nil)
	if err != nil {
		log.Printf("http Post 请求失败：%s", err)
	}
	defer response.Body.Close()
	fmt.Println("response body")
	io.Copy(os.Stdout, response.Body) //两个io数据流的拷贝
	os.Stdout.WriteString("\n")
}
```

### 带请求body

```Go
type UserRequest struct {
	UserId string `json:"userId"`
	Token  string `json:"token"`
}
type UserResponse struct {
	UserName string `json:"userName"`
	Age      int    `json:"age"`
}

type ResponseData struct {
	Code int
	Msg  string
	Data UserResponse
}

// POST请求 有请求体 请求体类型为【字符串】 只有query
func postRequestWithBody() {
	requestData, _ := json.Marshal(&UserRequest{
		UserId: "dfjkgh893y4bhseg",
		Token:  "sdfmsdjbfshfvjkgf",
	})
	//request body是byte切片
	response, err := http.Post(requestUrl+"/user/add?name=li&age=2", "application/json", bytes.NewReader(requestData))
	if err != nil {
		log.Printf("http Post 请求失败：%s", err)
	}
	defer response.Body.Close()
	fmt.Printf("response Status：%s\n", response.Status)
	fmt.Printf("response StatusCode：%d\n", response.StatusCode)
	// 将response body流全部读取到byte切片中
	responseByte, err := io.ReadAll(response.Body) //两个io数据流的拷贝
	if err != nil {
		log.Printf("读取 reponse body 流失败：%s", err)
	}
	var responseData ResponseData
	json.Unmarshal(responseByte, &responseData)
	fmt.Printf("请求到的响应式为：%v\n", responseData)
}
```

### POST请求参数放到form中

```Go
// 接口传的值 通常是一个切片
func formRequest() {
	formRequestData := url.Values{
		"name": []string{"狄仁杰"},
		"age":  []string{"22"},
	}
	response, err := http.PostForm(requestUrl+"/user/edit", formRequestData)
	if err != nil {
		log.Printf("http Form 请求失败：%s", err)
		return
	}
	viewResponseInfo(response)
}
```

## 万能方法

通过`http.Client`发送请求是一种万能的方式，可以涵盖以上的所有方式，并且可以设置`Header`和`Cookie(以上方法不能设置)`

> 例子：

```Go
func createRequestByClient() {
	userData := &UserRequest{
		UserId: "987586",
		Token:  "98475_(ABC)+#@KJ",
	}
	userByte, err := json.Marshal(userData)
	if err != nil {
		log.Printf("json序列化失败：%s", err)
		return
	}
	requestByte := bytes.NewReader(userByte)
	// 构建request
	req, err := http.NewRequest("POST", requestUrl+"/user/add", requestByte)
	// 设置一些请求头
	req.Header.Add("Authorization", "Bearer dev")
	req.Header.Add("User-Agent", "Mozilla/5.0")
	req.Header.Add("Content-Type", "application/json")
	if err != nil {
		log.Printf("构建请求失败：%s", err)
		return
	}
	// 构造http client 这里可以配置一些请求设置
	httpClient := &http.Client{
		Timeout: 6000 * time.Second,
	}
	response, err := httpClient.Do(req)
	if err != nil {
		log.Printf("发送请求失败：%s", err)
		return
	}
	viewResponseInfo(response)
}
```

> 如果不需要设置Client的的一些选项，可以使用`http.defaultClient`

```Go
// 省略一些代码
response, err := http.DefaultClient.Do(req)
// 省略一些代码
```

## 其他

### 以上代码用到的公共方法

```Go
var requestUrl = "http://172.16.40.168:6527/api/v1"

func viewResponseInfo(response *http.Response) {
	fmt.Printf("response Proto：%s\n", response.Proto)
	fmt.Printf("response Status：%s\n", response.Status)
	fmt.Printf("response StatusCode：%d\n", response.StatusCode)
	fmt.Println("response header")
	// 遍历查看一下response Header 的内容
	for key, value := range response.Header {
		fmt.Printf("response Header中【%s】的值为 %v\n", key, value)
	}
	fmt.Println("response body")
	io.Copy(os.Stdout, response.Body) //两个io数据流的拷贝
	os.Stdout.WriteString("\n")
}
```

