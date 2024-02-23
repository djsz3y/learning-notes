// 手写 call
Function.prototype.call2 = function (context, ...args) {
  // 判断 Symbol 获取this 执行（参数） 删除 返回
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
  // 判断 Symbol 获取this 执行（参数） 删除 返回
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
  // 判断this函数
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind-what is trying to be bound is not callable'
    )
  }
  // 获取this
  var self = this
  // 获取参数args
  var args = Array.prototype.slice.call(arguments, 1)
  // 中转空函数
  var fNOP = function () {}

  var fBound = function () {
    // 获取bindArgs（构造函数方式 new 的给x绑定bind函数的新函数y：`new y(args1)` ）
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

// 手写最简版 bind
Function.prototype.myBind = function (context) {
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  var self = this
  return function (...args) {
    return self.apply(context, args)
  }
}
