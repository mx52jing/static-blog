---
layout: doc
---

# Test

在`Go`中，可以使用内置的测试框架来进行`单元测试`和`基准测试`，帮助开发者编写、运行和管理测试代码，以确保代码的质量和稳定性

## 单元测试

### 简单测试

`Go`中编写一个简单测试的流程：

1. 创建测试文件：测试文件应该与被测试的代码所在的文件放在`同一个包`中，测试文件需要以`_test.go`结尾 

> 例如：要测试名为foo文件中的函数，需要创建一个名为`foo_test.go`的文件

2. 编写测试函数：测试函数都要以`Test`开头，Test后面跟被测试函数的名称，参数是`t *testing.T`

> 例如：要测试名为`foo`的函数，可以创建一个名为`TestFoo`的测试函数，`func TestFoo(t *testing.T)`

3. 编写测试代码：测试函数中需要编写测试代码，用来验证被测试函数的行为是否符合预期。

> 测试代码中，应该使用`t.Error`或`t.Fail`等函数来报告测试失败结果

4. 运行测试代码：

> 在命令行中使用`go test`命令来运行测试，如果测试通过，将输出`PASS`，如果测试失败，将输出失败的测试用例的详细信息

#### 代码示例

代码目录结构

```shell
.test-related
├── foo.go
└── foo_test.go
```


```Go
// foo.go
package test_related

func foo(a, b int) int {
	return a + b
}
```

```Go
// foo_test.go
package test_related

import "testing"

func TestFoo(t *testing.T) {
	result := foo(1, 2)
	expect := 3
	if result != expect {
		t.Errorf("foo(1, 2) expect is %d, result is %d", expect, result)
	}
}
```
在`rest-related`目录下运行`go test`，输出如下

```Go
➜  test-related go test
PASS
ok  	github.com/mx52jing/go-basic/test-related	0.645s
```

`go test`还支持其他一些参数

- `-v`：输出测试详情；

- `-run`：指定要运行的测试函数，可以通过正则来匹配

```shell
# 测试当前目录下所有单元测试并输出测试详情
go test -v . 

# 测试当前目录下后缀名称为Foo的单元测试并输出测试详情
go test -run="Foo$" -v
```

在`test-relared`目录执行`go test -run="Foo$" -v`输出如下

```shell
➜  test-related go test -run="Foo$" -v

=== RUN   TestFoo
--- PASS: TestFoo (0.00s)
PASS
ok  	github.com/mx52jing/go-basic/test-related	3.067s
```

- `=== RUN`：表示运行的测试函数名称

- `--- PASS`：表示测试函数的结果为通过

### 子测试

- 子测试可以在一个测试函数中创建多个子测试，每个子测试都可以独立运行

- 在子测试中使用`t.Run`函数来创建子测试

```Go
// foo_test.go
package test_related

import "testing"

func TestFoo(t *testing.T) {
	t.Run("case 1", func(t *testing.T) {
		result := foo(1, 2)
		expect := 3
		if result != expect {
			t.Errorf("foo(1, 2) expect is %d, result is %d", expect, result)
		}
	})
	t.Run("case 2", func(t *testing.T) {
		result := foo(4, 2)
		expect := 8
		if result != expect {
			t.Errorf("foo(1, 2) expect is %d, result is %d", expect, result)
		}
	})
	t.Run("case 3", func(t *testing.T) {
		result := foo(8, 2)
		expect := 10
		if result != expect {
			t.Errorf("foo(1, 2) expect is %d, result is %d", expect, result)
		}
	})
}
```

在`test-relared`目录执行`go test -run="Foo$" -v`输出如下

```shell
➜  test-related go test -run="Foo$" -v
=== RUN   TestFoo
=== RUN   TestFoo/case_1
=== RUN   TestFoo/case_2
    foo_test.go:22: foo(1, 2) expect is 8, result is 6
=== RUN   TestFoo/case_3
--- FAIL: TestFoo (0.00s)
    --- PASS: TestFoo/case_1 (0.00s) # case1 通过
    --- FAIL: TestFoo/case_2 (0.00s) # case2 不通过 
    --- PASS: TestFoo/case_3 (0.00s) # case3 通过
FAIL
exit status 1
FAIL	github.com/mx52jing/go-basic/test-related	0.093s
```

