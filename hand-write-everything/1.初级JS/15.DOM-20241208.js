DOM 性能优化

1. 避免频繁操作dom
dom操作昂贵，引起浏览器重绘重排，页面卡顿
2. dom操作做缓存

3. 频繁操作改为一次性操作

const frag = document.createDocumentFragment()

webpack 性能优化：

1. 优化构建速度

优化babel-loader
noParse
happyPack
ParallelUglifyPlugin
自动更新
热更新
DllPlugin

2. 优化产出代码

使用生产环境
小图片base64编码
bundle 加 hash
CDN
提取公共改代码
懒加载
Scope Hoisting




性能优化

Vue 层面的性能优化

v-show 和 v-if 的使用
computed
v-for 加 key ，同时避免和 v-if使用
及时销毁自定义事件、DOM事件
vue-loader 提前编辑代码，预编译
keep-alive合理使用
异步组件
data层级不要太深

通用层面的性能优化

webpack层面的优化

优化构建速度
优化babel-loader

noParse
happyPack
ParallelUglifyPlugin
自动更新
热更新
DllPlugin

优化产出代码

使用生产环境
小图片base64编码
hash
使用cdn
提取公共改代码
懒加载
Scope Hoisting

通用层面的性能优化 图片懒加载 防抖节流

SSR

DOM性能优化
避免频繁DOM操作
做缓存
将频繁DOM操作改为一次性操作 createDocumentFragment()
