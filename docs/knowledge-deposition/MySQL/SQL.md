---
layout: doc
---

# SQL

- `SQL`：`Structured Query Language`结构化查询语言

## SQL运算符

- `SQL运算符`是一种符号，它是用来进行列间或者变量之间的`比较`和`数学`运算的

### 算术运算符

|运算符|说明|
|:-:|:-:|
|+|	加运算，求两个数或表达式相加的和，如`1+1`|
|-|	减运算，求两个数或表达式相减的差，如`4-1`|
|*|	乘运算，求两个数或表达式相乘的积，如`2*2`|
|/|	除运算，求两个数或表达式相除的商，如`6/4`的值为`1`|
|%|	取模运算，求两个数或表达式相除的余数，如：`6%4`的值为`2`|

### 逻辑运算符

|运算符|说明|
|:-:|:-:|
|AND|	当且仅当两个布尔表达式都为`true`时，返回`TRUE`
|OR|当且仅当两个布尔表达式都为`false`，返回`FALSE`
|NOT|布尔表达式的值`取反`

### 比较运算符

|运算符|说明|
|:-:|:-:|
|=|等于
|>|大于
|<|小于
|<>|不等于
|>=|大于等于
|<=|小于等于
|!=|不等于

## 数据操作语言
------
### 插入

```SQL
INSERT [INTO] 表名 [(列名)] VALUES (值列表);
```

:::warning
- 每次插入`一行`数据，不能只插入一部分数据，插入的数据是否有效将按照整行的完整性要求来检验

- 每个数据值的`数据类型`、`精度`、`位数`必须与要与`对应的列名`精确匹配
- 不能为`标识符`指定值
- 如果某字段设置为不能为空，则必须插入数据
- 插入数据时还要符合`检查性约束`的要求
- 有`缺省值`的列，可以使用`DEFAULT`关键字来代替插入实际的值
  :::

> 例子

```SQL
INSERT lyb.student (name, age, gender) VALUES ('张三', 22, 0);
INSERT INTO lyb.student (name, age, gender) VALUES ('李四', 28, 0);
```

### 更新

```SQL
UPDATE 表名 SET 列名 = 更新值 [WHERE 更新条件]
```

:::warning
- `多列`时用`逗号`隔开，一定要加`更新条件`以免错误更新

- `多个联合条件`使用`AND`，`a=7 and b='410787'`
- 判断某字段是否为空`xxx is null or xxx = ''`
  :::

> 例子

```SQL
UPDATE student SET name = '李四改', age = 30 WHERE id = '3';
```

### 删除

```SQL
DELETE FROM 表名 [WHERE <删除条件>]
```

:::tip
- `Delete`语句是对`整行`进行操作，因此`不需要提供列名`

- 如果要删除`主表数据`，则要`先删除子表`记录
  :::

> 例子

```SQL
DELETE FROM student WHERE id = '3';
```

### 截断表

```SQL
TRUNCATE TABLE 表名
```

:::tip
- 表中数据会`全部清空`，但`表结构`、`列`、`约束`等`不被改动`

- 不能用于有`外键约束`引用的表
- 标识列重新开始编号
- 因为要删除的数据不会写入日志，数据也不能恢复，所以工作中请尽量不要使用此命令
  :::

### 查询

```SQL
SELECT    <列名> 
FROM      <表名> 
[WHERE    <查询条件表达式>] 
[ORDER BY <排序的列名>[ASC或DESC]]
```

- 查询年龄为`18`的并且按照`id`倒序排列

```SQL
SELECT * from lyb.student WHERE age = '18' ORDER BY id DESC;
```

#### 查询`空行`

```SQL
SELECT *
FROM student
WHERE city is null or city =''
```

#### 限制查询的行数

```SQL
# 查询到第一条符合的就返回
SELECT * FROM student WHERE province = '广东省' LIMIT 1;
```

#### 去重

