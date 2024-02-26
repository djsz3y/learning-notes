// 手写 call
Function.prototype.call2 = function (context, ...args) {
  // 【注意】：
  // 值类型会报错 `Uncaught SyntaxError: Invalid or unexpected token`，
  // 而不是赋值 window！

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
  // 【注意】：
  // 值类型会报错 `Uncaught SyntaxError: Invalid or unexpected token`，
  // 而不是赋值 window！

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
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind-what is trying to be bound is not callable'
    )
  }
  var self = this
  // 获取let y =  x.bind([this], [args1])x绑定bind函数时的参数args1
  var args = Array.prototype.slice.call(arguments, 1)
  // 中转空函数
  var fNOP = function () {}
  var fBound = function () {
    // 获取 new y(args2) 时的参数 | 获取 y(args2) 两种情况的参数
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    )
  }
  // 获取原函数原型
  // 【这里为什么?】：在返回函数继承原函数原型的属性时：使用中转空函数应对当修改返回函数的原型时，绑定函数的原型也修改的情况。
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}

// 手写最简版 bind
Function.prototype.myBind = function (context) {
  // 【注意】：
  // 值类型会报错 `Uncaught SyntaxError: Invalid or unexpected token`，
  // 而不是赋值 window！

  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  var self = this
  return function (...args) {
    return self.apply(context, args)
  }
}
