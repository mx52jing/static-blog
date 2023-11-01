---
layout: doc
---

# CSS计数器-counter

CSS计数器一般和`伪元素`和`content`属性一起使用，有几个关键的属性

## counter-reset

为计数器`命名`，并设置计数器的`初始值`，如果没设置，初始值默认是`0`

`counter-reset`的值可以是负数，但是不支持小数(`Chrome Version 118.0.5993.117 (Official Build) (arm64)`)，小数都会被处理为`0`

```css
.counter-box {
    counter-reset: box-count; // 设置计数器名称为 box-count，为设置默认值，默认值为0
}

.counter-box {
    counter-reset: box-count 2; // 设置计数器名称为 box-count，设置默认值为2
}
```

`counter-reset`支持多个计数器同时命名，多个计数器直接使用`空格`分割

```css
.multiple-counter__target {
    counter-reset: count-one count-two 10;
}
.multiple-counter__target::before {
    content: counter(count-one);
}
.multiple-counter__target::after {
    content: counter(count-two);
}
```


## counter-increment

该值后面跟一个数字，表示计数每次的变化值，如果没有设置，默认为`1`

:::tip
- 只要使用了`counter-increment`会使当前计数器立即`+每次变化值`

- `counter-increment`可以设置在元素样式中，也可以设置在`元素的伪元素样式`中，如果同时设置，会`+两次每次变化值`

- 计数器的数值变化遵循`HTML`渲染顺序，遇到一个`increment`计数器就变化，使用`counter`输出时就输出此时的计数值
:::

> 如下：未设置计数器初始值，默认为`0`，但是使用了`counter-increment`，就展示为`1`

```css
.auto-increment__target {
    counter-reset: auto-increment;
}
.auto-increment__target::before {
    content: counter(auto-increment); // 展示1
    counter-increment: auto-increment;
}
```

> 如下：未设置计数器初始值，默认为`0`，并且在自身和伪元素中都使用了`counter-increment`，所以最终展示为`2`

```css
.auto-increment__target {
    counter-reset: auto-increment;
    counter-increment: auto-increment;
}
.auto-increment__target::before {
    content: counter(auto-increment); // 展示1
    counter-increment: auto-increment;
}
```

> 如下，自身默认值为`2`，由于`::before`中已经增加了一次，此时`counter`值为`3`，所以`::after`的值为`当前counter的值3 + 1 = 4`

```css
.count_two {
    counter-reset: count-two 2;
}
.count_two::before {
    content: counter(count-two); // 展示3
    counter-increment: count-two;
}
.count_two::after {
    content: counter(count-two); // 展示4
    counter-increment: count-two;
}
```

> 以下效果验证了：计数器的数值变化遵循`HTML`渲染顺序，遇到一个`increment`计数器就变化，使用`counter`输出时就输出此时的计数值

```html
<div class="paint wrap-count">
    <div class="paint-item">
        使用increment增加计数器
        <p class="paint-inner paint-content--increment">使用increment增加计数器</p>
        <p class="paint-inner paint-content--increment">使用increment增加计数器</p>
    </div>
    <div class="paint-item">
        使用increment增加计数器
        <p class="paint-inner paint-content--no-increment">不使用increment增加</p>
        <p class="paint-inner paint-content--no-increment">不使用increment增加</p>
    </div>
</div>
```

```css
.wrap-count {
    counter-reset: wrap-count;
}
.paint-item,
.paint-content--increment {
    counter-increment: wrap-count;
}
.paint-item::before,
.paint-content--increment::before {
    content: counter(wrap-count);
}
.paint-content--no-increment::before {
    content: counter(wrap-count);
}
.paint-inner {
    padding-left: 30px;
}
```

效果如下：

![](/image/css/counter-1.png)


- `counter-increment`支持多个计数器同时设置，多个计数器直接使用`空格`分割

## counter()/counters()

`counter`和`counters`都是一个函数

```css
counter(name)
// 或者是
counter(name, style)

counters(name, string)
// 或者是
counters(name, string, style)
```

这里的`style`的值就是[list-style-type](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type)支持的那些值

### counter

> `counter`函数效果演示

```html
<div class="counter-fn">
    <p class="counter-fn__item">counter函数的演示</p>
    <p class="counter-fn__item">counter函数的演示</p>
    <p class="counter-fn__item">counter函数的演示</p>
    <p class="counter-fn__item">counter函数的演示</p>
</div>
```

```css
/*counter 函数 */
.counter-fn {
    counter-reset: count-fn;
}
.counter-fn__item {
    counter-increment: count-fn;
}
.counter-fn__item::before {
    content: counter(count-fn, decimal) '）';
}
```

> 效果如下

![](/image/css/counter-2.png)

### counters

```html
<div class="counters-reset">
    <div class="counters-increment">counters-parent</div>
    <div class="counters-reset">
        <div class="counters-increment">counters-children</div>
        <div class="counters-increment">counters-children</div>
        <div class="counters-reset">
            <div class="counters-increment">counters-children</div>
            <div class="counters-increment">counters-children</div>
        </div>
    </div>
    <div class="counters-reset">
        <div class="counters-increment">counters-children</div>
        <div class="counters-increment">counters-children</div>
    </div>
</div>
```

```css
/*counters 函数 */
.counters-reset {
    padding-left: 20px;
    counter-reset: counters-change;
}
.counters-increment {
    counter-increment: counters-change;
}
.counters-increment::before {
    content: counters(counters-change, '-', decimal) '. ';
}
```

> 效果如下：

![](/image/css/counter-3.png)

:::tip
- 一个元素如果设置了`counter-increment`, 但是设置了`display: none`，则此计数值是不会增加的。`visibility: hidden`以及其他样式不会有此现象。
:::