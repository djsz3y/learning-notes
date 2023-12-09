const myInstance = (left, Right) => {
  if (typeof left !== 'object') {
    return false
  }

  while (true) {
    if (left === null) {
      return false
    }
    if (Right.prototype === left.__proto__) {
      return true
    }
    left = left.__proto__
  }
}

// 使用 a instanceof b 判断，实际上是看 a 的原型链上，是否存在 b 的构造函数。
