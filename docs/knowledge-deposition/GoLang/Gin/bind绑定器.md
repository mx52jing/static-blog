---
layout: doc
---

# bind绑定器

- `gin`中的绑定器`bind`可以很方便的将前端传递来的数据与`结构体`进行`参数绑定`，以及`参数校验`

- 在使用这个功能的时候，需要给结构体加上`Tag`, 如：`json`、`form`、`uri`、 `xml`、 `yaml`

## 绑定器API

### ShouldBindJSON

```Go
type User struct {
	UserName string `json:"user_name" form:"user_name" uri:"user_name"`
	Age int `json:"age" form:"age" uri:"age"`
	Sex string `json:"sex" form:"sex" uri:"sex"`
}
```

- 绑定`JSON`数据

- 需要添加`tag` => `json`

```Go
func bodyBindHandler(ctx *gin.Context) {
	var user User
	err := ctx.ShouldBindJSON(&user)
	if err != nil {
		fmt.Println("err", err)
		ctx.JSON(http.StatusOK, gin.H{ "code": -1, "message": "JSON绑定出错"})
		return
	}
	ctx.JSON(http.StatusOK, user)
}
func main() {
	// gin中的bind可以很方便的将 前端传递 来的数据与 结构体 进行 参数绑定 ，以及参数校验
	// 在使用这个功能的时候，需要给结构体加上Tag json form uri xml yaml
	// Must Bind
	router := gin.Default()
	router.POST("/body_bind", bodyBindHandler)
	router.Run(":9100")
}
```

![ShouldBindJSON](/image/go/ShouldBindJSON.png)

### ShouldBindQuery

- 绑定`query`参数

- 需要添加`tag` => `form`

```Go
func queryBindHandler(ctx *gin.Context) {
	var user User
	err := ctx.ShouldBindQuery(&user)
	if err != nil {
		fmt.Println("err", err)
		ctx.JSON(http.StatusOK, gin.H{ "code": -1, "message": "JSON绑定出错"})
		return
	}
	ctx.JSON(http.StatusOK, user)
}
func main() {
	router := gin.Default()
	router.GET("/query_bind", queryBindHandler)
	router.Run(":9100")
}
```

![ShouldBindQuery](/image/go/ShouldBindQuery.png)

### ShouldBindUri

- 绑定`uri`中的`param`

- 需要添加`tag` => `uri`

```Go
func uriBindHandler(ctx *gin.Context) {
	var user User
	err := ctx.ShouldBindUri(&user)
	if err != nil {
		fmt.Println("err", err)
		ctx.JSON(http.StatusOK, gin.H{ "code": -1, "message": "JSON绑定出错"})
		return
	}
	ctx.JSON(http.StatusOK, user)
}
func main() {
	router := gin.Default()
	router.GET("/uri_bind/:user_name/:age/:sex", uriBindHandler)
	router.Run(":9100")
}
```

![ShouldBindUri](/image/go/ShouldBindUri.png)

### ShouldBind

- 可以绑定各种类型，内部根据`Content-Type`做了判断

- `form-data`的参数校验也使用shouldBind，需要将tag标记为form
- 默认的`tag`就是`form`

```Go
func bindHandler(ctx *gin.Context) {
	var user User
	err := ctx.ShouldBind(&user)
	if err != nil {
		fmt.Println("err", err)
		ctx.JSON(http.StatusOK, gin.H{ "code": -1, "message": "JSON绑定出错"})
		return
	}
	ctx.JSON(http.StatusOK, user)
}
func main() {
	router := gin.Default()
	router.POST("/bind", bindHandler)
	router.Run(":9100")
}
```

![ShouldBind](/image/go/ShouldBind.png)

## 参数校验

### 必填校验

- `required`：设置字段为必填项

```Go
type Student struct {
    // required:表示必须上传name参数，使用form tag可以绑定formdata和url里的参数
	Name  string `form:"name" binding:"required"` 
}
```

### 范围约束

- 对于数值，约束其`取值`

```Go
// 对于数值，约束其取值
min 最小值约束 如 binding:"min=6"
max 最大值约束 如 binding:"max=6"
eq 等于，如：binding:"eq=6"
ne 不等于，如：binding:"ne=6"
gt 大于，如：binding:"gt=6"
gte 大于等于，如：binding:"gte=6"
lt 小于，如：binding:"lt=6"
lte 小于等于，如：binding:"lte=6"
oneof 几个值其中的某个 如：binding:"oneof=6 8 10"
```
- 对于`切片`、`数组`、`字符串`、`map`，约束其`长度`

