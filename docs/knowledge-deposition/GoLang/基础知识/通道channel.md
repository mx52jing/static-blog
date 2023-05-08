---
layout: doc
---

# 通道(channel)

- 通道可以理解为`Go`协程通信的管道

- 通道是`队列`式的数据结构，遵循`先入先出`的原则
- 每个通道都只能传递`一种数据类型`的数据，在声明`channel`的时候，需要`指定通道的类型`
- 通道的`零值`为`nil`

## 通道的声明和初始化

- 可以使用`var`关键字先声明一个`channel`，再使用`make`函数初始化

- 也可以直接使用`简短声明`和`make`来声明并初始化一个`channel`

格式如下:

```Go
// 第一种方式
var chan_name chan_type // 声明
channel_name = make(chan chan_type, [bufferSize]) // 初始化

// 第二种方式
// 声明并初始化
channel_name := make(chan chan_type, [bufferSize])
```

> 代码示例

```Go
func createChan() {
	// 声明一个string类型的通道，并未初始化
	var name chan string
	// 声明但并未初始化的chan的值为 <nil>
	fmt.Println("声明但并未初始化的chan的值为", name)
	// 初始化chan name
	name = make(chan string)
	// 初始化后的chan的值为 0x1400006a060
	fmt.Println("初始化后的chan的值为", name)

	// 声明并初始化一个chan
	age := make(chan int)
	// 声明并初始化一个chan，值为 0x1400006a0c0
	fmt.Println("声明并初始化一个chan，值为", age)
}

func main() {
	createChan()
}
```

## 使用通道发送和接收数据

- 往通道发送数据

```Go
channel_name <- data
```

- 从通道接收数据

```Go
// 直接发送出去数据
<- channel_name
// 或者 发送并赋值给某个变量
variable_name := <- channel_name
```

> 代码示例

```Go
func setChanValue(val chan string) {
	val <- "张环"
}

func sendAndReceiveData() {
	fmt.Println("start")
	str := make(chan string)
	go setChanValue(str)
	receiveValue := <- str
	fmt.Println("已经准备好接收数据了")
	fmt.Println("接收到通道的数据receiveValue为", receiveValue)
}

func main() {
	sendAndReceiveData()
	// 打印如下
	// start
	// 准备好接收数据了
	// 接收到通道的数据receiveValue为 张环
}
```

## 关闭通道

- 通道使用完毕后需要将其关闭，使用`close`方法来关闭通道

- 对于一个`已经关闭`的通道如果`再次关闭会导致报错`

:::tip
- 从通道`读取数据`返回的`第二个值`表示通道是否被关闭，如果`已经关闭`，返回值为`false`，如果还`未关闭`，返回值为`true`
:::

```Go
close(channel_name)
```

> 代码示例

```Go
func setChanValue(val chan string) {
	defer close(val)
	val <- "张环"
	val <- "李朗"
}

func sendAndReceiveData() {
	fmt.Println("start")
	str := make(chan string)
	go setChanValue(str)
	for {
		val, isClose := <- str
		if(!isClose) {
			fmt.Println("通道关闭")
			break
		}
		fmt.Println("从通道中获取的数据", val)
	}
}

func main() {
	sendAndReceiveData()
	// 打印如下
	// start
	// 从通道中获取的数据 张环
	// 从通道中获取的数据 李朗
	// 通道关闭
}
```

## 通道的容量和长度

- `make`函数接受两个参数，第一个参数是`通道的类型`，第二个参数`bufferSize`是`通道的缓冲区大小（可选）`

- `bufferSize`参数表示`通道的缓冲区大小`，它可以设置为`0`、`1`或`大于1的整数`，分别代表`不带缓冲区`、`带有一个缓冲区`和`带有多个缓冲区`的通道

- `bufferSize`为`0`：表示创建一个`无缓冲通道`。在无缓冲通道中，发送者和接收者必须`同时准备好`，否则会`造成阻塞`

