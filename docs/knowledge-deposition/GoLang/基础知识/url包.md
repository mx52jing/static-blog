---
layout: doc
---

# url包

`net/url`包在`Go`语言中用于解析和构建`URL`


## `url.Parse`

> `url.Parse`方法用于解析一个`URL字符串`并返回一个`*url.URL`对象。`url.URL`对象如下：


```Go
// URL's String method uses the EscapedPath method to obtain the path.
type URL struct {
	Scheme      string
	Opaque      string    // encoded opaque data
	User        *Userinfo // username and password information
	Host        string    // host or host:port
	Path        string    // path (relative paths may omit leading slash)
	RawPath     string    // encoded path hint (see EscapedPath method)
	OmitHost    bool      // do not emit empty host (authority)
	ForceQuery  bool      // append a query ('?') even if RawQuery is empty
	RawQuery    string    // encoded query values, without '?'
	Fragment    string    // fragment for references, without '#'
	RawFragment string    // encoded fragment hint (see EscapedFragment method)
}
```

> 示例代码如下：

```Go
package main

import (
	"fmt"
	"net/url"
)

func parseFn() {
	rawURL := "https://example.com/path?name=张三#section"
	//rawURL := "https://example.com:8080/#/before/error?name=%E5%BC%A0%E4%B8%89"
	parsedURL, _ := url.Parse(rawURL)
    fmt.Println("parsedURL:", parsedURL)
	fmt.Println("Scheme:", parsedURL.Scheme)
	fmt.Println("Host:", parsedURL.Host)
	fmt.Println("Path:", parsedURL.Path)
	fmt.Println("RawQuery:", parsedURL.RawQuery)
	fmt.Println("Fragment:", parsedURL.Fragment)
	/**
	rawURL := "https://example.com/path?name=张三#section" 打印如下
    parsedURL: https://example.com/path?name=张三#section
	Scheme: https
	Host: example.com
	Path: /path
	RawQuery: name=张三
	Fragment: section
	*/

	/**
	rawURL := "https://example.com:8080/#/before/error?name=%E5%BC%A0%E4%B8%89" 打印如下
    parsedURL: https://example.com:8080/#/before/error?name=%E5%BC%A0%E4%B8%89
	Scheme: https
	Host: example.com:8080
	Path: /
	RawQuery:
	Fragment: /before/error?name=张三
	*/
}

func main() {
	parseFn()
}
```

## `url.ParseRequestURI`

> `url.ParseRequestURI`类似于`url.Parse`，但它更严格地遵循[RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986)规范，用于解析`HTTP`请求`URI`

```Go
package main

import (
	"fmt"
	"net/url"
)

func parseRequestFn() {
	//rawURL := "https://example.com/path?name=张三#section"
	rawURL := "https://example.com:8080/#/before/error?name=%E5%BC%A0%E4%B8%89"
	parsedURL, _ := url.ParseRequestURI(rawURL)
	fmt.Println("parsedURL:", parsedURL)
	fmt.Println("Scheme:", parsedURL.Scheme)
	fmt.Println("Host:", parsedURL.Host)
	fmt.Println("Path:", parsedURL.Path)
	fmt.Println("RawQuery:", parsedURL.RawQuery)
	fmt.Println("Fragment:", parsedURL.Fragment)
	/**
	rawURL := "https://example.com/path?name=张三#section" 打印如下
	parsedURL: https://example.com/path?name=张三#section
	Scheme: https
	Host: example.com
	Path: /path
	RawQuery: name=张三#section
	*/

	/**
	rawURL := "https://example.com:8080/#/before/error?name=%E5%BC%A0%E4%B8%89" 打印如下
	parsedURL: https://example.com:8080/%23/before/error?name=%E5%BC%A0%E4%B8%89
	Scheme: https
	Host: example.com:8080
	Path: /#/before/error
	RawQuery: name=%E5%BC%A0%E4%B8%89
	Fragment:
	*/
}

func main() {
	parseRequestFn()
}
```

