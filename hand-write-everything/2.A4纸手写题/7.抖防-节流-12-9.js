// 防抖：一次触发后，再次触发，重新计时。
// 节流：一次触发后，再次触发，全部忽略。

// 防抖：输入框多次输入请求服务端，期望last-input请求服务端的结果。
// 节流：按钮多次提交请求服务端，期望first-submit请求服务端的结果。

// 对于序号123的重复操作：
// 防抖：want 3,12 抖，防 12 = 防抖 => 一次触发，再次触发，重新计时。
// 节流：want 1，省23 = 省流 => 一次触发，再次触发，全部忽略。

// 看需求进行防抖和节流操作。
// 回城是防抖（抖防）。

// ----------------------------------------------------
// 1.防抖场景：点击请求
// n秒后触发事件，可再处理；
// n秒内再触发事件，重新计时

function debounce(fn, wait) {
  // 防抖等待

  // 1. 需要一个定时器
  let timer = null

  return function () {
    let _this = this,
      args = arguments

    // 3. 中途如果再次触发，则清空重新计时
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    // 2. 将定时器设置成指定间隔时间后执行
    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, wait)
  }
}

// ----------------------------------------------------
// 2.节流场景：scroll函数事件监听
// 规定时间，触发一次；
// 时间内重复触发，只一次生效。

function throttle(fn, delay) {
  // 节流延时

  // 1. 获取执行时间的时间点
  let currentTime = Date.now()

  return function () {
    // 3. 获取当前时间点
    let nowTime = Date.now()
    let _this = this,
      args = arguments

    // 2. 两次重复操作的时间间隔与节流延时的关系
    if (nowTime - currentTime >= delay) {
      currentTime = Date.now()
      return fn.apply(_this, args)
    }
  }
}
