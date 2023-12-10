【回答面试思路顺序】

API：Object.defineProperty()
Vue响应式：组件的数据data一旦变化，就立即渲染视图。
API基本使用：
Object.defineProperty(target, key, {
  get() {
    console.log('get')
    return value
  },
  set(newValue) {
    console.log('set')
      value = newValue
  }
})

如何实现响应式？

function updateView() {
  console.log('更新视图')
}
// 重写数组原型
const oldArrayPrototype = Array.prototype
const arrProto = Object.create(oldArrayPrototype)

['push', 'pop', 'unshift', 'shift', 'splice'].forEach(methodName => {
  arrProto[methodName] = function() {
    updateView() // 触发视图更新
    oldArrayPrototype[methodName].call(this, ...arguments)
    // Array.prototype.push.call(this, ...arguments)
  }
})

function defineReactive(target, key, value) {
  observer(value)
  
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if(value !== newValue) {
        observer(newValue)
        
        value = newValue
        updateView()
      }
    }
  })
}

function observer(target) {
  if(typeof target !== 'object' || target == null) {
    return target
  }
  
  if(Array.isArray(target)) {
    target.__proto__ = arrProto
  }
  
  for(let key in target) {
    defineReactive(target, key, target[key])
  }
}

const data = {
  name: 'zhangsan',
  age: 20,
  info: {
    address: '北京'
  },
  arr: [0,1,2]
}

observer(data)

data.name = 'lisi'
data.age = 21
// data.age = { num: 21 }
// data.age.num = 22
data.info.address = '上海'
data.x = '123'
delete data.age

// Vue.set()
// Vue.delete()

数组响应式如何实现？

// 答：
// 第一步：重新定义数组原型：
// const oldArrayPrototype = Array.prototype
// const arrProto = Object.create(oldArrayPrototype)
// arrProto // Array {}
// // arrProto.push = function() {}
// // arrProto.pop = function() {}
// ['push', 'pop', 'unshift', 'shift', 'splice'].forEach(methodName => {
//   arrProto[methodName] = function() {
//     updateView() // 触发视图更新
//     oldArrayPrototype[methodName].call(this, ...arguments)
//     // Array.prototype.push.call(this, ...arguments)
//   }
// })
// arrProto
// 在代码里就是放在 defineReactive() 方法的前面。

// 第二步：observer
if(Array.isArray(target)) {
  target.__proto__ = arrProto
}
// 就会先触发视图更新，再去执行真正的数组原型的方法。
// 这样我就做到了真正的深度监听。