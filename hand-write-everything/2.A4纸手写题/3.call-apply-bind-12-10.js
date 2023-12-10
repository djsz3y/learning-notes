Function.prototype.call2 = function (context, ...args) {
  // 判断 Symbol 获取this 执行 删除 返回
  if (typeof context !== 'object' || context == null) {
    context = window
  }
  let fnSymbol = Symbol()
  context[fnSymbol] = this
  let fn = context[fnSymbol](...args)
  delete context[fnSymbol]
  return fn
}

Function.prototype.apply2 = function (context, args) {
  // 判断 Symbol 获取this 执行 删除 返回
  if (typeof context !== 'object' || context == null) {
    context = window
  }
  let fnSymbol = Symbol()
  context[fnSymbol] = this
  let fn = context[fnSymbol](...args)
  delete context[fnSymbol]
  return fn
}

Function.prototype.bind2 = function (context) {
  if (typeof this !== 'funciton') {
    throw new Error(
      'Function.prototype.bind2-what is trying to be bound is not callable.'
    )
  }
  const self = this
  const args = Array.prototype.slice.call(arguments, 1)
  const fNOP = function () {}
  const fBound = function () {
    const bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    )
  }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}
