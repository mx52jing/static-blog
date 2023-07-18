---
layout: doc
---

# Create

```Go
type Teacher struct {
	gorm.Model
	Name    string `gorm:"type:varchar(32)"`
	Age     uint8
	Gender  uint8
	Created int64 `gorm:"autoCreateTime:milli"`
}
```
## 创建记录

### 创建单条

```Go
func createOneTeacher() {
	teacher := Teacher{
		Name:   "李朗",
		Age:    28,
		Gender: 0,
	}
	DB.Create(&teacher)
}
```
### 创建多条

```Go
func createMultiTeacher() {
	teachers := []Teacher{
		{Name: "杨方", Age: 16, Gender: 0},
		{Name: "仁阔", Age: 26, Gender: 0},
		{Name: "齐虎", Age: 22, Gender: 0},
		{Name: "潘越", Age: 28, Gender: 0},
	}
	DB.Create(&teachers)
}
```

:::tip
- `Create`函数的参数要传递`指针`，不能直接传结构体
:::

## 使用选择的字段创建

### `DB.Select`

- 创建记录并为指定字段分配值

```Go
func createBySelectedField() {
	selectedFieldTeacher := Teacher{
		Name:   "如燕",
		Age:    18,
		Gender: 1,
	}
	DB.Select("Name", "Age").Create(&selectedFieldTeacher)
}
```
> 相当于如下SQL(`Gender`字段没有赋值)

```SQL
INSERT INTO `teachers` (`created_at`,`updated_at`,`name`,`age`,`created`) VALUES ('1998-07-18 22:50:59.5','1998-07-18 22:50:59.5','如燕',18,1689691859500)
```
### `DB.Omit`

- 创建记录并`忽略`要省略的传递字段的值

```Go
func createByOmitField() {
	selectedFieldTeacher := Teacher{
		Name:   "如燕1号",
		Age:    19,
		Gender: 1,
	}
	DB.Omit("Age", "Created").Create(&selectedFieldTeacher)
}
```
> 相当于如下`SQL`，不会为`"Age"`、 `"Created"`这两个字段赋值

```SQL
INSERT INTO `teachers` (`created_at`,`updated_at`,`deleted_at`,`name`,`gender`) VALUES ('1998-07-18 22:55:59.691','1998-07-18 22:55:59.691',NULL,'如燕1号',1)
```

### 通过`map`创建记录

:::tip
通过`map`创建的数据，不会自动填充未设置值的数据
:::

#### 单个`map`

```Go
func createByMap() {
	teacherMap := map[string]interface{}{
		"Name":   "mapName",
		"Age":    36,
		"Gender": 1,
	}
	DB.Model(&Teacher{}).Create(teacherMap)
}
```

> 相当于如下`SQL`，只设置了`age`,`gender`,`name`的值，其他字段的值均未设置

```SQL
INSERT INTO `teachers` (`age`,`gender`,`name`) VALUES (36,1,'mapName')
```

#### 批量插入`map`

```Go
func createByMultiMap() {
	multiMap := []map[string]interface{}{
		{"Name": "multiMap1", "Age": 22},
		{"Name": "multiMap2", "Age": 32},
		{"Name": "multiMap3", "Age": 42},
		{"Name": "multiMap4", "Age": 52},
	}
	DB.Model(&Teacher{}).Create(multiMap)
}
```

> 相当于如下`SQL`

```SQL
INSERT INTO `teachers` (`age`,`name`) VALUES (22,'multiMap1'),(32,'multiMap2'),(42,'multiMap3'),(52,'multiMap4')
```
