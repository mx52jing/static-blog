---
layout: doc
---

# Context

## 概念

- `Context`本质上是一个接口

```Go
type Context interface {
    Deadline() (deadline time.Time, ok bool)
    Done() <-chan struct{}
    Err() error
    Value(key any) any
}
```

- `Done()`函数返回一个`只读管道`，且管道里不存放任何元素(`struct{}`)，用这个管道就是为了`实现阻塞`

- `Deadline()`用来`记录到期时间`，以及`是否到期`
- `Err()`用来记录`Done()`管道关闭的`原因`，比如可能是因为`超时`，也可能是因为被强行`Cancel`了
- `Value()`用来返回`存储的键值对`

## 新建`Context`

- 创建一个新的`context`可以使用`context.TODO`或者`context.Background`方法

> TODO/Background方法如下，这两个方法返回值一样

```Go
var (
	background = new(emptyCtx)
	todo       = new(emptyCtx)
)
func Background() Context {
	return background
}
func TODO() Context {
	return todo
}
```

> `emptyCtx`实现如下

```Go
type emptyCtx int

func (*emptyCtx) Deadline() (deadline time.Time, ok bool) {
	return
}

func (*emptyCtx) Done() <-chan struct{} {
	return nil
}

func (*emptyCtx) Err() error {
	return nil
}

func (*emptyCtx) Value(key any) any {
	return nil
}

func (e *emptyCtx) String() string {
	switch e {
	case background:
		return "context.Background"
	case todo:
		return "context.TODO"
	}
	return "unknown empty Context"
}
```

## WithTimeout

- 使用`context.Withtimeout`创建一个`context`，当超过`指定的时间`或者调用`cancel()`时会关闭`context.Done()`管道

- 超过设定的时长后会自动调用`context`的`Deadline`方法，调用`Deadline`方法会触发`Done`

```Go
func withTimeoutFn() {
	parentCtx := context.TODO()
	child, cancel := context.WithTimeout(parentCtx, 500 * time.Millisecond)
	defer cancel()
	select {
	case <-child.Done():
		err := child.Err()
		fmt.Printf("结束了，原因是%s", err)
	case <-time.After(300 * time.Millisecond):
		fmt.Println("超过300ms")
	}
}
// 超过300ms
```

> 上述代码由于设置了`Withtimeout`在`500ms`后才会超时，所以会打印`超过300ms`


```Go
func withTimeoutFn() {
	parentCtx := context.TODO()
	child, cancel := context.WithTimeout(parentCtx, 500 * time.Millisecond)
	defer cancel()
	select {
	case <-child.Done():
		err := child.Err()
		fmt.Printf("结束了，原因是%s", err)
	case <-time.After(600 * time.Millisecond):
		fmt.Println("超过600ms")
	}
}
// 结束了，原因是context deadline exceeded
```

> 上述代码会捕获到`context`的超时

### `Timeout`的继承问题

- 如果`父context`的超时时间为`500ms`，而`子context`的超时时间为`300ms`，那么这个`context`会在`300ms`的时候就触发超时结束

> 如下`父context`设置了`500ms`超时，中间睡眠了`300ms`，然后生成一个`子context`在`100ms`后超时，那么实际上这个`context`在`400ms`的时候就超时了

```Go
func timeoutInherit() {
	parentCtx, cancel1 := context.WithTimeout(context.TODO(), 500 * time.Millisecond) // 500ms 后会超时
	t0 := time.Now()
	defer cancel1()
	time.Sleep(300 * time.Millisecond) // 睡眠300ms
	childCtx, cancel2 := context.WithTimeout(parentCtx, 100 * time.Millisecond) // 100ms后会超时
	t1 := time.Now()
	defer cancel2()
	select {
	case <-parentCtx.Done():
		t2 := time.Now()
		err := parentCtx.Err()
		fmt.Printf("parentCtx超时，原因为：%v，parentCtx存留时间为%v, childCtx存留时间为%v", err, t2.Sub(t0), t2.Sub(t1))
	case <-childCtx.Done():
		t2 := time.Now()
		err := childCtx.Err()
		fmt.Printf("childCtx超时，原因为：%v，parentCtx存留时间为%v, childCtx存留时间为%v", err, t2.Sub(t0), t2.Sub(t1))
	}
}
// childCtx超时，原因为：context deadline exceeded，parentCtx存留时间为402.156625ms, childCtx存留时间为101.098041ms
```

## `WithCancel`

- 使用`context.WithCancel`创建一个`context`，调用`cancel()`时会关闭`context.Done()`管道

```Go
func withCancelFn() {
    parentCtx := context.Background()
    childCtx, cancel := context.WithCancel(parentCtx)
	go func ()  {
		time.Sleep(300 * time.Millisecond)
		cancel()
	}()
	select {
	case <-childCtx.Done():
		err := childCtx.Err()
		fmt.Printf("结束了，原因是%s", err)	
	case <-time.After(500 * time.Millisecond):
		fmt.Println("超过500ms")	
	}
}
// 结束了，原因是context canceled
```

## `WithValue`

- 可以使用`WithValue`向`context`中存储一些数据

```Go
func withValueFn() {
	parentCtx := context.TODO()
	childCtx := context.WithValue(parentCtx, "name", "南山")
	name := childCtx.Value("name")
	fmt.Printf("获取到的name为%s", name)
}
// 获取到的name为南山
```

- `context`中存储的数据具有继承性

> `childCtx`中存储的数据可以通过`child1Ctx`来获取

```Go
func addAge(ctx context.Context) context.Context {
	childCtx := context.WithValue(ctx, "age", 22)
	return childCtx
}

func addLike(ctx context.Context) context.Context {
	childCtx := context.WithValue(ctx, "like", []string{"篮球","乒乓球"})
	return childCtx;
}
func withValueInherit() {
	parentCtx := context.TODO()
	childCtx := context.WithValue(parentCtx, "name", "南山")
	child1Ctx := addAge(childCtx)
	fmt.Printf("child1的name为%s,age为%d\n", child1Ctx.Value("name"), child1Ctx.Value("age"))
	child2Ctx := addLike(child1Ctx)
	fmt.Printf("child2的name为%s,age为%d, like为%v\n", child2Ctx.Value("name"), child2Ctx.Value("age"),  child2Ctx.Value("like"))
}
/**
child1的name为南山,age为22
child2的name为南山,age为22, like为[篮球 乒乓球]
*/
```

