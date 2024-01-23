《ES6 标准入门》读书笔记

# 第 6 章

## 6.1 二进制和八进制表示法

1.二进制、八进制，数值新写法：

前缀`0b`（或`0B`）和`0o`（或`0O`）

```js
// 二
0b111110111 === 503 // true
// 八
0o767 === 503 // true
```

2.ES5 严格模式，不允许八进制前缀`0`表示；ES6 明确前缀`0o`；

```js
// 非严格模式
;(function () {
  console.log(0o11 === 011)
})() // true

// 严格模式
;(function () {
  'use strict'
  console.log(0o11 === 011)
})() // Uncaught SyntaxError: Octal literals are not allowed in strict mode.
```

3.前缀 0b 0o 字符串数值——> 十进制数值，Number 方法：

```js
Number('0b111') // 7
Number('0o10') // 8
```

## 6.7 Math 对象的扩展

# 第 21 章 修饰器
