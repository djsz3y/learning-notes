// 实际开发中闭包的应用场景
function createCache() {
  const data = {}
  return {
    set: function (key, val) {
      data[key] = val
    },
    get: function (key) {
      return data[key]
    }
  }
}
const c = createCache()
c.set('a', 100)
console.log(c.get('a'))
