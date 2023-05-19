---
layout: doc
---

# Dockerfile


`Dockerfile`是一个文本文件，其内包含了一条条的`指令(Instruction)`，`每一条指令构建一层`，因此每一条指令的内容，就是描述该层应当如何构建。

## Dockerfile指令

### FROM

- `FROM`指定基础镜像

```shell
FROM basicImage
```

- 定制镜像都要以一个镜像为基础，`FROM`作用就是`指定基础镜像`。

- 在`Dockerfile`中，`FROM`是`必须`的，`必须是第一条指令`。

**`特殊空白镜像`**

- `Docker`存在一个特殊的`scratch`镜像。这个镜像是`虚拟的概念`，不实际存在，表示一个`空白的镜像`。

- 以`scratch`为基础镜像的，表示`不以任何镜像为基础`，所写的指令将作为`镜像第一层`开始存在。

### RUN

- `RUN`表示执行命令

两种格式：

- `shell`格式： RUN <命令>`,如下：

```shell
RUN echo '<h1>hello</h1>' > /usr/share/nginx/html/index.html
```

- `exec`格式：`RUN ["可执行文件", "参数1", "参数2"]`

:::warning
**注意：不要用下面这种写法**

```
FROM basicImage
RUN operation1
RUN operation2
RUN operation3
...
```
:::

因为`Dockerfile`中`每一个指令都会建立一层镜像`，`RUN`也是，每一个`RUN`就新建立一层，在其上执行这些命令，执行结束后，`commit`这一层的修改，构成`新的镜像`，上面这种写法创建了`3层甚至更多镜像`，导致镜像层数过多，而我们并不需要这么多层，所以不提倡

> 推荐写法：

```
FROM basicImage

RUN  yum install -y gcc gcc-c++ make perl-devel \
     && mkdir -p /opt/app/ /opt/source/ \
     && cd /opt/source \
     && 其他操作
```

:::warning
执行`RUN`命令的时候，会`重写hosts文件`，因此在`RUN`之前修改`hosts`文件是无效的
:::

### COPY 

- `COPY`表示复制文件

```shell
COPY 源路径 目标路径

COPY ['源路径1','源路径2', ..., '目标路径']
```

- 和`RUN`指令一样，也有两种格式，一种类似于命令行，一种类似于函数调用

- `COPY`指令是从`构建上下文`目录中的`源路径`的`文件或者目录`复制到`新一层的镜像内`的`目标路径`。

```shell
COPY . ./app
```

- 可以是`多个源路径`，也可以是`通配符`，只要匹配都会选中

```shell
COPY ['xxx*', 'aaa/' '/dir/']
```

- `目标路径`可以是`容器内的绝对路径`，也可以是`相对于工作目录的相对路径（工作目录可以用 WORKDIR 指令来指定）`。目标路径`不需要事先创建`，如果`目录不存在`会在复制文件前`先行创建缺失目录`。

- 使用`COPY`指令，源文件的各种`元数据`都会保留。比如`读、写、执行权限、文件变更时间`等。

### ADD 

- `ADD`：更高级的复制文件

- `ADD`和`COPY`格式以及性质基本一致，在`COPY`基础上加了一些功能。

- `ADD`指令会使`镜像构建缓存失效`，从而可能会令镜像构建变得比较缓慢

- `ADD`具有`自动解压缩`功能，如果需要自动解压缩功能就使用`ADD`，否则如果只是`单纯复制文件`，`COPY`将是更好的选择。

### CMD

- `CMD` 容器启动命令

`CMD`和`RUN`相似，也是两种格式

- shell格式：

```shell
CMD <command>
```

- exec格式：

```shell
CMD ["可执行文件", "参数1", "参数2"...]
```

使用`shell`命令，会被包装为`sh -c`的参数形式进行执行。

例如：
```shell
CMD echo $HOME
```

实际执行中会变为：

```shell
CMD ["sh", "-c", "echo $HOME"]  # 一定要用双引号
```

### ENTRYPOINT

- `ENTRYPOINT`和`CMD`一样，都是配置容器`启动后执行的命令`，`ENTRYPOINT`可以在`docker run`的时候通过`--ectrypoint`传入。

- `ENTRYPOINT`和`RUN`相似，也是两种格式 `exec`格式和 `shell`格式

:::tip
当指定了`ENTRYPOINT`后，`CMD`的含义就发生了改变，不再是直接的运行其命令，而是将`CMD的内容作为参数`传给`ENTRYPOINT`指令。
:::

例如：

```
FROM centos

