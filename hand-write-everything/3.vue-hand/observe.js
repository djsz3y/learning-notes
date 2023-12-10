function updateView() {
  // 模拟更新视图
  console.log('更新视图')
}

function observe(target) {
  // 1. 判断值类型直接返回。
  if (typeof target !== 'object' || target == null) {
    return target
  }
  // 2. for-in循环数组&对象
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

// 3. 定义defineReactive
function defineReactive(target, key, value) {
  Object.defineProperty(target, {
    get: function () {
      return value
    },
    set: function (newValue) {
      if (newValue !== value) {
        value = newValue // value 一直在闭包中，设置完后，再次get还会获取最新值。
        updateView()
      }
    }
  })
}
