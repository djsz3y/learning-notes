Function.prototype.call2 = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.call2-what is trying to be bound is not callable'
    )
  }
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

Function.prototype.apply2 = function (context, args) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.apply2-what is trying to be bound is not callable'
    )
  }
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

Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind-what is trying to be bound is not callable'
    )
  }
  if (!context) {
    context = window
  }
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var fNOP = function () {} // 中转空函数
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
