class jQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector) // 获取 selector 所有dom元素
    const length = result.length // 所有dom元素 长度
    for (let i = 0; i < length; i++) {
      // 循环所有dom元素，按顺序放入this上。
      this[i] = result[i]
    }
    this.length = length // this 获取 length
    this.selector = selector // 选择器给 this
  }
  get(index) {
    // get获取第几个dom元素
    return this[index]
  }
  each(fn) {
    // 遍历实例上的所有dom元素，使用fn(elem)调用。
    for (let i = 0; i < this.length; i++) {
      const elem = this[i]
      fn(elem)
    }
  }
  on(type, fn) {
    // 调用 each 遍历元素，给每个元素绑定type事件和事件的处理过程。
    return this.each((elem) => {
      elem.addEventListener(type, fn, false)
    })
  }
  // 扩展很多 DOM API
}

// 插件
jQuery.prototype.dialog = function (info) {
  alert(info)
}

// 覆写 “造轮子”
class myJQuery extends jQuery {
  constructor(selector) {
    super(selector)
  }
  // 扩展性：扩展自己的方法
  addClass(className) {}
  style(data) {}
}

// const $p = new jQuery('p')
// $p
// $p.get(1)
// $p.each((elem) => console.log(elem.nodeName))
// $p.on('click', () => alert('clicked'))
