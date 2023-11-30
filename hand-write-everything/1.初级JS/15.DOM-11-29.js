// 1.获取DOM节点

// 元素（1）
const div1 = document.getElementById('div1')
// 集合（3）
const divList = document.getElementsByTagName('div')
const containerList = document.getElementsByClassName('.container')
const pList = document.querySelectorAll('p')

// 2.attribute 方式

const p1 = pList[0]
// 设置/修改属性
p1.setAttribute('data-name', 'imooc')
p1.setAttribute('style', 'font-size: 50px;')
// 获取属性
p1.getAttribute('data-name')
p1.getAttribute('style')

// 3.property 方式

// 设置/修改属性
p1.style.width = '100px'
p1.className = 'red'
// 获取属性
p1.style.width
p1.className
p1.nodeName
p1.nodeType

// 4.attr VS property 区别
