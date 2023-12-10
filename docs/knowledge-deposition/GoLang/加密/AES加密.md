---
layout: doc
---

# AES加密

AES是常用的一种对称加密，加密和解密使用相同的key

记录前端实现AES加/解密，配合后端使用Go实现AES加/解密的过程

## 前端代码

- 下载`crypto-js`

```shell
pnpm install crypto-js
```

> 前端实现

```javascript
/**
 * AES 对称加密
 * 加密解密，加密的解密使用相同的key
 */
import CryptoJS from 'crypto-js'

/**
 * 生成AES算法所需要的key
 * AES算法key必须是长度为16的字符串
 */
const KEY_LENGTH = 16
export const generateAseKey = () => {
    let key = Math.random().toString(36).substring(2)
    while (key.length < KEY_LENGTH) {
        key += Math.random().toString(36).substring(2)
    }
    return key.substring(0, KEY_LENGTH)
}

/**
 * AES 加密
 * @param data {string} 要加密的数据
 * @param key {string} AES加密使用的key
 * @return string 返回加密后的数据
 */
export const aseEncrypt = (data, key) => {
    const cipherData = CryptoJS.enc.Utf8.parse(data)
    const cipherKey = CryptoJS.enc.Utf8.parse(key)
    // iv 也要是16位 和后端保持一致
    const iv = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex).substring(0, KEY_LENGTH);
    const cfg = { iv: CryptoJS.enc.Utf8.parse(iv) };
    const encrypted = CryptoJS.AES.encrypt(cipherData, cipherKey, cfg)
    //返回base64格式的加密结果 要和后端保持一致
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * AES解密
 * @param cipherData {string} 需要解密的数据
 * @param key {string} AES解密使用的key
 * @return {any} 返回解密后的数据
 */
export const aesDecrypt = (cipherData, key) => {
    const cipherKey = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.SHA256(key).toString().substring(0, KEY_LENGTH);
    const cfg = { iv: CryptoJS.enc.Utf8.parse(iv) };
    const base64 = CryptoJS.enc.Base64.parse(cipherData);
    const src = CryptoJS.enc.Base64.stringify(base64);
    const decrypt = CryptoJS.AES.decrypt(src, cipherKey, cfg);
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
```
> 验证代码

```javascript
import {generateAseKey, aesDecrypt, aseEncrypt } from "./utils/ase";

const data = [
    "hello world",
    18939393933,
    "34732skfbjdshf732t428734243",
    "qwert1",
    "qw@189qq.com^&"
]

data.forEach(item => {
    if(typeof item != "string") {
        item = JSON.stringify(item)
    }
    const key = generateAseKey();
    const encryptResult = aseEncrypt(item, key)
    const decryptData = aesDecrypt(encryptResult, key)
    console.log({
        key,
        item,
        encryptResult,
        decryptData,
        isSuccess: decryptData === item
    })
})
```

## 后端代码

- `pkg/aes/aes.go`

```Go
package aes

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"fmt"
)

// 实现aes CBC加密
func ExecCBCEncrypt(data, key string, paddingMode PaddingMode) string {
	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		return ""
	}
	src := Padding(paddingMode, []byte(data), block.BlockSize())
	encryptData := make([]byte, len(src))
	iv := GenIVFromKey(key)
	mode := cipher.NewCBCEncrypter(block, []byte(iv))
	mode.CryptBlocks(encryptData, src)
	return base64.StdEncoding.EncodeToString(encryptData)
}

// 实现aes CBC解密
func ExecCBCDecrypt(data, key string, paddingMode PaddingMode) (string, error) {
	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		return "", err
	}
	decodeData, err := base64.StdEncoding.DecodeString(data)
	if err != nil {
		fmt.Printf("data base64 formatted error：%v\n", err)
		return "", err
	}
	decryptData := make([]byte, len(decodeData))
	iv := GenIVFromKey(key)
	mode := cipher.NewCBCDecrypter(block, []byte(iv))
	mode.CryptBlocks(decryptData, decodeData)
	original, err := UnPadding(paddingMode, decryptData, block.BlockSize())
	if err != nil {
		fmt.Printf("unpadding error：%v\n", err)
		return "", err
	}
	return string(original), nil
}

// 通过Key生成IV
func GenIVFromKey(key string) (iv string) {
	hashedKey := sha256.Sum256([]byte(key))
	return formatByBlockSize(hex.EncodeToString(hashedKey[:]))
}

func formatByBlockSize(key string) string {
	if len(key) > aes.BlockSize {
		return key[:aes.BlockSize]
	}
	return key
}
```

- `pkg/aes/padding.go`