```Go
// 对于切片、数组、字符串、map，约束其长度
len 约束长度，binding:"len=8"
min 约束最小长度 binding:"min=8"
max 约束最大长度 binding:"max=8"
```

### 唯一性`unique`
- 对于`数组`和`切片`，约束其没有重复的元素
  
- 对于`map`，约束其没有相同的`value`
- 对于元素类型为`结构体`的`切片`，unique约束结构体对象的某个字段不重复，通过`unique=field`来指定该字段名称，例如`Students []Student binding:"qunique=Name"`

### 字符串约束

```Go
contains 包含字符串
containsany 包含任意的unicode字符
containsrun 包含rune字符串
excludes 不包含字符串
excludesall 不包含任意的unicode字符
excludesrune 不包含rune字符串
startswith  以某个字符串开头
endswith    以某个字符串结尾
```
### 约束其他字段

- 约束本字段值和其他字段的关系，在使用范围约束的基础上添加`field`后缀

> 例如：

```Go
eqfield：约束该字段的值等于某个字段的值 如：binding:"eqfield=ConfirmPassword"
nefield: 约束该字段的值不等于某个字段的值
gtfield：约束该字段的值大于某字段的值
```

- 如果还`跨结构体（cross struct）`,就需要在跨字段的基础上在`field`的前面添加`cs`

## 自定义校验器

下载相关依赖

```shell
# 这个validator依赖要使用v10 版本
go get github.com/go-playground/validator/v10
```

> 示例代码如下：

```Go
type Student struct {
	Name           string    `form:"name" binding:"required"`       // name字段必须传
	Score          int       `form:"score" binding:"required,gt=0"` // score 必须大于0
	AdmissionDate  time.Time `form:"admission_date" binding:"required,before_today" time_format:"2006-01-02" time_utc:"8"`
	GraduationDate time.Time `form:"graduation_date" binding:"required" time_format:"2006-01-02" time_utc:"8"`
}

// 自定义验证器 校验日期必须在今天之前
var beforeToday validator.Func = func(fl validator.FieldLevel) bool {
	if date, ok := fl.Field().Interface().(time.Time); ok { // 通过反射获得结构体Field的值
		todayDate := time.Now()
		return date.Before(todayDate)
	}
	return false
}

func studentHandler(ctx *gin.Context) {
	var student Student
	// 绑定参数并且完成参数校验
	if err := ctx.ShouldBind(&student); err != nil {
		log.Printf("err is %s", err)
		ctx.JSON(http.StatusOK, gin.H{"msg": "参数错误"})
		return
	}
	ctx.JSON(http.StatusOK, student)
}
```

> 注册上面写好的自定义校验器

```Go
router := gin.Default()
// 注册验证器
if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
    v.RegisterValidation("before_today", beforeToday)
}
router.GET("/s", studentHandler)
router.Run(":9100")
```

## 自定义错误信息

有时候我们想自己为binding绑定器定义一些错误信息，需要在请求参数出错时返回到接口信息中，可以通过`反射`来实现

> 改造结构体如下
> 定义了默认错误`msg`为必填
> 
> 定义Score字段binding中的`gt=0`校验的错误文案为`gt_msg`
> 
> 定义Graduation字段的binding中的`gtfield=AdmissionDate`校验的错误文案为`gtfield_msg`

```Go
type Student struct {
	Name           string    `json:"name" form:"name" binding:"required" msg:"name字段必传"`                               // name字段必须传
	Score          int       `json:"score" form:"score" binding:"required,gt=0" msg:"score字段必传" gt_msg:"score字段必须大于0"` // score 必须大于0
	AdmissionDate  time.Time `json:"admission_date" form:"admission_date" binding:"required,before_today" time_format:"2006-01-02" time_utc:"8" msg:"admission_date字段必传" before_today_msg:"admission_date日期必须在当日之前"`
	GraduationDate time.Time `json:"graduation_date" form:"graduation_date" binding:"required,gtfield=AdmissionDate" time_format:"2006-01-02" time_utc:"8" msg:"graduation_date字段必传" gtfield_msg:"graduation_date必须大于admission_date"`
}
```

> 实现一个解析参数错误的函数

