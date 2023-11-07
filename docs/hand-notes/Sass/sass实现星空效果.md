---
layout: doc
---

# sass实现星空效果

## 代码展示

`html`代码

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./index.css">
    <title>星空效果</title>
</head>
<body>
<div class="star-container">
    <div class="star-layer1"></div>
    <div class="star-layer2"></div>
    <div class="star-layer3"></div>
    <div class="star-layer4"></div>
    <div class="star-layer5"></div>
    <div class="star-text">星空效果</div>
</div>
</body>
</html>
```

`scss代码`

```scss
@use 'sass:math';
@use 'sass:string';

// 定义小星星的box-shadow样式 $n 是需要生成多少个box-shadow
@function generateShadows($n: 100) {
  // 定义box-shadow
  $shadows: '#{math.random(math.floor(100))}vw #{math.random(math.floor(100))}vh #FFFFFF';
  @for $i from 2 through $n {
    $shadows: '#{$shadows}, #{math.random(math.floor(100))}vw #{math.random(math.floor(100))}vh #FFFFFF'
  }
  // string.unquote 用来去除 引号 比如
  @return string.unquote($shadows);
}

$moveDuration: 600s; // 定义一个基准时间，表明动画需要多少s，每层的时间不一样，离得远的速度慢
$starCount: 666; // 定义 星星数量 逐层减少，
.star-container {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow-y: hidden;
  .star-text {
    position: absolute;
    font-size: 60px;
    left: 50%;
    top: 50%;
    background: linear-gradient(#FFFFFF, #1b2735);
    transform: translate3d(-50%, -50%, 0);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    letter-spacing: 10px;
  }
  // 循环生成 星星
  @for $i from 1 through 5 {
    $moveDuration: math.floor(math.div($moveDuration, 2)); // 每层动画时间逐渐减少，从远到近慢慢变快
    $starCount: math.floor(math.div($starCount, 2)); // 每层星星数量逐渐减少
    .star-layer#{$i} {
      position: fixed;
      width: #{$i * 2}px;
      height: #{$i * 2}px;
      background: #FFFFFF;
      box-shadow: generateShadows($starCount);
      border-radius: 50%;
      animation: starMove $moveDuration linear infinite;
      &::before { // 为了防止动画闪动，再复制一屏同样的元素到底部，这样动画可以无缝衔接
        content: '';
        width: inherit;
        height: inherit;
        border-radius: inherit;
        background: inherit;
        box-shadow: inherit;
        position: fixed;
        left: 0;
        top: 100vh;
      }
    }
  };
}

@keyframes starMove {
  to {
    transform: translate3d(0, -100vh, 0);
  }
}
```

## 其他

### 效果预览

- [星空效果](https://mx52jing.github.io/Notes/sass-related/starry-sky/index.html)