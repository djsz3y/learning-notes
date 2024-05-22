class MyPromise {
  constructor(executor) {
    this.initValue()
    this.initBind()
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  initValue() {
    this.PromiseResult = null
    this.PromiseState = 'pending'
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }
  resolve(value) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value
    while (this.onFulfilledCallbacks.length) {
      // ?
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }
  reject(reason) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'rejected'
    this.PromiseResult = reason
    while (this.onRejectedCallbacks.length) {
      // ?
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }

  /**
   * then:
   * 返回的promise 对象返回成功值
   */
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    // 浅写一下：
    // if (this.PromiseState === 'fulfilled') {
    //   onFulfilled(this.PromiseResult)
    // } else if (this.PromiseState === 'rejected') {
    //   onRejected(this.PromiseResult)
    // } else if (this.PromiseState === 'pending') {
    //   this.onFulfilledCallbacks.push(onFulfilled)
    //   this.onRejectedCallbacks.push(onRejected)
    // }

    // 封装一下：
    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        setTimeout(() => {
          // 模拟异步微任务执行顺序
          try {
            const x = cb(this.PromiseResult)
            if (x === thenPromise && x) {
              throw new Error('不能调用自己哦~')
            }
            if (x instanceof MyPromise) {
              x.then(resolve, reject) // 返回的 promise 对象返回成功值、失败值
            } else {
              resolve(x) // 返回非 promise
            }
          } catch (e) {
            reject(e)
            throw new Error(e)
          }
        })
      }

      if (this.PromiseState === 'fulfilled') {
        resolvePromise(onFulfilled)
      } else if (this.PromiseState === 'rejected') {
        resolvePromise(onRejected)
      } else if (this.PromiseState === 'pending') {
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
      }
    })

    return thenPromise
  }

  static all(promises) {
    const result = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      const addData = function (value, index) {
        result[index] = value
        count++
        if (count === promises.length) resolve(result)
      }
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData(res, index)
            },
            (err) => {
              reject(err)
            }
          )
        } else {
          addData(promise, index)
        }
      })
    })
  }
  static race(promises) {}
  static allSettled(promises) {}
  static any(promises) {}
}