```Go
// 获取参数报错具体信息 originalStruct 是结构体的指针
func parseErrorMessage(err error, originalStruct any) string {
	errs, ok := err.(validator.ValidationErrors)
	// 如果不是校验器校验失败的错误，直接返回错误信息
	if !ok {
		return err.Error()
	}
	var result string
	// 利用反射获取结构体的值
	structData := reflect.TypeOf(originalStruct).Elem()
	for _, errItem := range errs {
		// 获取错误字段在结构体中的key 比如Name/Score
		errFiledName := errItem.Field()
		// 获取当前错误具体的tag名称 比如是required 还是 gtfield
		errFieldTag := errItem.Tag()
		// 获取当前field的tag信息
		var errMsg string
		if field, ok := structData.FieldByName(errFiledName); ok {
			// 先获取当前错误tag的key
			errMsg = field.Tag.Get(fmt.Sprintf("%s_msg", errFieldTag))
			// 当错误不是其他约束错误时 取默认的错误信息
			if len(errMsg) == 0 {
				errMsg = field.Tag.Get("msg")
			}
			var separator string
			if len(errMsg) > 0 {
				separator = "，"
			}
			result += fmt.Sprintf("%s%s", separator, errMsg)
		}
	}
	return result
}
```

> 完整代码如下:

```Go
type Student struct {
	Name           string    `json:"name" form:"name" binding:"required" msg:"name字段必传"`                               // name字段必须传
	Score          int       `json:"score" form:"score" binding:"required,gt=0" msg:"score字段必传" gt_msg:"score字段必须大于0"` // score 必须大于0
	AdmissionDate  time.Time `json:"admission_date" form:"admission_date" binding:"required,before_today" time_format:"2006-01-02" time_utc:"8" msg:"admission_date字段必传" before_today_msg:"admission_date日期必须在当日之前"`
	GraduationDate time.Time `json:"graduation_date" form:"graduation_date" binding:"required,gtfield=AdmissionDate" time_format:"2006-01-02" time_utc:"8" msg:"graduation_date字段必传" gtfield_msg:"graduation_date必须大于admission_date"`
}

func studentHandler(ctx *gin.Context) {
	var student Student
	// 绑定参数并且完成参数校验
	if err := ctx.ShouldBind(&student); err != nil {
		errMsg := parseErrorMessage(err, &student)
		ctx.JSON(http.StatusOK, gin.H{"msg": errMsg})
		return
	}
	ctx.JSON(http.StatusOK, student)
}

// 自定义验证器 校验日期必须在今天之前
var beforeToday validator.Func = func(fl validator.FieldLevel) bool {
	if date, ok := fl.Field().Interface().(time.Time); ok { // 通过反射获得结构体Field的值
		todayDate := time.Now()
		return date.Before(todayDate)
	}
	return false
}
// 获取参数报错具体信息
func parseErrorMessage(err error, originalStruct any) string {
	errs, ok := err.(validator.ValidationErrors)
	// 如果不是校验器校验失败的错误，直接返回错误信息
	if !ok {
		return err.Error()
	}
	var result string
	// 利用反射获取结构体的值
	structData := reflect.TypeOf(originalStruct).Elem()
	for _, errItem := range errs {
		// 获取错误字段在结构体中的key 比如Name/Score
		errFiledName := errItem.Field()
		// 获取当前错误具体的tag名称 比如是required 还是 gtfield
		errFieldTag := errItem.Tag()
		// 获取当前field的tag信息
		var errMsg string
		if field, ok := structData.FieldByName(errFiledName); ok {
			// 先获取当前错误tag的key
			errMsg = field.Tag.Get(fmt.Sprintf("%s_msg", errFieldTag))
			// 当错误不是其他约束错误时 取默认的错误信息
			if len(errMsg) == 0 {
				errMsg = field.Tag.Get("msg")
			}
			var separator string
			if len(errMsg) > 0 {
				separator = "，"
			}
			result += fmt.Sprintf("%s%s", separator, errMsg)
		}
	}
	return result
}

func main() {
	// gin中的bind可以很方便的将 前端传递 来的数据与 结构体 进行 参数绑定 ，以及参数校验
	// 在使用这个功能的时候，需要给结构体加上Tag json form uri xml yaml
	// Must Bind
	router := gin.Default()
	// 注册验证器
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("before_today", beforeToday)
	}
	router.GET("/s", studentHandler)
	router.Run(":9100")
}
```



