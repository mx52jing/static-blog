---
layout: doc
---

# CSS实现文字渐变
- 关于`linear-gradient`更多用法详见[这里](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient)
- 关于`background-clip`更多用法详见[这里](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)
- 查看代码点击[这里](https://codepen.io/yuanfang666/pen/YzOgaQE)

> 效果如下

![CSS实现文字渐变](/image/css/linear-gradient-text.png)

```css
.gradient-text {
  background: linear-gradient(to right, blue 20%, red 50%, #FFFFFF);
  width: max-content;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}
```
