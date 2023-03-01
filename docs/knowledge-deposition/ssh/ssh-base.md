# SSH相关基础

## 简介
`SSH`是`Linux`系统的登录工具，广泛用于服务器登录和各种加密通信。

`OpenSSH`的客户端是二进制程序`ssh`。它在 `Linux/Unix`系统的位置是`/usr/bin/ssh`。

`Linux`一般都自带`ssh`，如果没有可以安装。

```shell
# Ubuntu 和 Debian
sudo apt install openssh-client
# Centos
sudo dnf install openssh-clients
```

安装成功后，查看`ssh`版本号

```shell
ssh -V
```

## 登录服务器
`ssh`最常见的用途就是登录服务器

### 通过密码登录
```shell
ssh user@hostname
# 另外一种写法
ssh -l username hostname
# 指定端口号
ssh -l username -p port hostname
```
- `username`就是服务器用户名
- `hostname`是`主机名`，它可以是`ip地址`，也可以是`域名`
- `-p`指定登录的`端口号`，端口号默认是`22`

### 修改密钥权限，以防他人读取

```shell
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa.pub
```
### 通过自定义配置文件快速登录

用户个人配置文件是`~/.ssh/config`，可以添加配置如下

```shell
Host myServer
     HostName hostname
     User user
     Port 22
Host myServer1
     HostName hostname1
     User user1
     Port 22
......
```
上述配置完成后可以使用`ssh myServer`命令登录服务器，不用每次都输入`用户名`和`hostname`了，而且可以配置多个服务器信息

### 通过密钥登录

通过以下配置步骤来配置密钥登录

- 通过`ssh-keygen`命令生成密钥

```shell
ssh-keygen -t ras -C "youremail@example.com"
```

- 将生成的公钥上传到服务器

```shell
# 复制公钥
pbcopy < ~/.ssh/id_rsa.pub
# 登录服务器，并粘贴公钥
ssh user@hostname
vim ~/.ssh/authorized_keys
# 将复制的公钥粘贴到(~/.ssh/authorized_keys)文件内，保存并退出
```

- 退出服务器后，重新登录服务器

```shell
ssh user@hostname
# 或者如果配置了~/.ssh/config文件的话，可以直接用下面这种方式
ssh myServer
```

**如果还是需要输入密码可以从以下几个方面排查**

- 登录服务器检查`/etc/ssh/sshd_config`文件，查看`/etc/ssh/sshd_config`文件是否满足以下配置：

```shell
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```
- 同时修改`/etc/ssh/authorized_keys`文件权限，因为如果权限不对，`SSH`服务器可能会拒绝读取该文件
```shell
chmod 644 ~/.ssh/authorized_keys
```
- 重新启动`sshd`
```shell
sudo systemctl restart sshd.service
```

### 关闭密码登录

为了安全性，启用密钥登录之后，最好关闭服务器的密码登录。
打开服务器`sshd`的配置文件`/etc/ssh/sshd_config`，将`PasswordAuthentication`这一项设为`no`，然后`重新启动sshd`
```shell
PasswordAuthentication no
```
## 自动上传公钥

上面在上传公钥的时候，是手动`copy`并且登录服务器上传的，我们还可以使用`ssh-copy-id`自动上传

```shell
ssh-copy-id -i 本机电脑公钥文件名(一般是id_rsa) user@hostname
# 公钥文件可以不指定路径和.pub后缀名，ssh-copy-id会自动在~/.ssh目录里面寻找，如下示例
ssh-copy-id -i id_rsa user@hostname
```
- `-i`参数用来指定公钥文件
- `ssh-copy-id`会采用密码登录，系统会提示输入远程服务器的密码
- `ssh-copy-id`直接将公钥添加到远程服务器`authorized_keys`文件的末尾，务必保证`authorized_keys`文件的末尾是换行符（假设该文件已经存在）

## SSH配置相关文件解析

- `/etc/ssh/ssh_config`：SSH全局配置文件位置是
- `~/.ssh/config`：用户个人的配置文件，这个文件优先级大于全局配置文件，该文件没有的话可以自己创建一个
- `~/.ssh/id_rsa.pub`：储存SSH公钥的文件
- `~/.ssh/id_rsa`：储存SSH私钥的文件
- `~/.ssh/known_hosts`：登录过的SSH服务器的公钥指纹

