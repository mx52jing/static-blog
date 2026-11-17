# Python 速通（写给 JS/TS + Rust 开发者）

> 目标：已经熟悉 `JS/TS` 和 `Rust`，想尽快用 `Python` 写 `AI Agent`。
>
> 本文只讲「和你已知语言不一样的地方」以及「写 Agent 一定会用到的部分」，基于 `Python 3.12+`，所有示例均可直接运行。

## 心智模型

先用一张表把 `Python` 放到你已有的坐标系里：

| 维度 | JS/TS | Rust | Python |
| --- | --- | --- | --- |
| 类型系统 | 动态 + TS 静态检查（编译期擦除） | 静态强类型 | 动态强类型 + 类型标注（运行时不检查） |
| 内存 | GC | 所有权 | 引用计数 + GC |
| 代码块 | 花括号 | 花括号 | **缩进**（4 空格） |
| 空值 | `null` / `undefined` | `Option` | 只有 `None` |
| 错误处理 | `try/catch` | `Result` + `?` | `try/except`（异常是主流程的一部分） |
| 异步 | Promise（创建即执行） | Future（惰性） | 协程（**惰性**，更像 Rust） |
| 并发 | 单线程事件循环 | 真多线程 | 有 GIL，线程不能并行跑 CPU 任务 |
| 包管理 | `npm` / `pnpm` | `cargo` | `uv`（推荐）/ `pip` |
| 命名风格 | `camelCase` | `snake_case` | `snake_case`，类名 `PascalCase` |

几句话总结：

- 语法手感接近 `JS`（动态、灵活、鸭子类型），工程习惯接近 `Rust`（`snake_case`、惰性 `Future`、`trait` 风格的协议）
- 类型标注相当于 `TS`：只给工具（`pyright`/`mypy`）和人看，**运行时不生效**；想要运行时校验用 `pydantic`
- 一切皆对象，变量只是名字（引用），赋值永远不拷贝

## 环境与工具链

用 `mise` + `uv`：`mise` 负责安装 `uv`，`uv` 负责管理 `Python` 版本、虚拟环境和依赖。`uv` 相当于 `cargo` + `nvm` + `pnpm` 三合一（本身也是 Rust 写的）。

```shell
# 用 mise 安装 uv（mise 只负责管理 uv 这个工具本身）
mise use -g uv@latest
uv --version

# Python 版本交给 uv 管理，不用 mise 装 Python
uv python install 3.13     # 安装 Python 版本（≈ nvm install）
uv python list             # 查看已安装 / 可安装的版本
uv python pin 3.13         # 在项目里固定版本，写入 .python-version（≈ .nvmrc）
uv init my-agent           # 创建项目（≈ cargo new），生成 pyproject.toml
cd my-agent
uv add httpx pydantic      # 添加依赖（≈ pnpm add / cargo add）
uv add --dev ruff pytest   # 添加开发依赖
uv run main.py             # 在项目虚拟环境里运行（≈ cargo run）
uv sync                    # 按 lock 文件安装依赖（≈ pnpm install）
uvx ruff check .           # 临时运行某个工具（≈ npx）
```

| 概念 | JS | Rust | Python |
| --- | --- | --- | --- |
| 项目清单 | `package.json` | `Cargo.toml` | `pyproject.toml` |
| lock 文件 | `pnpm-lock.yaml` | `Cargo.lock` | `uv.lock` |
| 依赖目录 | `node_modules` | `target` | `.venv`（虚拟环境） |
| 格式化 + lint | `prettier` + `eslint` | `rustfmt` + `clippy` | `ruff format` + `ruff check` |
| 类型检查 | `tsc` | `rustc` | `pyright` / `mypy` |
| 测试 | `vitest` | `cargo test` | `pytest` |
| REPL | `node` | 无 | `python` |

:::tip 虚拟环境是什么
`.venv` 就是「项目私有的 `node_modules` + 解释器」。`Python` 默认把包装到全局，所以每个项目要有自己的虚拟环境来隔离依赖。用 `uv run` 时会自动使用它，不需要手动 `source .venv/bin/activate`。
:::

## 基础语法

### 变量与基本类型

```python
# 没有 let/const，直接赋值；没有分号；注释用 #
name = "mex"            # str
age = 18               # int（任意精度，不会溢出）
price = 9.9            # float（64 位，等同 JS number / Rust f64）
ok = True              # bool：True / False 首字母大写
nothing = None         # 唯一的空值，对应 null / undefined / Option::None

MAX_STEPS = 10         # 没有真正的常量，全大写只是约定

# 多重赋值、交换
a, b = 1, 2
a, b = b, a

# 数值运算
print(7 / 2)           # 3.5   除法永远得到 float
print(7 // 2)          # 3     整除（向下取整）
print(-7 // 2)         # -4    注意是向下取整，不是向 0 取整
print(7 % 3, 2 ** 10)  # 1 1024  ** 是幂运算
print(2 ** 100)        # 1267650600228229401496703205376  大整数原生支持
print(1_000_000)       # 数字分隔符，同 Rust

# 类型转换必须显式（强类型，不会像 JS 那样隐式转换）
print(int("42") + 1, str(42) + "1", float("3.14"))  # 43 421 3.14
# "1" + 1  -> TypeError，不是 "11"

print(type(age), isinstance(age, int))  # <class 'int'> True
```

### 运算符差异

```python
x = 5

# 逻辑运算符是单词：and / or / not（没有 && || !）
print(x > 0 and x < 10)   # True
print(0 < x < 10)         # True  链式比较，Python 特色

# == 比较值；is 比较是否同一个对象（≈ JS 的 ===作用于对象 / Rust 的 ptr::eq）
a, b = [1, 2], [1, 2]
print(a == b, a is b)     # True False
# 判断 None 一律用 is
value = None
print(value is None, value is not None)  # True False

# 三元表达式：顺序和 JS 不同
label = "成年" if x >= 18 else "未成年"

# in：成员判断
print(2 in [1, 2, 3], "ell" in "hello", "k" in {"k": 1})  # True True True

# 海象运算符 := ，在表达式里赋值（≈ Rust 的 if let 用途之一）
data = {"user": {"name": "mex"}}
if (user := data.get("user")) is not None:
    print(user["name"])

# 没有 ++ / --，用 += 1
x += 1
```

