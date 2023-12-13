API：Object.defineProperty
响应式：组件数据data一旦变化，那么立即更新渲染到视图。
基本使用：
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

const oldArrayPrototype = Array.prototype
const arrProto = Object.create(oldArrayPrototype)

;['push', 'pop', 'unshift', 'shift', 'splice'].forEach(methodName => {
  arrProto[methodName] = function() {
    // Array.prototype.push.call(this, ...arguments)
    oldArrayPrototype[methodName].call(this, ...arguments)
    updateView()
  }
})

function defineReactive(target, key, value){
  observer(value)
  
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if(value !== newValue){
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
  nums: [0, 1, 2]
}
observer(data)

data.name = 'lisi'
data.age = 21
// data.age = {num : 21}
// data.age.num = 22
data.info.address = '上海'
data.nums[0] = 10
data.nums.push(4)
console.log(data.nums)

重写原型的方法

data.x = '123'
delete data.age
