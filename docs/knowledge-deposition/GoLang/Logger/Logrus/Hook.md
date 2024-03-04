---
layout: doc
---

# Hook

- 通过使用`hook`，可以扩展`logrus`的功能

- 可以为`logrus`设置`hook`，每条日志输出前都会执行`hook`的特定方法

- [点击](https://github.com/sirupsen/logrus/blob/master/hooks.go#L8)查看更多

> `Hook`定义如下

```Go
type Hook interface {
	Levels() []Level
	Fire(*Entry) error
}
```

- `Levels()`方法返回要执行`Fire`方法的日志级别，只有输出`Levels`方法中返回的日志级别时才会执行`Fire`方法

- `Fire`是日志输出前调用的方法

> 示例

```Go
package main

import (
	"github.com/sirupsen/logrus"
)

type MyHook struct {
}

func (mHook *MyHook) Levels() []logrus.Level {
	return []logrus.Level{logrus.InfoLevel} // 返回InfoLevel 只有输出Info级别的日志才会执行Fire方法
}

func (mHook *MyHook) Fire(entry *logrus.Entry) error {
	entry.Data["name"] = "app"
	return nil
}

func main() {
	logrus.AddHook(&MyHook{})
	logrus.SetFormatter(&logrus.TextFormatter{
		FullTimestamp: true,
	})
	logrus.Errorln("logrus => Error")
	logrus.Warningln("logrus => Warn")
	logrus.Infoln("logrus => Info")
	logrus.Debugln("logrus => Debug")
}
/**
ERRO[2023-08-08T22:59:39+08:00] logrus => Error                              
WARN[2023-08-08T22:59:39+08:00] logrus => Warn                               
INFO[2023-08-08T22:59:39+08:00] logrus => Info        name=app
*/
```

> 上面的自定义`Hook`在`Levels`中只返回了`logrus.InfoLevel`，所以只有输出`Info`日志时，才会执行`Fire`方法，带上额外的`name`字段