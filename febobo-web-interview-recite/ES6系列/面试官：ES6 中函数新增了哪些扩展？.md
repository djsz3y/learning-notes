# 面试官：ES6 中函数新增了哪些扩展？

> 参数
> 属性
> 作用域
> 严格模式
> 箭头函数

## 一、参数

ES6 允许为函数的**参数设置默认值**

```js
function log(x, y = 'World') {
  console.log(x, y)
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

函数的**形参是默认声明**的，不能使用 let 或 const 再次声明

```js
function foo(x = 5) {
  let x = 1 // error
  const x = 2 // error
}
// Uncaught
// SyntaxError: Identifier 'x' has already been declared
```

参数默认值可以与解构赋值的默认值结合起来使用

```js
function foo({ x, y = 5 }) {
  console.log(x, y)
}

foo({}) // undefined 5
foo({ x: 1 }) // 1 5
foo({ x: 1, y: 2 }) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined as it is undefined.
```

上面的 foo 函数，当参数为对象的时候才能进行解构，如果没有提供参数的时候，变量 x 和 y 就不会生成，从而报错，这里设置默认值避免

```js
function foo({ x, y = 5 } = {}) {
  console.log(x, y)
}

foo() // undefined 5
```

参数默认值应该是函数的尾参数，如果不是非尾部的参数设置默认值，实际上这个参数是没法省略的

```js
function f(x = 1, y) {
  return [x, y]
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错 Uncaught SyntaxError: Unexpected token ','
f(undefined, 1) // [1, 1]
```

## 二、属性

### 函数的 length 属性

length 将返回没有指定默认值的参数个数

```js
;(function (a) {}).length // 1
;(function (a = 5) {}).length // 0
;(function (a, b, c = 5) {}).length // 2
```

rest 参数也不会计入 length 属性

```js
;(function (...args) {}).length // 0
```

如果设置了默认值的参数不是尾参数，那么 length 属性也不再计入后面的参数了

```js
;(function (a = 0, b, c) {}).length // 0
;(function (a, b = 1, c) {}).length // 1
```

### name 属性

返回该函数的函数名

```js
var f = function () {}

// ES5
f.name // ""

// ES6
f.name // "f"
```

如果将一个具名函数赋值给一个变量，则 name 属性都返回这个具名函数原本的名字

```js
const bar = function baz() {}
bar.name // "baz"
```

Function 构造函数返回的函数实例，name 属性的值为 anonymous

> 实际报错：EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src github.githubassets.com".

```js
new Function().name // "anonymous"
```

bind 返回的函数，name 属性值会加上 bound 前缀

```js
function foo() {}
foo.bind({}).name // "bound foo"
;(function () {}).bind({}).name // "bound"
```

## 三、作用域

一旦设置参默认值，函数在声明初始化时，产生单独作用域；初始化结束，作用域消失。

没有设置参数默认值时，不会出现单独作用域。

比如，`y=x` 是一个单独作用，由于 x 没有被定义，所以指向的是全局变量 x。

```js
let x = 1
function f(y = x) {
  // 等同于 let y = x
  let x = 2
  console.log(y)
}

f() // 1
```

## 四、严格模式（3 种 4 个函数）

只要函数参数使用了默认值，解构赋值，扩展运算符的方式，函数内部就不能显式定义严格模式，否则报错。

> 以下 4 种，都报错，信息为：
> Uncaught
> SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
> 函数中使用非简单参数列表的非法严格模式 'use strict' 指令

```js
function doSomething (a, b = {}) {
  "use strict"
  // code
}

const doSomething = function({a,b}) {
  "use strict"
  // code
}

const doSomething = function(...rest) {
  "use strict"
  // code
}

const obj = {
  doSomething({a, b}){
    "use strict"
    // code
  }
}
```

## 五、箭头函数（8 点）

[1]使用“箭头”（`=>`）定义函数

```js
var f = (v) => v

// 等同于

var f = function (v) {
  return v
}
```

[2]箭头函数的参数部分，使用圆括号表示（不需要参数或者多个参数列表，都用圆括号表示参数部分）

```js
var f = () => 5
// 等同于
var f = function () {
  return 5
}

var sum = (num1, num2) => num1 + num2
// 等同于
var sum = function (num1, num2) {
  return num1 + num2
}
```

[3]箭头函数的代码块部分多于一条语句，使用大括号括起来，并使用 return 语句返回。

```js
var sum = (num1, num2) => {
  return num1 + num2
}
```

[4]箭头函数返回对象，使用**括号包裹**对象：

```js
let getTempItem = (id) => ({ id: id, name: 'Temp' })
```

注意点：

- [5]函数体内的 this，是**函数定义时的对象**，不是函数使用时的对象。
- [6]不可以用作构造函数，即不能使用 new 命令，否则报错。
- [7]不可以使用箭头函数体内不存在的 arguments 对象，如果要用，使用 rest 参数。
- [8]不可以使用箭头函数作为 Generator 函数，也就是不能使用 yield 命令。

# 参考文献

- [https://es6.ruanyifeng.com/#docs/function](https://es6.ruanyifeng.com/#docs/function)
- [原文](https://github.com/febobo/web-interview/issues/37)
