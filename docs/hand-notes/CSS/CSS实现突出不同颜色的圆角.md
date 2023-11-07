---
layout: doc
---

# CSS实现突出不同颜色的圆角

## 代码展示

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
  margin-left: 100px;
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

## 其他

### 效果预览

- [CSS实现突出不同颜色的圆角](https://mx52jing.github.io/Notes/css-related/CSS实现突出不同颜色的圆角/index.html)

### 查看代码

- 查看代码点击[这里](https://github.com/mx52jing/Notes/blob/master/css-related/CSS%E5%AE%9E%E7%8E%B0%E7%AA%81%E5%87%BA%E4%B8%8D%E5%90%8C%E9%A2%9C%E8%89%B2%E7%9A%84%E5%9C%86%E8%A7%92/index.html)
 