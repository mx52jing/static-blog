---
layout: doc
---

# CSS实现类似微信头像效果

工作中可能会遇到实现类似于微信群聊头像自适应的效果，可以借助flex来实现

## 用到的知识点

### :only-child

- `:only-child`伪类表示没有任何兄弟元素的元素

- 该伪类与`:first-child:last-child`和`:nth-child(1):nth-last-child(1)`相同，但是`:only-child`权重小

### :first-child

- `:first-child`伪类表示一组兄弟元素中的第一个元素

### `～`一般兄弟组合器

> 语法: A ~ B

> 例如：p ~ span 表示`同一父元素`下，p元素后面的所有span元素

:::tip
- `.avatar-img:first-child:nth-last-child(2)` 表示该元素既是第一个元素，也是倒数第二个元素，表明当前总共有`2`个类名为`.avatar-img`的元素
:::

## 代码实现

`html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./index.css">
    <title>CSS实现类似微信头像效果</title>
</head>
<body>
<div id="app">
    <div class="avatar-box">
        <img class="avatar-img" src="./img/dog.webp" alt="">
    </div>
    <button id="btn-add">添加新人</button>
</div>
<script>
    const avatarBox = document.querySelector('.avatar-box')
    const btn = document.querySelector('#btn-add')
    btn.addEventListener('click', () => {
       if(avatarBox.childElementCount >= 9) return;
        const img = new Image()
        img.src = "./img/dog.webp"
        img.classList.add('avatar-img')
        avatarBox.insertAdjacentElement('beforeend', img);
    })
</script>
</body>
</html>
```

`css`
```css
#app {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 100px;
}
#btn-add {
    margin-top: 30px;
}
.avatar-box {
    width: 180px;
    height: 180px;
    display: flex;
    justify-content: center;
    /*这一行很关键*/
    align-content: center;
    /*这一行很关键*/
    flex-wrap: wrap-reverse;
    border: 1px solid gray;
}
.avatar-img {
    outline: 1px solid #000000;
    width: 50%;
}
.avatar-img:only-child {
    width: 100%;
}
.avatar-img:nth-last-child(n + 5),
.avatar-img:nth-last-child(n + 5) ~ .avatar-img {
    width: calc(100% / 3);
}
```

## 效果预览


![](/image/css/wechat_avatar.gif)

- [在线预览](https://mx52jing.github.io/Notes/css-related/CSS%E5%AE%9E%E7%8E%B0%E7%B1%BB%E4%BC%BC%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F%E6%95%88%E6%9E%9C/index.html)

- [查看源码](https://github.com/mx52jing/Notes/blob/master/css-related/CSS%E5%AE%9E%E7%8E%B0%E7%B1%BB%E4%BC%BC%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F%E6%95%88%E6%9E%9C/index.html)