RUN  yum install ...

...

ENTRYPOINT ["xxx.sh"]

CMD ["aaa"]
```

如上，`aaa`就会作为参数传到执行的`xxx.sh`内

或者是

```
FROM centos

RUN  yum install ...

...

ENTRYPOINT ["xxx.sh"]
```

比如将这个修改`build`成`demo:v1`版本：

```shell
docker build -t demo:v1 .
```
然后在命令行执行

```shell
docker run --name demo_server demo:v1 CMD
```
此时的`CMD`也会作为参数传递给`ENTRYPOINT`运行的命令


### ENV 

- `ENV`设置环境变量

- 指定一个`环境变量`，会被后续`RUN`指令使用，可以在`容器内被脚本或者程序`调用

有两种格式

```shell
ENV key value

#或者

ENV key1=value1 key2=value2 ...
```

> 示例

```shell
...
ENV VERSION 2.2
...

#或者

...
ENV VERSION=2.2 MY_ENV=hello
...
```
:::tip
**如果设置的`环境变量`中间有`空格`，那么环境变量记得用`双引号("")`包裹**

例如：

```shell
ENV XXX "Hello World"
```
:::

### EXPOSE 

- `EXPOSE`暴露端口

```shell
EXPOSE 7100
```

- `EXPOSE`声明容器`运行时`提供的`服务端口`，只是一个声明，不会因为这个声明就开启这个端口的服务。

- `EXPOSE`和`docker run -p <宿主端口>:<容器端口>`区别：

  - `docker run -p <宿主端口>:<容器端口>`：映射`宿主端口`和`容器端口`，就是将容器的对应端口服务`公开给外界访问`

  - `EXPOSE`：仅仅是决定`容器`使用什么端口，不会自动在宿主端口进行端口映射

### WORKDIR 

- `WORKDIR`指定工作目录

- 这个指定的`目录`很重要，会影响很多命令执行时所操作的目录，一定要写对

- `WORKDIR`为后续的`RUN、CMD、ENTRYPOINT`指令`配置工作目录`，以后各层的当前目录就是被指定的目录，如果`目录不存在`，`WORKDIR`会帮助我们`创建目录`


## build 

- 构建镜像

```shell
docker build [OPTIONS] PATH | URL | -

# 例如：

docker build -t nginx:v1 .
```

**镜像构建上下文**

- `docker build`命令末尾会指定一个路径，通常为`.`，这个`.`的作用就是来`指定上下文路径`

- `docker build`这一构建命令的执行，实际上是使用`远程调用`形式在服务端（Docker 引擎）完成。在服务端构建时，有可能需要将`本地的一些文件复制到镜像里面`去，服务器要获取本地需要复制的文件就是要通过这个上下文路径，而这个路径是我们自己在`build`时指定的路径
- `docker build`命令获取到这个路径之后，会将路径下内容打包，传给`Docker引擎`，这样`Docker引擎`收到这个上下文包之后，展开就会得到构建镜像所需文件

- 如果所给出的`URL`不是个`仓库地址`，而是个`tar压缩包`，那么`Docker引擎`会`下载`这个包，并`自动解压缩`，以其作为上下文，开始构建

- 如果标准输入传入的是`文本文件`，则将其视为`Dockerfile`，并开始构建。这种形式由于直接从标准输入中读取`Dockerfile`的内容，它没有上下文，因此不可以像其他方法那样可以将本地文件`COPY`进镜像之类的事情

