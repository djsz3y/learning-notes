// 监听data变化的核心是什么？
Object.defineProperty
// 基本使用
Object.defineProperty(target, key, {
  get() {
    return value
  },
  set(newValue) {
    value = newValue
  }
})
// Vue 响应式：组件的数据data一旦变化，立即渲染到视图。

function updateView() {
  console.log('更新视图')
}

const oldArrayPrototype = Array.prototype
const arrProto = Object.create(oldArrayPrototype)

// arrProto.push = function () {}
// arrProto.pop = function () {}

;['push', 'pop', 'unshift', 'shift', 'splice'].forEach((methodName) => {
  arrProto[methodName] = function () {
    // Array.prototype.push.call(this, arguments)
    oldArrayPrototype[methodName].call(this, arguments)
    updateView()
  }
})

function defineReactive(target, key, value) {
  observer(value)

  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (value !== newValue) {
        observer(newValue)
        value = newValue
        updateView()
      }
    }
  })
}

function observer(target) {
  if (typeof target !== 'object' || target == null) {
    return target
  }

  if (target instanceof Array) {
    target.__proto__ = arrProto
  }

  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

const data = {
  name: '123',
  age: 20,
  info: {
    address: '北京'
  },
  nums: [1, 2, 3]
}

observer(data)

data.name = '321'
data.age = 21
// data.age = { num: 21 }
// data.age.num = 22
data.info.address = '上海'
data.nums.push(4)

// info层级太深，一次性监听到底，卡顿（深度监听，需要递归到底，一次性计算量大）
// 无法监听新增&删除属性
// 无法原生监听数组，需要特殊处理

Proxy响应式-缺点
兼容性不好，无法polyfill
