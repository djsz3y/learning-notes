《JavaScript 设计模式与开发实践》读书笔记

# 第 8 章 发布-订阅模式

## 8.3 DOM 事件

DOM 的发布-订阅

```js
document.body.addEventListener(
  'click',
  function () {
    alert(2)
  },
  false
) // 订阅

// 模拟用户点击
document.body.click() // 发布
```

多个订阅

```js
document.body.addEventListener(
  'click',
  function () {
    alert(2)
  },
  false
)
document.body.addEventListener(
  'click',
  function () {
    // 112 第8 章 发布订阅模式
    alert(3)
  },
  false
)
document.body.addEventListener(
  'click',
  function () {
    alert(4)
  },
  false
) // 多个订阅

// 模拟用户点击
document.body.click() // 发布
```

## 8.4 自定义事件

### 8.4.1 如何（依靠自定义事件）实现发布订阅模式？

步骤：

[1]指定发布者。  
[2]给发布者添加缓存列表，存放 fn，通知订阅者。  
[3]发布者->遍历缓存列表，依次触发存放的订阅者回调函数 fn（挨个发短信），发布消息。

### 8.4.2 最简单的发布-订阅模式

```js
var salesOffices = {} // 定义售楼处

salesOffices.clientList = [] // 缓存列表，存放订阅者的回调函数
salesOffices.listen = function (fn) {
  // 增加订阅者
  this.clientList.push(fn) // 订阅的消息添加进缓存列表
}
salesOffices.trigger = function () {
  // 发布消息
  for (var i = 0, fn; (fn = this.clientList[i++]); ) {
    fn.apply(this, arguments) // (2) // arguments 是发布消息时带上的参数
  }
}

//下面我们来进行一些简单的测试：
salesOffices.listen(function (price, squareMeter) {
  // 小明订阅消息
  console.log('价格= ' + price)
  console.log('squareMeter= ' + squareMeter)
})

salesOffices.listen(function (price, squareMeter) {
  // 小红订阅消息
  console.log('价格= ' + price)

  console.log('squareMeter= ' + squareMeter)
})

salesOffices.trigger(2000000, 88) // 输出：200 万，88 平方米
salesOffices.trigger(3000000, 110) // 输出：300 万，110 平方米
```

### 8.4.3 有必要增加标识 key，订阅者只订阅感兴趣的消息

```js
var salesOffices = {} // 定义售楼处
salesOffices.clientList = [] // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function (key, fn) {
  if (!this.clientList[key]) {
    // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    this.clientList[key] = []
  }
  this.clientList[key].push(fn) // 订阅的消息添加进消息缓存列表
}

salesOffices.trigger = function () {
  // 发布消息
  var key = Array.prototype.shift.call(arguments), // 取出消息类型
    fns = this.clientList[key] // 取出该消息对应的回调函数集合
  if (!fns || fns.length === 0) {
    // 如果没有订阅该消息，则返回
    return false
  }
  for (var i = 0, fn; (fn = fns[i++]); ) {
    fn.apply(this, arguments) // (2) // arguments 是发布消息时附送的参数
  }
}

salesOffices.listen('squareMeter88', function (price) {
  // 小明订阅88 平方米房子的消息
  console.log('价格= ' + price) // 输出： 2000000
})

salesOffices.listen('squareMeter110', function (price) {
  // 小红订阅110 平方米房子的消息
  console.log('价格= ' + price) // 输出： 3000000
})

salesOffices.trigger('squareMeter88', 2000000) // 发布88 平方米房子的价格
salesOffices.trigger('squareMeter110', 3000000) // 发布110 平方米房子的价格
```

## 8.5 发布-订阅模式的通用实现

### 8.5.1 提取发布-订阅功能，放在单独的对象 `event` 内：

```js
//所以我们把发布—订阅的功能提取出来，放在一个单独的对象内：
var event = {
  clientList: [],
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn) // 订阅的消息添加进缓存列表
  },
  trigger: function () {
    var key = Array.prototype.shift.call(arguments), // (1);
      fns = this.clientList[key]
    if (!fns || fns.length === 0) {
      // 如果没有绑定对应的消息
      return false
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments) // (2) // arguments 是trigger 时带上的参数
    }
  }
}
```

### 8.5.2 给对象 `obj` 动态安装发布-订阅功能：

```js
var installEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i]
  }
} // 给对象 `obj` 动态安装发布-订阅功能
```

### 8.5.3 测试：给对象 `salesOffices` 动态增加发布-订阅功能：

```js
//再来测试一番，我们给售楼处对象salesOffices 动态增加发布—订阅功能：
var salesOffices = {}
installEvent(salesOffices)
salesOffices.listen('squareMeter88', function (price) {
  // 小明订阅消息
  console.log('价格= ' + price)
})
salesOffices.listen('squareMeter100', function (price) {
  // 小红订阅消息
  console.log('价格= ' + price)
})
salesOffices.trigger('squareMeter88', 2000000) // 输出：2000000
salesOffices.trigger('squareMeter100', 3000000) // 输出：3000000
```

## 8.6 取消订阅的事件

小明突然不想买房子了，避免继续接收短信，TD。

### 8.6.1 给 event 对象增加 remove 方法：

```js
event.remove = function (key, fn) {
  var fns = this.clientList[key]
  if (!fns) {
    // 如果key 对应的消息没有被人订阅，则直接返回
    return false
  }
  if (!fn) {
    // 如果没有传入具体的回调函数，表示需要取消key 对应消息的所有订阅
    fns && (fns.length = 0)
  } else {
    for (var l = fns.length - 1; l >= 0; l--) {
      // 反向遍历订阅的回调函数列表
      var _fn = fns[l]
      if (_fn === fn) {
        fns.splice(l, 1) // 删除订阅者的回调函数
      }
    }
  }
}
```

### 8.6.2 安装、增加发布-订阅

```js
var salesOffices = {}

var installEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i]
  }
} // 给对象 `obj` 动态安装发布-订阅功能

installEvent(salesOffices) // 给对象 `salesOffices` 动态增加发布-订阅功能
```

### 8.6.3 测试：使用 `remove` 方法，取消订阅

```js
salesOffices.listen(
  'squareMeter88',
  (fn1 = function (price) {
    // 小明订阅消息
    console.log('价格= ' + price)
  })
)

salesOffices.listen(
  'squareMeter88',
  (fn2 = function (price) {
    // 小红订阅消息
    console.log('价格= ' + price)
  })
) // 多个订阅

salesOffices.remove('squareMeter88', fn1) // 删除小明的订阅
salesOffices.trigger('squareMeter88', 2000000) // 输出：2000000
```

## 8.7 真实的例子——网站登录

```js

```

## 8.8 全局的发布-订阅对象

```js

```

## 8.9 模块间通信

```js

```

## 8.10 必须先订阅再发布吗？

```js

```

## 8.11 全局事件的命名冲突

```js

```

## 8.12 JavaScript 实现发布-订阅模式的便利性

## 8.13 总结

### 8.13.1 优势

### 8.13.2 劣势

### 8.13.3 代码总结

```js

```
