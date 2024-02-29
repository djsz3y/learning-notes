// 前端异步场景有哪些？

// 1.网络请求

// 1.1 ajax
$.get('./data1.json', function (data1) {
  console.log(data1)
})

// 1.2 图片加载
const img = document.createElement('img')
img.onload = function () {
  console.log('loaded')
}
img.src = '/xxx.png'

// 2.定时任务

// 2.1 setTimeout
console.log(100)
setTimeout(function () {
  console.log(200)
}, 1000)
console.log(300)

// 2.2 setInterval
console.log(100)
setInterval(function () {
  console.log(200)
}, 1000)
console.log(300)
