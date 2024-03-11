---
layout: doc
---

# zap使用

`zap`是`Uber`开发的一款高性能、结构化日志库，以其极低的内存分配和CPU消耗而著称

> 下载依赖

```shell
go get -u go.uber.org/zap
```

## 日志记录器

zap提供了两种日志记录器：`Logger`和`SugaredLogger`，它们在`性能`和`易用性`方面有所不同

- `*zap.Logger`：提供了更为结构化且性能更高的日志记录。它使用强类型的API，在编译时就能获得类型安全检测，但是使用起来稍微复杂一些。它非常适合需要高性能和强类型的场景。使用`*zap.Logger`时，需要明确日志字段的类型

```Go
logger.Info("failed to fetch URL",
    zap.String("url", url),
    zap.Int("attempt", 3),
    zap.Duration("backoff", time.Second),
)
```

- `*zap.SugaredLogger`：提供了一个更为灵活且使用起来更简单的API，牺牲了一些性能来换取易用性。可以使用`printf`风格的格式记录日志，这对于简单的日志记录需求来说更加方便快捷。使用`*zap.SugaredLogger`时，可以像使用标准库的`log.Printf`那样记录日志

```Go
sugaredLogger.Infof("failed to fetch URL: %s", url)
```
:::tip
- 我们可以从`*zap.Logger`通过调用`.Sugar()`方法获得一个`*zap.SugaredLogger`

- 反之，通过调用`*zap.SugaredLogger`的`.Desugar()`方法可以获取`*zap.Logger`
- 可以根据具体的日志记录需求在这两种日志记录器之间灵活转换
:::


## 基础用法

`global/global.go`


```Go
package global

import "go.uber.org/zap"

var (
	Logger      *zap.Logger
	SugarLogger *zap.SugaredLogger
)
```

`1.base.go`

```Go
func intLoggerConfig() {
	logger, _ := zap.NewProduction()
	global.Logger = logger
}

func initSugarLogger() {
	logger, _ := zap.NewProduction()
	global.SugarLogger = logger.Sugar()
}

func reqGetLog(url string) {
	resp, err := http.Get(url)
	defer resp.Body.Close()
	if err != nil {
		global.Logger.Error("logger error", zap.String("url", url))
		global.SugarLogger.Errorf("sugarLogger error, url is %s\n", url)
		return
	}
	global.Logger.Info(
		"logger success",
		zap.String("url", url),
		zap.Int("statusCode", resp.StatusCode),
	)
	global.SugarLogger.Infof("sugarLogger success, url is %s, statusCode is %d", url, resp.StatusCode)
}

func main() {
	intLoggerConfig()
	initSugarLogger()
	defer global.Logger.Sync()
	defer global.SugarLogger.Sync()
	reqGetLog("https://www.baidu.com")
	reqGetLog("http://192.198.1.1")
	fmt.Printf("end")
}
```

打印如下

```shell
# logger info
{"level":"info","ts":1709546927.077944,"caller":"zap-related/1-basic.go:83","msg":"logger success","url":"https://www.baidu.com","statusCode":200}
# sugarLogger info
{"level":"info","ts":1709546927.078114,"caller":"zap-related/1-basic.go:88","msg":"sugarLogger success, url is https://www.baidu.com, statusCode is 200"}
# logger info
{"level":"info","ts":1709546930.370571,"caller":"zap-related/1-basic.go:83","msg":"logger success","url":"http://192.198.1.1","statusCode":502}
# sugarLogger info
{"level":"info","ts":1709546930.370721,"caller":"zap-related/1-basic.go:88","msg":"sugarLogger success, url is http://192.198.1.1, statusCode is 502"}
```

> 如上所示，这两个`logger`都打印输出`JSON`结构格式

## 定制`Logger`

### 将日志写入文件并在控制台打印

> 要实现该功能要使用`zap.New(…)`方法来配置

