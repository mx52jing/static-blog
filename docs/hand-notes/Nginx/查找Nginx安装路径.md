# 查找Nginx安装路径

## 使用`whereis`命令

```shell
whereis nginx
```

输出结果类似于下面：

```shell
nginx: /usr/sbin/nginx /usr/lib64/nginx /etc/nginx /usr/share/nginx 
/usr/share/man/man3/nginx.3pm.gz /usr/share/man/man8/nginx.8.gz
```

- `/usr/sbin/nginx`：这个路径指向`nginx的二进制可执行文件`。
  - `/usr/sbin/`是系统级二进制文件存放目录，通常用于存放需要管理员权限执行的程序。你可以通过此路径直接运行 nginx。

- `/usr/lib64/nginx`：这是一个存放`64位版本的库文件`的目录。
  - 在某些 Linux 系统中，库文件会放置在`/usr/lib64/`目录下。这是为了确保 64 位程序可以找到所需的库文件，这里的内容可能包括 nginx 的共享库文件（如果有的话）。

- `/etc/nginx`： 这个目录通常包含`nginx的配置文件`。
  - `/etc/`是系统配置文件的标准存放目录，nginx 的配置文件（如 nginx.conf）会放在此处。通过修改这里的配置文件，用户可以控制 nginx 的行为，例如设置服务器块、日志等。

- `/usr/share/nginx`：这是存放`nginx相关共享数据`的目录。
  - 通常情况下，`/usr/share/`目录用于存放所有用户共享的数据，包括静态文件、HTML 模板、默认的网页等。对于 nginx，这里可能包含默认的网页、模板文件或者静态资源。

- `/usr/share/man/man3/nginx.3pm.gz`： 这是`nginx的Perl模块的手册页`
  - `nginx.3pm.gz`是经过压缩的 man 手册文件。 /usr/share/man/ 是存放所有系统手册的目录，man3 子目录专门用于 Perl 模块的手册。通过 man nginx 或 man 3 nginx 可以查看 nginx 的文档。

- `/usr/share/man/man8/nginx.8.gz`： 这是`nginx的主命令手册页`
  - 通常是与系统管理相关的工具（如 nginx）会放在 man8 目录下。通过`man nginx`或`man 8 nginx`可以查看 nginx 命令的相关文档，帮助你了解如何使用 nginx、配置 nginx 等。

## 使用`which`命令

```shell
which nginx
```

> 输出结果可能类似于

```shell
/usr/sbin/nginx
```
`/usr/sbin/nginx`即为`Nginx的可执行文件位置`

## 使用`ps`命令

```shell
ps -ef | grep nginx 
ps aux | grep nginx
```

> 输入结果类似如下：

```shell
root  25517  1  0  2024 ?  00:00:00 nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
root     3321135 3306744  0 10:44 pts/0    00:00:00 grep --color=auto nginx
nginx    3420106   25517  0  2024 ?        00:00:11 nginx: worker process
nginx    3420107   25517  0  2024 ?        00:13:31 nginx: worker process
# xxxx
```

> `master process`后面跟的就是`Nginx的可执行文件位置`，可以看到有一个`root`用户启动的nginx主进程，和另外两个`nginx`的工作进程