- `DISTINCT`：从查询结果中返回唯一的值，它可以应用于`一个`或`多个列`，以`消除重复的行`
  
  - 对于`单列`使用`DISTINCT`

  ```SQL
  SELECT DISTINCT 列名 FROM 表名;
  ```
  
  - 对于`多列`使用`DISTINCT`

  ```SQL
  SELECT DISTINCT 列1, 列2, ... FROM 表名;
  ```

> 例子

表结构如下：

```SQL
id,name,age,gender,provience
1,张三,22,0,河南省
2,李四,28,0,江苏省
3,王婉,20,1,上海市
4,李丽,18,1,北京市
5,张环,20,0,广东省
6,如燕,18,1,新疆维吾尔自治区
7,李朗,18,0,陕西省
8,沈涛,18,0,江苏省
9,肖豹,18,0,广东省
10,杨方,22,0,河南省
11,杨方,22,0,河南省
```

`SQL`如下:

```SQL
SELECT DISTINCT province FROM student;

# 结果如下:
/**
河南省
江苏省
上海市
北京市
广东省
新疆维吾尔自治区
陕西省
*/
```

### 模糊查询

- 查询的条件是`模糊`的，`不是特别明确`的

#### 通配符

代替`一个或多个`真正的字符，与`LIKE`关键字一起使用

- `_`：表示`一个任意字符`
- `%`：表示`任意长度的字符串`

```SQL
SELECT * FROM student WHERE name LIKE '_三';
SELECT * FROM student WHERE name LIKE '张%';
```

#### BETWEEN AND

- 查询某一列在指定的规范内的记录，`包括两个边界`

```SQL
SELECT * FROM student WHERE age BETWEEN '20' AND '22';
```

#### IN

- 查询某一列中的值在列出的内容列表中

```SQL
SELECT * FROM student WHERE province IN ('上海市', '广东省');
```

### 函数
------
#### 字符函数
------
##### `CONCAT`拼接字符串

```SQL
SELECT CONCAT(name, '-', age) FROM student WHERE age = '18';

/** 结果如下：
如燕-18
李丽-18
李朗-18
沈涛-18
肖豹-18
*/
```
##### `CONCAT_WS`拼接字符串

```SQL
SELECT CONCAT_WS('-', name, age, gender) FROM student WHERE age = '18';

/** 结果如下：
李丽-18-1
如燕-18-1
李朗-18-0
沈涛-18-0
肖豹-18-0
*/
```

##### `UPPER`转大写字母，`LOWER`转写字母

```SQL
SELECT UPPER(hobby) FROM student;
SELECT LOWER(hobby) FROM student;
```
##### `SUBSTR`：截取字符

```SQL
SUBSTR(string, start_position, length)
```
- `string`：要从中提取子字符串的`源字符串`。

- `start_position`：`起始位置`，表示要提取的子字符串的`起始位置`。它可以是一个`正整数`或`负整数`。
  - 如果是`正整数`，则表示从`左侧`开始的字符位置，其中第一个字符的位置为`1`。
  - 如果是`负整数`，则表示从`右侧`开始的字符位置，其中最后一个字符的位置为`-1`。
- `length`：可选参数，表示要提取的子字符串的`长度`。如果省略该参数，则将提取`从起始位置到源字符串的末尾`的所有字符。

```SQL
# hobby => pingpang

SELECT SUBSTR(hobby, 1) FROM student; # pingpang
SELECT SUBSTR(hobby, 2) FROM student; #  ingpang
SELECT SUBSTR(hobby, 5) FROM student; #     pang
SELECT SUBSTR(hobby, 1, 3) FROM student; # pin
SELECT SUBSTR(hobby, 2, 2) FROM student; # in
SELECT SUBSTR(hobby, -2) FROM student; # ng
SELECT SUBSTR(hobby, -3) FROM student; # ang 从倒数第三个字符截取到最后
SELECT SUBSTR(hobby, -3, 2) FROM student; # an 从倒数第三个字符开始截取两个字符
```