```Go
func New(core zapcore.Core, options ...Option) *Logger
```

> `zapcore.Core`需要三个配置——`Encoder`、`WriteSyncer`、 `LogLevel`

- `Encoder`：表示`编码器`，可以通过它来设置写入日志的格式

- `WriterSyncer`： 用来指定日志写入的位置，使用`zapcore.AddSync()`函数来添加写入位置

- `LogLevel`：用来设置要记录哪种级别的日志

1. 改造`initSugarLogger`函数

```Go
func initSugarLogger1() {
	encoder := initLogEncoder()
	writer := initLogWriter()
	core := zapcore.NewCore(encoder, writer, zapcore.DebugLevel)
	logger := zap.New(core, zap.AddCaller(), zap.AddCallerSkip(1))
	global.SugarLogger = logger.Sugar()
}
```
2. 实现`initLogEncoder`函数

```Go
// 初始化写入日志的格式
func initLogEncoder() zapcore.Encoder {
	return zapcore.NewJSONEncoder(zap.NewProductionEncoderConfig())
}
```

> 可以进一步设置`encoder`的格式

```Go
func initLogEncoder() zapcore.Encoder {
	config := zap.NewProductionEncoderConfig()
	config.TimeKey = "time" // 设置日志时间的key为time
	// 格式化日志显示的时间格式
	config.EncodeTime = func(t time.Time, encoder zapcore.PrimitiveArrayEncoder) {
		encoder.AppendString(t.Format(time.DateTime))
	}
	// 设置日志等级修改为大写 info => INFO debug => DEBUG
	config.EncodeLevel = zapcore.CapitalLevelEncoder
	return zapcore.NewJSONEncoder(config)
}
```

3. 实现`initLogWriter`函数

```Go
// 初始化写入日志的位置/路径
func initLogWriter() zapcore.WriteSyncer {
	rootDir, _ := os.Getwd()
	separator := string(filepath.Separator)
	logDirPath := fmt.Sprintf("%s%s%s%s%s", rootDir, separator, "logs", separator, "logs.log")
	file, err := os.OpenFile(logDirPath, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0o666)
	if err != nil {
		fmt.Printf("创建日志文件失败: %s\n", err)
	}
	// 在控制台输出日志，同时将日志记录到log文件中
	return zapcore.NewMultiWriteSyncer(file, zapcore.AddSync(os.Stdout))
}
```

### 将`error`日志单独生成文件

> 实现功能：`error`日志会被写入`logs.error.log`文件中，其他等级的日志写入`logs.log`文件中

- 改造`initSugarLogger`方法，使用`zapcore.NewTee()`方法合并多个`core`

- 新增`initDebugWriter`和`initErrorWriter`方法，增加`error`写入位置

> 改造后的`initSugarLogger`方法如下:

```Go
func initSugarLogger3() {
	encoder := initLogEncoder3()
	debugWriter := initDebugWriter()
	errorWriter := initErrorWriter()
	// 记录debug和更高级别的日志
	c1 := zapcore.NewCore(encoder, debugWriter, zapcore.DebugLevel)
	// 记录error日志
	c2 := zapcore.NewCore(encoder, errorWriter, zapcore.ErrorLevel)
	// 使用zapcore.NewTee方法将c1和c2合并到core
	core := zapcore.NewTee(c1, c2)
	logger := zap.New(core, zap.AddCaller(), zap.AddCallerSkip(1))
	global.SugarLogger = logger.Sugar()
}
```

> `initDebugWriter`如下

```Go
// 初始化写入日志的位置/路径
func initDebugWriter() zapcore.WriteSyncer {
	rootDir, _ := os.Getwd()
	separator := string(filepath.Separator)
	logDirPath := fmt.Sprintf("%s%s%s%s%s", rootDir, separator, "logs", separator, "logs.log")
	file, err := os.OpenFile(logDirPath, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0o666)
	if err != nil {
		fmt.Printf("创建日志文件失败: %s\n", err)
	}
	// 在控制台输出日志，同时将日志记录到log文件中
	return zapcore.NewMultiWriteSyncer(file, zapcore.AddSync(os.Stdout))
}
```

