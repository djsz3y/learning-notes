function ajax(url, successFn) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  // xhr.open('POST', url, true)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successFn(xhr.responseText)
      } else if (xhr.status === 404) {
        throw new Error('404 - not found')
      }
    }
  }

  xhr.send(null) // get

  const data = { a: 'a', b: 'b' }
  xhr.send(JSON.stringify(data)) // post
}

function ajax(url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    // xhr.open('POST', url, true)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // 响应内容解析完成
        if (xhr.status === 200) {
          // 成功处理请求
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status === 404) {
          reject(new Error('404 - not found'))
        }
      }
    }

    xhr.send(null) // get
    // const postdata = { username: 'xxx', password: '123' }
    // xhr.send(JSON.stringify(postdata)) // post
  })
  return p
}

// ajax().then().catch()
