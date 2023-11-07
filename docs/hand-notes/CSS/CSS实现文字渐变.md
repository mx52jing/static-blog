---
layout: doc
---

# CSS实现文字渐变

## 代码展示

- 关于`linear-gradient`更多用法详见[这里](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient)
- 关于`background-clip`更多用法详见[这里](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)

```css
.gradient-text {
  background: linear-gradient(to right, blue 20%, red 50%, #FFFFFF);
  width: max-content;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}
```

## 其他

### 效果预览

- [CSS实现文字渐变](https://mx52jing.github.io/Notes/css-related/CSS实现文字渐变/index.html)

### 查看代码

- 查看代码点击[这里](https://github.com/mx52jing/Notes/blob/master/css-related/CSS%E5%AE%9E%E7%8E%B0%E6%96%87%E5%AD%97%E6%B8%90%E5%8F%98/index.html)
 