:::warning `or` 不等于 `??`
`a or b` 在 `a` 为任何假值（`0`、`""`、`[]`、`None`）时都取 `b`，等同于 JS 的 `||`。

`Python` 没有 `??`，需要写成 `a if a is not None else b`；也没有可选链 `?.`。
:::

### 真值规则

和 JS 最大的区别：**空容器是假值**。

```python
# 假值：None、False、0、0.0、""、[]、{}、set()、()
# JS 里 [] 和 {} 是真值，Python 里是假值！

items = []
if not items:           # 判断空列表的惯用写法，不用 len(items) == 0
    print("empty")

# 但要区分「空」和「None」时必须用 is None
def f(limit=None):
    if limit is None:   # 不要写 if not limit，否则 limit=0 也会进来
        limit = 10
    return limit

print(f(), f(0))        # 10 0
```

### 字符串

```python
name, score = "mex", 95.5678

# f-string ≈ JS 模板字符串 / Rust format!
print(f"{name} 得分 {score:.2f}")        # mex 得分 95.57
print(f"{name!r} {score=}")              # 'mex' score=95.5678   !r 是 repr，= 用于调试
print(f"{1000000:,} | {42:>6} | {0.256:.1%}")  # 1,000,000 |     42 | 25.6%
print(f"JSON: {{\"a\": 1}}")             # 字面量花括号要写两遍

# 单双引号等价；三引号是多行字符串（写 prompt 必备）
prompt = f"""你是一个助手。
用户名：{name}
"""

# 原始字符串（不转义），常用于正则
path = r"C:\new\table"

# 常用方法（字符串不可变，方法都返回新字符串）
s = "  Hello, World  "
print(s.strip().lower().replace("world", "py"))  # hello, py
print("a,b,c".split(","), "-".join(["a", "b"]))  # ['a', 'b', 'c'] a-b
print(s.strip().startswith("Hello"), len(s))     # True 16
print("abc"[0], "abc"[-1], "abcdef"[1:4])        # a c bcd   没有 char 类型

# str 与 bytes 严格区分（≈ Rust 的 String 与 Vec<u8>）
raw = "你好".encode("utf-8")
print(raw, raw.decode("utf-8"))  # b'\xe4\xbd\xa0\xe5\xa5\xbd' 你好
```

## 容器

| Python | JS | Rust | 特点 |
| --- | --- | --- | --- |
| `list` | `Array` | `Vec` | 可变、有序 |
| `tuple` | 只读元组 | 元组 | 不可变、可哈希 |
| `dict` | `Map` / 对象 | `HashMap` | 保持插入顺序 |
| `set` | `Set` | `HashSet` | 无序、去重 |

### list 与切片

```python
nums = [3, 1, 2]

nums.append(4)              # push
nums.extend([5, 6])         # push(...arr)
nums.insert(0, 0)           # 在下标 0 处插入
last = nums.pop()           # 弹出末尾；pop(0) 弹出开头
print(len(nums), nums)      # 6 [0, 3, 1, 2, 4, 5]   长度用 len()，不是 .length

# 负数下标 & 切片 [start:stop:step]，左闭右开
print(nums[-1])             # 5       最后一个
print(nums[1:3])            # [3, 1]
print(nums[:2], nums[2:])   # [0, 3] [1, 2, 4, 5]
print(nums[::-1])           # [5, 4, 2, 1, 3, 0]  反转
copy = nums[:]              # 浅拷贝

# 排序：sorted 返回新列表，.sort() 原地排序且返回 None
print(sorted(nums, reverse=True))          # [5, 4, 3, 2, 1, 0]
words = ["banana", "fig", "apple"]
words.sort(key=len)                        # key 函数，≈ sort_by_key
print(words)                               # ['fig', 'apple', 'banana']

# 常用内置函数
print(sum(nums), min(nums), max(nums))     # 15 0 5
print(any(n > 3 for n in nums), all(n >= 0 for n in nums))  # True True

# 下标越界会抛 IndexError（JS 返回 undefined）
```

### tuple 与解包

```python
point = (1, 2)             # 不可变；单元素元组要写 (1,)
x, y = point               # 解构

first, *rest = [1, 2, 3, 4]        # ≈ const [first, ...rest] = arr
print(first, rest)                 # 1 [2, 3, 4]
head, *_, tail = [1, 2, 3, 4]      # _ 表示不关心
print(head, tail)                  # 1 4

# 函数返回多个值，本质是返回 tuple
def min_max(xs):
    return min(xs), max(xs)

lo, hi = min_max([3, 1, 2])
print(lo, hi)                      # 1 3

# 展开
a, b = [1, 2], [3, 4]
print([*a, *b])                    # [1, 2, 3, 4]  ≈ [...a, ...b]
```

### dict

```python
user = {"name": "mex", "age": 18}   # key 必须加引号，没有 JS 的简写

print(user["name"])                # mex
# user["email"]                    # key 不存在 -> KeyError（JS 是 undefined）
print(user.get("email"))           # None       安全访问
print(user.get("email", "无"))     # 无         带默认值

user["email"] = "a@b.c"            # 新增 / 修改
del user["age"]                    # 删除
print("name" in user)              # True       判断 key 是否存在

# 遍历
for key, value in user.items():    # ≈ Object.entries
    print(key, value)
print(list(user.keys()), list(user.values()))

# 合并
defaults = {"model": "x", "temperature": 0.7}
config = {**defaults, "temperature": 0}     # ≈ {...defaults, temperature: 0}
config2 = defaults | {"stream": True}       # 3.9+ 合并运算符
print(config, config2)

# 注意：dict 不能用点访问属性，user.name 会报错
# 想用点访问，请用 dataclass / pydantic（见后文）
```

### set

```python
a, b = {1, 2, 3}, {3, 4}
print(a | b, a & b, a - b)       # {1, 2, 3, 4} {3} {1, 2}
print(list(set([1, 1, 2])))      # [1, 2]  去重
empty = set()                    # 注意 {} 是空 dict，不是空 set
```

### 推导式

`Python` 里 `map`/`filter` 很少直接用，惯用写法是推导式，相当于 Rust 的 `iter().filter().map().collect()`。

