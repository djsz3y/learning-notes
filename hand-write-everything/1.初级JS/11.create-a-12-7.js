// 块级作用域
let a
for (let i = 0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br>'
  a.addEventListener('click', function (e) {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}
// 上面这种情况，i是全局作用域，当i被click时，早就变成10了，click事件不会立马执行，所以点的时候已经成为了10
// 当i是块级作用域时，i就只是在每个块级里作用

const frag = document.createDocumentFragment()
let a1
for (let i = 0; i < 10; i++) {
  a1 = document.createElement('a')
  a1.innerHTML = i + '<br>'
  a1.addEventListener('click', function (e) {
    e.preventDefault()
    alert(i)
  })
  frag.appendChild(a1)
}
document.body.appendChild(frag)
