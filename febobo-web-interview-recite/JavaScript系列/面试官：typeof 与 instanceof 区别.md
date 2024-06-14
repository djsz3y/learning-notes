# 面试官：typeof 与 instanceof 区别

## 一、typeof

[1]概念：

- `typeof` 操作符**返回**一个**字符串**，表示**未经计算的操作数的类型**

[2]使用方法：

- `operand` 表示**对象或原始值的表达式**，其**类型**将被**返回**

```js
typeof operand
typeof operand
```

[3]举例：

```js
// 前 6 个是 基础数据类型
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof null // 'object'

typeof [] // 'object'
typeof {} // 'object'
typeof console // 'object'
typeof console.log // 'function'
```

[4]分析：

[4.1]前 6 个是**基础数据类型**

- 'number' 'string' 'undefined' 'boolean' 'symbol' 还有个 null 的 typeof 是 'object'，但它也是 基础数据类型；

其中对于 `typeof null`的理解：

1. `typeof null` 为 `object` ，是 JS 存在的一个悠久 `Bug`，不代表 `null` 就是 引用数据类型，并且 `null` 本身也不是对象。
2. null 在 typeof 之后返回的结果有问题，不能作为判断 null 的方法；
3. 如果需要在 if 语句中判断是否为 null，直接通过 === 来判断即可。

[4.2]引用类型数据，除了 `function` 会被识别出来，其余都输出 `object`

[4.3]**应用**：判断一个变量是否存在 ⭐

- **判断一个变量是否存在**：可以使用 `typeof`，但是不能使用 `if(a)`，因为如果 `a` 未声明，那么会报错；

```js
if (typeof a != 'undefined') {
  // 变量存在
}
```

## 二、instanceof

[1]作用：

- `instanceof` 运算符**用于检测构造函数的 `prototype` 属性是否**出现**在某个实例对象的原型链上。**

[2]使用如下

- `object` - 实例对象
- `constructor` - 构造函数，通过 `new` 实例对象

```js
object instanceof constructor
```

[3]举例：

```js
// 定义构造函数
let Car = function () {}
let benz = new Car()
benz instanceof Car // true
let car = new String('xxx')
car instanceof String // true
let str = 'xxx'
str instanceof String // false
```

[4]分析：

- `constructor` - 构造函数，通过 `new` 实例对象（同上）
- `instanceof` - 判断这个实例对象 `object` 是否为之前的那个构造函数生成的对象。

[5]`instanceof` 的实现原理，可参考：

- 也就是顺着原型链去找，直到找到相同的原型对象，返回 `true`，否则返回 `false`。

```js
function myInstanceof(left, right) {
  // 这里先用 typeof 来判断基础数据类型，如果是，直接返回 false
  if (typeof left !== 'object' || left === null) return false
  // getPrototypeOf 是 Object 对象自带的 API，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true // 找到相同原型对象，返回true
    proto = Object.getPrototypeOf(proto)
  }
}
```

## 三、区别

[1]`typeof` VS `instanceof`

[1.1]相同点：

- 都是**判断数据类型的方法**，

[1.2]区别如下：

1. 返回：`typeof` 返回一个变量的基本类型，`instanceof` 返回一个布尔值；
2. `instanceof` 弊端：`instanceof` **可以**准确判断复杂引用数据类型，**但不能**正确判断基础数据类型；
3. `typeof` 也存在弊端：它虽然可以判断基础数据类型（`null` 除外），但是引用数据类型中，除了 `function` 类型以外，其他也无法判断。

[1.3]上述两种方法都有弊端，并不能满足所有场景的需求。

[2]**通用检测/判断数据类型**的办法/解决方案 —— 使用 `toString`：

[2.1]了解 `toString` 的基本用法

- 采用 `Object.prototype.toString`，调用该方法，统一返回格式 `"[object Xxx]"` 的字符串

```js
Object.prototype.toString({}) // '[object Object]'
Object.prototype.toString.call({}) // 同上结果，加上 call 也 ok
Object.prototype.toString.call(1) // '[object Number]'
Object.prototype.toString.call('1') // '[object String]'
Object.prototype.toString.call(true) // '[object Boolean]'
Object.prototype.toString.call(function(){}) '[object Function/]'
Object.prototype.toString.call(null) // '[object Null]'
Object.prototype.toString.call(undefined) // '[object Undefined]'
Object.prototype.toString.call(/123/g) // '[object RegExp]'
Object.prototype.toString.call(new Date()) // '[object Date]'
Object.prototype.toString.call([]) // '[object Array]'
Object.prototype.toString.call(document) // '[object HTMLDocument]'
Object.prototype.toString.call(window) // '[object Window]'
```

> 了解了 toString 的基本用法，下面就实现一个全局通用的数据类型判断方法

[2.2]全局通用的判断数据类型的方法

```js
function getType(obj) {
  let type = typeof obj
  if (type !== 'object') {
    return type
  }
  // 对于 typeof 返回结果是 object 的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}
```

[2.3]使用如下：

```js
getType([]) // 'Array' typeof [] 是 object，因此 toString 返回
getType('123') // 'string' typeof 直接返回
getType(window) // 'Window' toString 返回
getType(null) // 'Null' 首字母大写，typeof null 是 object，需要 toString 来判断
getType(undefined) // 'undefined' typeof 直接返回
getType() // 'undefined' typeof 直接返回
getType(function () {}) // 'function' typeof 能判断，因此首字母小写
getType(/123/g) // 'RegExp' toString 返回
```

# 参考文献

- [原文](https://github.com/febobo/web-interview/issues/65)
