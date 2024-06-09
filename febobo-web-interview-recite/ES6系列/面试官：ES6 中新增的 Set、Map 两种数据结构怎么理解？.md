# 面试官：ES6 中新增的 Set、Map 两种数据结构怎么理解？

先概括说一下，再以增删改查的角度，分别说一下 Set、Map、WeakSet & WeakMap。

[1]Set & Map 都是数据结构：

- Set 是一种叫做集合的数据结构，
- Map 是一种叫做字典的数据结构。

[2]什么是集合？什么是字典？

- 集合：由无序的、相关联的、不重复的内存结构（数学上称为元素）组合成的组合。
- 字典：由元素组成的集合。每一个元素对应一个 key 的域，不同元素都有一个不同的 key 对应。

[3]相同点 & 不同点：

- 相同点：都可以存储不重复的元素。
- 不同点：集合是以[值,值]的形式存储元素，字典是以[键,值]的形式存储。

## 一、Set

### 概况

Set 是 ES6 新增的数据结构，类似于数组，元素唯一不重复，称为集合。  
Set 本身是一个构造函数，用于生成 Set 数据结构。

```js
const s = new Set()
```

### 增删改查

> Set 的实例的 CRUD 的方法：
>
> - add()
> - delete()
> - has()
> - clear()

add()

- 添加某个值，返回 `Set` 结构本身；
- 添加实例中已存在的值，`Set` 不会进行添加处理；

```js
s.add(1).add(2).add(2) // 2 只被添加了一次
```

delete()

- 删除某个值，返回布尔值

```js
s.delete(1)
```

has()

- 返回一个布尔值，判断该值是否是 `Set` 的成员

```js
s.has(2)
```

clear()

- 清除所有成员，没有返回值

```js
s.clear()
```

### 遍历

> Set 结构原生提供 3 个遍历器生成函数和 1 个遍历方法
>
> - keys()：返回键名的遍历器
> - values()：返回键值的遍历器
> - entries()：返回键值对的遍历器
> - forEach()：使用回调函数遍历每个成员
>
> Set 的遍历顺序就是插入顺序；
> keys()、values()、entries() 返回的都是遍历器对象；

[1]keys()、values()、entries()

```js
let set = new Set(['red', 'green', 'blue'])

for (let item of set.keys()) {
  console.log(item)
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item)
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item)
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

[2]forEach()

- forEach() 用于对每个成员执行某种操作，没有返回值，键值、键名都相等，
- 同样的 forEach 方法有第二个参数，用于绑定处理函数 this

> 语法：

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

> 描述：

- value：元素的值
- key：元素的键
- set：被遍历的 Set
- **非严格模式下，this 为 undefined 会被隐式转换为全局对象。**

```js
let thisArg = { a: 1 }
let set = new Set([1, 4, 9])
set.forEach(function (value, key, set) {
  // "use strict"
  console.log(key + ' : ' + value)
  console.log(set)
  console.log(this)
}, thisArg)
// 1 : 1
// 4 : 4
// 9 : 9
```

> 参考链接：
>
> - [MDN - Set.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/foreach)

[3]扩展运算符 + Set 结构，**实现数组或字符串去重**

```js
// 数组
let arr = [3, 5, 2, 2, 5, 5]
let unique = [...new Set(arr)]
unique // [3, 5, 2]

// 字符串
let str = '352255'
let unique = [...new Set(str)]
unique // ['3', '5', '2']
unique.join('') // "352"
```

[4]扩展运算符 + Set 结构，**实现并集、交集和差集**

```js
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

// 并集
let union = new Set([...a, ...b])
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter((x) => b.has(x)))
// Set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter((x) => !b.has(x)))
// Set {1}
```

## 二、Map

### 概况

Map 类型是键值对的有序列表，键和值都可以存储任意类型。  
Map 本身是一个构造函数，用来生成 Map 数据结构。

```js
const m = new Map()
```

### 增删改查

> Map 的实例的 CRUD 的方法：
>
> - set()
> - delete()
> - has()
> - get()
> - clear()
> - size 属性

set()

- 设置键名 key 对应的键值 value，返回整个 Map 结构；
- 设置的键名 key 已经有值，键值会被更新，否则就新生成该键；
- 同时返回当前的 Map 对象，可采用链式写法；

```js
const m = new Map()

m.set('edition', 6) // 键是字符串
m.set(262, 'standard') // 键是数值
m.set(undefined, 'nah') // 键是 undefined
m.set(1, 'a').set(2, 'b').set(3, 'c') // 链式操作
```

delete()

- 删除某个键，返回布尔值；
- 删除成功，返回 true，删除失败，返回 false；

```js
const m = new Map()
m.set(undefined, 'nah')
m.has(undefined) // true

