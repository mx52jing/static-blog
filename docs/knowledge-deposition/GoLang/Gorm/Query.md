---
layout: doc
---

# Query

## 检索单个

### `First`

- 获取按`主键升序`排列的第一条记录

```Go
func queryByFirst() {
	var firstTeacher Teacher
	DB.First(&firstTeacher)
	fmt.Println("firstTeacher =>", firstTeacher)
}
```
> 相当于下面的`SQL`
```SQL
SELECT * FROM `teachers` ORDER BY `teachers`.`id` LIMIT 1;
```

### `Last`

- 获取按`主键降序`排列的最后一条记录

```Go
func queryByLast() {
	var lastTeacher Teacher
	DB.Last(&lastTeacher)
	fmt.Println("lastTeacher =>", lastTeacher)
}
```

> 相当于下面的`SQL`

```SQL
SELECT * FROM `teachers` ORDER BY `teachers`.`id` DESC LIMIT 1;
```

### `Take`

- 获取一条记录，`没有指定排序字段`

```Go
func queryByTake() {
	var takeTeacher Teacher
	DB.Take(&takeTeacher)
	fmt.Println("takeTeacher =>", takeTeacher)
}
```

> 相当于下面的`SQL`

```SQL
SELECT * FROM `teachers` LIMIT 1
```

## 根据主键查询

```Go
func queryByPrimaryKey() {
	var primaryKeyTeacher Teacher
	DB.Take(&primaryKeyTeacher, 8)
	fmt.Println("primaryKeyTeacher =>", primaryKeyTeacher)
}
```

> 相当于下面的`SQL`

```SQL
SELECT * FROM `teachers` WHERE `teachers`.`id` = 8 LIMIT 1;
```

## 查询全部

### `Find`

```Go
func queryAll() {
	var allT []Teacher
	DB.Find(&allT)
	fmt.Println("allT =>", allT)
}
```
> 相当于下面的`SQL`

```SQL
SELECT * FROM `teachers`;
```
## 条件查询

### `Where`

```Go
var conditionT []Teacher
DB.Where("age = ?", "22").Find(&conditionT)
// SELECT * FROM `teachers` WHERE age = '22'

DB.Where("name <> ?", "如燕").Take(&conditionT) // 查询名字不等于如燕的
//  SELECT * FROM `teachers` WHERE name <> '如燕' LIMI 1

// IN
DB.Where("name IN ?", []string{"张三", "如燕"}).Find(&conditionT)
// SELECT * FROM `teachers` WHERE name IN ('张三','如燕')

// LIKE
DB.Where("name LIKE ?", "mul%").Find(&conditionT)
// SELECT * FROM `teachers` WHERE name LIKE 'mul%'

// AND
DB.Where("name LIKE ? AND age >= ?", "mul%", "36").Find(&conditionT)
// SELECT * FROM `teachers` WHERE (name LIKE 'mul%' AND age >= '36')

// BETWEEN AND
DB.Where("age BETWEEN ? AND ?", "38", "60").Find(&conditionT)
// SELECT * FROM `teachers` WHERE (age BETWEEN '38' AND '60')
```

### 根据`Struct`、`Map`、`Slice`查询

```Go
// Struct
DB.Where(&Teacher{Name: "如燕"}).Find(&conditionT)
// SELECT * FROM `teachers` WHERE `teachers`.`name` = '如燕'

DB.Where(&Teacher{Name: "如燕", Age: 22}).Find(&conditionT)
//SELECT * FROM `teachers` WHERE `teachers`.`name` = '如燕' AND `teachers`.`age` = 22

// Map
DB.Where(map[string]interface{}{"name": "如燕"}).Find(&conditionT)
// SELECT * FROM `teachers` WHERE `name` = '如燕'

// Slice 根据主键ID
// 单个主键ID
DB.Where([]int{22}).Find(&conditionT)
// SELECT * FROM `teachers` WHERE `teachers`.`id` = 22

// 多个主键ID
DB.Where([]int{22, 32}).Find(&conditionT)
// SELECT * FROM `teachers` WHERE `teachers`.`id` IN (22,32)
```

:::warning
- 在使用`结构体`进行查询时，不支持查询`0`值，如果查询字段为`0`将忽略该条件
- 要想支持`0`值，可以使用`map`
:::

```Go
DB.Where(&Teacher{Name: "如燕", Age: 0}).Find(&conditionT)
// SELECT * FROM `teachers` WHERE `teachers`.`name` = '如燕'

DB.Where(map[string]interface{}{"name": "如燕", "age": 0}).Find(&conditionT)
// SELECT * FROM `teachers` WHERE `age` = 0 AND `name` = '如燕'
```

## 内联条件查询

- 使用`内联条件`可以省略`Where`


### 使用普通查询条件

```Go
DB.Find(&conditionT, "name = ?", "如燕")
// SELECT * FROM `teachers` WHERE name = '如燕'

DB.Find(&conditionT, "name = ? AND age = ?", "如燕", 22)
//  SELECT * FROM `teachers` WHERE (name = '如燕' AND age = 22)

DB.First(&conditionT, "age >= ?", 22)
// SELECT * FROM `teachers` WHERE age >= 22 ORDER BY `teachers`.`id` LIMIT 1

DB.Last(&conditionT, "name = ? OR age >= ?", "mul%", 20)
// SELECT * FROM `teachers` WHERE (name = 'mul%' OR age >= 20) ORDER BY `teachers`.`id` DESC LIMIT 1
```

### 使用`结构体`、`Slice`、`Map`

