class MyPromise {
  // 第一步：constructor
  // 1.基本构造函数（①initValue ②initBind ③执行executor ④状态不可逆 ⑤throw-try...catch）；
  // 第二步：then
  // 2.基本then（①接收成功、失败参数 ②成功/失败状态执行成功/失败回调 ③确保函数）；
  // 3.定时器（①初始化 ②保存成功/失败回调 ③依次执行成功/失败回调）
  // done。

  // to do：
  // 4.链式调用
  // 5.执行顺序

  constructor(executor) {
    this.initValue()
    this.initBind()
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  initValue() {
    // 初始化
    this.PromiseState = 'pending'
    this.PromiseResult = null
    // 3-①
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }
  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  resolve(value) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value
    // 3-③
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }
  reject(reason) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'rejected'
    this.PromiseResult = reason
    // 3-③
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }

  then(onFulfilled, onRejected) {
    // 2-①
    // 2-③
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    // 2-②
    if (this.PromiseState === 'fulfilled') {
      onFulfilled(this.PromiseResult)
    } else if (this.PromiseState === 'rejected') {
      onRejected(this.PromiseResult)
    } else if (this.PromiseState === 'pending') {
      // 3-②
      this.onFulfilledCallbacks.push(onFulfilled.bind(this))
      this.onRejectedCallbacks.push(onRejected.bind(this))
    }
  }
}