- `bufferSize`为`1`：表示创建一个`带有一个缓冲区`的通道
  - 在带有`一个缓冲区`的通道中，发送者可以向通道中发送一个数据，而不会被阻塞，除非缓冲区已满。当`缓冲区已满`时，`发送者会被阻塞`，直到`有接收者接收数据`
  
  - 同样，当接收者从`带有一个缓冲区的通道`中`接收数据`时，如果`缓冲区为空`，`接收者会被阻塞`，直到有`发送者发送数据`

- `bufferSize`大于`1`：表示创建一个`带有多个缓冲区`的通道
  - 在带有`多个缓冲区`的通道中，缓冲区可以`存储多个数据`，发送者可以一次性向通道中发送多个数据，直到缓冲区已满。当`缓冲区已满`时，`发送者会被阻塞`，直到`有接收者接收数据`

  - 同样，当接收者从`带有多个缓冲区的通道`中`接收数据`时，如果`缓冲区为空`，`接收者会被阻塞`，直到`有发送者发送数据`

```Go
func chanLenCap() {
	str := make(chan string, 3)
	fmt.Println("初始化后：")
	fmt.Println("str的len", len(str))
	fmt.Println("str的cap", cap(str))
	str <- "张环"
	fmt.Println("放入一个数据后：")
	fmt.Println("str的len", len(str))
	fmt.Println("str的cap", cap(str))
	str <- "李朗"
	fmt.Println("放两个数据后：")
	fmt.Println("str的len", len(str))
	fmt.Println("str的cap", cap(str))
	<- str
	fmt.Println("取出一个数据后：")
	fmt.Println("str的len", len(str))
	fmt.Println("str的cap", cap(str))	
}

func main() {
	chanLenCap()
	// 初始化后：
	// str的len 0
	// str的cap 3
	// 放入一个数据后：
	// str的len 1
	// str的cap 3
	// 放两个数据后：
	// str的len 2
	// str的cap 3
	// 取出一个数据后：
	// str的len 1
	// str的cap 3
}
```
## 单向通道

- 上面的通道都是`双向通道`，既可以`发送数据`也可以`接收数据`

- 单向通道只能`发送`或者`接收`数据，具体细分为`只读通道`和`只写通道`

### 只读通道

- `<-chan`表示只读通道

### 只写通道

- `chan<-`表示只写通道

:::warning
- 根据`Go`语言的语法规范，`只读通道类型`和`只写通道类型`在`定义时是无法直接使用make()`函数来创建通道`的
- `只读通道`和`只写通道`都是`基于普通的双向通道类型创建`的，并`在使用时通过类型转换来限制其操作的权限`。
:::

> 示例

```Go
func oneWayChannel() {
	// 定义可读通道
	// 这种定义方法也可以
	// type ReaderChan <-chan string
	type ReaderChan = <-chan string
	// 定义可写通道
	// 这种定义方法也可以
	// type WriterChan chan<- string
	type WriterChan = chan<- string

	// 声明并初始化一个双向通道
	bothChan := make(chan string)

	go func(){
		// 只写通道
		// 这种定义方法也可以
		// var writerChan WriterChan = bothChan 
		writerChan := WriterChan(bothChan)
		fmt.Println("准备写入数据")
		writerChan <- "张环、李朗"
	}()
	go func(){
		// 只读通道
		// 这种定义方法也可以
		// var readerChan ReaderChan = bothChan 
		readerChan := ReaderChan(bothChan)
		fmt.Println("准备读取数据")
		msg := <- readerChan
		fmt.Println("读取到的数据为", msg)
	}()
	time.Sleep(time.Second * 1)
	fmt.Println("===================")
}

