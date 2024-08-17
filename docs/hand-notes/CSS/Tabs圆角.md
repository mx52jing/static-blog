---
layout: doc
---

# Tabs圆角

## Tabs圆角简单效果

- [最终效果预览](https://mx52jing.github.io/Notes/css-related/tabs-round-radius/index.html)

> `css代码`

```css
* {
    padding: 0;
    margin: 0;
}
#app {
    width: 100vw;
    height: 100vh;
    background-color: #F7F8F9;
    padding-top: 100px;
    box-sizing: border-box;
    overflow: hidden;
}
.tabs-box {
    --text-primary-color: #EF4034;
    --bg-primary-color: #E08638;
    --h: 50px;
    --base-radius: 12px;
    width: 380px;
    height: var(--h);
    display: flex;
    background-color: var(--bg-primary-color);
    border-radius: var(--base-radius) var(--base-radius) 0 0;
    margin: 0 auto;
    overflow: hidden;
    cursor: pointer;
}
.tabs-item {
    flex: 1;
    height: var(--h);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: #FFFFFF;
}
.tabs-item--selected {
    color: var(--text-primary-color);
    background-color: #FFFFFF;
    /*添加上面两个圆角*/
    border-radius: var(--base-radius) var(--base-radius) 0 0;
    /*添加box-shadow*/
    box-shadow: var(--base-radius) var(--base-radius) 0 0 #FFFFFF, calc(-1 * var(--base-radius)) var(--base-radius) 0 0 #FFFFFF;
}

.tabs-item--selected::before,
.tabs-item--selected::after {
    content: "";
    width: var(--base-radius);
    height: var(--h);
    position: absolute;
    top: 0;
    background-color: var(--bg-primary-color);
}

.tabs-item--selected::before {
    left: calc(-1 * var(--base-radius));
    border-radius: 0 0 var(--base-radius) 0;
}

.tabs-item--selected::after {
    right: calc(-1 * var(--base-radius));
    border-radius: 0 0 0 var(--base-radius);
}
```

## Tabs圆角升级效果

- [最终效果预览](https://mx52jing.github.io/Notes/css-related/tabs-round-radius-plus/index.html)

> `css代码`

```css
* {
    padding: 0;
    margin: 0;
}
#app {
    width: 100vw;
    height: 100vh;
    background-color: #F7F8F9;
    padding-top: 100px;
    box-sizing: border-box;
    overflow: hidden;
}
.tabs-box {
    --text-primary-color: #EF4034;
    --bg-primary-color: #E08638;
    --h: 50px;
    --base-radius: 12px;
    width: 800px;
    height: var(--h);
    display: flex;
    background-color: var(--bg-primary-color);
    margin: 0 auto;
    border-radius: var(--base-radius) var(--base-radius) 0 0;
    overflow: hidden;
    cursor: pointer;
}
.tabs-item {
    flex: 1;
    height: var(--h);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: #FFFFFF;
    border-radius: var(--base-radius) var(--base-radius) 0 0;
}
.tabs-item--selected {
    color: var(--text-primary-color);
    background-color: #FFFFFF;
    /*添加box-shadow  必须要有这个 这个设置的颜色其实就是圆角的背景色*/
    box-shadow: calc(var(--base-radius) * -2) 40px 0 0 #FFFFFF, calc(var(--base-radius) * 2) 40px 0 0 #FFFFFF;
}

.tabs-item--selected::before,
.tabs-item--selected::after {
    content: "";
    width: var(--base-radius);
    height: var(--h);
    position: absolute;
    top: 0;
    background-color: #FFFFFF;
}

.tabs-item--selected::before {
    left: calc(-.5 * var(--base-radius));
    transform: skewX(-15deg);
    border-radius: var(--base-radius) 0 0 0;
}

.tabs-item--selected::after {
    right: calc(-.5 * var(--base-radius));
    transform: skewX(15deg);
    border-radius: 0 var(--base-radius) 0 0;
}

.tabs-item--not-selected {
    z-index: 2;
}

.tabs-item--not-selected::before,
.tabs-item--not-selected::after {
    content: "";
    width: var(--base-radius);
    height: var(--h);
    position: absolute;
    top: 0;
    background-color: var(--bg-primary-color);
}

.tabs-item--not-selected::before {
    transform: skewX(15deg);
    left: calc(.5 * var(--base-radius));
    border-radius: 0 0 0 var(--base-radius);
}

.tabs-item--not-selected::after {
    transform: skewX(-15deg);
    right: calc(.5 * var(--base-radius));
    border-radius: 0 0 var(--base-radius) 0;
}
```

## 参考

- [实现tabs圆角及反圆角效果](https://juejin.cn/post/7224311569777934392)

- [实现tabs圆角及反圆角效果（PLUS）](https://juejin.cn/post/7230737419842633788)