**`known_hosts`文件解析**

`~/.ssh/known_hosts`文件中储存的是`服务器指纹`，服务器指纹其实就是`SSH服务器公钥的哈希值`，每登录过一台服务器后，就会向这个文件添加一个服务器指纹，首次登录时，会验证是否登录的是陌生服务器(从未使用登录过，在`~/.ssh/known_hosts`文件中没有记录)，如果是的话，会有以下输出：

```shell
The authenticity of host 'ip (ip)' can't be established.
ECDSA key fingerprint is SHA256:xxxxxxxxxxxx.
Are you sure you want to continue connecting (yes/no/[fingerprint])? connect to server......
Please type 'yes', 'no' or the fingerprint:
```
选择`yes`后即可走下面的登录流程了。
如果服务器的密钥发生变更(比如重装了SSH服务器)，客户端再次连接时，就会发生公钥指纹不吻合的情况。这时，客户端就会中断连接，并显示一段警告信息。为了顺利登录，有两种办法：
1. 手动修改`~/.ssh/known_hosts`文件，删除该服务器对应的公钥哈希
2. 执行`ssh-keygen -R hostname`命令，`hostname`是该服务器的`主机名/ip`

## ssh-keygen命令常用参数解析

### `-b`指定密钥的二进制位数

- 这个参数值越大，密钥就越不容易破解，但是加密解密的计算开销也会加大。
- `-b`至少为`1024`，为了更安全可以设置为`2048`甚至更高。

### `-C`为密钥文件指定新的注释

`-C`后面一般是写自己的邮箱
```shell
ssh-keygen -t rsa -C "youremail@example.com"
```
### `-f`指定生成的密钥文件路径
```shell
ssh-keygen -t rsa -f ~/.ssh/mykey -C "xx@aa.com"
```
上面命令会在`~/.ssh`文件夹下面生成`mykey`和`mykey.pub`文件

### `-F`查询是否存在某个服务

`-F`参数查询`~/.ssh/known_hosts`文件内是否存在某个服务(域名/IP)

```shell
ssh-keygen -F 66.88.66.8
```
- 如果没找到，什么也不输出
- 如果找到相关服务，会输出如下所示：
```shell
# Host 66.88.66.8 found: line 13
66.88.66.8 ecdsa-sha2-nistp256 xxx
```

### -R 删除某个服务

`-R`参数将已经存在`~/.ssh/known_hosts`文件内的某个`服务器指纹`删除
```shell
ssh-keygen -R 66.88.66.8

# # Host 66.88.66.8 found: line 13
# /Users/xxx/.ssh/known_hosts updated.
# Original contents retained as /Users/xxx/.ssh/known_hosts.old
```

### -t 指定生成密钥的算法

`-t`参数用于指定生成密钥的加密算法，一般是`rsa`或者`dsa`，现在也可以使用新的加密方式`ed25519`

```shell
ssh-keygen -t ed25519 -C "your_email@example.com"
```
## 配置多个ssh-key适配github多账号

- 使用`ssh-keygen`命令生成两个不同的密钥
```shell
ssh-keygen -t rsa -f ~/.ssh/id_rsa_exampl1 -C "exampl1.com"
ssh-keygen -t rsa -f ~/.ssh/id_rsa_exampl2 -C "exampl2.com"
```
- 配置`~/.ssh/config`文件
```shell
Host  github.example1.com
			HostName github.com
			PreferredAuthentications publickey
			IdentityFile ~/.ssh/id_rsa_example1
Host  github.example2.com
			HostName github.com
			PreferredAuthentications publickey
			IdentityFile ~/.ssh/id_rsa_example2
```
如果要使用`example1.com`邮箱生成的`ssh-key`添加远程链接，修改`github.com`为该邮箱的`ssh-key`对应的`Host`，如下：

原先添加远程`remote`的命令为
```shell
git remote add origin git@github.com:username/projectName.git
```
修改为
```shell
git remote add origin git@github.exampl1.com:username/projectName.git
```

