# 每日手写练习

[返回学习笔记目录](/README.md)

## 1.初级 JS

- [x] 1.盒模型宽度

```js
document.getElementById('div1').offsetWidth // content+padding+border，不包括margin
```

- [x] 2.圣杯布局【已记】
- [x] 3.双飞翼布局【已记】
- [x] 4.手写 clearfix【已记】
- [x] 5.flex 实现三色骰子【已记】
- [x] 6.居中对齐实现方式（水平、垂直）【已记】
- [x] 7.手写深拷贝【已记】
- [x] 8.手写简易 jQuery，考虑插件和扩展性【已记】
- [x] 9.手写 call、手写 apply、手写 bind【已记】
- [x] 10.做一个简单的 cache 工具 createCache.js【已记】
- [x] 11.创建 10 个`<a>`标签，点击弹出序号（2 种）【已记】
- [x] 12.手写：前端异步场景 4 个示例代码
- [x] 13.手写：使用 promise 加载一张图片（演示 Promise 串联解决回调地狱）
- [ ] 14.Promise A+ 规范
- [x] 15.手写 DOM 节点操作(4)、结构操作(4)、性能优化(2)
- [x] 16.手写 BOM（navigator、screen、location、history）
- [x] 17.手写通用事件绑定/监听函数 bindEvent(elem, type, fn)（知识点：事件绑定/冒泡/代理 瀑布流 优点等）
- [x] 18.手写简易 ajax (手写 XMLHTTPRequest-get&post)；promise 封装一个 ajax
- [x] 19.跨域解决方案（手写 jQuery 实现 jsonP，CORS-服务器设置 http header，jsonp.html&jsonp.js）

## 2.A4 纸手写题

> （参考《学习计划》中 3.2.6 手写系列的链接）

- [ ] 1.手写 hasPrototypeProperty
- [x] 2.继承之组合继承、原型继承、寄生组合继承【已记】
- [x] 3.手写 call、手写 apply、手写 bind、手写 bind 最简版【已记】
- [x] 4.手写模拟 new
- [x] 5.模拟实现 instanceof
- [x] 6.手写 Promise（实现 Promise.all、实现 Promise.race）
- [x] 7.抖防-节流
- [x] 8.函数柯里化 curry
- [x] 9.手写拷贝：深拷贝 deepClone、浅拷贝 shallowCopy

- [ ] 14.数组响应式
- [ ] 15.判断数据类型

## 2.2 hand.js

### 数据结构操作题：

- [ ] 10.数组拍平/数组扁平化-flat()
- [ ] 11.乱序输出
- [ ] 12.非负大整数
- [ ] 13.数组和类数

### 转换类型

- [ ] 16.对象 =》树
- [ ] 17.url 解析

## 3.vue-hand

- vue 响应式原理（observe.js）

## 4.http

## 5.webpack

## 6.TypeScript

### 基础知识

[1]TypeScript 的基本概念：

- [什么是 TypeScript？它与 JavaScript 有什么区别？]()
- [你为什么选择使用 TypeScript，而不是仅仅使用 JavaScript？]()

[2]类型系统：⭐

- [x] [TypeScript 中有哪些基本类型？]() 【febobo】
- [x] [解释一下 any、unknown、never 和 void 的区别。]() ⭐ 【双越】
- [x] [你如何定义一个接口？如何使用它们？]() 【febobo】

[3]高级类型：⭐

- [什么是交叉类型（Intersection Types）和联合类型（Union Types）？请举例说明。]() 【双越】
- [解释一下 TypeScript 中的类型别名（Type Aliases）和接口（Interfaces）的区别和使用场景。]() ⭐ 【双越】

### 实践应用

[4]泛型（Generics）：⭐

- [解释一下泛型的概念，并展示一个使用泛型的示例。]()
- [泛型在实际开发中有哪些应用场景？]()

[5]模块和命名空间：

- [TypeScript 中模块（Modules）和命名空间（Namespaces）的区别是什么？]()
- [如何在 TypeScript 中导入和导出模块？]()

[6]装饰器（Decorators）：

- [你对 TypeScript 中的装饰器有了解吗？它们是什么，有什么作用？]()
- [请举例说明如何使用类装饰器、方法装饰器或属性装饰器。]()

### 类型推断与检查

[7]类型推断（Type Inference）：⭐

- [TypeScript 是如何进行类型推断的？请举例说明。]()
- [解释一下上下文类型（Contextual Typing）。]()

[8]类型检查和编译器配置：

- [你如何在项目中配置 TypeScript 编译器（tsconfig.json）？]()
- [strict 模式下的 TypeScript 有哪些不同之处？]()

### 实际项目经验

[9]项目中的 TypeScript：⭐

- [你在实际项目中是如何使用 TypeScript 的？能举一个具体的例子吗？]()
- [在项目中使用 TypeScript 遇到过哪些问题？你是如何解决的？]()

[10]TypeScript 与其他工具的集成：

- [你如何在一个 React 或 Vue 项目中使用 TypeScript？]()
- [TypeScript 如何与 Webpack、Babel 等工具集成？]()
