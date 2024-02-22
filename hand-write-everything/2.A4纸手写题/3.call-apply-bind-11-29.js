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
  } // 判断 this 不是函数，抛出异常。
  var self = this // 获取 this 为 self
  var args = Array.prototype.slice.call(arguments, 1) // ①给一个函数x绑定bind函数，为一个新函数y；即：let y = x.bind(context, args1)；——这里args是获取的参数args1；
  var fNOP = function () {} // 中转空函数 fNOP
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments) // ②给一个函数x绑定bind函数，为一个新函数y；执行y时有参数，即：y(args2)；——这里bindArgs是获取的参数args2；
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    ) // ③所以，手写bind2时，真正的所有参数是 args1和args2，即：args.concat(bindArgs)。
    // fBound执行就直接执行原函数了，所以使用原函数绑定apply函数，并传递：this和要执行的参数，要执行的参数就是上面的③；
    // 但是 this要判断一下，是否是 继承于 中转空函数 fNOP：
    // 如果this（返回函数fBound的this）原型链上有fNOP，说明以构造函数形式执行的，即：let obj = new y(args2)，那么此时this 还使用 this（实例的this），
  } // fBound 就是给一个函数绑定bind得到的新函数y         
  // fBound要继承原来被绑定bind函数的原函数x的原型，但是不能 fBound.prototype = this.prototype，因为修改y，可能会修改x，
  // 所以要使用中转空函数fNOP获取this的原型，然后实例化一下，再赋值给fBound函数的原型。
  // self.apply：为了改变绑定函数的 this 指向为 返回函数的 this 指向，this 的原型链上有 fNOP（说明执行时用的构造函数方式），这种情况，还用 this；       
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}

// 手写 bind 最简版
Function.prototype.myBind = function (context) {
  // 判断是否是 undefined 和 null
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  var self = this
  return function (...args) {
    return self.apply(context, args)
  }
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