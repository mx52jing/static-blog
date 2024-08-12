---
layout: doc
---

# Routing

> 前面写了一个生产者生产出一些日志消息，所有的消费者接收消息并打印出来这个例子
 
> 这种场景是`所有的接收者都能够接收到日志`，现在进一步扩展功能：

> 生产者发送日志消息后，每个消息由`对应的消费者`去接收，比如有专门处理`debug`消息的，有专门处理`error`消息的

## Binding

> 每个消息由`对应的消费者`去接收，在这里，`每个消息`和`对应的消费者`之间的关系可以通过`routing key`来关联

> 之前绑定的代码如下：

> 生产方`producer`代码

```Go
err = ch.PublishWithContext(
    ctx, // ctx
    "logsExchange", // exchange
    "", // routing key
    false,
    false,
    amqp.Publishing{
        DeliveryMode: amqp.Persistent,
        ContentType:  "text/plain",
        Body:         []byte(messageBody),
    },
)
```

> 消费方`consumer`代码

```Go
// bind exchange and queue
err = ch.QueueBind(
    queue.Name,     // queue
    "",             // routing key
    "logsExchange", // exchange
    false,          // no-wait
    nil,            // args
)
```
> 可以看到，上面的`routing key`都是空，因为前面的例子使用的是`fanout`交换机，它是直接忽略`routing key`字段的，在这个场景下就不适用了，要实现新加的功能，可以使用`direct`交换机


## Direct

> `direct`交换机的绑定规则在前面已经展示过了，`队列的binding key(其实也可以叫routing key)`要和`消息的routing key`一致

> 在生产者发送消息的代码、和绑定队列代码中需要加上`routing key`，如下

> 生产方`producer`代码

```Go
// xxx
err = ch.PublishWithContext(
    ctx,
    "directLogs",
    shared.GetLogSeverity(os.Args), // routing key 获取命令行发送的日志等级
    false,
    false,
    amqp.Publishing{
        ContentType: "text/plain",
        Body:        []byte(message),
    },
)
```
> 消费方`consumer`代码

```Go
// 绑定单个类型的log
err = ch.QueueBind(
    queue.Name,
    "info, // routing key
    "directLogs",
    false,
    nil,
)
// 绑定多个类型的log
for _, routingKey := range os.Args[1:] {
    fmt.Printf("Binding queue [%s] to exchange [%s] with routing key [%s]\n", queue.Name, "directLogs", routingKey)
    err = ch.QueueBind(
        queue.Name,
        routingKey, // routing key
        "directLogs",
        false,
        nil,
    )
    shared.FailOnError(err, "QueueBind error")
}
```

:::tip
- 在绑定交换机和队列时，可以支持`每个key绑定到对应的队列`，`一个key绑定到多个队列`、`不同的key绑定到同一个队列`
:::

![rabbitMQ-direct-binding](https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/RabbitMQ/rabbitMQ-direct-binding.png)

## 结合一起使用

> 最终实现的代码如下：

> `emit.go`

```Go
package main

import (
	"context"
	"fmt"
	amqp "github.com/rabbitmq/amqp091-go"
	"go-rabbitmq/shared"
	"os"
	"time"
)

func startUpAndEmit() {
	// create connection
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672")
	shared.FailOnError(err, "create connection error")
	defer conn.Close()
	// create channel
	ch, err := conn.Channel()
	shared.FailOnError(err, "create channel error")
	defer ch.Close()

	// declare exchange
	err = ch.ExchangeDeclare(
		"directLogs",
		"direct",
		true,
		false,
		false,
		false,
		nil,
	)
	shared.FailOnError(err, "declare exchange error")

	// publish message
	ctx, cancelFunc := context.WithTimeout(context.Background(), 6*time.Second)
	defer cancelFunc()

	// 获取运行文件时输入的文案，将该文案作为发送的message
	message := shared.BodyFrom(os.Args)
	err = ch.PublishWithContext(
		ctx,
		"directLogs",
		shared.GetLogSeverity(os.Args), // routing key 获取命令行发送的日志等级
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(message),
		},
	)
	shared.FailOnError(err, "publish message error")
	fmt.Printf("send message %s\n", message)
}

func main() {
	startUpAndEmit()
}
```

