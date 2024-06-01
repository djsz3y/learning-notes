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

```js

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

```

## 三、WeakSet 和 WeakMap

# 参考文献

- [https://es6.ruanyifeng.com/#docs/set-map](https://es6.ruanyifeng.com/#docs/set-map)
- [原文](https://github.com/febobo/web-interview/issues/38)