m.delete(undefined)
m.has(undefined) // false
```

has()

- 返回一个布尔值，判断键是否在当前 Map 对象中

```js
const m = new Map()

m.set('edition', 6)
m.set(262, 'standard')
m.set(undefined, 'nah')

m.has('edition') // true
m.has('years') // false
m.has(262) // true
m.has(undefined) // true
```

get()

- 读取键名 key 对应的键值；
- 如果找不到，返回 undefined；

```js
const m = new Map()

const hello = function () {
  console.log('hello')
}
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello) // Hello ES6!
```

clear()

- 清除所有成员，没有返回值

```js
let map = new Map()
map.set('foo', true)
map.set('bar', false)

map.size // 2
map.clear()
map.size // 0
```

size 属性

- 返回 Map 结构的成员总数。

```js
const map = new Map()
map.set('foo', true)
map.set('bar', false)

map.size // 2
```

### 遍历

> Map 结构原生提供 3 个遍历器生成函数和 1 个遍历方法
>
> - keys()：返回键名的遍历器
> - values()：返回键值的遍历器
> - entries()：返回所有成员的遍历器
> - forEach()：遍历 Map 的所有成员
>
> Map 的遍历顺序就是插入顺序

```js
const map = new Map([
  ['F', 'no'],
  ['T', 'yes']
])

for (let key of map.keys()) {
  console.log(key)
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value)
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1])
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value)
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value)
}
// "F" "no"
// "T" "yes"

map.forEach(function (value, key, map) {
  console.log('Key: %s, Value: %s', key, value)
})
// "Key: F, Value: no"
// "Key: T, Value: yes"
```

## 三、WeakSet 和 WeakMap

### WeakSet

创建 WeakSet 实例

```js
const ws = new WeakSet()
```

WeakSet 可以接受一个**具有 Iterable 接口的对象作为参数**

```js
const a = [
  [1, 2],
  [3, 4]
]
const ws = new WeakSet(a)
// WeakSet {[1, 2], [3, 4]}
```

在 API 中 WeakSet 与 Set 有两个区别：

- 没有遍历操作的 API
- 没有 size 属性

WeakSet 成员只能是引用类型，而不能是其他类型的值

```js
let ws = new WeakSet()

// 成员不是引用类型
let weakSet = new WeakSet([2, 3])
console.log(weakSet) // 报错

// 成员为引用类型
let obj1 = { name: 1 }
let obj2 = { name: 2 }
let ws = new WeakSet([obj1, obj2])
console.log(ws) // WeakSet {{...}, {...}}
```

WeakSet 里面的引用只要在外部消失，它在 WeakSet 里面的引用就会自动消失

### WeakMap

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合

在 API 中 WeakMap 与 Map 有两个区别：

- 没有遍历操作的 API
- 没有 clear 清空方法

```js
// WeakMap 可以使用 Set 方法添加成员
const wm1 = new WeakMap()
const key = { foo: 1 }
wm1.set(key, 2)
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3]
const k2 = [4, 5, 6]
const wm2 = new WeakMap([
  [k1, 'foo'],
  [k2, 'bar']
])
wm2.get(k2) // "bar"
```

WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名

```js
const map = new WeakMap()
map.set(1, 2)
// TypeError: Invalid value used as weak map key
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid Value used as weak map key
```

WeakMap 的键名所指向的对象，

- 一旦不再需要，里面的键名对象和所对应的键值对会自动消失，不用手动删除引用

#### 举个场景例子：

- 网页的 DOM 元素上添加数据，就可以使用 WeakMap 结构，当该 DOM 元素被清除，其所对应的 WeakMap 记录就会自动被移除

```js
const wm = new WeakMap()
const element = document.getElementById('js-global-screen-reader-notice')

wm.set(element, 'some information') // WeakMap {div#js-global-screen-reader-notice.sr-only => 'some information'}
wm.get(element) // 'some information'
```

#### 注意：

- WeakMap 弱引用的只是键名，而不是键值。**键值依然是正常引用**

下面代码中，**键值 obj 会在 WeakMap 产生新的引用**，当你**修改 obj 不会影响到内部**

```js
const wm = new WeakMap()
let key = {}
let obj = { foo: 1 }

wm.set(key, obj)
obj = null
wm.get(key)
// Object {foo: 1}
```

# 参考文献

- [https://es6.ruanyifeng.com/#docs/set-map](https://es6.ruanyifeng.com/#docs/set-map)
- [原文](https://github.com/febobo/web-interview/issues/38)
