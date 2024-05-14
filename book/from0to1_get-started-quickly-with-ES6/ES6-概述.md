# ES6 概述

## ES6 是什么

JavaScript：

- ECMAScript、
- DOM、
- BOM

ES5

ES6(又叫 ES2015，ECMAScript 2015)

Vue.js React.js Angular.js Node.js ——> 都使用 ES6 语法

笼统的叫 ES6~ES12 叫作 ES6。

## 学前准备

### 教程说明

先要了解：

- 对象的各种操作、
- 类的定义与继承、
- 异步编程

发现 ES6 很难理解，说明 ES5 基础不扎实，复习 ES5 语法。

### 环境说明

- 现在主流浏览器如 Chrome、Edge、Firefox 等的最新版本，都已经支持绝大部分的 ES6 语法了。也就是 不需要使用 Babel 编译，就可以直接在浏览器中运行 ES6 代码。

- 实际上，使用 Babel 还是有必要的，低版本浏览器并不一定支持 ES6 语法。

- 不过实际开发中，大多数情况不需要手动配置 Babel 环境，因为 Vue、React 等的脚手架工具会自动帮我们配置好。

- 新语法，直接像 JavaScript 那样，直接在浏览器中运行。

运行代码，ES6 代码直接放在下面 script 标签内，浏览器中运行 HTML 页面即可：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <script>
      // ES6 代码
    </script>
  </head>
  <body></body>
</html>
```

## console.log() 调试代码

【1】document.write() 或 alert() 来调试代码的弊端：

- 对于 window 这种复杂的对象，只会输出一个**简单的提示**内容：`[object Window]`。

【2】使用 console.log() 调试代码的效果：

- 可以看到 **window 对象的详细信息**。

```js
console.log(window)
// Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …}
```

【3】查看控制台输出的内容：

1. 【Ctrl+Shift+I】 + 点击 console
2. 右键 -> 检查(N)选项 + 点击 console