### 表驱动测试

- 在`Go`中还可以使用`表格驱动测试`来测试`多组输入和输出`，减少重复代码

- 创建一个包含输入和预期输出的表格，然后使用`for range`循环遍历表格中的每一行并运行测试

```Go
package test_related

import "testing"

func TestFoo(t *testing.T) {
	type args struct {
		a int
		b int
	}
	type tableStruct = struct {
		name   string
		args   args
		expect int
	}
	tableData := []tableStruct{
		{
			name:   "case 1",
			args:   args{a: 1, b: 2},
			expect: 3,
		},
		{
			name:   "case 2",
			args:   args{a: 521, b: 520},
			expect: 1041,
		},
		{
			name:   "case 3",
			args:   args{a: 100, b: 200},
			expect: 100,
		},
	}
	for _, val := range tableData {
		t.Run(val.name, func(t *testing.T) {
			result := foo(val.args.a, val.args.b)
			expect := val.expect
			if result != expect {
				t.Errorf("foo(1, 2) expect is %d, result is %d", expect, result)
			}
		})
	}
}
```

在`test-relared`目录执行`go test -run="Foo$" -v`输出如下

```shell
➜  test-related go test -run="Foo$" -v
=== RUN   TestFoo
=== RUN   TestFoo/case_1
=== RUN   TestFoo/case_2
=== RUN   TestFoo/case_3
    foo_test.go:66: foo(1, 2) expect is 100, result is 300
--- FAIL: TestFoo (0.00s)
    --- PASS: TestFoo/case_1 (0.00s)
    --- PASS: TestFoo/case_2 (0.00s)
    --- FAIL: TestFoo/case_3 (0.00s)
FAIL
exit status 1
FAIL	github.com/mx52jing/go-basic/test-related	0.469s
```

### 测试覆盖率

- `Golang`工具链提供了内置的覆盖率分析工具，可以通过`go test -cover`命令来生成测试覆盖率报告

- 在覆盖率报告中，可以看到每个包、每个文件和每个函数的覆盖率信息


在`test-relared`目录执行`go test -run="Foo$" -v --cover`输出如下

```shell
➜  test-related go test -run="Foo$" -v --cover
=== RUN   TestFoo
=== RUN   TestFoo/case_1
=== RUN   TestFoo/case_2
=== RUN   TestFoo/case_3
    foo_test.go:66: foo(1, 2) expect is 100, result is 300
--- FAIL: TestFoo (0.00s)
    --- PASS: TestFoo/case_1 (0.00s)
    --- PASS: TestFoo/case_2 (0.00s)
    --- FAIL: TestFoo/case_3 (0.00s)
FAIL
coverage: 100.0% of statements // 测试覆盖率为100%
exit status 1
FAIL	github.com/mx52jing/go-basic/test-related	0.103s
```

:::tip 
除了通过命令行执行查看外，还可以使用`go test -coverprofile=xxx.out`参数来指定输出覆盖率分析结果的文件名，然后执行`go tool cover -html=xxx.out`命令打开浏览器来查看覆盖率报告
:::

```shell
# 生成测试覆盖率报告文件
go test -run="Foo$" -v -coverprofile=xxx.out
# 使用默认浏览器打开测试覆盖率报告
go tool cover -html=xxx.out
```

## 基准测试

- 基准测试实际上就是`性能测试`，它会把一个函数调用很多次(几千次甚至几万次)，来判断函数的速度、内存开销等

- 基准测试不负责验证代码逻辑是否正确
- 基准测试的文件名称也要以`_test.go`结尾
- 基准测试是通过`testing`包提供的`benchmark`功能实现的
- 基准测试函数名称要以`Benchmark`开头，在测试文件中，我们可以使用`func BenchmarkXXX(b *testing.B)`格式的函数来表示基准测试，其中`XXX`是被测试函数的名称，其中`b`是一个`*testing.B`类型的指针，用于控制测试的`次数`和`时间`等参数
- 基准测试要运行`go test -bench="xxx"`

