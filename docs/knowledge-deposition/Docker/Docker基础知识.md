---
layout: doc
---

# Docker基础知识

## 基本概念

Docker包括3个基本概念：

- `镜像(Image)`

- `容器(Container)`

- `仓库(Repository)`

### Docker镜像(Image)

- `Docker`镜像是一个特殊的`文件系统`，提供容器运行时所需的`仓库、资源、配置`等文件以及容器运行所需参数。

- 镜像是分层的，每一层叫做一个镜像层，使用`docker  history [IMAGE ID]`查看

- 镜像是有`依赖关系`的，上层的镜像依赖下层的镜像，这样设计的好处是，镜像可以复用

- 镜像是`只读`的，下层的镜像层`不会被修改`，只能`新增镜像层`，所以会越来越多


**获取镜像的几种方式**

- 从仓库获取(`docker pull`)

- 基于`Dockerfile`使用`docker build`命令构建

- 文件载入`docker load`

### Docker容器(Container)

容器的特点：

- 容器是`基于镜像来`运行的，`docker run`命令使用`image`启动了一个运行中的`系统`，就是`container(容器)`。

- 容器是可读写的
- 在容器里面进行的操作不会影响`image`，删除文件也只是在容器里面标记为已删除
- 容器删除，则保存在容器中的数据也会被删除，容器停止，数据不会被删除
- 容器只有被保存成镜像才能被移植到其他地方

### Docker仓库(Repository)

- `Docker`的仓库和`git`仓库差不多，拥有`tag`，`仓库名`，在本地构建完镜像以后，就可以通过仓库分发

