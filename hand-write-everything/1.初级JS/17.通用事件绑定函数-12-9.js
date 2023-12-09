/**
 * 通用事件绑定函数/通用事件监听函数
 * （加入事件代理处理）
 */
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector
    selector = null
  } // 判断普通绑定的最后一个参数放在通用函数的最后一个参数里
  elem.addEventListener(type, (event) => {
    const target = event.target
    if (selector) {
      // 代理绑定
      if (target.matches(selector)) {
        //匹配符合选择器的代理绑定
        fn.call(target, event) // 开发者写的绑定函数，设置其this值和event事件参数值。
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

{
  /* <button id="btn1">一个按钮</button>

<div id="div1">
    <a href="#">a1</a><br>
    <a href="#">a2</a><br>
    <a href="#">a3</a><br>
    <a href="#">a4</a><br>
    <button>加载更多...</button>
</div> */
}
