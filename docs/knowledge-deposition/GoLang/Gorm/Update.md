---
layout: doc
---

# Update

## 保存所有字段

- `Save`会保存所有字段，包括`零值`

- `Save`是一个`组合函数`，如果保存的数据`不包含主键`，它将执行`Create`，否则将执行`Update`(包含所有字段)

```Go
var first Teacher
DB.First(&first)
first.Name = "First Save"
first.Age = 88
DB.Save(&first)
// UPDATE `teachers` SET `name`='First Save',`age`=88,`gender`=1 WHERE `id` = 1

var s Teacher
s.Age = 98
DB.Save(&s)
// INSERT INTO `teachers` (`name`,`age`,`gender`) VALUES ('',98,0)

DB.Save(&Teacher{ID: 11, Name: "魔灵", Age: 20, Gender: 1})
// UPDATE `teachers` SET `name`='魔灵',`age`=20,`gender`=1 WHERE `id` = 11
```

## 更新单列

- 使用`Update`更新单列时，需要`指定条件`，否则的话会返回`ErrMissingWhereClause`错误

- 当使用了`Model`方法，`且该对象主键有值`，该值会被用于构建条件

```Go
DB.Model(&Teacher{}).Where("age = ? AND gender = ?", "98", "0").Update("name", "动灵")
// UPDATE `teachers` SET `name`='动灵' WHERE age = '98' AND gender = '0'

var u Teacher
DB.Take(&u)
DB.Model(&u).Update("name", "剑灵")
// SELECT * FROM `teachers` LIMIT 1
// UPDATE `teachers` SET `name`='剑灵' WHERE `id` = 1
```

## 更新多列

- `Updates`方法支持`struct`和`map[string]interface{}`参数

- 当使用`struct`更新时，默认情况下，`GORM`只会更新`非零值`的字段

```Go
s := Teacher{ID: 2}
DB.Model(&s).Updates(Teacher{Age: 19})
// UPDATE `teachers` SET `age`=19 WHERE `id` = 2

s := Teacher{ID: 2}
DB.Model(&s).Updates(Teacher{Age: 19, Name: "吴文登"})
// UPDATE `teachers` SET `name`='吴文登',`age`=19 WHERE `id` = 2
```

## 更新指定字段

```Go
// 使用Select指定更新的字段
s := Teacher{ID: 2}
DB.Model(&s).Select("age", "gender").Updates(Teacher{Age: 19, Name: "吴文登", Gender: 1})
// UPDATE `teachers` SET `age`=19,`gender`=1 WHERE `id` = 2
```