```Go
DB.Find(&conditionT, []int{10, 22})
// SELECT * FROM `teachers` WHERE `teachers`.`id` IN (10,22)

DB.Find(&conditionT, map[string]interface{}{
    "Name": "如燕", "Age": 22,
})
// SELECT * FROM `teachers` WHERE `Age` = 22 AND `Name` = '如燕'

DB.Find(&conditionT, Teacher{Name: "如燕"})
// SELECT * FROM `teachers` WHERE `teachers`.`name` = '如燕'
```

## `Not`条件


```Go
DB.Not("name LIKE ?", "mul%").Find(&conditionT)
// SELECT * FROM `teachers` WHERE NOT name LIKE 'mul%'

// 使用Slice根据主键查询
DB.Not([]int{22, 36}).First(&conditionT)
// SELECT * FROM `teachers` WHERE `teachers`.`id` NOT IN (22,36) LIMIT 1

// 使用Map查询
DB.Not(&conditionT, map[string]interface{}{
    "Name": "如燕",
}).Find(&conditionT)
// SELECT * FROM `teachers` WHERE `Name` <> '如燕' 

// 使用结构体查询(不支持0值)
DB.Not(Teacher{Age: 18}).Find(&conditionT)
// SELECT * FROM `teachers` WHERE `teachers`.`age` <> 18
```

## `Or`条件

```Go
DB.Where("name LIKE ?", "mul%").Or("age <> ?", 18).Find(&conditionT)
// SELECT * FROM `teachers` WHERE (name LIKE 'mul%' OR age <> 18)

DB.Where("name = ?", "如燕").Or("age >= 36").Find(&conditionT)
// SELECT * FROM `teachers` WHERE (name = '如燕' OR age >= 36)

DB.Where("name = ?", "如燕").Or(Teacher{Age: 18}).Find(&conditionT)
// SELECT * FROM `teachers` WHERE (name = '如燕' OR `teachers`.`age` = 18)

DB.Where([]int{22, 66}).Or(map[string]interface{}{
    "Name": "如燕",
    "Age":  22,
}).Find(&conditionT)
// SELECT * FROM `teachers` WHERE (`teachers`.`id` IN (22,66) OR (`Age` = 22 AND `Name` = '如燕')) 
```

## `Select`查询选择的字段

- `Select`允许查询指定的字段

```Go
DB.Select("name", "age").Where("age >= ?", 18).Find(&conditionT)
// SELECT `name`,`age` FROM `teachers` WHERE age >= 18

DB.Select("name").Find(&conditionT)
// SELECT `name` FROM `teachers`
```

## `Order` 排序

```Go
DB.Order("age desc").Find(&conditionT)
// SELECT * FROM `teachers` ORDER BY age desc

DB.Order("age desc, created_at").Find(&conditionT)
// SELECT * FROM `teachers` ORDER BY age desc, created_at
```

## `Limit`、`Offset`

- `Limit`：限制指定要检索的最大记录数

- `Offset`：指定要跳过的条数

- 通过`Limit(-1)`或者`Offset(-1)`可消除`Limit`/`Offset`

```Go
DB.Limit(3).Find(&conditionT)
// SELECT * FROM `teachers` LIMIT 3

// 跳过前两条开始查询，并只查询前两条，用于分页，Limit(m) ，m表示要查多少条，Offset(n) n表示跳过多少条后开始查询
DB.Limit(2).Offset(2).Find(&conditionT) 
// SELECT * FROM `teachers` LIMIT 2 OFFSET 2

// 分页示例
limit := 2
page := 1
DB.Limit(limit).Offset((page - 1) * limit).Find(&conditionT)

// 通过 -1 消除 Limit 条件
DB.Limit(10).Find(&conditionT1).Limit(-1).Find(&conditionT2)
// SELECT * FROM teachers LIMIT 10; (conditionT1)
// SELECT * FROM teachers; (conditionT2)
```

## `Scan`

- 将结果`扫描`到`结构体中`，类似于使用`Find`的方式

```Go
type Result struct {
    Name string
    Age  int
}

var res []Result
DB.Model(&Teacher{}).Select("name").Where("name LIKE ?", "mul%").Scan(&res)
// SELECT `name` FROM `teachers` WHERE name LIKE 'mul%'

DB.Table("teachers").Select("name", "name").Where("name LIKE ?", "mul%").Scan(&res)
// DB.Table("teachers").Select("name", "age").Where("name LIKE ?", "mul%").Scan(&res)
```

:::tip
- 如果`Result`结构体定义的`列名`，不存在数据库中，会返回该列名字段的`零值`

- 如果`Select`方法中选择的字段没有定义在`Result`结构体中，也会返回该字段的`零值`
:::

## `Group`分组

- 根据`gender(性别)`分组

```Go
type GroupResult struct {
    Name   string
    Num    int
    Gender int
}
var groupRes []GroupResult
DB.Model(&Teacher{}).
    Select(
        "GROUP_CONCAT(name, '-', age) AS name",
        "count(id) AS num",
        "gender",
    ).
    Group("gender").
    Scan(&groupRes)
// SELECT GROUP_CONCAT(name, '-', age) AS name,count(id) AS num,`gender` FROM `teachers` GROUP BY `gender`
fmt.Println("conditionT =>", groupRes)
// [{李朗-28,杨方-16,仁阔-26,齐虎-22,潘越-28,multiMap1-22,multiMap4-52 7 0} {如燕-18,mapName-332,multiMap3-42 5 1}]
```


## `Raw`使用原生`SQL`

```Go
DB.Raw("SELECT name, age FROM teachers WHERE name LIKE ?", "mul%").Scan(&res)
```