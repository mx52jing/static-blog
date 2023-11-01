---
layout: doc
---

# 通过mixin简化响应式代码

有的响应式代码可能需要写一些适配代码，例如

```css
.home {
  width: 200px;
  height: 300px;
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
  .home {
    height: 800px;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1920px) {
  .home {
    height: 1000px;
  }
}
```

如果每个文件都要写`@media screen ...`这样的代码，会很费时间，可以通过`Sass`的`mixin`来简化代码。

可以定义一个`mixin`函数，通过传入的不同尺寸，生成不同的响应式代码

- 定义一个响应式的不同尺寸对应不同宽度的[map](https://www.sass.hk/skill/sass78.html)结构

```scss
// 定义一个尺寸对应的宽度map
$layouts: (
 'xs': (null, 768px),
 'sm': (768px, 992px),
 'md': (992px, 1200px),
 'lg': (1200px, 1920px),
 'xl': (1920px, null),
);
```

每个尺寸对应的值设置为一个[list](https://www.sass.hk/skill/sass31.html)，我们规定`list`的第一个项为`min-width`，第二项为`max-width`，如果没有就设置为`null`

- 定义`mixin`函数，该函数接收`$breakpoint`参数，默认为`md`，该参数的值就是定义的`map`的`key`，然后取出当前配置的`min-width`和`max-width`的值，然后判断该值的类型生成代码，我们还想在`mixin`函数中写该尺寸对应的样式，可以使用`@content`，将样式传到`@media screen`中

> 完整代码如下，当然`mixin`可以单独提出去一个作为单独文件

```scss
// 定义一个尺寸对应的宽度map
$layouts: (
    'xs': (null, 768px),
    'sm': (768px, 992px),
    'md': (992px, 1200px),
    'lg': (1200px, 1920px),
    'xl': (1920px, null),
);
@mixin respond-to($breakpoint: 'md') {
  // 根据传入的$breakpoint 获取宽度设置，获取到的是一个list
  $sizeList: map-get($layouts, $breakpoint);
  // 取出 list 的第一项 和 第二项
  $min: nth($sizeList, 1);
  $max: nth($sizeList, 2);
  // 最小值为null 表示是 xs
  @if type-of($min) == 'null' {
    @media screen and (max-width: $max){
      @content;
    }
  }
    // 最大值是 null 表示是最大尺寸 xl
  @else if type-of($max) == 'null' {
    @media screen and (min-width: $min){
      @content;
    }
  }
  @else {
    @media screen and (min-width: $min) and (max-width: $max){
      @content;
    }
  }
```

> 可以达到下面的效果

`home.scss`

```scss
.home {
  width: 200px;
  height: 300px;
  display: flex;
  @include respond-to('xs') {
    width: 300px;
    font-size: 14px;
  };
  @include respond-to('sm') {
    width: 500px;
    font-size: 16px;
  };
  @include respond-to('md') {
    width: 800px;
    font-size: 18px;
  };
  @include respond-to('lg') {
    width: 1000px;
    font-size: 24px;
  };
  @include respond-to('xl') {
    width: 100vw;
    font-size: 26px;
  };
}
```

编译后的`home.css`

```css
.home {
    width: 200px;
    height: 300px;
    display: flex;
}
@media screen and (max-width: 768px) {
    .home {
        width: 300px;
        font-size: 14px;
    }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
    .home {
        width: 500px;
        font-size: 16px;
    }
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
    .home {
        width: 800px;
        font-size: 18px;
    }
}
@media screen and (min-width: 1200px) and (max-width: 1920px) {
    .home {
        width: 1000px;
        font-size: 24px;
    }
}
@media screen and (min-width: 1920px) {
    .home {
        width: 100vw;
        font-size: 26px;
    }
}
```

这样想修改对应尺寸或者样式，就很方便了

**相关代码可点击[mixin-optimize-style](https://github.com/mx52jing/Notes/blob/master/sass-related/mixin-optimize-style/index.scss)查看**