```python
nums = [1, 2, 3, 4, 5]

# [表达式 for 变量 in 可迭代对象 if 条件]
squares = [n * n for n in nums if n % 2 == 1]    # nums.filter(...).map(...)
print(squares)                                   # [1, 9, 25]

# dict / set 推导式
index = {n: n * n for n in nums}                 # {1: 1, 2: 4, ...}
unique = {n % 3 for n in nums}                   # {0, 1, 2}

# 嵌套：拍平二维数组（≈ flat / flatten）
matrix = [[1, 2], [3, 4]]
flat = [x for row in matrix for x in row]        # [1, 2, 3, 4]

# 生成器表达式：圆括号，惰性求值，不占内存（≈ Rust 的 iterator）
total = sum(n * n for n in nums)                 # 55
print(index, unique, flat, total)
```

## 控制流

```python
# if / elif / else，条件不加括号，冒号 + 缩进
score = 85
if score >= 90:
    grade = "A"
elif score >= 60:
    grade = "B"
else:
    grade = "C"

# for 只有 for...in 一种形式（≈ JS 的 for...of / Rust 的 for in）
for i in range(3):                 # 0 1 2          ≈ 0..3
    pass                           # pass 是空语句占位符
for i in range(10, 0, -3):         # 10 7 4 1       (start, stop, step)
    pass

names = ["a", "b", "c"]
for i, name in enumerate(names):            # ≈ .entries() / .iter().enumerate()
    print(i, name)
for name, n in zip(names, [1, 2, 3]):       # ≈ .iter().zip()
    print(name, n)

# while；没有 do...while；break / continue 相同
n = 0
while True:
    n += 1
    if n >= 3:
        break

# for...else：循环没有被 break 时执行 else（少见但会读到）
for x in [1, 3, 5]:
    if x % 2 == 0:
        break
else:
    print("没有偶数")
```

:::warning 没有块级作用域
`Python` 只有函数作用域（类似 `var`），`if`/`for` 里定义的变量在块外仍然可用：

```python
for i in range(3):
    last = i
print(i, last)  # 2 2
```
:::

### match 模式匹配

`3.10+` 支持，能力接近 Rust 的 `match`（但不做穷尽性检查），解析 LLM 返回的结构化数据时非常好用。

```python
def handle(block: dict) -> str:
    match block:
        case {"type": "text", "text": str(text)}:
            return f"文本: {text}"
        case {"type": "tool_use", "name": name, "input": {**args}}:
            return f"调用工具 {name}，参数 {args}"
        case {"type": "image" | "audio" as kind}:
            return f"多媒体: {kind}"
        case _:
            return "未知"

print(handle({"type": "text", "text": "hi"}))                          # 文本: hi
print(handle({"type": "tool_use", "name": "search", "input": {"q": 1}}))  # 调用工具 search，参数 {'q': 1}
print(handle({"type": "audio"}))                                       # 多媒体: audio

# 也可以匹配序列、字面量、带守卫
def describe(cmd: list[str]) -> str:
    match cmd:
        case []:
            return "空命令"
        case ["cd", path]:
            return f"切换到 {path}"
        case ["rm", *files] if len(files) > 3:
            return "删除太多文件"
        case [name, *_]:
            return f"执行 {name}"

print(describe(["cd", "/tmp"]), describe(["ls", "-la"]))  # 切换到 /tmp 执行 ls
```

## 函数

### 参数

```python
# 默认参数、关键字参数
def greet(name: str, greeting: str = "你好", *, excited: bool = False) -> str:
    """文档字符串（docstring）：写在函数体第一行，工具和 LLM 都会读它。"""
    return f"{greeting}, {name}{'!' if excited else ''}"

print(greet("mex"))                         # 你好, mex
print(greet("mex", greeting="Hi"))          # Hi, mex     按名字传参，JS 没有这个能力
print(greet("mex", excited=True))           # 你好, mex!  * 之后的参数只能按名字传

# *args 收集位置参数（tuple），**kwargs 收集关键字参数（dict）
def log(level: str, *args, **kwargs):
    print(level, args, kwargs)

log("INFO", 1, 2, user="mex")               # INFO (1, 2) {'user': 'mex'}

# 调用时展开：* 展开序列，** 展开 dict（把 dict 当作具名参数传入，极常用）
params = {"name": "mex", "greeting": "Hey"}
print(greet(**params))                     # Hey, mex

# 没有 return 的函数返回 None
```

:::danger 可变默认参数陷阱
默认值只在**函数定义时**求值一次，可变对象会在多次调用间共享：

```python
def bad(item, items=[]):
    items.append(item)
    return items

print(bad(1), bad(2))    # [1, 2] [1, 2]  不是 [1] [2]！

def good(item, items=None):   # 正确写法
    if items is None:
        items = []
    items.append(item)
    return items

print(good(1), good(2))  # [1] [2]
```
:::

### lambda 与闭包

```python
# lambda 只能写单个表达式，复杂逻辑用 def（函数可以嵌套定义）
double = lambda x: x * 2
print(sorted([("b", 2), ("a", 1)], key=lambda p: p[1]))  # [('a', 1), ('b', 2)]

# 闭包：读外层变量没问题，「重新赋值」需要 nonlocal
def make_counter():
    count = 0
    def inc():
        nonlocal count      # 不写这行，count += 1 会报 UnboundLocalError
        count += 1
        return count
    return inc

counter = make_counter()
print(counter(), counter())   # 1 2

# 函数是一等公民
def apply(fn, value):
    return fn(value)

print(apply(double, 21), apply(str.upper, "hi"))  # 42 HI
```

### 装饰器

装饰器就是「接收函数、返回新函数」的高阶函数，`@` 只是语法糖。`Agent` 框架里注册工具（`@tool`）、路由（`@app.get`）、重试全靠它。

```python
import functools
import time

# 1. 最基本的装饰器
def timer(fn):
    @functools.wraps(fn)                # 保留原函数的 __name__ 和 docstring
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return fn(*args, **kwargs)
        finally:
            print(f"{fn.__name__} 耗时 {time.perf_counter() - start:.4f}s")
    return wrapper

@timer                                  # 等价于 work = timer(work)
def work(n: int) -> int:
    return sum(range(n))

print(work(100_000))

# 2. 带参数的装饰器：多包一层
def retry(times: int = 3):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return fn(*args, **kwargs)
                except Exception as e:
                    print(f"第 {attempt} 次失败: {e}")
                    if attempt == times:
                        raise
        return wrapper
    return decorator

calls = 0

@retry(times=3)
def flaky() -> str:
    global calls                        # 修改模块级变量需要 global
    calls += 1
    if calls < 3:
        raise ValueError("网络抖动")
    return "ok"

print(flaky())                          # 失败两次后输出 ok
```

