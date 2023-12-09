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

// 《突击-hand.js》

    // call函数的实现
    // 输入：上下文 执行函数的参数
    // 输出：执行结果
    const myCall = function(context) {
      // 1. 判断执行对象是否为函数
      if (typeof this !== 'function') {
          console.error('this is not a function');
      }
      // 2. 获取执行函数的参数
      let args = [...arguments].slice(1),
          result = null;

      // 3. 传入值判断，是否有值，如果没有，默认为全局即window
      if (!context) {
          context = window;
      }
      // 4. 执行对象挂载在上下文之上
      context.fn = this;
      // 5. 在上下文中调用执行对象并且传入执行参数
      result = context.fn(...args);
      // 6. 将上下文复原，删除新增临时属性
      delete context.fn;
      // 7. 返回5的结果
      return result;
  }
  
  // apply函数
  // 与call的不同 => 传参
  const myApply = function(context) {
      // 1. 判断执行对象是否为函数
      if (typeof this !== 'function') {
          console.error('this is not a function');
      }
      // 2. 获取执行函数的参数
      let args = arguments[1],
          result = null;

      // 3. 传入值判断，是否有值，如果没有，默认为全局即window
      if (!context) {
          context = window;
      }
      // 4. 执行对象挂载在上下文之上
      context.fn = this;
      // 5. 在上下文中调用执行对象并且传入执行参数
      if (args) {
          result = context.fn(...args);
      } else {
          result = context.fn();
      }
      // 6. 将上下文复原，删除新增临时属性
      delete context.fn;
      // 7. 返回5的结果
      return result;
  }

  // bind函数的实现
  // bind传参一致，但是返回的是待执行的函数
  const myBind = function(context) {
      // 1. 判断执行对象是否为函数
      if (typeof this !== 'function') {
          console.error('this is not a function');
      }
      // 2. 获取参数
      let args = [...arguments].slice(1),
          fn = this;
      
      return function Fn() {
          // 根据调用方，确定最终返回值
          return fn.apply(
              this instance Fn ? this : context,
              args.concat(...arguments)
          )
      }
  }