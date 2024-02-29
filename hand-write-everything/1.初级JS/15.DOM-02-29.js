/**
 * -------------------------------
 * 一、DOM节点操作
 */

// 1.获取DOM节点
// 元素（1种）
const div1 = document.getElementById('div1')
// 集合（3种）
const divList = document.getElementsByTagName('div')
const containerList = document.getElementsByClassName('container')
const pList = document.querySelectorAll('p')

// 2.attribute 方式
const p1 = pList[0]
// 设置/修改属性
p1.setAttribute('data-name', 'xxx')
p1.setAttribute('style', 'font-size: 20px;')
// 获取属性
p1.getAttribute('data-name')
p1.getAttribute('style')

// 3.property 方式
// 设置/修改属性
p1.style.width = '100px'
p1.className = 'p'
// 获取属性
p1.style.width
p1.className
p1.nodeName
p1.nodeType

// 4.attr VS property
// ①修改html，改变html结构
// ②修改对象属性，不改变html结构

/**
 * -------------------------------
 * 二、DOM结构操作
 */

// 1.新增/插入节点
const p1 = document.createElement('p')
p1.innerHTML('p1')
body.appendChild(p1)
const p2 = document.getElementById('p2')
body.appendChild(p2)
// 2.获取子列表/父元素
const child = div1.childNodes
const parent = div1.parentNode
// 3.删除子元素
divList.removeChild(divList.childNodes[0])
// 4.子元素列表过滤子元素节点类型为1的节点
const list = Array.prototype.slice.call(divList.childNodes).filter((child) => {
  if (child.nodeType === 1) {
    return true
  }
  return false
})
console.log(list)

/**
 * -------------------------------
 * 三、DOM性能优化
 */

// 1.DOM操作/DOM查询“昂贵”，避免频繁操作。
for (let i = 0; i < document.getElementsByTagName('p').length; i++) {
  // ...
}
// 2.DOM查询做缓存（变量存length，避免频繁dom操作）（一定记住，几率大）
const pList1 = document.getElementsByTagName('p')
const length = pList1.length
for (let i = 0; i < length; i++) {
  // ...
}
// 3.将频繁操作改为一次性操作（临时区域，js变量存length操作，较快）
const listNode = document.getElementById('list')
const frag = document.createDocumentFragment()
for (let x = 0; x < 10; x++) {
  const li = document.createElement('li')
  li.innerHTML = 'List item ' + x
  frag.appendChild(li)
}
listNode.appendChild(frag)