## 类与数据结构

### class

```python
class Agent:
    default_model = "some-model"            # 类属性（≈ static）

    def __init__(self, name: str, tools: list[str] | None = None):   # 构造函数
        self.name = name                    # 实例属性在这里定义
        self.tools = tools or []
        self._history: list[str] = []       # 单下划线：约定为私有（并不强制）

    # 实例方法第一个参数必须显式写 self（≈ Rust 的 &self）
    def run(self, prompt: str) -> str:
        self._history.append(prompt)
        return f"[{self.name}] {prompt}"

    @property                               # getter：像属性一样访问
    def steps(self) -> int:
        return len(self._history)

    @classmethod                            # 备用构造函数（≈ Rust 的关联函数 Agent::from_config）
    def from_config(cls, config: dict) -> "Agent":
        return cls(config["name"], config.get("tools"))

    @staticmethod
    def version() -> str:
        return "1.0"

    # 魔术方法（dunder）：≈ 实现 Rust 的 trait
    def __repr__(self) -> str:              # ≈ Debug
        return f"Agent(name={self.name!r})"

    def __len__(self) -> int:               # 让 len(agent) 可用
        return len(self.tools)


agent = Agent.from_config({"name": "coder", "tools": ["bash"]})   # 没有 new 关键字
print(agent.run("hi"), agent.steps, len(agent), agent)
# [coder] hi 1 1 Agent(name='coder')
```

常见魔术方法与 Rust trait 的对应：

| Python | Rust | 作用 |
| --- | --- | --- |
| `__repr__` / `__str__` | `Debug` / `Display` | 打印 |
| `__eq__` / `__hash__` | `PartialEq` / `Hash` | 相等与哈希 |
| `__lt__` | `PartialOrd` | 比较 |
| `__iter__` / `__next__` | `IntoIterator` / `Iterator` | 迭代 |
| `__getitem__` | `Index` | `obj[key]` |
| `__call__` | `Fn` | 让实例可以像函数一样调用 |
| `__enter__` / `__exit__` | `Drop`（RAII） | `with` 语句 |
| `__add__` | `Add` | 运算符重载 |

### dataclass

写「纯数据结构」不要手写 `__init__`，用 `dataclass`，相当于 Rust 的 `#[derive(Debug, PartialEq)] struct`。

```python
from dataclasses import dataclass, field, asdict

@dataclass
class Message:
    role: str
    content: str
    tags: list[str] = field(default_factory=list)   # 可变默认值必须用 default_factory

@dataclass(frozen=True)        # 不可变 + 可哈希
class Point:
    x: int
    y: int

m = Message("user", "hi")
print(m)                       # Message(role='user', content='hi', tags=[])
print(m == Message("user", "hi"), m.role)   # True user
print(asdict(m))               # {'role': 'user', 'content': 'hi', 'tags': []}
print({Point(1, 2): "a"})      # frozen 的 dataclass 可以当 dict 的 key
```

### 继承、抽象类、Protocol

```python
from abc import ABC, abstractmethod
from typing import Protocol

# 1. 继承 + 抽象类（名义类型，≈ 必须显式 impl Trait）
class Tool(ABC):
    name: str

    @abstractmethod
    def run(self, arg: str) -> str: ...     # ... 是省略号字面量，这里当占位用

class Echo(Tool):
    name = "echo"

    def __init__(self, prefix: str = ""):
        super().__init__()                  # 调用父类方法
        self.prefix = prefix

    def run(self, arg: str) -> str:
        return self.prefix + arg

# Tool() 会报 TypeError：抽象类不能实例化
print(Echo(">> ").run("hi"), isinstance(Echo(), Tool))   # >> hi True

# 2. Protocol：结构化类型（鸭子类型的静态版本，≈ TS 的 interface）
class Runnable(Protocol):
    def run(self, arg: str) -> str: ...

class Upper:                                # 不需要继承 Runnable
    def run(self, arg: str) -> str:
        return arg.upper()

def execute(r: Runnable, arg: str) -> str:
    return r.run(arg)

print(execute(Upper(), "hi"), execute(Echo(), "hi"))     # HI hi
```

### Enum

```python
from enum import Enum, StrEnum, auto

class Role(StrEnum):          # 值是字符串，可直接序列化成 JSON
    USER = "user"
    ASSISTANT = "assistant"

class State(Enum):
    IDLE = auto()
    RUNNING = auto()

print(Role.USER == "user", Role("assistant"), State.IDLE.name)  # True assistant IDLE
print([r.value for r in Role])                                  # ['user', 'assistant']
```

:::tip 和 Rust enum 的区别
`Python` 的 `Enum` 不能携带数据。想表达 Rust 那种带数据的枚举（和类型），用「多个 `dataclass` + 联合类型 `A | B`」，再配合 `match` 分发。
:::

## 类型标注

语法和 `TS` 很像，重点记住：**运行时完全不检查**，写错类型也照样跑，需要 `pyright`/`mypy`（或编辑器的 `Pylance`）来检查。

```python
from typing import Any, Callable, Literal, NotRequired, TypedDict

# 基础
count: int = 0
names: list[str] = []
scores: dict[str, float] = {}
pair: tuple[int, str] = (1, "a")
maybe: str | None = None                      # ≈ string | null / Option<String>
mode: Literal["fast", "slow"] = "fast"        # 字面量类型，同 TS
callback: Callable[[int, str], bool]          # (a: number, b: string) => boolean
anything: Any = 1                             # ≈ any

# 类型别名（3.12+）
type Json = dict[str, Json] | list[Json] | str | int | float | bool | None

# 泛型函数 / 泛型类（3.12+ 语法，和 TS/Rust 几乎一样）
def first[T](items: list[T]) -> T | None:
    return items[0] if items else None

class Stack[T]:
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

# TypedDict：给 dict 标注形状（≈ TS 的 interface），运行时仍是普通 dict
class ChatMessage(TypedDict):
    role: Literal["user", "assistant", "system"]
    content: str
    name: NotRequired[str]                    # 可选字段

msg: ChatMessage = {"role": "user", "content": "hi"}

s = Stack[int]()
s.push(1)
print(first(["a", "b"]), first([]), s.pop(), msg["role"])   # a None 1 user
```

