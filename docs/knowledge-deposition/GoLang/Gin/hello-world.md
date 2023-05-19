---
layout: doc
---

# hello-world

- [Gin GitHub 地址](https://github.com/gin-gonic/gin)
- [Gin 官网](https://gin-gonic.com/)

## 项目初始化并启动

- 初始化
```shell
go mod init projectname

go mod init github.com/username/projectname
```

- 下载`gin`

```shell
go get -u github.com/gin-gonic/gin
```

- 新建`main.go`

```Go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)


func UserHandle(ctx *gin.Context) {
	ctx.String(http.StatusOK, "hello world")
} 

func main() {
	// 初始化路由
	router := gin.Default()
	router.GET("/user", UserHandle)
	// 启动http服务并监听
	router.Run(":9100")
}
```

- 访问`0.0.0.0:9100/user`或者`本机IP:9100/user`查看结果


