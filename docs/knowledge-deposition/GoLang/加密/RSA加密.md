---
layout: doc
---

# RSA


AES是常用的一种非对称加密，有`公钥`和`私钥`，使用公钥加密可以通过私钥解密，同样使用私钥加密可以通过公钥解密

记录前端实现RSA加/解密，配合后端使用Go实现AES加/解密的过程

## 生成公钥和私钥

```shell
# 生成1024位的RSA私钥：
openssl genrsa -out data/rsa_private_key.pem 1024

# 根据私钥生成公钥：
openssl rsa -in data/rsa_private_key.pem -pubout -out data/rsa_public_key.pem

# pem是一种标准格式，它通常包含页眉和页脚
```

> 前后端可以公用的代码

```javascript
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
xxxxxxxxxxxxxxxxxx公钥内容
-----END PUBLIC KEY-----
`
const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
xxxxxxxxxxxxxxxxxx私钥内容
-----END RSA PRIVATE KEY-----
`
```

:::warning
加密/解密使用的私钥和公钥一般不会直接在代码中声明，可以加在配置文件中配置，这里是为了方便测试才这样写
:::

## 前端代码

- 下载`jsencrypt`

```shell
pnpm install jsencrypt
```

- 具体代码实现

```javascript
import {JSEncrypt} from "jsencrypt";
/**
 *  rsa加密
 * @param data {string}
 * @return {string}
 */
export const rsaEncrypt = (data) => {
    const encrypt = new JSEncrypt()
    const publicKey = PUBLIC_KEY
    encrypt.setPublicKey(publicKey)
    return encrypt.encrypt(data) ?? ''
}

/**
 * rsa解密
 * @param data {string}
 * @return {string}
 */
export const rsaDecrypt = (data) => {
    const encrypt = new JSEncrypt()
    const privateKey = PRIVATE_KEY
    encrypt.setPrivateKey(privateKey)
    return encrypt.decrypt(data) ?? ''
}
```

## 后端代码

```Go
// pkg/rsa/rsa.go
package rsa

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
)

func ExecEncryptToBase64(plain string, publicKey string) (string, error) {
	// 解析加密key
	block, _ := pem.Decode([]byte(publicKey))
	//解析公钥 目前的数字证书一般都是基于ITU（国际电信联盟）制定的X.509标准
	publicInterface, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		return "", err
	}
	pub := publicInterface.(*rsa.PublicKey)
	v15, err := rsa.EncryptPKCS1v15(rand.Reader, pub, []byte(plain))
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(v15), nil
}

func ExecDecryptByBase64(plain string, privateKey string) (string, error) {
	ciphertext, err := base64.StdEncoding.DecodeString(plain)
	if err != nil {
		return "", err
	}
	// 解析加密key
	block, _ := pem.Decode([]byte(privateKey))
	//解析私钥 目前的数字证书一般都是基于ITU（国际电信联盟）制定的X.509标准
	privateInterface, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return "", err
	}
	v15, err := rsa.DecryptPKCS1v15(rand.Reader, privateInterface, ciphertext)
	if err != nil {
		return "", err
	}
	return string(v15), nil
}
```

> 测试代码

```Go
// pkg/rsa/rsa_test.go
package rsa

import (
	"fmt"
	"testing"
)

type DateItem struct {
	Name   string
	Data   string
	Expect string
}

var tests = []DateItem{
	{
		Name:   "普通字符串",
		Data:   "hello world",
		Expect: "bJPEbu/DPrgClUUKxsWCFDnQnA/uMjOuAXlvFNdQhMMV5xdXYsGa35rxLAv1mBP3qJ4eOt5QzyeHQVPLOX9Z2PD5GBAwTcw6sE/dcSxgPUeE1nISHkLE2q2ObZMoQheTbzmAaoe66ikjrBLnbgRRa/wvEEVcr8Hcnpun5BBmsxo=",
	},
	{
		Name:   "数字字符串",
		Data:   "18939393933",
		Expect: "g492hpkJgCL/y/hQYJ8Zw1lcdh6Nbyex//AaJ6UM2jo3t8vszmwQLuVKEHtJImXs0mmIft/cII0ptrMiAhO6MX9mfD8IEcenvBuyeb3f09KGdYgubUTwujYZwcob8676rXTUG0POS9UP77GrwfaDegcg43xCOnxKPM4fmqKzYNk=",
	},
	{
		Name:   "数字字母",
		Data:   "qwert1",
		Expect: "fGKOJuvrpHrNw+ZW+xTbF7gMbHnE8YT2tKVrKdWgi0MxYPpXd6F6l8wK/KBulWWRKK3B8oWWzeoYNK1ZQsGEUAH0VzHP7W2Tsnmm37H2GQuw5ZffECSHtzGm4HfOEUXhlyQiD1rr2uPlDyS/FLJRnQUC9riWSnO2VUXZpLASlrw=",
	},
	{
		Name:   "带有特殊字符",
		Data:   "qw@189qq.com^&",
		Expect: "dH5CcoFBUgA6pgStzAhv1+ySwVzy0HxCLA/eWKSPtWPK9PjvhbpMhrZlF3EPrWYF/7Oe3iREl7WSpzmhgvIohu4FEn2UGkGbibdyTdrIJpdcHUfVk4t3TZBHfFhINrzebsPcKGx/0no8AuTMlAMMkLhfk7DDGZ4IJJ+B6dSHmwM=",
	}}

func TestExecEncryptToBase64(t *testing.T) {
	for _, tt := range tests {
		t.Run(tt.Name, func(t *testing.T) {
			res, _ := ExecEncryptToBase64(tt.Data, PUBLIC_KEY)
			expect, _ := ExecDecryptByBase64(res, PRIVATE_KEY)
			if tt.Data != expect {
				t.Errorf("res is 【%s】\n，expect is 【%s】\n", res, expect)
			}
		})
	}
}

func TestExecDecryptByBase64(t *testing.T) {
	for _, tt := range tests {
		t.Run(fmt.Sprintf("测试解密前端通过RSA加密后的数据：%s", tt.Name), func(t *testing.T) {
			decryptText, err := ExecDecryptByBase64(tt.Expect, PRIVATE_KEY)
			if tt.Data != decryptText {
				t.Errorf("解密失败，解密后的数据为：【%s】，expect is 【%s】，err is %v\n", decryptText, tt.Data, err)
			}
		})
	}
}
```

## 参考

- [前后端交互，密码加密，RSA 实现前端 js 加密，后端 go 解密](https://studygolang.com/articles/35387)

- [在vue、golang搭建的前后端系统中使用jsencrypt包实现RSA加解密功能](https://blog.csdn.net/sinat_26553595/article/details/122411287)
- [jsencrypt前台加密，Go后台解密失败](https://www.jianshu.com/p/f2b03fe16193)