---
layout: doc
---

# 文件操作

## 打开文件模式

```Go
O_RDONLY int = syscall.O_RDONLY // open the file read-only.  只读
O_WRONLY int = syscall.O_WRONLY // open the file write-only. 只写
O_RDWR   int = syscall.O_RDWR   // open the file read-write. 读写

O_APPEND int = syscall.O_APPEND // append data to the file when writing. 追加
O_CREATE int = syscall.O_CREAT  // create a new file if none exists. 如果不存在就创建
O_EXCL   int = syscall.O_EXCL   // used with O_CREATE, file must not exist. 文件必须不存在
O_SYNC   int = syscall.O_SYNC   // open for synchronous I/O. 同步I/O
O_TRUNC  int = syscall.O_TRUNC  // truncate regular writable file when opened. 打开时清空文件
```
