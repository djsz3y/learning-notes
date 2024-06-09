# 面试官：说说 JavaScript 中的数据类型？区别？

# 一、概述

【1】JS 中有六种**简单数据类型**：

- undefined
- null
- boolean
- string
- number
- symbol

【2】**引用类型**：

- object

【3】声明时只有一种数据类型，运行期间确定当前类型：

> 在 JavaScript 中，**变量的类型**并不是声明时确定的，而是在运行时由赋值语句情况确定的。  
> 声明时和运行时的数据类型可能不一样。

```js
let x = y ? 1 : a
```

【4】解释：

1. 声明变量数据类型不确定：在 JavaScript 中，声明变量时，数据类型不确定，而是通过赋值语句来确定。比如：使用 let 关键字来声明变量 x。

2. 赋值运算在运行期间确定类型：在给变量赋值时，JavaScript 解释器会根据赋值语句右侧表达式的结果来确定变量的类型。在例子中，`let x = y ? 1 : a;`，根据条件 `y` 的真假来决定 x 的值是 1 还是 a，因此 x 的类型也会根据这个赋值语句在运行时确定。

这种动态类型的特性使得 JavaScript 具有很高的灵活性，但也增加了在编写代码时的一些潜在错误，因为类型在运行时才确定，而不是在编译时。

# todo

【】常见的类型转换：

- 强制转换（显示转换）
- 自动转换（隐式转换）

```js
Number(324) // 324
Number('324') // 324
Number('324abc') // NaN
Number('') // 0
Number(true) // 1
Number(false) // 0
Number(undefined) // NaN
Number(null) // 0
Number({ a: 1 }) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5
```

# 二、显示转换

# 三、隐式转换

## 自动转换为布尔值

## 自动转换成字符串

## 自动转换成数值

# 四、总结：以后要补充的 TODO

- [9.编译器：](https://github.com/djsz3y/zhaowa-study-notes/blob/master/formal_lessons/js_9_compiler.md)

# 参考文献

- [原文](https://github.com/febobo/web-interview/issues/51)