##### `INSTR`：返回字符串索引

- 若字符不在该字符串中，返回`0`

```SQL
# hobby => pingpang

SELECT INSTR(hobby, 'a') FROM student; # 6
SELECT INSTR(hobby, 'o') FROM student; # 0
```
##### 去掉左右空格

```SQL
SELECT TRIM('  pingpang '); 
SELECT LTRIM('  pingpang  '); 
SELECT RTRIM('  pingpang  ');
```

##### 字符串补齐

```SQL
SELECT LPAD('ping', 10, '*'); # ******ping
SELECT RPAD('ping', 8, '1');  # ping1111
```

##### 替换

```SQL
SELECT REPLACE('pingpang', 'p', '-'); # -ing-ang
SELECT REPLACE('pingpang', 'ping', '-'); # -pang
```
##### `FORMAT`：格式化数字

```SQL
FORMAT(number, decimal_places)
```
- `number`：要格式化的`数字`值。

- `decimal_places`：表示要`保留的小数位数`。

```SQL
SELECT FORMAT(1234567.89, 1); # 1,234,567.9
SELECT FORMAT(1234.5678, 2); # 1,234.57
SELECT FORMAT(1234.56, 2); # 1,234.56
```
#### 数学函数
------

##### `ROUND` 四舍五入

```SQL
SELECT ROUND('3.2'); # 3
SELECT ROUND('3.18', '1'); # 3.2
SELECT ROUND('3.14', '1'); # 3.1
SELECT ROUND('3.18', '2'); # 3.18
```

##### `CEIL` 向上取整

```SQL
SELECT CEIL('3.01');  # 4
SELECT CEIL('3.14'); # 4
SELECT CEIL('3.1');  # 4
```

##### `FLOOR` 向下取整

```SQL
SELECT FLOOR('3.01');  # 3
SELECT FLOOR('3.94'); #  3
SELECT FLOOR('3.1');  # 3
```

##### `TRUNCATE` 截断小数位

- `TRUNCATE`函数不进行四舍五入，而是直接`截断小数部分`

```SQL
SELECT TRUNCATE('1.68', '1'); # 1.6
SELECT TRUNCATE('1.6896', '1'); # 1.6
SELECT TRUNCATE('123.456', '2'); # 123.456
```

##### `MOD`取余

```SQL
SELECT MOD(10, 3); # 1
SELECT MOD(8, 4); # 0
```

#### 日期函数
------
 
##### `NOW` 返回日期和时间

```SQL
SELECT NOW(); # 1998-07-01 14:17:39
```

##### `CURDATE` 返回日期

```SQL
SELECT CURDATE(); # 1998-07-01
```

##### `CURTIME` 返回时间

```SQL
SELECT CURTIME(); # 14:20:52
```
##### `CURRENT_TIMESTAMP` 返回日期和时间
------
##### `DATE`：提取日期部分
------
##### `TIME`：提取时间部分
------
##### `YEAR`：提取年份
------
##### `MONTH`：提取月份
------
##### `DAY`：提取日期中的天数
------
##### `HOUR`：提取小时
------
##### `MINUTE`：提取分钟
------
##### `SECOND`：提取秒数
------
##### `STR_TO_DATE`：将字符串转换为日期类型

```SQL
SELECT DATE_FORMAT(NOW(),'%Y年%m月%d日'); # 1998年07月07日
SELECT DATE_FORMAT(NOW(),'%Y年%c月%d日'); # 1998年7月07日
```

|格式符|功能
|:-:|:-:|
|%Y|4位的年份
|%y|2位的年份
|%m|月份(01,02)
|%c|月份(1,2)
|%d|日(01,02)
|%H|小时(24小时制)
|%h|小时(12小时制)
|%i|分钟(00,01)
|%s|秒(00,01)


