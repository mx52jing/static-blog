---
layout: doc
---

# bind绑定器

- `gin`中的`bind`可以很方便的将前端传递来的数据与`结构体`进行`参数绑定`，以及`参数校验`

- 在使用这个功能的时候，需要给结构体加上`Tag`, 如：`json form uri xml yaml`

## 绑定器API

### ShouldBindJSON

```Go
type User struct {
	UserName string `json:"user_name" form:"user_name" uri:"user_name"`
	Age int `json:"age" form:"age" uri:"age"`
	Sex string `json:"sex" form:"sex" uri:"sex"`
}
```

- 绑定`JSON`数据

- 需要添加`tag` => `json`

```Go
func bodyBindHanlder(ctx *gin.Context) {
	var user User
	err := ctx.ShouldBindJSON(&user)
	if err != nil {
		fmt.Println("err", err)
		ctx.JSON(http.StatusOK, gin.H{ "code": -1, "message": "JSON绑定出错"})
		return
	}
	ctx.JSON(http.StatusOK, user)
}
func main() {
	// gin中的bind可以很方便的将 前端传递 来的数据与 结构体 进行 参数绑定 ，以及参数校验
	// 在使用这个功能的时候，需要给结构体加上Tag json form uri xml yaml
	// Must Bind
	router := gin.Default()
	router.POST("/body_bind", bodyBindHanlder)
	router.Run(":9100")
}
```

![ShouldBindJSON](/image/go/ShouldBindJSON.png)

### ShouldBindQuery

- 绑定`query`参数

- 需要添加`tag` => `form`

```Go
func queryBindHanlder(ctx *gin.Context) {
	var user User
	err := ctx.ShouldBindQuery(&user)
	if err != nil {
		fmt.Println("err", err)
		ctx.JSON(http.StatusOK, gin.H{ "code": -1, "message": "JSON绑定出错"})
		return
	}
	ctx.JSON(http.StatusOK, user)
}
func main() {
	router := gin.Default()
	router.GET("/query_bind", queryBindHanlder)
	router.Run(":9100")
}
```

![ShouldBindQuery](/image/go/ShouldBindQuery.png)

### ShouldBindUri

- 绑定`uri`中的`param`

- 需要添加`tag` => `uri`

```Go
func uriBindHanlder(ctx *gin.Context) {
	var user User
	err := ctx.ShouldBindUri(&user)
	if err != nil {
		fmt.Println("err", err)
		ctx.JSON(http.StatusOK, gin.H{ "code": -1, "message": "JSON绑定出错"})
		return
	}
	ctx.JSON(http.StatusOK, user)
}
func main() {
	router := gin.Default()
	router.GET("/uri_bind/:user_name/:age/:sex", uriBindHanlder)
	router.Run(":9100")
}
```

![ShouldBindUri](/image/go/ShouldBindUri.png)

### ShouldBind

- 可以绑定各种类型，内部根据`Content-Type`做了判断

```Go
func bindHanlder(ctx *gin.Context) {
	var user User
	err := ctx.ShouldBind(&user)
	if err != nil {
		fmt.Println("err", err)
		ctx.JSON(http.StatusOK, gin.H{ "code": -1, "message": "JSON绑定出错"})
		return
	}
	ctx.JSON(http.StatusOK, user)
}
func main() {
	router := gin.Default()
	router.POST("/bind", bindHanlder)
	router.Run(":9100")
}
```

![ShouldBind](/image/go/ShouldBind.png)
