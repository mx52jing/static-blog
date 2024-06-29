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

## `url.PathEscape`和`url.PathUnescape`

> `url.PathEscape`将字符串转义，以便可以安全地放置在`URL`路径段中，类似于`js`中的`encodeURIComponent`
> 
> `url.PathUnescape`方法用于`对URL路径中的编码字符进行解码`，类似于js中的`decodeURIComponent`

> 示例代码：

```Go
package main

import (
	"fmt"
	"net/url"
)

func pathEscapeAndUnPathEscape() {
	rawUrl := "https://example.com/path?name=张三&age=22"
	escapedUrl := url.PathEscape(rawUrl)
	// Escaped Url: https:%2F%2Fexample.com%2Fpath%3Fname=%E5%BC%A0%E4%B8%89&age=22
	fmt.Println("Escaped Url:", escapedUrl)
	unescapedUrl, _ := url.PathUnescape(escapedUrl)
	// UnEscaped Url: https://example.com/path?name=张三&age=22
	fmt.Println("UnEscaped Url:", unescapedUrl)
}

func main() {
	pathEscapeAndUnPathEscape()
}
```


## `url.QueryEscape`和`url.QueryUnescape`

> `url.QueryEscape`方法用于`对字符串进行URL编码`
> 
> `url.QueryUnescape`方法用于`对字符串进行URL解码`

> 示例

```Go
package main

import (
	"fmt"
	"net/url"
)

func queryEscapeAndUnEscape() {
	rawQuery := "?name=张三&age=18"
	escapedQuery := url.QueryEscape(rawQuery)
	fmt.Println("Escaped Query:", escapedQuery)
	unescapedQuery, _ := url.QueryUnescape(escapedQuery)
	fmt.Println("Unescaped Query:", unescapedQuery)
    /**
	Escaped Query: %3Fname%3D%E5%BC%A0%E4%B8%89%26age%3D18
	Unescaped Query: ?name=张三&age=18
	*/
}

func main() {
	queryEscapeAndUnEscape()
}
```

## `url.ParseQuery`

> `url.ParseQuery`方法用于`解析URL查询字符串`并将其转换为一个`url.Values`类型的`map`

> 代码示例：

```Go
func parseQuery() {
	rawQuery := "name=张三&age=22"
	queryParams, _ := url.ParseQuery(rawQuery)
	queryParams.Set("like", "ping_pang")
	fmt.Println("Query Params:", queryParams)
	fmt.Println("name:", queryParams.Get("name"))
	fmt.Println("age:", queryParams.Get("age"))
	fmt.Println("like:", queryParams.Get("like"))
	/**
	打印如下:
	Query Params: map[age:[22] like:[ping_pang] name:[张三]]
	name: 张三
	age: 22
	like: ping_pang
	*/
}

func main() {
	parseQuery()
}
```



## `url.Values`

> `url.Values`是一个`map`类型，用于构建和解析`URL查询参数`

> 示例：

```Go
func urlValues() {
	params := url.Values{}
	params.Add("name", "张三")
	params.Add("age", "22")
	query := params.Encode()
	// query: age=22&name=%E5%BC%A0%E4%B8%89
	fmt.Println("query:", query)
}

func buildURL() {
	parsedUrl, _ := url.Parse("https://example.com/path")
	// 添加search params
	params := url.Values{}
	params.Add("name", "张三")
	params.Add("age", "22")
	parsedUrl.RawQuery = params.Encode()
	finalURL := parsedUrl.String()
	// finalURL: https://example.com/path?age=22&name=%E5%BC%A0%E4%B8%89
	fmt.Println("finalURL:", finalURL)
}

func main() {
	urlValues()
    buildURL()
}
```

## `url.JoinPath`

> `url.JoinPath`方法用于`拼接URL`路径

> 代码示例：

```Go
func pathJoin() {
	baseURL := "https://example.com"
	path1 := "path1"
	path2 := "path2"
	joinedURL, _ := url.JoinPath(baseURL, path1, path2)
    // Joined URL: https://example.com/path1/path2
	fmt.Println("Joined URL:", joinedURL)
}

func main() {
	pathJoin()
}
```

## `url.UserInfo`

> `url.Userinfo`类型和相关方法用于处理URL中的`用户信息`部分（即用户名和密码）

> 代码示例：

```Go
func urlUserInfo() {
	rawURL := "https://user:root@example.com/path"
	parsedURL, _ := url.Parse(rawURL)
	if parsedURL.User != nil {
		fmt.Println("Username:", parsedURL.User.Username())
		password, hasPassword := parsedURL.User.Password()
		if hasPassword {
			fmt.Println("Password:", password)
		} else {
			fmt.Println("No password provided")
		}
		return
	}
	fmt.Println("No user info provided")
	/**
	Username: user
	Password: root
	*/
}

func main() {
	urlUserInfo()
}
```

## `url.URL.String`

> `url.URL.String`方法将`*url.URL对象`转换回`字符串`

> 代码示例：

```Go
func urlString() {
	parsedURL := &url.URL{
		Scheme:   "https",
		Host:     "example.com",
		Path:     "/path",
		RawQuery: "name=张三",
		Fragment: "section",
	}
	// URL String: https://example.com/path?name=张三#section
	fmt.Println("URL String:", parsedURL.String())
}

func main() {
	urlString()
}
```

## `url.URL.Query`

> `url.URL.Query`方法解析`URL查询参数`并返回一个`url.Values`类型的`map`

> 代码示例：

```Go
func urlQuery() {
	rawURL := "https://example.com/path?name=张三&age=22"
	parsedURL, _ := url.Parse(rawURL)
	queryParams := parsedURL.Query()
	/**
	Query Params: map[age:[22] name:[张三]]
	name: 张三
	age: 22
	like: ping_pang
	*/
	fmt.Println("Query Params:", queryParams)
	fmt.Println("name:", queryParams.Get("name"))
	queryParams.Set("like", "ping_pang")
	fmt.Println("age:", queryParams.Get("age"))
	fmt.Println("like:", queryParams.Get("like"))
}

func main() {
	urlQuery()
}
```



## `url.URL.Hostname`和`url.URL.Port`

> `url.URL.Hostname`方法返回`URL`的`主机名`部分
> 
> `url.URL.Port`方法返回`URL`的`端口`部分

> 代码示例：

```Go
func pathNameHost() {
	rawURL := "https://example.com:8080/path?foo=bar#section"
	parsedURL, _ := url.Parse(rawURL)
	/**
	Hostname: example.com
	Port: 8080
	*/
	fmt.Println("Hostname:", parsedURL.Hostname())
	fmt.Println("Port:", parsedURL.Port())
}

func main() {
	pathNameHost()
}
```

## `url.URL.IsAbs`

> `url.URL.IsAbs`方法用于检查URL是否为`绝对URL`

> `Absolute`意味着它具有非空的`Schema`

> 代码示例：

```Go
func urlIsAbs() {
	rawURL1 := "https://example.com/path"
	parsedURL1, _ := url.Parse(rawURL1)

	rawURL2 := "example.com/path"
	parsedURL2, _ := url.Parse(rawURL2)
	/**
	RawURL1 Is absolute URL? true
	RawURL2 Is absolute URL? false
	*/
	fmt.Println("RawURL1 Is absolute URL?", parsedURL1.IsAbs())
	fmt.Println("RawURL2 Is absolute URL?", parsedURL2.IsAbs())
}

func main() {
	urlIsAbs()
}
```
