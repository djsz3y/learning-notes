# 面试官：说说 var、let、const 之间的区别

## 一、var

[1]顶层对象：

- 浏览器环境指的是 `window` 对象
- Node 环境指的是 `global` 对象

[2]var 声明的顶层变量&全局变量：

- ES5 中，顶层变量的属性和全局变量是等价的；
- 用 var 声明的变量既是顶层变量又是全局变量。

```js
var a = 10
console.log(window.a) // 10
```

[3]var 声明的变量存在变量提升：

```js
console.log(a) // undefined
var a = 20
```

[4]编译阶段，编译器将其编译成以下代码：

```js
var a
console.log(a)
a = 20
```

[5]var 声明变量，可以多次声明，后面覆盖前面的变量声明：

```js
var a = 20
var a = 30
console.log(a) // 30
```

[6]函数中使用 var 声明变量，该变量是局部的：

```js
var a = 20
function change() {
  var a = 30
}
change()
console.log(a) // 20
```

[7]函数中不使用 var，该变量是全局的：

```js
var a = 20
function change() {
  a = 30
}
change()
console.log(a) // 30
```

## 二、let

[1]let 是 ES6 新增的命令，用来声明变量，和 var 类似，但是只在 let 声明的代码块内有效。

```js
{
  let a = 2
}
console.log(a) // ReferenceError: a is not defined.
```

[2]不存在变量提升

- let 声明变量之前使用，抛出错误

```js
console.log(a) // 报错 ReferenceError
let a = 2
```

[3]只要块级作用域内存在 let，这个区域就不再受外部影响。

```js
var a = 123
if (true) {
  a = 'abc' // ReferenceError
  let a
}
```

[4]使用 let 声明变量前，该变量都不可用，也就是“暂时性死区”。

[5]相同作用域，不允许重复声明

```js
let a = 20
let a = 30
// Uncaught SyntaxError: Identifier 'a' has already been declared
```

不同作用域，不会报错

```js
let a = 20
{
  let a = 30
}
```

因此，不能在函数内部重新声明参数：

```js
function func(arg) {
  let arg
}
func()
// Uncaught SyntaxError: Identifier 'arg' has already been declared
```

## 三、const

const 声明一个只读的常量，一旦声明，常量值就不能改变

```js
const a = 1
a = 3
// TypeError: Assignment to constant variable.
```

意味着， const 一旦声明变量，必须立即初始化，不能留到以后赋值：

```js
const a
// SyntaxError: Missing initializer in const declaration
```

如果之前用 var 或 let 声明过变量，再用 const 声明同样会报错

```js
var a = 20
let b = 20
const a = 30
const b = 30
// 都会报错
```

const 实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动

- 对于简单类型的数据，值就保存在变量指向的那个内存地址，因此等同于常量
- 对于复杂类型的数据，变量指向的内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的，并不能确保改变量的结构不变。

```js
const foo = {}

// 为 foo 添加一个属性，可以成功
foo.prop = 123
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {} // TypeError: "foo" is read-only
```

其他情况，`const` 与 `let` 一致。

## 四、区别

`var`、`let`、`const` 三者区别可以围绕下面五点展开：

- 变量提升
- 暂时性死区
- 块级作用域
- 重复声明
- 修改声明的变量
- 使用

### 变量提升

`var` 声明的变量存在变量提升，即变量可以在声明之前调用，值为 `undefined`
`let` 和 `const` 不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错

```js
// var
console.log(a) // undefined
var a = 10

// let
console.log(b) // Cannot access 'b' before initialization
let b = 10

// const
console.log(c) // Cannot access 'c' before initialization
const c = 10
```

### 暂时性死区

`var` 不存在暂时性死区

`let` 和 `const` 存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

```js
// var
console.log(a) // undefined
var a = 10

// let
console.log(b) // Cannot access 'b' before initialization
let b = 10

// const
console.log(c) // Cannot access 'c'  before initialization
const c = 10
```

### 块级作用域

var 不存在块级作用域
let 和 const 存在块级作用域

```js
// var
{
  var a = 20
}
console.log(a) // 20

// let
{
  let b = 20
}
console.log(b) // Uncaught ReferenceError: b is not defined

// const
{
  const c = 20
}
console.log(c) // Uncaught ReferenceError: c is not definedF
```

### 重复声明

var 允许重复声明变量

let 和 const 在同一作用域不允许重复声明变量

```js
// var
var a = 10
var a = 20 // 20

// let
let b = 10
let b = 20 // Idetifier 'b' has already been declared

// const
const c = 10
const c = 20 // Identifier 'c' has already been declared
```

### 修改声明的变量

var 和 let 可以

const 声明一个只读的常量。一旦声明，常量的值就不能改变。

```js
// var
var a = 10
a = 20
console.log(a) // 20

// let
let b = 10
b = 20
console.log(b) // 20

// const
const c = 10
c = 20
console.log(c) // Uncaught TypeError: Assignment to constant variable
```

### 使用

能用 const 的情况尽量使用 const，其他情况下大多数使用 let，避免使用 var

# 参考文献

- [https://es6.ruanyifeng.com/](https://es6.ruanyifeng.com/)
- [原文](https://github.com/febobo/web-interview/issues/34)