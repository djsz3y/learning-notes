// 18.1 XMLHttpRequest
function ajax(url, successFn) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true) // get
  // xhr.open('POST', url, true) // post
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // console.log(JSON.parse(xhr.responseText))
        // alert(xhr.responseText)
        successFn(xhr.responseText)
      } else if (xhr.status === 404) {
        console.log('404 - not found')
      }
    }
  }
  xhr.send(null) // get
  const postData = { userName: 'zhangsan', password: 'xxx' }
  xhr.send(JSON.stringify(postData)) // post
}

// 18.2 Promise
function ajax(url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status === 404) {
          reject(new Error('404 - not found'))
        }
      }
    }

    xhr.send(null)
  })
  return p
}

// 测试代码：
const url = '/api/data.json'
ajax(url)
  .then((res) => console.log(res))
  .cath((err) => console.error(err))
