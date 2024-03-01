// 【知识点：】

// 1. 事件绑定
function bindEvent(elem, type, fn) {
  elem.addEventListener(type, fn)
} // ①
const btn1 = document.getElementById('btn1')
bindEvent(btn1, 'click', (event) => {
  event.target // 获取触发元素
  event.preventDefault() // 阻止默认行为
  alert('clicked')
}) // ②

// 2. 事件冒泡
const p1 = document.getElementById('p1')
bindEvent(p1, 'click', (event) => {
  event.stopPropagation() // 组织冒泡
  console.log('激活')
}) // ③
const body = document.body
bindEvent(body, 'click', (event) => {
  console.log('取消')
})

// 3. 事件代理（瀑布流）
//   3.1 代码简洁
//   3.2 减少浏览器内存占用
//   3.3 不要滥用（相比绑多个<a>更简洁，但一个按钮，不要用事件代理）
//   3.4 事件代理例子
const div3 = document.getElementById('div3')
bindEvent(div3, 'click', (event) => {
  event.preventDefault()
  const target = event.target
  if (target.nodeName === 'A') {
    alert(target.innerHTML)
  }
}) // ④

// 【应用：】
/**
 * 【1.1】通用事件绑定函数/通用事件监听函数
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
        // 匹配符合选择器的代理绑定
        // - matches 判断是否触发元素（判断是否css选择器需要的元素范围内的）
        fn.call(target, event) // 开发者写的绑定函数，设置其this值和event事件参数值。
      }
    } else {
      // 普通绑定
      fn.call(target, event)
    }
  })
}

// 【1.2】普通绑定
const btn1 = document.getElementById('btn1')
bindEvent(btn1, 'click', function (event) {
  // event.target // 获取触发元素
  event.preventDefault() // 阻止默认行为
  alert(this.innerHTML) // 'clicked'
})
bindEvent(btn1, 'click', (event) => {
  event.preventDefault()
  alert(btn1.innerHTML)
})

// 【1.3】代理绑定
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
