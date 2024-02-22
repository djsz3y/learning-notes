// 手写 call
Function.prototype.call2 = function (context, ...args) {
  // 判断 Symbol 获取this 执行 删除 返回
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  let fnSymbol = Symbol()
  context[fnSymbol] = this
  let fn = context[fnSymbol](...args)
  delete context[fnSymbol]
  return fn
}

// 手写 apply
Function.prototype.apply2 = function (context, args) {
  // 判断 Symbol 获取this 执行 删除 返回
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  let fnSymbol = Symbol()
  context[fnSymbol] = this
  let fn = context[fnSymbol](...args)
  delete context[fnSymbol]
  return fn
}

// 手写 bind
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind-what is trying to be bound is not callable'
    )
  }
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var fNOP = function () {}
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    )
  }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}

// 手写 bind 最简版
Function.prototype.myBind = function (context) {
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  var self = this
  return function (...args) {
    return self.apply(context, args)
  }
}
