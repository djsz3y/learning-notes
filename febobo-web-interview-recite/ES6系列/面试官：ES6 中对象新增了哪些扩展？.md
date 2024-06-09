# 面试官：ES6 中对象新增了哪些扩展？

## 一、属性的简写

ES6 中，当对象键名和对应值名相等时，可以进行简写。

```js
const baz = { foo: foo }
// 等同于
const baz = { foo }
```

方法也能进行简写

```js
const o = {
  method() {
    return 'Hello!'
  }
}

// 等同于
const o = {
  method: function () {
    return 'Hello!'
  }
}
```

函数内作为返回值也会方便许多

```js
function getPoint() {
  const x = { x: 1 }
  const y = { y: 10 }
  return { x, y }
}

getPoint()
// {x: 1, y: 10}
```

注意：简写的对象方法不能用作构造函数

```js
const o = {
  f() {
    this.foo = 'bar'
  }
}

new obj.f() // 报错
```

【额外拓展】：

在 JavaScript 中，只有普通函数（包括函数表达式和函数声明）可以用作构造函数并与 new 操作符一起使用。

构造函数的主要作用是通过 new 操作符来创建一个新的对象实例，并初始化它。

然而，对于对象方法的简写语法（例如 `f()`），它们并不是普通的函数声明，而是被定义为一种特殊的“方法”。根据 ECMAScript 规范，简写方法并不具有构造函数的特性，试图将其作为构造函数会导致错误。

具体来说，使用 new 操作符调用简写方法时，会出现以下错误：

```js
TypeError: obj.f is not a constructor
```

【解决方案】：

需要将对象的方法作为构造函数使用，有几种替代方案：

1.不使用简写方法，而是使用普通的函数表达式：

```js
const obj = {
  f: function () {
    this.foo = 'bar'
  }
}

const instance = new obj.f() // 正常工作
```

2.直接定义一个独立的构造函数，而不是对象的属性方法：

```js
function F() {
  this.foo = 'bar'
}

const instance new F() // 正常工作
```

【总之】：

简写对象方法在设计上是不能用作构造函数的，因此试图这样使用会导致错误。通过使用普通的函数表达式或者独立的构造函数，可以避免这个问题。

## 二、属性名表达式

[1]ES6 允许字面量定义对象时，将表达式放在括号内

```js
let lastWord = 'last word'

const a = {
  'first word': 'hello',
  [lastWord]: 'world'
} //  ES6 允许字面量定义对象时，将表达式放在括号内

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```

[2]表达式还可以用于定义方法名

```js
let obj = {
  // 表达式还可以用于定义方法名
  ['h' + 'ello']() {
    return 'hi'
  }
}

obj.hello() // hi
```

[3]注意，属性名表达式与简洁表示法，不能同时使用，会报错

```js
// 报错
// const foo = 'bar'
// const bar = 'abc'
// const baz = { [foo] }

// 正确
const foo = 'bar'
const baz = { [foo]: 'abc' }
```

[4]注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串 `[object object]`

```js
const keyA = { a: 1 }
const keyB = { b: 2 }

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
}

myObject // Object {[object Object]: "valueB"}
myObject['[object Object]'] // 'valueB'
```

## 三、super 关键字

this 关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字 super，指向当前对象的原型对象

```js
const proto = {
  foo: 'hello'
}

const obj = {
  foo: 'world',
  find() {
    return super.foo
  }
}

Object.setPrototypeOf(obj, proto) // 给 obj 的原型设置为 proto
obj.find()
```

## 四、扩展运算符的应用