| TS | Python |
| --- | --- |
| `string` / `number` / `boolean` | `str` / `int`、`float` / `bool` |
| `T[]` | `list[T]` |
| `Record<string, T>` | `dict[str, T]` |
| `[A, B]` | `tuple[A, B]` |
| `A \| B` | `A \| B` |
| `T \| null`、`T?` | `T \| None` |
| `interface` | `Protocol` / `TypedDict` / `dataclass` |
| `unknown` / `any` | `object` / `Any` |
| `(a: A) => B` | `Callable[[A], B]` |

### pydantic

`pydantic` 是 `Agent` 开发的事实标准：**用类型标注在运行时做校验和序列化**，相当于 `zod`（JS）或 `serde`（Rust）。定义工具入参、解析 LLM 的结构化输出、生成 `JSON Schema` 都用它。

```shell
uv add pydantic
```

```python
from pydantic import BaseModel, Field, ValidationError

class SearchArgs(BaseModel):
    """搜索工具的入参"""
    query: str = Field(description="搜索关键词")
    limit: int = Field(default=5, ge=1, le=20)
    tags: list[str] = []                    # pydantic 里可变默认值是安全的

# 校验 + 类型转换
args = SearchArgs.model_validate({"query": "python", "limit": "3"})
print(args.limit, args)                     # 3 query='python' limit=3 tags=[]

# 直接解析 JSON 字符串（LLM 返回的内容）
args = SearchArgs.model_validate_json('{"query": "rust"}')

# 序列化
print(args.model_dump())                    # {'query': 'rust', 'limit': 5, 'tags': []}
print(args.model_dump_json())               # {"query":"rust","limit":5,"tags":[]}

# 生成 JSON Schema —— 可以直接作为工具定义发给 LLM
print(SearchArgs.model_json_schema())

# 校验失败抛 ValidationError，错误信息可以回传给 LLM 让它重试
try:
    SearchArgs.model_validate({"limit": 100})
except ValidationError as e:
    print(e.errors()[0]["msg"])             # Field required
```

## 错误处理

`Python` 用异常，不用 `Result`。并且社区风格是 **EAFP**（先做再说，出错再处理），而不是先判断再做。

```python
import json

class ToolError(Exception):                 # 自定义异常：继承 Exception 即可
    def __init__(self, tool: str, message: str):
        super().__init__(f"{tool}: {message}")
        self.tool = tool

def parse(raw: str) -> dict:
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:       # 捕获特定类型（≈ match 错误类型）
        raise ToolError("parser", "不是合法 JSON") from e   # from e 保留错误链
    except (TypeError, ValueError):         # 一次捕获多种
        raise
    else:                                   # 没有异常时执行
        return data
    finally:                                # 无论如何都执行
        pass

try:
    parse("{oops")
except ToolError as e:
    print(e, "|", e.tool, "|", repr(e.__cause__))
# parser: 不是合法 JSON | parser | JSONDecodeError(...)

# 常见内置异常
# KeyError(dict 没有 key)  IndexError(下标越界)  AttributeError(没有属性)
# TypeError(类型不对)      ValueError(值不对)     FileNotFoundError  TimeoutError
```

注意：

- 不要写裸 `except:`，它会把 `Ctrl+C`（`KeyboardInterrupt`）也吞掉；兜底请用 `except Exception`
- `raise` 不带参数表示重新抛出当前异常（≈ `throw e`）
- 没有 `?` 运算符，异常默认自动向上传播

## 模块与包

一个 `.py` 文件就是一个模块，一个目录就是一个包。没有 `export`，模块顶层的名字全部可以被导入（下划线开头的约定为私有）。

```
my-agent/
├── pyproject.toml
├── .env
├── src/
│   └── my_agent/              # 包名用下划线，不能有中划线
│       ├── __init__.py        # 包的入口（≈ index.ts / mod.rs），可以为空
│       ├── main.py
│       ├── llm.py
│       └── tools/
│           ├── __init__.py
│           └── search.py
└── tests/
    └── test_tools.py
```

```python
import json                               # import 整个模块
import os.path as osp                     # 别名
from pathlib import Path                  # 具名导入（≈ import { Path } from）
from collections import Counter, deque

# 项目内（上面目录结构中）：
# from my_agent.tools.search import search      绝对导入（推荐）
# from .llm import chat                          相对导入：. 当前包，.. 上级包

# 入口惯用写法：只有被直接运行时才执行，被 import 时不执行
def main() -> None:
    print("run", Path.cwd().name != "", Counter("aab")["a"], osp.basename("/a/b.py"))

if __name__ == "__main__":
    main()
```

:::tip
- `import` 时会**执行**整个模块的顶层代码，所以有副作用的逻辑要放进函数或 `if __name__ == "__main__":` 里
- 循环导入会报错，解决办法是把公共部分抽到第三个模块，或在函数内部再 `import`
:::

## 迭代器、生成器、上下文管理器

### 生成器

带 `yield` 的函数就是生成器，和 JS 的 `function*` 一样是惰性的。流式输出（streaming）的底层就是它。

```python
from typing import Iterator

def chunks(text: str, size: int) -> Iterator[str]:
    for i in range(0, len(text), size):
        yield text[i:i + size]          # 每次产出一个值，然后暂停

for chunk in chunks("abcdefg", 3):
    print(chunk)                        # abc / def / g

gen = chunks("abcd", 2)
print(next(gen), next(gen))             # ab cd
print(list(chunks("abcdef", 4)))        # ['abcd', 'ef']  收集成列表（≈ collect）

# 无限序列 + 惰性管道
def naturals():
    n = 0
    while True:
        yield n
        n += 1

import itertools
evens = (n for n in naturals() if n % 2 == 0)        # 生成器表达式
print(list(itertools.islice(evens, 5)))              # [0, 2, 4, 6, 8]  ≈ .take(5)
```

### with 上下文管理器

`with` 保证退出代码块时一定执行清理逻辑，相当于 Rust 的 `RAII`/`Drop`，或 JS 的 `try/finally`（以及新的 `using`）。

