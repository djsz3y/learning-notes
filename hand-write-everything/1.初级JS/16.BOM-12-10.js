// 1.浏览器信息：只能检测最可能情况，无法严格验证
const ua = navigator.userAgent
const isChrome = ua.indexOf('Chrome')

// 2.屏幕信息：屏幕宽高
screen.width
screen.height

// 3.地址信息
location.href // 网址
location.protocol // 协议
location.host // 域名
location.pathname // 浏览器路径
location.search // 参数
location.hash // 哈希

// 4.浏览器前进后退
history.back()
history.forward()
