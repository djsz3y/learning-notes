// 一、模拟更新视图
function updateView() {
  console.log('视图更新')
}

// 四、重写数组原型

const oldArrayPrototype = Array.prototype
const arrProto = Object.create(oldArrayPrototype)

// arrProto.push = function () {}
// arrProto.pop = function () {}

;['push', 'pop', 'unshift', 'shift', 'splice'].forEach((methodName) => {
  arrProto[methodName] = function () {
    updateView() // 先触发视图更新

    oldArrayPrototype[methodName].call(this, ...arguments)
    // Array.prototype.push.call(this, ...arguments)
  }
})

// 三、定义defineReactive

function defineReactive(target, key, value) {
  observer(value) // 4.【深度监】
  // 3.写 set get，值类型响应式
  Object.defineProperty(target, key, {
    get: function () {
      return value
    },
    set: function (newValue) {
      if (newValue !== value) {
        // observer(newValue) // 4.【深度监听：新值！】
        value = newValue // value 一直在闭包中，设置完后，再次get还会获取最新值。
        updateView()
      }
    }
  })
}

// 二、 定义observer
function observer(target) {
  // 2.1 判断值类型直接返回。
  if (typeof target !== 'object' || target == null) {
    return target
  }

  if (Array.isArray(target)) {
    target.__proto__ = arrProto
  }

  // 好处：不会影响全局真正数组原型。

  // 2.2 for-in循环数组&对象
  for (let key in target) {
    console.log('for-in', key, target[key])
    defineReactive(target, key, target[key])
  }
}

// 准备数据
const data = {
  name: 'zhangsan',
  age: 20,
  info: {
    address: '北京' // 4.【深度监听】
  },
  nums: [10, 20, 30]
}

// 监听数据
observer(data)

// 测试
data.name = '上海'
// data.age = 21
data.age = { num: 21 } // 【缺点1】一次性监听。
data.age.num = 22 // 新增对象里的属性，无法监听！【缺点2】
data.info.address = '上海'
