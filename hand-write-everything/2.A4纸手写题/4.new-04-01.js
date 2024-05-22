function objectFactory() {
  var obj = new Object() // 创建了一个全新的对象。
  var Constructor = [].shift.call(arguments)
  // 被执行[[Prototype]]（也就是__proto__）链接。
  obj.__proto__ = Constructor.prototype // 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
  // 生成的新对象会绑定到函数调用的this。
  var ret = Constructor.apply(obj, arguments)
  // 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
  return typeof ret === 'object' ? ret : obj
}
