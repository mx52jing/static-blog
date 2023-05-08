---
layout: doc
---

# time包

## 查看当前时间

```Go
func time.Now() time.Time
```

> 代码示例

```Go
// 获取当前时间
t := time.Now()
// 获取当前时间戳
curTimestamp := t.Unix()
fmt.Println("当前时间戳为", curTimestamp)
```

## 获取两个时间的间隔

```Go
func (time.Time).Sub(u time.Time) time.Duration
```

> 代码示例

```Go
// 获取当前时间
t := time.Now()
// 睡眠两秒
time.Sleep(2 * time.Second)
t2 := time.Now()
// 获取两个时间的间隔
timeInterval := t2.Sub(t)
// t2和t之前相差的时间按秒来看为: 2.001279042s
fmt.Println("t2和t之前相差的时间按秒来看为:", timeInterval)
// t2和t之前相差的时间按毫秒来看为: 2001
fmt.Println("t2和t之前相差的时间按毫秒来看为:", timeInterval.Milliseconds())
// t2和t之前相差的时间按纳秒来看为: 2001279
fmt.Println("t2和t之前相差的时间按纳秒来看为:", timeInterval.Microseconds())
```

## 计算两个时间相加

```Go
func (time.Time).Add(d time.Duration) time.Time
```

> 代码示例

```Go
// 计算时间的加法
duration := time.Duration(2 * time.Second)
t3 := time.Now()
fmt.Println("t3时间戳为", t3.Unix())
addRes := t3.Add(duration)
fmt.Println("t3+duration时间戳为", addRes.Unix())
```

## 时间格式化

`go`的时间格式化比较特别，定义了一套基础格式化模板，如下格式，从`01`-`07`分别表示`月`，`日`，`时`，`分`，`秒`，`年`，`时区`，

```Go
const (
	Layout      = "01/02 03:04:05PM '06 -0700" // The reference time, in numerical order.
)
```

- 年Year: `2006`表示`4位年份`、`06`表示`2位年份`，
- 月Month: 如`"Jan"`、 `"January"`， `01`表示`月份` "1"
- 周Day of the week: "Mon" "Monday"
- 月Day of the month: "2" "_2" "02"
- 天Day of the year: "__2" "002"
- 小时Hour: "15" "3" "03" (PM or AM)，`15`表示`24小时制`，`3`表示`12小时制`，`03`表示`12小时制（1位数字时需要补0）`
- 分钟Minute: "4" "04"
- 秒Second: "5" "05"
- AM/PM mark: "PM"

## Timer和Ticker

如果想在未来某个时刻执行某个任务，或者在某个时间间隔重复执行代码，可以使用`timer`/`tikcer`

### Timer

类似于`定时器(setTimeout)`

- 下面的例子使用`time.NewTimer(time)`创建一个计时器，`time`就是我们想让其等待多久类似于`time.Sleep(time)`

- 和`time.Sleep(time)`不一样的是，可以在计时器`触发之前取消`它，如`timer2`，本来需要`2s`后触发，我们手动取消了

```Go
func demo1() {
	timer1 := time.NewTimer(time.Second * 1)

	<-timer1.C
	fmt.Println("timer1 完成")

	timer2 := time.NewTimer(time.Second * 2)

	go func ()  {
		<- timer2.C
	}()
	isTimer2Stop := timer2.Stop()
	fmt.Println("timer2 stop", isTimer2Stop)
}

func main() {
	demo1()
}
```

### 计时器

类似于`setInterval`

- 下面的例子，在`done`被发送为`true`之前，会每`500毫秒`打印一次时间

```Go
func demo2() {
	ticker := time.NewTicker(500 * time.Millisecond)
	done := make(chan bool)

	go func ()  {
		for {
			select {
				case isDone := <- done:
					fmt.Println("完成了", isDone)
					return
				case t := <- ticker.C:
					fmt.Println("Tick at", t)
			}
		}
	}()
	timer := time.NewTimer(2000 * time.Millisecond)
	<- timer.C
	ticker.Stop()
	done <- true
	fmt.Println("========end==========")
}

func main() {
	demo2()
}
```
### 速率限制

- 模拟实现一个定时调度处理，每`200ms`处理一次值

- 通过源码可知`time.Tick(200 * time.Millisecond)`的返回值其实就是`time.NewTicker(200 * time.Millisecond).C`

```Go
func scheduledProcessing() {
	// 声明并初始化一个缓冲区为6的通道，并填充缓冲区，表示有6个任务需要处理
	processing := make(chan int, 6)
	for i := 0; i < 6; i++ {
		processing <- i
	}
	// 关闭通道
	close(processing)
	// 声明一个每200ms执行一次的调度器
	tick := time.NewTicker(200 * time.Millisecond)
	// 或者 tick1 := time.Tick(200 * time.Millisecond)
	// 遍历需要处理的任务
	for req := range processing {
		// 每200ms会发送一个time数据
		t := <- tick.C
		// 上面如果使用tick1 这里就是 t := <- tick1
		// 每200ms 会执行一次打印
		fmt.Println("处理了req, req为：", req, t)
	}
}

func main() {
   scheduledProcessing()
}
```

### 控制并发数量

```Go
func burstyLimter() {
	// 初始化一个能容纳3个缓冲的时间通道
	timeLimter := make(chan time.Time, 3)
	// 填充时间通道的缓冲区
	for i := 0; i < 3; i++ {
		timeLimter <- time.Now()
	}

	// 开启一个协程，每200ms向timLimter通道中发送一个time数据
	go func ()  {
		for t:= range time.Tick(200 * time.Millisecond) {
			timeLimter <- t
		}
	}()
	// 声明一个tasks任务通道，并向通道发送数据，填满缓冲区
	tasks := make(chan int, 6)
	for i := 0; i < 6; i++ {
		tasks <- i
	}
	// 关闭tasks通道
	close(tasks)
	for task := range tasks {
		t := <- timeLimter
		fmt.Println("执行task", task, "时间是: ", t)
	}
	// 前3次任务并发执行，后面的每200毫秒处理剩余请求
}

func main() {
	burstyLimter()
}
```