- [官方仓库](https://hub.docker.com/)

- [阿里云](https://dev.aliyun.com/search.html)

### 安装

- 进入[官网](https://www.docker.com/)安装系统对应的客户端

**如果需要配置镜像源，可以在客户端设置中配置，如下：**

`任务栏` => `Perferences` => `Docker Engine` 配置，设置完后点击`Apply & restart`按钮重启

执行`docker info`可以查看`Registry Mirrors`查询镜像源是否配置成功

## 查看docker占用磁盘空间信息

- 查看镜像、容器、数据卷所占用空间

```shell
docker system df
```

> 如下所示:

```shell
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          2         2         565.8MB   0B (0%)
Containers      3         3         14B       0B (0%)
Local Volumes   49        2         2.403GB   1.99GB (82%)
Build Cache     26        0         417MB     417MB
```

- 查看其他更多信息使用`docker system --help`查看

## 镜像

### 拉取镜像

- 使用`docker pull`拉取镜像，例如`docker pull nginx`，具体参数可使用`docker pull --help`查看

- 拉取镜像前可以先使用`docker search IMAGE_NAME`查询一下远程仓库是否有该镜像

```shell
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

### 列出镜像

```shell
docker images
docker image ls
```
> 展示如下：

```shell
REPOSITORY   TAG             IMAGE ID       CREATED        SIZE
mysql        latest          c7c54c29e20d   2 months ago   544MB
nginx        1.23.1-alpine   fb0ef98b42c3   7 months ago   22.1MB
```

| name | description |
| :-: | :-: |
| REPOSITORY | 仓库名 |
| TAG | 标签 |
| IMAGE ID | 镜像 ID |
| CREATED | 创建时间 |
| SIZE | 占用空间 |

### 虚悬镜像

:::tip
虚悬镜像是指原本是有名称的，当`官方更新镜像版本`之后，使用`docker pull`时，镜像名称被转移到新镜像身上，旧的镜像名称就成了`none`，`docker build`也会出现此类情况。由于
新旧镜像同名，就镜像名称名称被取消成为`none`，称之为`虚悬镜像`。
:::

![](/image/docker/image_none.png)

如图上面的`<none>`镜像就是`虚悬镜像`
 
#### 查看虚悬镜像

```shell
docker image ls -f dangling=true
```

#### 删除虚悬镜像

```shell
docker image prune
```

### 中间层镜像

- 为了`加速镜像构建`、`重复利用资源`，`Docker`会利用`中间层镜像`，所以在使用一段时间后，可能会看到一些依赖的中间层镜像

- 默认的`docker image ls`列表中只会显示`顶层镜像`，如果希望显示`包括中间层镜像在内的所有镜像`的话，需要加`-a`参数。

```shell
docker image ls -a
```

![](/image/docker/image_middle.png)

这里面的虚悬镜像很多是中间层镜像，不要轻易删除。

### 删除镜像

```shell
docker image rm [options] IMAGE [IMAGE ...]
```

`IMAGE`可以是`镜像ID`、`镜像名称`、`镜像摘要`

- 更精确的是使用**`镜像摘要`**删除镜像

使用`docker image ls --digests`列出本地`Docker`镜像的`摘要信息（digests）`，使用`docker image rm DIGEST`

```shell
REPOSITORY   TAG             DIGEST                                                                    IMAGE ID       CREATED        SIZE
mysql        latest          sha256:2596158f73606ba571e1af29a9c32bec5dc021a2495e4a70d194a9b49664f4d9   c7c54c29e20d   2 months ago   544MB
nginx        1.23.1-alpine   sha256:b87c350e6c69e0dc7069093dcda226c4430f3836682af4f649f2af9e9b5f1c74   fb0ef98b42c3   7 months ago   22.1MB
```

## 容器

### 启动容器

两种方式：

#### 基于镜像新建容器启动

使用`docker run`新建并启动容器
- `-d`              守护状态运行，运行后命令行就会释放出来，可以做其他事
- `-it`             交互状态行运行，一般`-it`用作进入容器内部进行操作
- `--name`          容器的别名，例如`my_nginx`
- `--link`          通过别名访问，例如`web/www`
- `-e`              添加环境变量，例如`MY_ENV=hello`
- `-p`              端口映射，例如`8080:80`
- `--entrypoint`    容器起来首先执行的命令
- `-v`              挂载的数据卷设置`--volumns`
- `--network`       指定网络`bridge、host、overlay`
- `--ip`            指定容器ip

`-d`和`-it`运行效果不同之处如下：

![dorit](/image/docker/dorit.png)

#### 重启终止状态的容器

```shell
docker container start
```
使用`start`命令的前提是容器`【已经生成】`并且`【已经停止运行】`

更多选项通过`docker container start --help`查看

### 查看运行中的容器：

```shell
docker ps 
# 或者 
docker container ls
```

### 终止容器

```shell
docker container stop [OPTIONS] CONTAINER [CONTAINER...]
```
- 通过`docker container stop --help`查看更多帮助

- `终止状态的容器`可以用 **`docker container ls -a`** 命令看到

### 重启容器

```shell
docker container restart [OPTIONS] CONTAINER [CONTAINER...]
```
- 通过`docker container restart --help`查看更多帮助


### 进入运行中的容器

进入运行中的容器：

```shell
docker exec -it ID bash
```
- 详细输入`docker exec --help`查看

### 导出、导入容器

#### 导出容器

```shell
docker export [OPTIONS] CONTAINER
```

#### 导入容器

```shell
docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
```

### 删除容器

- 只能删除`已停止`的容器，如果要删除运行中的容器，需要添加`-f`参数

```shell
docker container rm ID(容器ID)
```

- 删除`已停止/运行中`的容器

```shell
docker container rm -f ID(容器ID)
```
`容器ID`可以通过以下命令获得：

```shell
docker ps
docker container ls  # 获取所有运行中的容器

docker ps -a 
docker container ls -a # 获取本机所有容器
```

- 清理所有`处于终止状态`的容器

```shell
docker container prune
```

- 强行删除所有容器(运行中/已停止的都会全部被删除)

```shell
docker container rm -f (docker container ls -a -q )
```
