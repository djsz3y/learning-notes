# 面试官：你是怎么理解 ES6 中 Module 的？使用场景？

## 一、模块化的介绍

[1]模块定义：

模块，Module，是**单独命名**且能**独立完成一定功能**的**程序语句的集合**（程序代码和数据结构的**集合体**）。

[2]两个基本的特征：

外部特征&内部特征

- 外部特征：模块与外部环境联系的接口（即其他模块或程序调用该模块的方式，包括有输入输出参数、以及引用的全局变量）和该模块的功能。

- 内部特征：该模块具有的内部环境的特点（也就是，该模块的局部数据和程序代码）

[3]为什么需要模块化？

- 代码抽象
- 代码封装
- 代码复用
- 依赖管理

[4]如果没有模块化，我们的代码会怎样？

- 变量和方法不容易维护，容易污染全局作用域。
- 加载资源的方式通过 script 标签从上到下。
- 依赖的环境主观逻辑偏重，代码较多就会比较复杂。
- 大型项目资源难以维护，特别是多人合作的情况下，资源的引入会让人崩溃。

[5]因此，需要一种将 JavaScript 程序模块化的机制，如：

- CommonJS（典型代表：node.js 早期）
- AMD（典型代表：require.js）
- CMD（典型代表：sea.js）

### AMD

[1]Asynchronous ModuleDefinition（AMD），异步模块定义，采用异步方式加载模块。所有依赖模块的语句，都定义在一个回调函数中，等到模块加载完成之后，这个回调函数才会运行

[2]代表库 `require.js`

```js
/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: 'js/lib',
  paths: {
    jquery: 'jquery.min', // 实际路径为 js/lib/jquery.min.js
    underscore: 'underscore.min'
  }
})

// 执行基本操作
require(['jquery', 'underscore'], function ($, _) {
  // some code here
})
```

### CommonJS

[1]CommonJS 是一套 JavaScript 模块规范，用于服务端

```js
// a.js
module.exports = { foo, bar }

// b.js
const { foo, bar } = require('./a.js')
```

[2]CommonJS 有如下特点：

- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块是同步加载的，即只有加载完成，才能执行后面的操作
- 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存
- require 返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值

[3]既然存在了 AMD 记忆 CommonJS 机制，ES6 的 Module 又有什么不一样？

### ES6 Module

[1]ES6 在语言标准的层面上，实现了 Module，即模块功能，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案

[2]CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性

```js
// CommonJS 模块
let { stat, exists, readfile } = require('fs')

// 等同于
let _fs = require('fs')
let stat = _fs.stat
let exists = _fs.exists
let readfile = _fs.readfile
```

[3]ES6 设计思想是尽量的**静态化**，使得**编译时就能确定模块的依赖关系**，以及**输入和输出的变量**

```js
// ES6 模块
import { stat, exists, readFile } from 'fs'
```

- 上述代码，只加载 3 个方法，其他方法不加载，即 **ES6 可以在编译时就完成模块加载**

[4]由于编译加载，使得静态分析成为可能。包括现在流行的 TypeScript 也是依靠静态分析实现的功能。

## 二、使用

ES6 模块内部自动采用了严格模式，这里就不展开严格模式的限制，毕竟这是 ES5 之前就已经规定好

模块功能主要由两个命令构成：

- export：用于规定模块的对外接口
- import：用于输入其他模块提供的功能

### export

一个模块就是一个独立的文件，外部无法获取该文件内部的所有变量；如果期望外部可以获取模块内部的某个变量，需要用 export 关键字输出该变量。

```js
// profile.js
export var firstName = 'Michael'
export var lastName = 'Jackson'
export var year = 1958

或

// 建议使用下面写法，这样能瞬间确定输出了哪些变量
var firstName = 'Michael'
var lastName = 'Jackson'
var year = 1958

export { firstName, lastName, year }
```

输出函数或类

```js
export function multiply(x, y) {
  return x * y
}
```

