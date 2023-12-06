---
layout: doc
---

# 集成Swagger

通过在代码中添加符合swagger规范的注解，可以自动生成文档

## 依赖安装和初始化

### 安装Swagger

```shell
go get github.com/swaggo/swag/cmd/swag
# 生成可执行文件
go install github.com/swaggo/swag/cmd/swag@latest
```

查看swagger版本

```shell
swag -v
```

(Mac)如果运行`swag -v`以下错误，说明`GOPATH`未添加到环境变量中

```shell
zsh: command not found: swag
```

需要手动添加环境变量

```shell
# 进入zsh配置
nvim ~/.zshrc
# 添加如下行
export PATH="$GO_PATH/bin:$PATH"
```

> 如上：`$GO_PATH`就是你的`go`安装目录，可根据自己机器的路径来定，可使用`go env`查看`GOPATH`的值，比如我的是`export PATH="$HOME/go/bin:$PATH"`


### 安装gin-swagger扩展

```shell
go get -u github.com/swaggo/gin-swagger
go get -u github.com/swaggo/files
```

### 在Go项目的`根目录`初始化`Swagger`

```shell
swag init
```
例如项目根目录为`go-project-name`，运行上面命令后，Swagger会生成`~/xxx/go-project-name/doc`目录，该目录下有三个文件`docs.go`、`swagger.json`、`swagger.yaml`


> 还可以使用`swag fmt`命令来格式化swagger注释格式

```shell
swag fmt
# 或者 目录可以是其他目录 不一定一定是swagger名称目录
swag fmt xxx/swagger/
```

## gin-swagger注解

- 更多详细注解可点击[swaggo.github.io/swaggo.io](https://swaggo.github.io/swaggo.io/declarative_comments_format/)、[github.com/swaggo/swag](https://github.com/swaggo/swag#declarative-comments-format)查看

:::warning
- `注解`和`函数`之间不能有空行，否则swagger将不会展示接口文档

> 错误写法
```Go
// @Summary 

func xx() {} 
```

> 正确写法
```Go
// @Summary 
func xx() {} 
```
- 如果本地接口文档有更新，只需在项目根目录下再次执行`swag init`，然后重启服务即可
  :::

### 全局注解
------
#### @Title

当前API文档的标题

#### @Version

当前API文档版本

#### @Description

当前API文档详细描述

#### BasePath

当前API的公共路径前缀

### API层面注解
------

#### @Tags

表示当前API的分类标签，比如属于`user`模块

#### @Summary

表示某API接口的摘要

#### @Produce

表示API可以产生的`MIME类型`，可以理解为接口响应类型，可以是`json`、`xml`、`html`等类型

#### @Param

表示参数格式，从左到右依次是`参数名`、`参数类型`、`数据类型`、`是否必填`、`注释`

参数类型有：

- `header`

- `body`：POST请求参数
- `query`：GET请求参数
- `path`：RESTFUL风格的参数，例如`/user/:id/`

#### @Success

响应成功状态，从左到右依次是`状态码`、`参数类型`、`数据类型`、`注释`

#### @Failure

响应失败状态，从左到右依次是`状态码`、`参数类型`、`数据类型`、`注释`

#### @Router

路由，从左到右依次是`路由地址`、`HTTP请求方法`


## 代码示例

有几点需要注意

:::tip
- 必须引入通过`swag init`生成的swagger的`docs`模块

- 路由中必须添加`GET("/swagger/*any", xxx)`路由
- 有接口更改/添加时需要执行`swag init`后，重启服务才能生效
:::

`main.go`

```Go
package main

import (
	"gin-related/9-swagger/api"
	_ "gin-related/9-swagger/docs" // 这个docs文件模块必须要引入
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	router := gin.Default()
	// 下面这个必须要有
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.POST("/user/add", api.AddUser)
	router.Run(":6100")
}
```

`api/user.go`

```Go
package api

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type User struct {
	UserName string `json:"user_name" binding:"required"`
	Age      uint8  `json:"age" binding:"required,gte=18"`
	Gender   string `json:"gender" binding:"required,oneof=male female"`
}

type Response struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

// @Summary	添加新用户
// @Produce	json
// @Param		user	body		User		true	"用户信息数据"
// @Success	200		{object}	Response	"接口响应成功"
// @Failure	500		{object}	Response	"接口响应失败"
// @Router		/user/add [POST]
func AddUser(ctx *gin.Context) {
	var user User
	err := ctx.ShouldBindJSON(&user)
	if err != nil {
		log.Printf("参数错误：%s", err)
		ctx.JSON(http.StatusOK, &Response{
			Code: -1,
			Msg:  "参数错误，请检查后再提交",
			Data: nil,
		})
		return
	}
	ctx.JSON(http.StatusOK, &Response{
		Code: 0,
		Msg:  "success",
		Data: user,
	})
}
```