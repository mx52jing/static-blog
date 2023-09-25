---
layout: doc
---

# Delete

## 删除单条

- 删除一条记录时，删除对象需要指定`主键`，否则会触发`批量删除`

```Go
singleD := Teacher{ID: 2}
DB.Delete(&singleD)
// DELETE FROM `teachers` WHERE `teachers`.`id` = 2

singleD := Teacher{ID: 2}
DB.Where("age >= ?", 80).Delete(singleD)
// DELETE FROM `teachers` WHERE age >= 80 AND `teachers`.`id` = 2
```

## 根据主键删除

- `GORM`允许通过`内联条件`指定`主键`来检索对象，但只支持`整型数值`，因为`string`可能导致`SQL注入`

```Go
DB.Delete(&Teacher{}, "10")
// DELETE FROM `teachers` WHERE `teachers`.`id` = '10'

DB.Delete(&Teacher{}, []int{20, 22, 26, 28})
// DELETE FROM `teachers` WHERE `teachers`.`id` IN (20,22,26,28)
```

## 批量删除

- 如果指定的条件不包括`主键`，那么会执行`批量删除`，将会删除`所有匹配的记录`

```Go
DB.Where("name LIKE ?", "元%").Delete(&Teacher{})
// DELETE FROM `teachers` WHERE name LIKE '元%'

DB.Delete(&Teacher{}, "name LIKE ?", "元%")
// DELETE FROM `teachers` WHERE name LIKE '元%'
```