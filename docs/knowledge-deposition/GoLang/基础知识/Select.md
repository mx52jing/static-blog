---
layout: doc
---

# Select

- `select`语句用在`多个发送/接收通道`操作中进行选择
  - `select`语句会一直`阻塞`，直到`发送/接收`操作准备就绪
  - 如果有多个通道操作准备完毕， `select`会`随机`地选取其中之一执行
- `select`里的`case`表达式`只能对通道进行操作`，不管是往通道`写入数据`，还是从通道`读出数据`

> 语法如下

```Go
select {
  case expression1:
    ...
  case expression2:
    ...
  default:
    ...
}
```

> 示例代码

```Go
func demo1() {
	ch1 := make(chan string, 1)
	ch2 := make(chan string, 1)
	ch3 := make(chan string, 1)
	ch1 <- "张环"
	ch2 <- "李朗"
	ch3 <- "沈韬"
	select {
	case msg1 := <- ch1:
		fmt.Println("从ch1收到数据", msg1)
	case msg2 := <- ch2:
		fmt.Println("从ch2收到数据", msg2)
	case msg3 := <- ch3:
		fmt.Println("从ch3收到数据", msg3)
	default:
		fmt.Println("not receive data")
	}
}

func main() {
	demo1()
}
```

上面的代码有可能会执行全部的表达式，只要`其中一个通道接收到数据`，那么就会执行对应的`case`代码，然后`退出`

## select应用

当`select`中的任务执行时间不同时，`select`会等待通道中的任务响应，会执行`最快响应`的任务分支，忽略其他响应

```Go

func task1(ch chan string) {
	time.Sleep(time.Microsecond * 2)
	ch <- "张环"
}	

func task2(ch chan string) {
	time.Sleep(time.Microsecond * 3)
	ch <- "李朗"
}	
func task3(ch chan string) {
	time.Sleep(time.Microsecond * 1)
	ch <- "沈韬"
}	
func demo2() {
	ch1 := make(chan string, 1)
	ch2 := make(chan string, 1)
	ch3 := make(chan string, 1)
	go task1(ch1)
	go task2(ch2)
	go task3(ch3)
	select {
		case str1 := <- ch1:
			fmt.Println("ch1 received", str1)
		case str2 := <- ch2:
			fmt.Println("ch2 received", str2)
		case str3 := <- ch3:
			fmt.Println("ch3 received", str3)
	}
}

func main() {
	demo2() // ch3 received 沈韬
}
```

> 上面代码没有加`default`分支，因为如果有了默认分支，还未从通道获取到数据时，就直接走了`default`分支，而不是被阻塞

## 死锁

下面的情况都会造成死锁
- `select`阻塞后，一直没有命中其中的一个`case`

- 使用`空select`


```Go
func demo3() {
	ch1 := make(chan string, 1)
	ch2 := make(chan string, 1)
	ch3 := make(chan string, 1)
	// ch1 <- "张环"
	// ch2 <- "李朗"
	// ch3 <- "沈韬"
	select {
	case msg1 := <- ch1:
		fmt.Println("从ch1收到数据", msg1)
	case msg2 := <- ch2:
		fmt.Println("从ch2收到数据", msg2)
	case msg3 := <- ch3:
		fmt.Println("从ch3收到数据", msg3)
	// default:
	// 	fmt.Println("not receive data")
	}
}


func main() {
	demo3()
	// fatal error: all goroutines are asleep - deadlock!
}
```

> 将`demo1`函数中向通道发送数据的操作去掉，并去掉`default`分支，`select`一没有命中的`case`，就会造成死锁


```Go
func emptySelect() {
	select {

	}
}

func main() {
	emptySelect()
	// 空select会造成死锁
	// fatal error: all goroutines are asleep - deadlock!
}
```
## `select`超时处理

当`case`里面的通道始终未收到数据，而且也没有`default`语句时，`select`会一直阻塞，会造成`死锁`，可以设置一个超时来避免

> 示例

```Go
func makeTimeout(ch chan int) {
	time.Sleep(time.Microsecond)
	ch <- 1
}

func testTimeout() {
	ch1 := make(chan string, 1)
	ch2 := make(chan string, 1)
	ch3 := make(chan string, 1)
	timeoutChan := make(chan int)
	go makeTimeout(timeoutChan)
	select {
	case msg1 := <- ch1:
		fmt.Println("从ch1收到数据", msg1)
	case msg2 := <- ch2:
		fmt.Println("从ch2收到数据", msg2)
	case msg3 := <- ch3:
		fmt.Println("从ch3收到数据", msg3)
	case <- timeoutChan:
		fmt.Println("超时")
	}
}

func main() {
	testTimeout() // 超时
}
```
上面的例子中，由于一直没有向通道中发送数据，所以也接收不到数据，会走超时处理

> 另外一个例子

```Go
func delay(ch chan<- string) {
	time.Sleep(time.Second * 2)
	ch <- "张环"
}

func testTimeout1() {
	ch := make(chan string)
	go delay(ch)
	select {
		case msg := <-ch:
			fmt.Println("msg接收到的数据", msg)
		case <-time.After(1 * time.Second):
			fmt.Println("超时处理了")
	}
}

func main() {
	testTimeout1() // 超时处理了
}
```

上面的例子，由于超时时间设置的`1s`，但是`2s`后才像通道中发送数据，所以会走超时处理