func main() {
	oneWayChannel()
	// 打印如下
	// 准备写入数据
	// 准备读取数据
	// 读取到的数据为 张环、李朗
	// ===================
}
```

## 遍历通道

- 通道需要在遍历时`被关闭`，否则将会一直`阻塞`

- 可以使用`for range`来遍历通道

> 示例

```Go
func traverseChannel() {
	ch := make(chan int)
	// 生产者，向通道中发送数据
	go func() {
		for i := 1; i < 7; i++ {
			ch <- i
		}
		close(ch) // 关闭通道
	}()
	// 消费者，从通道中接收数据
	for num := range ch {
		fmt.Println("接收到的数据为=>", num)
	}
}

func main() {
	traverseChannel()
	// 打印如下:
	// 接收到的数据为=> 1
	// 接收到的数据为=> 2
	// 接收到的数据为=> 3
	// 接收到的数据为=> 4
	// 接收到的数据为=> 5
	// 接收到的数据为=> 6
}
```

## 用通道做锁

- 当通道容量为`1`时，说明通道`只能缓存一个数据`，若通道中`已有一个数据`，此时再往里发送数据，会造成`程序阻塞`

> 示例

```Go
func increment(num chan string, idx *int) {
	num <- "蛇灵"
	*idx += 1
	<- num
}

// 使用容量为 1 的通道可以达到锁的效果
func useChannelLock() {
	num := make(chan string, 1)
	idx := 0
	fmt.Println("------start------")
	for i := 0; i < 100000; i++ {
		go increment(num, &idx)
	}
	time.Sleep(time.Second)
	fmt.Println("idx值为", idx)
	fmt.Println("------end------")
}

func main() {
	useChannelLock()
	// 打印如下
	// ------start------
	// idx值为 100000
	// ------end------
}
```

## 死锁

```Go
fatal error: all goroutines are asleep - deadlock!
```

`Go`中，以下情况可能会导致通道死锁：

- `发送`或`接收`操作`阻塞`，没有足够的`goroutine`来处理

```Go
func main() {
	ch := make(chan int)
	// 没有足够的 goroutine 来接收数据，发送操作将阻塞
	ch <- 1
}
```

- 通道的`缓冲区已满`，发送操作阻塞，但没有对应的接收操作

```Go
func main() {
	ch := make(chan int, 1)
	ch <- 1 
	ch <- 2 // 缓冲区已满，发送操作阻塞
}
```

- 通道为`空`，接收操作阻塞，但没有对应的发送操作

```Go
func main() {
	ch := make(chan int)
	<-ch // 通道为空，接收操作阻塞
}
```

## WaitGroup

- `WaitGroup`是`Go`语言标准库`sync`包中提供的一种并发同步机制，用于等待一组`goroutine`完成任务。`WaitGroup`可以帮助我们在`主goroutine`中等待`其他子goroutine`执行完毕，再继续执行后续的代码，从而保证所有的`goroutine`都完成了任务再退出程序

- `WaitGroup`的主要作用是： 
  - 统计并等待一组`goroutine`完成任务。
  - 防止`主goroutine`提前退出，确保其他`子goroutine`完成任务后再退出
- `WaitGroup`提供了三个方法： 
  - `Add(delta int)`：增加计数器的值，`delta`为`正数`时表示`添加delta个等待任务`，为`负数`时表示`减少delta个等待任务`
  - `Done()`：减少计数器的值，等价于`Add(-1)`，通常使用`defer`来调用
  - `Wait()`：阻塞调用的`goroutine`，直到计数器的值变为`0`

:::warning
如果`WaitGroup显式传递到`函数`中，则应使用`指针`
:::

```Go
func task(id int, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Printf("执行第%d条任务\n", id)
}

func main() {
	var wg sync.WaitGroup
	wg.Add(6)
	// 启动六个子 goroutine
	go task(1, &wg)
	go task(2, &wg)
	go task(3, &wg)
	go task(4, &wg)
	go task(5, &wg)
	go task(6, &wg)
	// 等待所有子 goroutine 完成
	wg.Wait()
	// 所有子 goroutine 完成后，执行后续操作
	fmt.Println("所有子goroutine已完成任务，可以继续执行后续操作")
}
```