```python
import time
from contextlib import contextmanager
from pathlib import Path

# 1. 文件：离开 with 自动关闭
path = Path("/tmp/py_quick_demo.txt")
with open(path, "w", encoding="utf-8") as f:
    f.write("line1\nline2\n")

with open(path, encoding="utf-8") as f:
    for line in f:                      # 文件对象可以按行迭代
        print(line.rstrip())

# 2. 自定义：yield 之前是进入逻辑，之后是退出逻辑
@contextmanager
def span(name: str):
    start = time.perf_counter()
    try:
        yield
    finally:
        print(f"{name}: {time.perf_counter() - start:.4f}s")

with span("计算"):
    sum(range(1_000_000))

path.unlink()                           # 删除文件
```

## 异步 asyncio

`Agent` 的工作基本都是 IO（调 LLM、调工具），所以 `async` 是必修课。语法和 JS 几乎一样，但**运行模型更像 Rust**：

| | JS | Rust (tokio) | Python (asyncio) |
| --- | --- | --- | --- |
| 调用 async 函数 | 立即开始执行 | 惰性，返回 Future | **惰性**，返回协程对象 |
| 事件循环 | 运行时自带 | `#[tokio::main]` | `asyncio.run(main())` |
| 后台执行 | 直接调用不 await | `tokio::spawn` | `asyncio.create_task` |
| 并发等待 | `Promise.all` | `join!` | `asyncio.gather` / `TaskGroup` |
| 超时 | `AbortSignal.timeout` | `tokio::time::timeout` | `asyncio.timeout` |
| 阻塞代码 | Worker | `spawn_blocking` | `asyncio.to_thread` |

```python
import asyncio
import time

async def fetch(name: str, delay: float) -> str:
    await asyncio.sleep(delay)              # 不要用 time.sleep，会卡死整个事件循环
    return f"{name} done"

async def main() -> None:
    # 1. 调用 async 函数只得到协程对象，并不会执行！必须 await 或 create_task
    coro = fetch("a", 0.1)
    print(type(coro).__name__)              # coroutine
    print(await coro)                       # a done

    # 2. 并发：gather ≈ Promise.all，结果顺序与传入顺序一致
    start = time.perf_counter()
    results = await asyncio.gather(fetch("a", 0.2), fetch("b", 0.2), fetch("c", 0.2))
    print(results, f"{time.perf_counter() - start:.1f}s")    # [...] 0.2s

    # 允许部分失败：≈ Promise.allSettled
    async def boom() -> str:
        raise ValueError("boom")
    settled = await asyncio.gather(fetch("a", 0.01), boom(), return_exceptions=True)
    print(settled)                          # ['a done', ValueError('boom')]

    # 3. TaskGroup（3.11+，结构化并发）：任一任务失败会取消其余任务
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(fetch("x", 0.1))
        t2 = tg.create_task(fetch("y", 0.1))
    print(t1.result(), t2.result())         # x done y done

    # 4. 后台任务：create_task 立即调度（≈ tokio::spawn），要保留引用防止被 GC
    task = asyncio.create_task(fetch("bg", 0.1))
    print(await task)                       # bg done

    # 5. 超时
    try:
        async with asyncio.timeout(0.05):
            await fetch("slow", 1)
    except TimeoutError:
        print("超时了")

    # 6. 限制并发数
    sem = asyncio.Semaphore(2)
    async def limited(i: int) -> str:
        async with sem:
            return await fetch(f"job{i}", 0.05)
    print(await asyncio.gather(*(limited(i) for i in range(5))))

    # 7. 把阻塞的同步函数丢到线程池，避免卡住事件循环
    await asyncio.to_thread(time.sleep, 0.05)

asyncio.run(main())                         # 程序入口，整个程序只调用一次
```

### 异步生成器

LLM 的流式输出就是异步生成器，消费方式是 `async for`：

```python
import asyncio
from typing import AsyncIterator

async def stream_tokens(text: str) -> AsyncIterator[str]:
    for token in text.split():
        await asyncio.sleep(0.01)           # 模拟网络延迟
        yield token

async def main() -> None:
    async for token in stream_tokens("hello from async generator"):
        print(token, end=" ", flush=True)   # 逐个打印，不换行
    print()

    # 异步推导式
    tokens = [t async for t in stream_tokens("a b c")]
    print(tokens)                           # ['a', 'b', 'c']

asyncio.run(main())
```

:::warning async 常见错误
1. **忘记 `await`**：不会报错，只会得到一个协程对象，并有一条 `RuntimeWarning: coroutine ... was never awaited`
2. **在 async 函数里调用阻塞代码**（`time.sleep`、`requests.get`、大量 CPU 计算）：整个事件循环被卡死，所有并发任务一起停住。用 `asyncio.sleep`、`httpx.AsyncClient`、`asyncio.to_thread` 替代
3. **函数染色**：同步函数里不能 `await`，和 JS/Rust 一样，`async` 会一路向上传染
4. **GIL**：线程无法并行执行 CPU 密集任务，CPU 密集请用 `multiprocessing`/`ProcessPoolExecutor`；IO 密集用 `asyncio` 就够了
:::

## 常用标准库

`Python` 标准库很全（“自带电池”），以下是写 `Agent` 最常用的部分。

