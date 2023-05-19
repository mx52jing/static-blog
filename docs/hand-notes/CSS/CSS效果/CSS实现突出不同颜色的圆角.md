---
layout: doc
---

# CSS实现突出不同颜色的圆角

预览点击[这里](https://codepen.io/yuanfang666/pen/NWOBbJL)

> html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class="app">
      <div class="head"></div>
      <div class="box">
       <div class="box-inner"></div>
      </div>
  </div>
</body>
</html>
```
> css

```css
.app {
  width: 300px;
  height: 800px;
  background: #F2F3F5;
}
.head {
  height: 100px;
  background-color: #1989fa;
}
.box {
  background: linear-gradient(to bottom, #1989fa 0, #1989fa 50px, #F2F3F5 50.1px, #F2F3F5 100%);
  padding: 0 10px;
}
.box-inner {
  height: 300px;
  background-color: #FFFFFF;
  border-radius: 16px;
}
```

> 效果如下

![CSS实现突出不同颜色的圆角](/image/css/tuchu-radius.png)
