---
layout: doc
---

# 小球交互loading

## 代码实现

> `scss`代码

```scss
@use "sass:math";
.root {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
}
.container {
  $containerSize: 200px; // 外容器宽 高
  $ballSize: 12px; // 小球宽高
  $ballCount: 36; // 小球数量
  $perDeg: math.div(360deg, $ballCount); // 每个小球要旋转的角度
  $animationTime: 2s; // 每个小球动画总时长
  width: $containerSize;
  height: $containerSize;
  position: relative;
  border-radius: 50%;
  .child {
    width: $ballSize;
    height: $ballSize;
    border-radius: 50%;
    background-color: transparent;
    margin-left: math.div(-$ballSize, 2);
    margin-top: math.div(-$ballSize, 2);
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: center math.div($containerSize, 2) + math.div($ballSize, 2);
    transform-style: preserve-3d;
    perspective: 100px;
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: $ballSize;
      height: $ballSize;
      border-radius: 50%;
    }
    &::before {
      top: -$ballSize;
      background-color: #FFFFFF;
      animation: rotate-top-ball $animationTime ease-in infinite;
    }
    &::after {
      top: $ballSize;
      background-color: #111224;
      animation: rotate-bottom-ball $animationTime ease-in infinite;
    }
  }
  @for $i from 1 through $ballCount {
    .child:nth-of-type(#{$i}) {
      transform: rotate($perDeg * ($i - 1));
      &::before,
      &::after {
        animation-delay: math.div($animationTime, $ballCount) * ($i - 1) * -6;
      }
    }
  }
  @keyframes rotate-top-ball {
    25% {
      transform: translate3d(0, 100%, $ballSize);
      animation-timing-function: ease-out;
    }
    50% {
      transform: translate3d(0, 200%, 0);
      animation-timing-function: ease-in;
    }
    75% {
      transform: translate3d(0, 100%, -$ballSize);
      animation-timing-function: ease-out;
    }
  }
  @keyframes rotate-bottom-ball {
    25% {
      transform: translate3d(0, -100%, -$ballSize);
      animation-timing-function: ease-out;
    }
    50% {
      transform: translate3d(0, -200%, 0);
      animation-timing-function: ease-in;
    }
    75% {
      transform: translate3d(0, -100%, $ballSize);
      animation-timing-function: ease-out;
    }
  }
}
```

> `html`代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ball Interactive Loading</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
<div class="root">
    <div class="container">
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
        <div class="child"></div>
    </div>
</div>
</body>
</html>
```

## 预览和源码

- [效果预览](https://mx52jing.github.io/Notes/sass-related/ball-interactive-loading/)

- [查看源码](https://github.com/mx52jing/Notes/tree/master/sass-related/ball-interactive-loading)