在解构赋值中，未被读取的可遍历的属性，分配到指定的对象上面

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
x // 1
y // 2
z // { a: 3, b: 4 }
```

注意：解构赋值必须是最后一个参数，否则会报错

解构赋值是浅拷贝

```js
let obj1 = { a: { b: 1 } }
let { ...x } = obj1
obj1.a.b = 2 // 修改 obj 里面 a 属性中键值
x.a.b // 2，影响到了解构出来 x 的值
```

对象的扩展运算符等同于使用 Object.assign() 方法

【Object.assign()】：

-

## 五、属性的遍历

[1]ES6 一共有 5 种方法可以遍历对象的属性。

- for...in：循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
- Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
- Object.getOwnPropertyNames(obj)：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
- Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名
- Reflect.ownKeys(obj)：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

[2]上述遍历，都遵循同样的属性遍历的次序规则：

- 首先遍历所有**数值键**，按照**数值升序**排列
- 其次遍历所有**字符串键**，按照**加入时间升序**排列
- 最后遍历所有 **Symbol 键**，按照**加入时间升序**排列

```js
Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 })
// ['2', '10', 'b', 'a', Symbol()]
```

### for...in 注意事项

[1]可枚举属性：只有可枚举属性会被 `for...in` 遍历。使用 Object.defineProperty 定义的属性默认是不可枚举的。

```js
Object.defineProperty(obj, 'nonEnumerableProperty', {
  value: 'non-enumerable',
  enumerable: false
})

for (let key in obj) {
  console.log(key) // 不会输出 'nonEnumerableProperty'
}
```

[2]Symbol 属性：`for...in` 不会遍历 Symbol 类型的属性，即使它们是可枚举的。

```js
const sym = Symbol('sym')
obj[sym] = 'symbol property'

for (let key in obj) {
  console.log(key) // 不会输出 `sym`
}
```

[3]【总结】：

for...in 循环会遍历对象自身的和继承的可枚举属性。继承的可枚举属性是指原型链上的属性。这一点在使用 for...in 循环遍历对象时需要特别注意，尤其是在处理对象和其原型链上的属性时。

## 六、对象新增的方法

对象新增的方法，分别有以下：

- `Object.is()`
- `Object.assign()`
- `Object.getOwnPropertyDescriptors()`
- `Object.setPrototypeOf()`，`Object.getPrototypeOf()`
- `Object.keys()`，`Object.values()`，`Object.entries()`
- `Object.fromEntries()`

### Object.is()

严格判断两个值是否相等，与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是 `+0` 不等于 `-0`，二是 `NaN` 等于自身

```js
;+0 === -0 // true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

### Object.assign()

Object.assign() 方法用于对象的合并，将源对象 `source` 的所有可枚举属性，复制到目标对象 target

Object.assign() 方法的第一个参数是目标对象，后面的参数都是源对象

```js
const target = { a: 1, b: 1 }

const source1 = { b: 2, c: 2 }
const source2 = { c: 3 }

Object.assign(target, source1, source2)
target // {a: 1, b: 2, c: 3}
```

注意： Object.assign() 方法是浅拷贝，遇到同名属性会进行替换

### Object.getOwnPropertyDescriptors()

返回**指定对象**所有**自身属性**（非继承属性）的**描述对象**

```js
const obj = {
  foo: 123,
  get bar() {
    return 'abc'
  }
}

Object.getOwnPropertyDescriptors(obj)
```

### Object.setPrototypeOf()

Object.setPrototypeOf 方法用来**设置一个对象的原型对象**

```js
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null)
```

### Object.getPrototypeOf()

读取一个对象的原型对象

```js
Object.getPrototypeOf(obj)
```

### Object.keys()

返回自身的（不含继承的）所有可遍历（enumerable）属性的键名的数组

```js
var obj = { foo: 'bar', baz: 42 }
Object.keys(obj)
// ["foo", "baz"]
```

### Object.values()

返回自身的（不含继承的）所有可遍历（enumerable）属性的键对应值的数组

```js
const obj = { foo: 'bar', baz: 42 }
Object.values(obj)
// ["bar", 42]
```

### Object.entries()

返回一个对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对的数组

```js
const obj = { foo: 'bar', baz: 42 }
Object.entries(obj)
// ["foo", "bar"], ["baz", 42]
```

### Object.fromEntries()

用于将一个键值对数组转为对象

```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

# 参考文献

- [https://es6.ruanyifeng.com/#docs/object](https://es6.ruanyifeng.com/#docs/object)
- [原文](https://github.com/febobo/web-interview/issues/36)
