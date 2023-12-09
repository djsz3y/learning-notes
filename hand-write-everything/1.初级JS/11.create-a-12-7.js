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