```Go
package aes

import (
	"bytes"
	"errors"
	"fmt"
)

type PaddingMode string

const PKCS5 PaddingMode = "PKCS5"
const PKCS7 PaddingMode = "PKCS7"

func Padding(padding PaddingMode, src []byte, blockSize int) []byte {
	switch padding {
	case PKCS5:
		src = PKCS5Padding(src, blockSize)
	case PKCS7:
		src = PKCS7Padding(src, blockSize)
	default:
		return nil
	}
	return src
}

func UnPadding(padding PaddingMode, src []byte, blockSize int) ([]byte, error) {
	switch padding {
	case PKCS5:
		return PKCS5UnPadding(src, blockSize)
	case PKCS7:
		return PKCS7UnPadding(src, blockSize)
	default:
		return nil, fmt.Errorf("unsurported encrypt padding %s\n", padding)
	}
}

func PKCS5Padding(src []byte, blockSize int) []byte {
	return PKCS7Padding(src, blockSize)
}

func PKCS5UnPadding(src []byte, blockSize int) ([]byte, error) {
	return PKCS7UnPadding(src, blockSize)
}

func PKCS7Padding(src []byte, blockSize int) []byte {
	// 计算src的长度
	srcLen := len(src)
	// 计算要补多少位
	paddingLen := blockSize - (srcLen % blockSize)
	// 生成补位byte 比如要补2位，要生成两个2 22，要补6位 生成6个6 666666
	// 当srcLen是blockSize的整倍数时，paddingLen等于blockSize而非0
	paddingByte := bytes.Repeat([]byte{byte(paddingLen)}, paddingLen)
	return append(src, paddingByte...)
}

func PKCS7UnPadding(src []byte, blockSize int) ([]byte, error) {
	// 计算src的长度
	srcLen := len(src)
	// 取最后一位 得到一共补了几位
	paddingLen := int(src[srcLen-1])
	if paddingLen >= srcLen || paddingLen > blockSize {
		return nil, errors.New("padding size error")
	}
	return src[:srcLen-paddingLen], nil
}
```

> 测试代码

- `pkg/aes/aes_test.go`

```Go
package aes

import (
	"testing"
)

func TestAesCBCEncrypt(t *testing.T) {
	type TData struct {
		Name string
		Data string
		Key  string
		Mode PaddingMode
	}
	tests := []TData{
		{
			Name: "普通字符串",
			Data: "hello world",
			Key:  "6cz4u31obtoyxr65",
			Mode: PKCS7,
		},
		{
			Name: "字母数字",
			Data: "qwert1",
			Key:  "svviyn7q9xhaguj0",
			Mode: PKCS5,
		},
		{
			Name: "数字字符串",
			Data: "18939393933",
			Key:  "i5vyblpx4tgewaoe",
			Mode: PKCS7,
		},
		{
			Name: "带特殊字符的字符串",
			Data: "qw@189qq.com^&",
			Key:  "jhcl5lp1mxgb5zpi",
			Mode: PKCS5,
		},
	}
	for _, tt := range tests {
		t.Run(tt.Name, func(t *testing.T) {
			res := ExecCBCEncrypt(tt.Data, tt.Key, tt.Mode)
			expect, _ := ExecCBCDecrypt(res, tt.Key, tt.Mode)
			if tt.Data != expect {
				t.Errorf("AesCBCEncrypt() Expect is %s，actually is %s，key is %s\n", expect, res, tt.Key)
			}
		})
	}
}

func TestAesCBCDecrypt(t *testing.T) {
	type Args struct {
		Data        string
		Key         string
		PaddingMode PaddingMode
	}
	type DataTest struct {
		Name   string
		Args   Args
		Expect string
	}
	testsData := []DataTest{
		{
			Name: "测试解密前端AES加密生成的Data",
			Args: Args{
				Data:        "iVQq9jg5UQ0tsl3OLaE4fw==",
				Key:         "i5vyblpx4tgewaoe",
				PaddingMode: PKCS7,
			},
			Expect: "18939393933",
		},
	}
	for _, item := range testsData {
		t.Run(item.Name, func(t *testing.T) {
			if res, _ := ExecCBCDecrypt(item.Args.Data, item.Args.Key, item.Args.PaddingMode); res != item.Expect {
				t.Errorf("AesDecrypt verify faild，Expect is %s，actually is %s\n", item.Expect, res)
			}
		})
	}
}
```

## 参考

- [前端AES加密](https://zhuanlan.zhihu.com/p/444797115)

- [Golang 实现与 crypto-js 一致的 AES 简单加解密](https://segmentfault.com/a/1190000043754783#item-2-4)，文章中[代码地址](https://github.com/LinkinStars/go-scaffold/blob/main/pkg/cryptor/aes.go)