通过 as 可以进行输出变量的重命名

```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
}
```

> 通过 as 关键字，联想到 TS 的 as 类型断言，参考链接：
>
> - [类型断言](https://ts.xcatliu.com/basics/type-assertion.html#%E7%B1%BB%E5%9E%8B%E6%96%AD%E8%A8%80%E7%9A%84%E7%94%A8%E9%80%94)

### import

[1]使用 `export` 命令定义模块对外接口，所以其他 JS 文件就可以用 `import` 命令导入加载这个模块

```js
// main.js
import { firstName, lastName, year } from './profile.js'

function setName(element) {
  element.textContent = firstName + ' ' + lastName
}
```

[2]同样，如果想要输入变量起别名，使用 as 关键字

```js
import { lastName as surname } from './profile.js'
```

[3]当加载整个模块的时候，需要用到星号 `*`

```js
// circle.js
export function area(radius) {
  return Math.PI * radius * radius
}

export function circumference(radius) {
  return 2 * Math.PI * radius
}

// main.js

import * as circle from './circle'
console.log(circle) // { area: area, circumference: circumference }
```

[4]导入的模块，如果输入的变量是只读的，不允许修改，如果是对象，允许修改属性

- 不过，一般不建议修改；因为修改后，难查错。

```js
import { a } from './xxx.js'

a.foo = 'hello' // 合法操作
a = {} // Syntax Error: 'a' is read-only;
```

[5]import 后常跟着 from 关键字，指定的是模块的位置，可以是相对路径，也可以是绝对路径。

```js
import { a } from './a'
```

[6]如果只有一个模块名，需要有配置文件，告诉引擎模块的位置

```js
import { myMethod } from 'util'
```

[7]编译阶段，import 会提升到整个模块的头部，首先执行

```js
foo()

import { foo } from 'my_module'
```

[8]多次重复执行同样的导入，只会执行一次

```js
import 'lodash'
import 'lodash'
```

[9]导入模块时，要知道加载的变量命和函数，否则无法加载

[10]如果为模块指定了默认输出，即用到了 export default 命令，就不需要知道变量命或函数以完成加载

```js
// export-default.js
export default function () {
  console.log('foo')
}
```

[11]加载默认导出的模块时，导入时可以用 import 命令为函数任意指定导入名

```js
// import-default.js
import customName from './export-default'
customName() // 'foo'
```

### 动态加载

[1]仅在需要时加载模块，不必预先加载所有模块，这样存在明显的性能优势。

[2]这个新功能允许将 import 作为函数调用，将其作为参数传递给模块的路径；返回一个 promise，用一个模块对象来实现，可以访问这个对象的导出。

```js
import('/modules/myModule.mjs').then((module) => {
  // Do something with the module.
})
```

### 复合写法

如果在一个模块中，先输入后输出同一个模块，import 语句可以与 export 语句写在一起

```js
export { foo, bar } from 'my_module'

// 可以简单理解为：
import { foo, bar } from 'my_module'
export { foo, bar }
```

同理，能够搭配 `as`、`*` 搭配使用

## 三、使用场景

[1]如今，ES6 模块化已经深入我们日常项目开发中，像 vue、react 项目搭建项目，组件化开发处处可见，其也是依赖模块化实现

[2]vue 组件

```html
<template>
  <div class="App">组件化开发 ---- 模块化</div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    }
  }
</script>
```

[3]react 组件

```jsx
function App() {
  return <div className="App">组件化开发 ---- 模块化</div>
}

export default App
```

包括完成一些复杂应用的时候，我们也可以拆分成各个模块

# 参考文献

- [https://macsalvation.net/the-history-of-js-module/](https://macsalvation.net/the-history-of-js-module/)
- [https://es6.ruanyifeng.com/#docs/module](https://es6.ruanyifeng.com/#docs/module)
- [原文](https://github.com/febobo/web-interview/issues/43)