> `receive.go`

```Go
package main

import (
	"fmt"
	amqp "github.com/rabbitmq/amqp091-go"
	"go-rabbitmq/shared"
	"os"
)

func startUpAndReceive() {
	// create connection
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672")
	shared.FailOnError(err, "create connection error")
	defer conn.Close()
	// create channel
	ch, err := conn.Channel()
	shared.FailOnError(err, "create channel error")
	defer ch.Close()

	// declare exchange
	err = ch.ExchangeDeclare(
		"directLogs",
		"direct",
		true,
		false,
		false,
		false,
		nil,
	)
	shared.FailOnError(err, "declare exchange error")

	// queue declare
	queue, err := ch.QueueDeclare(
		"",
		false,
		false,
		true,
		false,
		nil,
	)
	shared.FailOnError(err, "declare queue error")
	// 绑定多个类型的log
	for _, routingKey := range os.Args[1:] {
		fmt.Printf("Binding queue [%s] to exchange [%s] with routing key [%s]\n", queue.Name, "directLogs", routingKey)
		err = ch.QueueBind(
			queue.Name,
			routingKey,
			"directLogs",
			false,
			nil,
		)
		shared.FailOnError(err, "QueueBind error")
	}

	messages, err := ch.Consume(
		queue.Name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	shared.FailOnError(err, "consume error")
	lockCh := make(chan struct{})
	go func() {
		for msg := range messages {
			fmt.Printf("接收到的消息为：%s\n", msg.Body)
		}
	}()
	fmt.Println("[*] Waiting for messages. To exit press CTRL+C")
	<-lockCh
}

func main() {
	startUpAndReceive()
}
```

> 其中用到的工具方法

```Go
package shared

import (
	"os"
	"strings"
)

// BodyFrom 从命令行输入中获取文案
func BodyFrom(args []string) string {
	if (len(args) < 3) || os.Args[2] == "" {
		return "Hello MQ"
	}
	return strings.Join(args[2:], ",")
}

// GetLogSeverity 从命令行参数中获取日志等级
func GetLogSeverity(args []string) string {
	if len(args) < 2 || os.Args[1] == "" {
		return "info"
	}
	return os.Args[1]
}
```

> 运行代码

1. 启动一个`receiver`，接收`error`类型的日志

```shell
go run routing/receive.go error
# 启动后打印如下
# Binding queue [amq.gen-vvC1tVWTQUgySj3gsr89Uw] to exchange [directLogs] with routing key [error]
# [*] Waiting for messages. To exit press CTRL+C
```
2. 再启动一个`receiver`，接收`debug`和`info`类型的日志

```shell
go run routing/receive.go debug info
# 启动后打印如下
# Binding queue [amq.gen-L8uh1c2N4O-f5V45jX7cTw] to exchange [directLogs] with routing key [debug]
# Binding queue [amq.gen-L8uh1c2N4O-f5V45jX7cTw] to exchange [directLogs] with routing key [info]
# [*] Waiting for messages. To exit press CTRL+C
```

3. 再启动一个`receiver`，接收`info`和`error`类型的日志

```shell
go run routing/receive.go info error
# 启动后打印如下
# Binding queue [amq.gen-4HurTGL1yIV8NUsIctEKkA] to exchange [directLogs] with routing key [info]
# Binding queue [amq.gen-4HurTGL1yIV8NUsIctEKkA] to exchange [directLogs] with routing key [error]
# [*] Waiting for messages. To exit press CTRL+C
```

4. 启动`producer`，指定输入类型(其实就是`routing key`)和发送的消息(`message`)

```shell
go run routing/emit.go error "what happened to you error"
go run routing/emit.go other "what happened to you other"
go run routing/emit.go info "what happened to you info"
go run routing/emit.go debug "what happened to you debug"
```

> 可以看到`receiver`的控制台只有`routing key`匹配的才会接收到消息并打印