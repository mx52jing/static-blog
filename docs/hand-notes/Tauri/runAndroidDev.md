# Tauri 跑通Android App

## 创建项目

```shell
pnpm create tauri-app
```

## 初始化android环境

```shell
pnpm tauri android init
```
可能会报错

```shell
action request:  to initialize Android environment; Android support won't be usable until you fix the issue
below and re-run `tauri android init`!
    Have you installed the NDK? The `NDK_HOME` environment variable is set, but doesn't point to an existing
    directory.
```

上面报错意思是没有获取到`NDK_HOME`这个路径，可以设置一下，下面步骤

1. 检查并设置`java版本`

> `java8`版本太低了，tauri需要`java17`

```shell
java -version
#java version "1.8.0_351"
#Java(TM) SE Runtime Environment (build 1.8.0_351-b10)
#Java HotSpot(TM) 64-Bit Server VM (build 25.351-b10, mixed mode)
```

将这个项目的`java`版本切换到`java17`，不影响全局

- 查看本机`java`版本列表

```shell
jenv versions
```

- 设置该项目`java`版本

```shell
jenv local 17.0.15
```

执行成功后，项目根目录会有一个`.java-version`文件

2. 设置`NDK_HOME`

- 查看本机`ndk`版本

```shell
ls -1 $HOME/Library/Android/sdk/ndk
# 输出如下
#16.1.4479499
#27.2.12479018
```

- 设置环境变量`NDK_HOME`

```shell
export NDK_HOME=$HOME/Library/Android/sdk/ndk/27.2.12479018
```

- 再次执行初始化命令

```shell
pnpm tauri android init
#Generating Android Studio project...
#xxxx
#victory: Project generated successfully!
#    Make cool apps! 🌻 🐕 🎉
```

- 启动`Android`

```shell
pnpm tauri android dev
```

## 设置打包后安装的app的图标

1. 准备图标文件`app-icon.png`，将该文件放入`项目根目录`

2. 生成图标文件

```shell
pnpm tauri icon
```
执行上述命令后，会在`src-tauri/gen/android/app/src/main/res`文件中看到很多图标

## 设置打包后安装的app的名称

- 找到`src-tauri/gen/android/app/src/main/res/values/strings.xml`文件，如下展示，修改标签值就行

```xml
<resources>
    <string name="app_name">xxxxxx</string>
    <string name="main_activity_title">xxxxxx</string>
</resources>
```
