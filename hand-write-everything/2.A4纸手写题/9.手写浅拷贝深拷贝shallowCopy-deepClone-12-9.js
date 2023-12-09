// 1.浅拷贝

// 快速方式
Object.assign(obj1, obj2)
arr.slice()
// 手写实现
function shallowCopy(object) {
  if (!object || typeof object !== 'object') return

  let result = Array.isArray(object) ? [] : {}

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      result[key] = object[key]
    }
  }
  return result
}

// 2. 深拷贝

// 快速方式
JSON.parse(JSON.stringify(obj))

// 手写深拷贝
function deepCopy(obj) {
  if (!obj || typeof obj !== 'object') return

  let result = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return result
}