> `initErrorWriter`如下

```Go
func initErrorWriter() zapcore.WriteSyncer {
	rootDir, _ := os.Getwd()
	separator := string(filepath.Separator)
	logDirPath := fmt.Sprintf("%s%s%s%s%s", rootDir, separator, "logs", separator, "logs.error.log")
	file, err := os.OpenFile(logDirPath, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0o666)
	if err != nil {
		fmt.Printf("创建日志文件失败: %s\n", err)
	}
	// 在控制台输出日志，同时将日志记录到log文件中
	return zapcore.NewMultiWriteSyncer(file, zapcore.AddSync(os.Stdout))
}
```

### 日志切割归档

> 使用[Lumberjack](https://github.com/natefinch/lumberjack)实现`日志切割归档`功能
>
> Lumberjack只支持按文件大小切割，因为按时间切割效率低且不能保证日志数据不被破坏
> 
> 如果想按照日期切割，可使用[file-rotatelogs](https://github.com/lestrrat-go/file-rotatelogs)

1. 安装`Lumberjack`

```shell
go get -u gopkg.in/natefinch/lumberjack.v2
```

2. Logger中加入`Lumberjack`，改造`initLogWriter`函数

`Lumberjack`配置项：

- `Filename`：日志文件名称(路径)
- `MaxSize`：日志文件最大的尺寸(`MB`), 超限后开始自动分割
- `MaxBackups`：保留旧文件的最大个数
- `MaxAge`：保留旧文件的最大天数
- `Compress`：是否使用gzip压缩旧文件
- `LocalTime`：确定备份文件中时间戳格式化所使用的时间是否为计算机的本地时间。默认情况下，使用`UTC`时间。

```Go
// 初始化写入日志的位置/路径
func initLogWriter4() zapcore.WriteSyncer {
	rootDir, _ := os.Getwd()
	separator := string(filepath.Separator)
	logDirPath := fmt.Sprintf("%s%s%s%s%s", rootDir, separator, "logs", separator, "logs.log")
	lumberjackLogger := &lumberjack.Logger{
		Filename:   logDirPath, // 日志文件名称(路径)
		MaxSize:    20,         // 日志文件最大的尺寸(MB), 超限后开始自动分割
		MaxBackups: 30,         // 保留旧文件的最大个数
		MaxAge:     30,         // 保留旧文件的最大天数
		Compress:   false,      // 是否压缩/归档旧文件
	}
	// 在控制台输出日志，同时将日志记录到log文件中
	return zapcore.NewMultiWriteSyncer(zapcore.AddSync(lumberjackLogger), zapcore.AddSync(os.Stdout))
}
```

## 将`zap`集成到`gin`中

`gin`中默认有一套自己的日志输出，在`gin.Default()`函数中，如下：

```Go
// Default returns an Engine instance with the Logger and Recovery middleware already attached.
func Default() *Engine {
	debugPrintWARNINGDefault()
	engine := New()
	engine.Use(Logger(), Recovery())
	return engine
}
```

> gin中的日志由`Logger()`和`Recovery()`函数实现
> - `Logger()`是把gin框架本身的日志输出到标准输出
> - `Recovery()`是捕获程序出现`panic`的情况，然后返回`500`响应

我们可以参照`Logger()`和`Recovery()`的实现，将`zap`集成到`gin`中

> `Logger`中间件实现如下：

```Go
// GinZapLogger 实现gin logger 中间件
func GinZapLogger(logger *zap.SugaredLogger) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// Start timer
		start := time.Now()
		path := ctx.Request.URL.Path
		raw := ctx.Request.URL.RawQuery
		// Process request
		ctx.Next()
		cost := time.Since(start)
		ClientIp := ctx.ClientIP()
		Method := ctx.Request.Method
		StatusCode := ctx.Writer.Status()
		ErrMsg := ctx.Errors.ByType(gin.ErrorTypePrivate).String()
		if raw != "" {
			path = path + "?" + raw
		}
		logger.Infof(
			"Path:%s，Method:%s，StatusCode:%d，IP:%s，ErrMsg:%s，Cost:%d",
			path,
			Method,
			StatusCode,
			ClientIp,
			ErrMsg,
			cost,
		)
	}
}
```

> `Recovery`中间件实现如下:

```Go
// GinZapRecovery recover掉项目可能出现的panic
func GinZapRecovery(logger *zap.SugaredLogger, stack bool) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				var brokenPipe bool
				if ne, ok := err.(*net.OpError); ok {
					var se *os.SyscallError
					if errors.As(ne, &se) {
						seStr := strings.ToLower(se.Error())
						if strings.Contains(seStr, "broken pipe") ||
							strings.Contains(seStr, "connection reset by peer") {
							brokenPipe = true
						}
					}
				}
				httpRequest, _ := httputil.DumpRequest(ctx.Request, false)
				headers := strings.Split(string(httpRequest), "\r\n")
				for idx, header := range headers {
					current := strings.Split(header, ":")
					if current[0] == "Authorization" {
						headers[idx] = current[0] + ": *"
					}
				}
				headersToStr := strings.Join(headers, "\r\n")
				if brokenPipe {
					logger.Errorf("%s\n%s", err, headersToStr)
					// If the connection is dead, we can't write a status to it.
					ctx.Error(err.(error)) // nolint: errcheck
					ctx.Abort()
					return
				}
				// 在日志中展示调用栈信息
				if stack {
					logger.Errorf(
						"[Recovery] panic recovered:\n%s\n%s%s",
						err,
						headersToStr,
						debug.Stack(),
					)
				} else {
					logger.Errorf(
						"[Recovery] panic recovered:\n%s\n%s",
						err,
						headersToStr,
					)
				}
				ctx.AbortWithStatus(http.StatusInternalServerError)
			}
		}()
		ctx.Next()
	}
}
```

> 使用中间件

```Go
engine := gin.New()
engine.Use(GinZapLogger(global.SugarLogger), GinZapRecovery(global.SugarLogger))
```

### 完整代码

> 完整代码如下：

```Go
package main

import (
	"context"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
	"net"
	"net/http"
	"net/http/httputil"
	"os"
	"os/signal"
	"path/filepath"
	"runtime/debug"
	"strings"
	"syscall"
	"time"
	"zap-related/global"
)

// 监听中断信号，中断后优雅退出gin
func RunServer() {
	engine := gin.New()
	engine.Use(GinZapLogger(global.SugarLogger), GinZapRecovery(global.SugarLogger, true))
	engine.GET("/user", func(ctx *gin.Context) {
		path := ctx.Request.URL.Path
		query := ctx.Request.URL.RawQuery
		ip := ctx.ClientIP()
		global.SugarLogger.Debugf("sugarLogger startServer log，path is %s, query is %s, ip is %s\n", path, query, ip)
		ctx.JSON(http.StatusOK, gin.H{
			"code": 0,
			"msg":  "success",
			"data": gin.H{"name": "张三"},
		})
	})
	engine.GET("/p", func(ctx *gin.Context) {
		panic("This is a deliberate panic for testing or demonstration purposes")
	})
    engine.Run(":6688")
}

func initLogger5() {
	encoder := getEncoder5()
	writer := getWriter5()
	core := zapcore.NewCore(encoder, writer, zapcore.DebugLevel)
	logger := zap.New(core, zap.AddCaller(), zap.AddCallerSkip(1))
	global.SugarLogger = logger.Sugar()
}

func getEncoder5() zapcore.Encoder {
	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.TimeKey = "time" // 设置日志时间的key为time
	// 格式化日志显示的时间格式
	encoderConfig.EncodeTime = func(t time.Time, encoder zapcore.PrimitiveArrayEncoder) {
		encoder.AppendString(t.Format(time.DateTime))
	}
	// 设置日志等级修改为大写 info => INFO debug => DEBUG
	encoderConfig.EncodeLevel = zapcore.CapitalLevelEncoder
	return zapcore.NewConsoleEncoder(encoderConfig)
}

func getWriter5() zapcore.WriteSyncer {
	rootDir, _ := os.Getwd()
	separator := string(filepath.Separator)
	logDirPath := fmt.Sprintf("%s%s%s%s%s", rootDir, separator, "logs", separator, "gin-logs.log")
	lumberjackLogger := &lumberjack.Logger{
		Filename:   logDirPath, // 日志文件名称(路径)
		MaxSize:    20,         // 日志文件最大的尺寸(MB), 超限后开始自动分割
		MaxBackups: 30,         // 保留旧文件的最大个数
		MaxAge:     30,         // 保留旧文件的最大天数
		Compress:   false,      // 是否压缩/归档旧文件
	}
	// 在控制台输出日志，同时将日志记录到log文件中
	return zapcore.NewMultiWriteSyncer(zapcore.AddSync(lumberjackLogger), zapcore.AddSync(os.Stdout))
}

// GinZapLogger 实现gin logger 中间件
func GinZapLogger(logger *zap.SugaredLogger) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// Start timer
		start := time.Now()
		path := ctx.Request.URL.Path
		raw := ctx.Request.URL.RawQuery
		// Process request
		ctx.Next()
		cost := time.Since(start)
		ClientIp := ctx.ClientIP()
		Method := ctx.Request.Method
		StatusCode := ctx.Writer.Status()
		ErrMsg := ctx.Errors.ByType(gin.ErrorTypePrivate).String()
		if raw != "" {
			path = path + "?" + raw
		}
		logger.Infof(
			"Path:%s，Method:%s，StatusCode:%d，IP:%s，ErrMsg:%s，Cost:%d",
			path,
			Method,
			StatusCode,
			ClientIp,
			ErrMsg,
			cost,
		)
	}
}

// GinZapRecovery recover掉项目可能出现的panic
func GinZapRecovery(logger *zap.SugaredLogger, stack bool) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				var brokenPipe bool
				if ne, ok := err.(*net.OpError); ok {
					var se *os.SyscallError
					if errors.As(ne, &se) {
						seStr := strings.ToLower(se.Error())
						if strings.Contains(seStr, "broken pipe") ||
							strings.Contains(seStr, "connection reset by peer") {
							brokenPipe = true
						}
					}
				}
				httpRequest, _ := httputil.DumpRequest(ctx.Request, false)
				headers := strings.Split(string(httpRequest), "\r\n")
				for idx, header := range headers {
					current := strings.Split(header, ":")
					if current[0] == "Authorization" {
						headers[idx] = current[0] + ": *"
					}
				}
				headersToStr := strings.Join(headers, "\r\n")
				if brokenPipe {
					logger.Errorf("%s\n%s", err, headersToStr)
					// If the connection is dead, we can't write a status to it.
					ctx.Error(err.(error)) // nolint: errcheck
					ctx.Abort()
					return
				}
				// 在日志中展示调用栈信息
				if stack {
					logger.Errorf(
						"[Recovery] panic recovered:\n%s\n%s%s",
						err,
						headersToStr,
						debug.Stack(),
					)
				} else {
					logger.Errorf(
						"[Recovery] panic recovered:\n%s\n%s",
						err,
						headersToStr,
					)
				}
				ctx.AbortWithStatus(http.StatusInternalServerError)
			}
		}()
		ctx.Next()
	}
}

func main() {
	initLogger5()
	RunServer()
}
```