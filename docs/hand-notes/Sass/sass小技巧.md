---
layout: doc
---

# sass小技巧

## 在sass中debug

在sass中，可以通过`@debug <expression>` 很方便地在控制台打印出表达式返回的值

```scss
.a {
  @debug '#{1 + 1}'; // 可以看到控制台输出 Debug: 2
  $n: 100;
  @debug '#{$n}' // 可以看到控制台输出 Debug: 100
}
```

## scss中的数学函数

使用数学函数前先引入`math`模块

```scss
@use 'sass:math';
```

### math.random

- `math.random()`：随机返回0-1区间的小数（`不包括1`）

- `math.random($n)`：如传入一个整数参数，随机返回1-n之间的整数，包括1和$n

### math.floor($number)

- 对`$number`向下取整，类似JS中的`Math.floor`

## sass中的字符串函数

使用字符串函数前先引入string模块

```scss
@use 'sass:string';
```

### string.unquote($str)

- 该函数用来剥离字符串的引号，如该字符串本身就不带引号，则返回原字符串

- `$str`不可以是数字类型

```scss
$color: '#FFFFFF';
$w: "888px";
@debug '#{string.unquote($color)}'; // Debug: #FFFFFF
@debug '#{string.unquote($w)}'; // Debug: 888px

$size: 600;
@debug '#{string.unquote($size)}'; // 报错 600 is not a string.
```

## sass中Map对象操作

使用前先引入map模块

```scss
@use 'sass:map';
```

### get($map, $key)

- 获取map中的$key对应的value值，如果不存在返回null

```scss
$sizeMap: ('a': 20, 'b': 30);
$size1: map.get($sizeMap, 'a');
$size2: map.get($sizeMap, 'b');
$size3: map.get($sizeMap, 'c');
@debug $size1; // Debug: 20
@debug $size2; // Debug: 30
@debug $size3; // Debug: null
```

## sass中列表操作

使用前先引入list模块

```scss
@use 'sass:list';
```

### nth($list, $n)

- 获取列表中第`$n`项的值

- 如果$n为负数，则从列表末尾开始获取

- 如果$n超出列表长度会报错

```scss
  $list: (600, 900px, '#FFFFFF');
  $size: list.nth($list, 1);
  $w: list.nth($list, 2);
  $c: list.nth($list, 3);
  $d: list.nth($list, -2);
  //$e: list.nth($list, 4); // 报错 $n: Invalid index 4 for a list with 3 elements.
  @debug $size; // Debug: 600
  @debug $w; // Debug: 900px
  @debug $c; // Debug: #FFFFFF
  @debug $d; // Debug: 900px
  //@debug $e;
```
