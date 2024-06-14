# 面试官：谈谈 this 对象的理解

## 一、定义

[1]概述：

1. 函数的 `this` 关键字在 `JavaScript` 中的表现略有不同，此外，在**严格模式和非严格模式之间**也会有一些差别

2. 在绝大多数情况下，**函数的调用方式决定了 `this` 的值（运行时绑定）**

3. `this` 关键字是**函数运行时自动生成的一个内部对象**，只能在函数内部使用，**总指向调用它的对象**

[2]举例：

```js
function baz() {
  // 当前调用栈是：baz
  // 因此，当前调用位置是全局作用域

  console.log('baz')
  bar() // <-- bar 的调用位置
}

function bar() {
  // 当前调用栈是：baz --> bar
  // 因此，当前调用位置在 baz 中

  console.log('bar')
  foo() // <-- foo 的调用位置
}

function foo() {
  // 当前调用栈是：baz --> bar --> foo
  // 因此，当前调用位置在 bar 中

  console.log('foo')
}

baz() // <-- baz 的调用位置
```

[3]同时，`this` 在函数执行过程中，`this` 一旦被确定了，就不可以再更改

```js
var a = 10
var obj = {
  a: 20
}

function fn() {
  this = obj // 修改 this，运行后会报错
  console.log(this.a)
}

fn()
```

## 二、绑定规则

根据不同的使用场合，this 有不同的值，主要分为下面几种情况：

1. 默认绑定
2. 隐式绑定
3. new 绑定
4. 显式绑定

### 默认绑定

[1]全局环境中定义 person 函数，内部使用 this 关键字

```js
var name = 'Jenny'
function person() {
  return this.name
}
console.log(person()) // Jenny
```

[2]输出 Jenny，原因：

- 调用函数的对象在浏览器中为 window，因此 this 指向 window，所以输出 Jenny；

[3]注意：

- 严格模式下，不能将全局对象用于默认绑定，this 会绑定到 undefined，
- 只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。

### 隐式绑定

[1]**函数**还可以**作为某个对象的方法调用**，这时 this 就指向这个上级对象：

```js
function test() {
  console.log(this.x)
}

var obj = {}
obj.x = 1
obj.m = test

obj.m() // 1
```

[2]这个函数中包含多个对象，尽管这个**函数是被最外层的对象所调用**，**this 指向**的也只**是它上一级的对象**

- `this` 的上一级对象为 `b`，`b` 内部并没有 `a` 变量的定义，所以输出 `undefined`

```js
var o = {
  a: 10,
  b: {
    fn: function () {
      console.log(this.a) // undefined
    }
  }
}
o.b.fn()
```

[3]举例-特殊情况：

- `this` 永远指向的是最后调用它的对象，虽然 `fn` 是对象 `b` 的方法，但是 `fn` 赋值给 `j` 的时候并没有执行，所以最终指向 `window`

```js
var o = {
  a: 10,
  b: {
    a: 12,
    fn: function () {
      console.log(this.a) // undefined
      console.log(this) // window
    }
  }
}
var j = o.b.fn
j()
```

### `new` 绑定

[1]通过构造函数 `new` 关键字，生成一个实例对象，此时 `this` 指向这个实例对象

- `new` 关键字改变了 this 的指向，所以代码输出 1；

```js
function test() {
  this.x = 1
}

var obj = new test()
obj.x // 1
```

[2]举例-特殊情况：

- ① `new` 过程遇到 `return` 一个**对象**，此时 `this` 指向为返回的对象

```js
function fn() {
  this.user = 'xxx'
  return {}
}
var a = new fn()
console.log(a.user) // undefined
```

- ② 如果**返回**一个**简单类型**的时候，此时 `this` 指向实例对象

```js
function fn() {
  this.user = 'xxx'
  return 1
}
var a = new fn()
console.log(a.user) // xxx
```

- ③ 注意，`new` 过程遇到 `return null` ，虽然也是对象，但此时 new 仍然指向实例对象

```js
function fn() {
  this.user = 'xxx'
  return null
}
var a = new fn()
console.log(a.user) // xxx
```

