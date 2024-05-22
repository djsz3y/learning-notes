const myInstance = (left, Right) => {
  if (typeof left !== 'object') {
    return false
  }
  
  while (true) {
    if (left === null) {
      return false
    }
    if (left.__proto__ === Right.prototype) { // 左隐式原型 === 右显式原型
      return true
    }
    left = left.__proto__
  }
}

// a instanceof b 实际上是判断 a 的原型链上是否有 b 的构造函数。
