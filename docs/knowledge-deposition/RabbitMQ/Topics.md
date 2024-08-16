---
layout: doc
---

# Topics

> 之前的代码中，使用`Direct`交换机精准处理某个类型的日志

> 现在在扩展一下这个功能，比如之前通过日志等级来决定是否处理，现在再加一个条件，某个消费者只处理从`某个地方(比如bin)`发出的`info级别`的日志，这里面要匹配两个条件，一是`日志的发生地点为bin`，而且`日志级别要是info`
 
> 要符合上面要求的话，使用`Direct`交换机就实现不不了了，那么就要使用`Topic`交换机来实现

## `Topic`交换机

> `Topic`交换机背后的逻辑类似于`Direct`交换机，通过`routing key`来匹配要将消息发送给哪个队列，匹配时有两种特殊情况：

- `*`：正好能够`匹配一个单词`

- `#`：可以匹配`0个或多个单词`

> 如下图：

![rabbitMQ-exchange-topic](https://raw.githubusercontent.com/mx52jing/image-hosting/main/images/RabbitMQ/rabbitMQ-exchange-topic.png)


- 如果此时`routing key`是`quick.orange.rabbit`，那么此时消息会被传递到`Q1`、`Q2`两个队列

- 如果此时`routing key`是`lazy.orange.elephant`，那么此时消息会被传递到`Q1`、`Q2`两个队列
- 如果此时`routing key`是`quick.orange.fox`，那么此时消息仅会被传递到`Q1`队列
- 如果此时`routing key`是`lazy.brown.fox`，那么此时消息会仅会被传递到`Q2`队列
- 如果此时`routing key`是`lazy.pink.rabbit`，那么此时消息会仅会被传递到`Q2`队列，而且只会`传递一次`，虽然`*.*.rabbit`和`lazt.#`两个规则都匹配到`Q2`，也只传递到`Q2`一次
- 如果此时`routing key`是`quick.brown.fox`，因为此时`Q1`、`Q2`都不匹配，所以此时消息不会被传递到任何一个队列

:::tip
- `Topic`交换机可以表现出和其他交换一样的行为

- 在`Topic`交换机中，当使用`#`来作为`routing key`，那么它将会接收所有的消息，和`Fanout`交换机行为一致
- 在`Topic`交换机中，当特殊字符`*`和`#`未在绑定中使用时，那么它的表现将会和`Direct`交换机一样
:::


## 代码案例

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
	exchangeName := "topicLogs"
	// declare exchange
	err = ch.ExchangeDeclare(
		exchangeName,
		"topic",
		true,
		false,
		false,
		false,
		nil,
	)
	shared.FailOnError(err, "declare exchange error")

	// declare queue
	queue, err := ch.QueueDeclare(
		"",
		false,
		false,
		true,
		false,
		nil,
	)
	shared.FailOnError(err, "declare queue error")

	if len(os.Args) < 2 {
		fmt.Printf("Usage: %s [binding_key]...", os.Args[0])
		os.Exit(1)
	}
	// bind queue and exchange
	for _, routingKey := range os.Args[1:] {
		fmt.Printf("Binding queue [%s] to exchange [%s] with routing key [%s]\n", queue.Name, "topicLogs", routingKey)
		err = ch.QueueBind(
			queue.Name,
			routingKey,
			"topicLogs",
			false,
			nil,
		)
		shared.FailOnError(err, "bind queue error")
	}

	// consume message
	messages, err := ch.Consume(
		queue.Name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	shared.FailOnError(err, "consume message error")

	lockChan := make(chan struct{})
	go func() {
		for delivery := range messages {
			fmt.Printf("Receive message %s\n", delivery.Body)
		}
	}()
	<-lockChan
}

func main() {
	startUpAndReceive()
}
```

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
	exchangeName := "topicLogs"
	// declare exchange
	err = ch.ExchangeDeclare(
		exchangeName,
		"topic",
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
	message := shared.BodyFrom(os.Args)

	err = ch.PublishWithContext(
		ctx,
		exchangeName,
		shared.GetLogSeverity(os.Args),
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(message),
		},
	)
	shared.FailOnError(err, "publish message error")
	fmt.Printf("Successful Send message [%s]\n", message)
}

func main() {
	startUpAndEmit()
}
```

> 运行代码

1. 启动第一个`receive.go`，称之为`Q1`

```shell
go run topics/receive.go "*.*.rabbit" "lazy.#"
# Binding queue [amq.gen-FesQOFM2vxs9rSbf8X4bDA] to exchange [topicLogs] with routing key [*.*.rabbit]
# Binding queue [amq.gen-FesQOFM2vxs9rSbf8X4bDA] to exchange [topicLogs] with routing key [lazy.#]
```

2. 启动第二个`receive.go`，称之为`Q2`

```shell
go run topics/receive.go "#"
# Binding queue [amq.gen-A-k6dZNWLLu_ECKzetmjbg] to exchange [topicLogs] with routing key [#]
```
3. 启动第三个`receive.go`，称之为`Q3`

```shell
go run topics/receive.go "aaa"
# Binding queue [amq.gen-qvNPx8QUU102E-RodSHUyA] to exchange [topicLogs] with routing key [aaa]
```
4. 启动`emit.go`，发送消息

```shell
# 消息传递给Q2
go run topics/emit.go "quick.brown.fox" "fox is coming"
# 消息传递给Q1、Q2
go run topics/emit.go "quick.brown.rabbit" "rabbit is coming"
# 消息传递给Q2、Q3
go run topics/emit.go "aaa" "behavior is similar to direct exchange"
# 消息传递给Q1，Q2，并且只传递给Q1一次
go run topics/emit.go "lazy.blue.rabbit" "blue rabbit is coming"
# 消息传递给Q2
go run topics/emit.go "smart.block.sheep" "sheep rabbit is coming"
```