```Go
// performance.go
package test_related

import (
	"encoding/json"
	"github.com/bytedance/sonic"
)

type Student struct {
	Name   string
	Age    uint8
	Gender string
}

type Class struct {
	Id       string
	Students []Student
}

var (
	s1 = Student{Name: "闪灵", Age: 26, Gender: "male"}
	s2 = Student{Name: "魔灵", Age: 28, Gender: "male"}
	s3 = Student{Name: "血灵", Age: 18, Gender: "female"}
	C1 = Class{
		Id:       "class_c1",
		Students: []Student{s1, s2, s3},
	}
)

func handleJsonByJsonLibrary() (Class, error) {
	marshal, _ := json.Marshal(C1)
	var jsonC2 Class
	json.Unmarshal(marshal, &jsonC2)
	return jsonC2, nil
}

func handleJsonBySonicLibrary() (Class, error) {
	marshal, _ := sonic.Marshal(C1)
	var sonicC2 Class
	sonic.Unmarshal(marshal, &sonicC2)
	return sonicC2, nil
}
```

```Go
// performance_test.go
package test_related

import "testing"

func BenchmarkHandleJsonByJsonLibrary(b *testing.B) {
	b.Run("Benchmark HandleJsonByJsonLibrary", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			handleJsonByJsonLibrary()
		}
	})
}

func BenchmarkHandleJsonBySonicLibrary(b *testing.B) {
	b.Run("Benchmark HandleJsonBySonicLibrary", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			handleJsonBySonicLibrary()
		}
	})
}
```

> 命令行中运行`go test -bench="Library$" -benchmem -v .`

```shell
➜  test-related go test -bench="Library$" -benchmem -v .
goos: darwin
goarch: arm64
pkg: github.com/mx52jing/go-basic/test-related
BenchmarkHandleJsonByJsonLibrary
BenchmarkHandleJsonByJsonLibrary/Benchmark_HandleJsonByJsonLibrary
BenchmarkHandleJsonByJsonLibrary/Benchmark_HandleJsonByJsonLibrary-8         	  485083	      2453 ns/op	     912 B/op	      23 allocs/op
BenchmarkHandleJsonBySonicLibrary
BenchmarkHandleJsonBySonicLibrary/Benchmark_HandleJsonBySonicLibrary
BenchmarkHandleJsonBySonicLibrary/Benchmark_HandleJsonBySonicLibrary-8       	  420487	      2796 ns/op	    2096 B/op	      31 allocs/op
PASS
ok  	github.com/mx52jing/go-basic/test-related	3.670s
```

- `goos: darwin`：表示当前操作系统
- `goarch: arm64`：表示本机CPU架构

- `BenchmarkHandleJsonByJsonLibrary/Benchmark_HandleJsonByJsonLibrary-8` ：BenchmarkHandleJsonByJsonLibrary代表运行的基准测试名称, `8`代表使用的核心数。

- `485083`：表示这个基准测试一共运行了485083次，也就是代码中的`b.N`

- `2453 ns/op`：表示每次运行消耗的时间为`2453ns`

- `912 B/op`：表示每次运行消耗的内存数为`912B`

- `23 allocs/op`：表示每次运行进行`23`次内存申请

### 常用的基准测试命令

- `go test -bench .`：运行当前目录下的所有基准测试，并输出测试结果

- `go test -bench=BenchmarkExample`：只运行名为BenchmarkExample的基准测试，并输出测试结果
- `go test -bench=BenchmarkExample -benchtime=8s`：运行名为BenchmarkExample的基准测试，测试时长为8秒，并输出测试结果
- `go test -bench=BenchmarkExample -cpu=8`：使用8个CPU核心运行名为BenchmarkExample的基准测试，并输出测试结果
- `go test -bench=BenchmarkExample -memprofile=mem.out`：运行名为BenchmarkExample的基准测试，并生成内存分配统计文件mem.out
- `go test -bench=BenchmarkExample -cpuprofile=cpu.out`：运行名为BenchmarkExample的基准测试，并生成CPU分析文件cpu.out
- `go test -bench=BenchmarkExample -benchmem`：运行名为BenchmarkExample的基准测试，并输出每次测试分配的内存和内存分配次数的平均值