```python
import json
import logging
import os
import re
import subprocess
import sys
from collections import Counter, defaultdict, deque
from datetime import datetime, timedelta, timezone
from functools import cache, partial
from pathlib import Path

# ---- json：≈ JSON.parse / JSON.stringify ----
obj = json.loads('{"name": "mex", "tags": ["a"]}')         # str -> dict
print(json.dumps(obj, ensure_ascii=False, indent=2))      # ensure_ascii=False 才能正常输出中文

# ---- pathlib：路径与文件（≈ node:path + node:fs）----
base = Path("/tmp") / "py_quick" / "notes"                # 用 / 拼接路径
base.mkdir(parents=True, exist_ok=True)                   # mkdir -p
file = base / "a.md"
file.write_text("# 标题\n", encoding="utf-8")
print(file.read_text(encoding="utf-8").strip(), file.exists(), file.suffix, file.stem)
print([p.name for p in base.glob("*.md")])                # ['a.md']
file.unlink()

# ---- 环境变量（API Key 都从这里读）----
key = os.environ.get("MY_API_KEY", "")                    # 不存在时用默认值
# os.environ["MY_API_KEY"]                                # 不存在抛 KeyError

# ---- subprocess：执行命令（Agent 的 bash 工具）----
result = subprocess.run(["echo", "hello"], capture_output=True, text=True, timeout=10)
print(result.returncode, result.stdout.strip())           # 0 hello

# ---- re：正则 ----
m = re.search(r"(\d+)-(\d+)", "range: 10-20")
if m:
    print(m.group(1), m.groups())                         # 10 ('10', '20')
print(re.findall(r"\d+", "a1b22c333"), re.sub(r"\s+", " ", "a   b"))  # ['1', '22', '333'] a b

# ---- datetime ----
now = datetime.now(timezone.utc)
print(now.isoformat()[:10], (now + timedelta(days=1)) > now)
print(datetime.fromisoformat("2026-01-01T08:00:00").strftime("%Y/%m/%d %H:%M"))

# ---- collections ----
print(Counter("hello").most_common(1))                    # [('l', 2)]
groups: defaultdict[str, list[int]] = defaultdict(list)   # 访问不存在的 key 时自动创建默认值
groups["a"].append(1)
window = deque([1, 2, 3], maxlen=3)                       # 定长队列，可用来截断对话历史
window.append(4)
print(dict(groups), list(window))                         # {'a': [1]} [2, 3, 4]

# ---- functools ----
@cache                                                    # 记忆化
def fib(n: int) -> int:
    return n if n < 2 else fib(n - 1) + fib(n - 2)

to_binary = partial(int, base=2)                          # 偏函数（≈ bind）
print(fib(80), to_binary("1010"))                         # 23416728348467685 10

# ---- logging：别用 print 打日志 ----
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)
logger.info("agent 启动, argv=%s", sys.argv[1:])
```

## Agent 开发常用三方库

| 用途 | 库 | 类比 |
| --- | --- | --- |
| 数据校验 / 结构化输出 | `pydantic` | `zod` / `serde` |
| HTTP 客户端（同步 + 异步） | `httpx` | `fetch` / `reqwest` |
| 读取 `.env` | `python-dotenv` | `dotenv` |
| Web 服务 | `fastapi` + `uvicorn` | `express` / `axum` |
| 终端美化输出 | `rich` | `chalk` |
| 重试 | `tenacity` | - |
| 测试 | `pytest` + `pytest-asyncio` | `vitest` |
| LLM SDK | `anthropic`、`openai` 等官方 SDK | - |

### httpx

```shell
uv add httpx python-dotenv
```

```python
import asyncio
import os

import httpx
from dotenv import load_dotenv

load_dotenv()                                   # 把 .env 文件加载进 os.environ

async def main() -> None:
    # client 要复用（内部有连接池），用 async with 保证关闭
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            "https://httpbin.org/post",
            headers={"Authorization": f"Bearer {os.environ.get('MY_API_KEY', 'demo-key')}"},
            json={"q": "python"},               # 自动序列化为 JSON
        )
        resp.raise_for_status()                 # 4xx/5xx 抛异常（默认不抛，和 fetch 一样）
        print(resp.status_code, resp.json()["json"])

        # 流式读取（SSE）
        async with client.stream("GET", "https://httpbin.org/stream/3") as r:
            async for line in r.aiter_lines():
                print(line[:40])

asyncio.run(main())
```

### 手写一个最小 Agent

`Agent` 的本质就是一个循环：**把消息发给 LLM → LLM 要求调用工具 → 执行工具并把结果追加到消息里 → 再发给 LLM**，直到 LLM 不再调用工具。

下面的例子用一个假的 `fake_llm` 代替真实模型，不需要 API Key 就能跑，但把前面讲的装饰器、类型标注、`inspect` 反射、`async`、`gather`、异常处理全部串了起来。换成真实 SDK 时，只需要替换 `fake_llm`（各家的消息格式略有差异，以官方文档为准）。

```python
import asyncio
import inspect
import json
from typing import Any, Callable

# ---------- 1. 工具注册：装饰器 + 从函数签名反射出 JSON Schema ----------
TOOLS: dict[str, Callable[..., Any]] = {}
JSON_TYPES = {str: "string", int: "integer", float: "number", bool: "boolean"}

def tool(fn: Callable[..., Any]) -> Callable[..., Any]:
    TOOLS[fn.__name__] = fn
    return fn

def schema_of(fn: Callable[..., Any]) -> dict[str, Any]:
    params = inspect.signature(fn).parameters
    return {
        "name": fn.__name__,
        "description": inspect.getdoc(fn) or "",          # docstring 就是给 LLM 看的工具说明
        "input_schema": {
            "type": "object",
            "properties": {n: {"type": JSON_TYPES.get(p.annotation, "string")} for n, p in params.items()},
            "required": [n for n, p in params.items() if p.default is inspect.Parameter.empty],
        },
    }

@tool
async def get_weather(city: str) -> str:
    """查询指定城市的天气"""
    await asyncio.sleep(0.05)                             # 模拟网络请求
    return f"{city}: 晴, 25°C"

@tool
def add(a: int, b: int) -> int:
    """计算两个整数的和"""
    return a + b

# ---------- 2. 假的 LLM：第一轮要求调工具，拿到结果后给出最终回答 ----------
async def fake_llm(messages: list[dict[str, Any]], tools: list[dict[str, Any]]) -> dict[str, Any]:
    if messages[-1]["role"] == "user":
        return {
            "role": "assistant",
            "tool_calls": [
                {"id": "call_1", "name": "get_weather", "input": {"city": "杭州"}},
                {"id": "call_2", "name": "add", "input": {"a": 1, "b": 2}},
            ],
        }
    results = [m["content"] for m in messages if m["role"] == "tool"]
    return {"role": "assistant", "content": f"工具结果汇总: {'; '.join(results)}"}

# ---------- 3. 执行工具：同步 / 异步函数都支持，错误回传给 LLM 而不是直接崩溃 ----------
async def call_tool(call: dict[str, Any]) -> dict[str, Any]:
    try:
        result = TOOLS[call["name"]](**call["input"])     # ** 把 dict 展开成具名参数
        if inspect.isawaitable(result):
            result = await result
    except Exception as e:
        result = f"工具执行失败: {e!r}"
    return {"role": "tool", "tool_call_id": call["id"], "content": str(result)}

# ---------- 4. Agent 主循环 ----------
async def run_agent(prompt: str, max_steps: int = 5) -> str:
    messages: list[dict[str, Any]] = [{"role": "user", "content": prompt}]
    tools = [schema_of(fn) for fn in TOOLS.values()]

    for step in range(1, max_steps + 1):
        reply = await fake_llm(messages, tools)
        messages.append(reply)

        tool_calls = reply.get("tool_calls")
        if not tool_calls:                                # 没有工具调用 => 结束
            return reply["content"]

        print(f"[step {step}] 调用工具: {[c['name'] for c in tool_calls]}")
        messages.extend(await asyncio.gather(*map(call_tool, tool_calls)))   # 并发执行工具

    raise RuntimeError(f"超过最大步数 {max_steps}")

if __name__ == "__main__":
    print(json.dumps(schema_of(add), ensure_ascii=False))
    print(asyncio.run(run_agent("杭州天气怎么样？另外 1+2 等于几？")))
```