### 显式修改

[1]`apply()` `call()` `bind()` 是函数的一个方法，作用是改变函数的调用对象。

- 它的第一个参数就表示改变后的调用这个函数的对象。因此，这时 this 指的就是这第一个参数。

```js
var x = 0
function test() {
  console.log(this.x)
}

var obj = {}
obj.x = 1
obj.m = test
obj.m.apply(obj) // 1
```

[2]关于 apply、call、bind 三者的区别，后面再详细说。

## 三、箭头函数

[1]**ES6** 的语法中还提供了**箭头函数**的语法，代码**书写时**就能**确定 `this`** 的指向（**编译时绑定**）

[2]举例：

```js
const obj = {
  sayThis: () => {
    console.log(this)
  }
}

obj.sayThis() // window 因为 JavaScript 没有块作用域，所以在定义 sayThis 的时候，里面的 this 就绑到 window 上去了
const globalSay = obj.sayThis
globalSay() // window 浏览器中的 global 对象
```

[3]举例-注意潜在的坑：

- 虽然箭头函数的 this 能够在编译时候就确定了 this 的指向，但也需要**注意一些潜在的坑**

[3.1]**绑定事件监听**：

- 代码可以看到，想要 `this` 为点击的 `button`，但此时 `this` 指向了 `window`；
- `baidu.com` 绑定 id：`su`，点击“百度一下”，显示 `true`；

```js
const button = document.getElementById('mngb') //
button.addEventListener('click', () => {
  console.log(this === window) // true
  this.innerHTML = 'clicked button'
})
```

[3.2]包括在**原型上添加方法**的时候，此时 `this` 指向 `window`，所以打印 `true`

```js
function Cat() {}
Cat.prototype.sayName = () => {
  console.log(this === window) // true
  return this.name
}
const cat = new Cat('mm')
cat.sayName()
```

[3.3]同样的，箭头函数不能作为构造函数；

## 四、优先级

### 4.1.隐式绑定 VS 显式绑定

- 显然，显式绑定的优先级更高

```js
function foo() {
  console.log(this.a)
}

var obj1 = {
  a: 2,
  foo: foo
}

var obj2 = {
  a: 3,
  foo: foo
}

// 隐式绑定
obj1.foo() // 2
obj2.foo() // 3

// 显式绑定
obj1.foo.call(obj2) // 3
obj2.foo.call(obj1) // 2
```

### 4.2.`new` 绑定 VS 隐式绑定

- `new` 绑定的优先级 > 隐式绑定

```js
function foo(something) {
  this.a = something
}

var obj1 = {
  foo: foo
}

var obj2 = {}

obj1.foo(2) // 隐式绑定 obj1.a 为 2
console.log(obj1.a) // 2

obj1.foo.call(obj2, 3) // 显式绑定 obj2.a 为 3
console.log(obj2.a) // 3

var bar = new obj1.foo(4) // ⭐ 因为：new 关键字 把 bar 实例的 a 绑定为 4；
console.log(obj1.a) // 2 由于：2 是 上面 obj1.foo(2) 绑定的；
console.log(bar.a) // 4 ——即：`new` 绑定的优先级 > 隐式绑定
```

## 4.3.`new` 绑定 VS 显式绑定

[1]`new` 和 `apply`、`call` 无法一起使用，但**硬绑定也是显式绑定的一种**，可以替换测试

```js
function foo(something) {
  this.a = something
}

var obj1 = {}

var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a) // 2

var baz = new bar(3)
console.log(obj1.a) // 2
console.log(baz.a) // 3
```

- `bar` 被绑定到 `obj1` 上，但是 `new bar(3)` 并没有像我们预计的那样把 `obj1.a` 修改为 3 。但是，`new` 修改了 绑定调用 `bar()` 中的 `this`
- 我们可以认为 `new` 绑定优先级 > 显式绑定

## 综上，

new 绑定优先级 > 显式绑定优先级 > 隐式绑定优先级 > 默认绑定优先级

# 参考文献

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this
- [原文](https://github.com/febobo/web-interview/issues/62)
