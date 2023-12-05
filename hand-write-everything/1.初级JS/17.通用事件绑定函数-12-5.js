/**
 * 通用事件绑定函数/通用事件监听函数
 * （加入事件代理处理）
 */
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, (event) => {
    const target = event.target
    if (selector) {
      // 代理绑定
      if (target.matches(selector)) {
        fn.call(target, event)
      }
    } else {
      // 普通绑定
      fn.call(target, event)
    }
  })
}

// 普通绑定
const btn1 = document.getElementById('btn1')
bindEvent(btn1, 'click', function (event) {
  event.preventDefault()
  alert(this.innerHTML)
})
bindEvent(btn1, 'click', (event) => {
  event.preventDefault()
  alert(btn1.innerHTML)
})

// 代理绑定
const div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', function (event) {
  event.preventDefault()
  alert(this.innerHTML)
})
bindEvent(div1, 'click', 'a', (event) => {
  event.preventDefault()
  alert(event.target.innerHTML)
})
