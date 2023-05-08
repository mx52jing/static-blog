---
layout: doc
---

# RPC

`Go`程序可以通过`net/rpc`包相互通讯，所以这是另一个`客户端-服务器端`模式的应用。它提供了通过网络连接进行函数调用的便捷方法。


## Server端

- 创建一个用于计算的结构体对象`Server`，并且将它通过`rpc.Register(object)`注册，

- 调用`rpc.HandleHTTP`方法
- 调用`net.Listen`方法开启监听
- 调用`http.Serve`启动服务

```Go
package main

import (
	"fmt"
	"net"
	"net/http"
	"net/rpc"
)

type Server struct {}

type Args struct {
	M, N int
}

func (s *Server) Sum(args *Args, reply *int) error {
	*reply = args.M + args.N
	return nil
}

// 创建一个用于计算的对象Server，并且将它通过 rpc.Register(object) 注册，
// 调用 rpc.HandleHTTP方法
// 调用`net.Listen`方法监听
// 调用`http.Serve`启动服务

func createServer() {
	calc := new(Server)
	rpc.Register(calc)
	rpc.HandleHTTP()
	listen, err := net.Listen("tcp", ":9100")
	if err != nil {
		fmt.Println("listen err", err)
		return
	}
	http.Serve(listen, nil)
}


func main() {
	createServer()
}
```

## 客户端

- 调用`rpc.DialHTTP`创建连接的客户端

- 使用`client.Call("Type. Method", args...)`调用`远程的方法`
  - `Type`与`Method`是调用的远程服务器端被定义的类型和方法，在这个例子中，需要调用的是`Server.Sum`

```Go
package main

import (
	"fmt"
	"net/rpc"
)

type Args struct {
	M, N int
}

func main() {
	client, err := rpc.DialHTTP("tcp", ":9100")
	if err != nil {
		fmt.Println("rpc.DialHTTP err", err)
		return
	}
	args := Args {10, 20}
	var res int
	client.Call("Server.Sum", &args, &res)
	fmt.Println(res, "计算后的值")
}
```