输出：

```
{"name": "add", "description": "计算两个整数的和", "input_schema": {"type": "object", "properties": {"a": {"type": "integer"}, "b": {"type": "integer"}}, "required": ["a", "b"]}}
[step 1] 调用工具: ['get_weather', 'add']
工具结果汇总: 杭州: 晴, 25°C; 3
```

## 踩坑清单

从 JS/Rust 过来最容易栽的地方，集中过一遍：

```python
# 1. 赋值是引用，不是拷贝（Rust 会 move，Python 是共享）
a = [1, 2]
b = a
b.append(3)
print(a)                         # [1, 2, 3]
import copy
c = a.copy()                     # 浅拷贝；深拷贝用 copy.deepcopy(a)

# 2. [[0] * 3] * 2 创建的是同一行的两个引用
grid = [[0] * 3] * 2
grid[0][0] = 1
print(grid)                      # [[1, 0, 0], [1, 0, 0]]
grid = [[0] * 3 for _ in range(2)]   # 正确写法

# 3. 闭包延迟绑定：循环里创建的函数拿到的都是最后的值
fns = [lambda: i for i in range(3)]
print([f() for f in fns])        # [2, 2, 2]
fns = [lambda i=i: i for i in range(3)]   # 用默认参数固定当前值
print([f() for f in fns])        # [0, 1, 2]

# 4. 四舍五入是「银行家舍入」，浮点问题和 JS 一样
print(round(0.5), round(1.5), round(2.5))   # 0 2 2
print(0.1 + 0.2 == 0.3)                     # False

# 5. 遍历时不要修改正在遍历的容器，遍历它的拷贝
nums = [1, 2, 3, 4]
for n in nums[:]:
    if n % 2 == 0:
        nums.remove(n)
print(nums)                      # [1, 3]

# 6. 字符串和元组不可变
s = "abc"
# s[0] = "x"  -> TypeError
s = "x" + s[1:]

# 7. is 只用于 None / True / False，比较值永远用 ==
print([] == [], [] is [])        # True False
```

其他要点：

- 缩进统一用 4 个空格，不要混用 Tab
- 可变默认参数、`or` 不等于 `??`、空容器为假值、没有块级作用域 —— 前文已讲，这四个最常见
- 文件名不要和标准库 / 三方库同名（例如把自己的文件命名为 `json.py`、`openai.py`），否则 `import` 会导入到自己
- 读写文件始终显式指定 `encoding="utf-8"`

## JS → Python 速查表

| 操作 | JS/TS | Python |
| --- | --- | --- |
| 打印 | `console.log(x)` | `print(x)` |
| 长度 | `arr.length` | `len(arr)` |
| 末尾添加 | `arr.push(x)` | `arr.append(x)` |
| 包含 | `arr.includes(x)` | `x in arr` |
| 查找下标 | `arr.indexOf(x)` | `arr.index(x)`（找不到抛异常） |
| map | `arr.map(f)` | `[f(x) for x in arr]` |
| filter | `arr.filter(f)` | `[x for x in arr if f(x)]` |
| find | `arr.find(f)` | `next((x for x in arr if f(x)), None)` |
| reduce | `arr.reduce(f, init)` | `functools.reduce(f, arr, init)`，求和直接 `sum(arr)` |
| some / every | `arr.some(f)` / `arr.every(f)` | `any(f(x) for x in arr)` / `all(...)` |
| 切片 | `arr.slice(1, 3)` | `arr[1:3]` |
| 拼接 | `arr.join(",")` | `",".join(arr)`（元素必须是 str） |
| 展开 | `[...a, ...b]` | `[*a, *b]` |
| 对象合并 | `{...a, ...b}` | `{**a, **b}` 或 `a \| b` |
| 解构 | `const {a, b} = obj` | `a, b = obj["a"], obj["b"]` |
| 遍历对象 | `Object.entries(o)` | `o.items()` |
| 模板字符串 | `` `hi ${name}` `` | `f"hi {name}"` |
| 三元 | `c ? a : b` | `a if c else b` |
| 空值合并 | `a ?? b` | `a if a is not None else b` |
| 可选链 | `a?.b` | `a.b if a is not None else None`，dict 用 `a.get("b")` |
| 类型判断 | `typeof x` | `type(x)` / `isinstance(x, T)` |
| 抛异常 | `throw new Error("x")` | `raise ValueError("x")` |
| 捕获 | `catch (e)` | `except Exception as e:` |
| JSON | `JSON.parse` / `JSON.stringify` | `json.loads` / `json.dumps` |
| 延时 | `await sleep(1000)` | `await asyncio.sleep(1)`（单位是秒） |
| 并发 | `Promise.all([...])` | `asyncio.gather(...)` |
| 空函数体 | `{}` | `pass` 或 `...` |
| 箭头函数 | `x => x * 2` | `lambda x: x * 2` |
| 严格相等 | `===` | `==`（值）/ `is`（同一对象） |
| 逻辑运算 | `&&` `\|\|` `!` | `and` `or` `not` |

## 下一步

1. `uv init` 建一个项目，把「手写一个最小 Agent」里的 `fake_llm` 换成真实的 LLM SDK 调用
2. 用 `pydantic` 的 `BaseModel` 定义工具入参，用 `model_json_schema()` 替换手写的 `schema_of`
3. 给工具加上超时（`asyncio.timeout`）、重试（装饰器）和并发限制（`Semaphore`）
4. 配好 `ruff` + `pyright`，把类型标注当成 `TS` 一样认真写
