《JavaScript DOM 编程艺术》读书笔记

## 4.4 对这个函数进行扩展

### 4.4.1 childNodes 属性

element.childNodes 获取任意元素的所有子元素
element.childNodes.length 包含元素个数

```js
window.onload = function () {
  // 页面加载时执行

  var body_element = document.getElementsByTagName('body')[0]
  body_element.childNodes.length //包含元素个数
}
```

### 4.4.2 nodeType 属性

nodeType 属性共 12 种可取值，3 种具有实用价值：

- 元素节点 nodeType 属性值为 1
- 属性节点 nodeType 属性值为 2
- 文本节点 nodeType 属性值为 3

## 7.2 DOM 方法

### 7.2.1 createElement

语法：

document.createElement(nodeName)

创建文档碎片（document fragment）：

```js
var para = document.createElement('p')
```

验证文档碎片有自己的 DOM 属性：

```js
window.onload = function () {
  var para = document.createElement('p')
  var info = 'nodeName: '
  info += para.nodeName
  info += ' nodeType: '
  info += para.nodeType // 1 元素节点
  alert(info)
}
```

### 7.2.2 appendChild

语法：

parent.appendChild(child)

### 7.2.3 createTextNode

语法：

document.createTextNode(text)
