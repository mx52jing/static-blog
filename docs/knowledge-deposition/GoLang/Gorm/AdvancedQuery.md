---
layout: doc
---

# Advanced Query

## 智能选择字段

- 选择字段可以使用`Select`，但是如果有多个`Select`操作，可以定义一个`结构体`，查询的时候会自动检索结构体中的字段

```Go
type SmartFields struct {
	Name   string
	Age    int
	Gender int
}

var smartT []SmartFields
DB.Model(&Teacher{}).Find(&smartT)
fmt.Println("smartT is=>", smartT)
// SELECT `teachers`.`name`,`teachers`.`age`,`teachers`.`gender` FROM `teachers`
```

## 子查询

- 使用`上次查询的结果`作为`本次查询的参数`

```Go
var subQueryT []Teacher
DB.Where("age >= (?)", DB.Model(&Teacher{}).Select("AVG(age)")).Find(&subQueryT)
fmt.Println("subQueryT is=>", subQueryT)
// SELECT * FROM `teachers` WHERE age >= (SELECT AVG(age) FROM `teachers`)
```

### `FROM`子查询

- 可以在`Table`方法中通过`FROM`子句使用`子查询`

```Go
DB.Table("(?) as t", DB.Model(&Teacher{}).Select("name", "age")).Where("age > ?", 18).Find(&subQueryT)
// SELECT * FROM (SELECT `name`,`age` FROM `teachers`) as t WHERE age > 18
```


## 命名参数

- `GORM`支持`sql.NamedArg`和`map[string]interface{}{}`形式的命名参数

```Go
DB.Where("name1 = @name OR name2 = @name", sql.Named("name", "如燕")).Find(&namedQueryT)
// SELECT * FROM `teachers` WHERE name1 = '如燕' OR name2 = '如燕'

DB.Where("name1 = @name OR name2 = @name", map[string]interface{}{"name": "如燕"}).Find(&namedQueryT)
// SELECT * FROM `teachers` WHERE name1 = '如燕' OR name2 = '如燕'
```

## `Find`到`Map`中

- `GORM`允许扫描结果至`map[string]interface{}`或者`[]map[string]interface{}`

```Go
var res map[string]interface{}
DB.Model(&Teacher{}).Where("age >= ?", 18).Take(&res)
// SELECT * FROM `teachers` WHERE age >= 18 LIMIT 1

var res []map[string]interface{}
DB.Table("teachers").Where("age >= ?", 18).Find(&res)
// SELECT * FROM `teachers` WHERE age >= 18
```

:::warning
使用该查询方法一定要指定`Model`或者`Table`
:::

## `Scopes`

- `Scopes`允许`指定一些常用的查询`，可以在`调用方法时引用这些查询`

```Go
func ageGreaterThan18(db *gorm.DB) *gorm.DB {
	return db.Where("age > ?", 18)
}

func nameLikeMul(db *gorm.DB) *gorm.DB {
	return db.Where("name LIKE ?", "张%")
}

var scopeT Teacher
DB.Scopes(ageGreaterThan18).Find(&scopeT)
// SELECT * FROM `teachers` WHERE age > 18

var scopeT []Teacher
DB.Scopes(ageGreaterThan18, nameLikeMul).Find(&scopeT)
// SELECT * FROM `teachers` WHERE age > 18 AND name LIKE '张%'
```

## `Count`

- 展示查询结果的条数

- 查询出的结果`count`是`int64`类型

```Go
var count int64
DB.Model(&Teacher{}).Where("age >= ?", 18).Count(&count)
// SELECT count(*) FROM `teachers` WHERE age >= 18
```