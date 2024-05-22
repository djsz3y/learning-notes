// 18.1 XMLHttpRequest
function ajax(url, successFn) {
  // 1.new
  const xhr = new XMLHttpRequest()

  // 2.open
  xhr.open('GET', url, true) // get
  // xhr.open('POST', url, true) // post

  // 3.onreadystatechange
  xhr.onreadystatechange = function () {
    // readyState 的状态
    // 0 - 未初始化   - 还未调用 send
    // 1 - 载入       - 正在发送 send
    // 2 - 载入完成   - 已经发送 send，已接收到全部响应
    // 3 - 交互       - 正在解析
    // 4 - 完成       - 解析完成
    if (xhr.readyState === 4) {
      // 响应内容解析完成
      if (xhr.status === 200) {
        // console.log(JSON.parse(xhr.responseText))
        // alert(xhr.responseText)
        successFn(xhr.responseText)
      } else if (xhr.status === 404) {
        console.log('404 - not found')
      }
    }
  }

  // 4.send
  xhr.send(null) // get
  // const postData = { username: 'zhangsan', password: 'xxx' }
  // xhr.send(JSON.stringify(postData)) // post
}

// 18.2 Promise
function ajax(url) {
  const p = new Promise((resolve, reject) => {
    // 1.new
    const xhr = new XMLHttpRequest()

    // 2.open
    xhr.open('GET', url, true) // get
    // xhr.open('POST', url, true) // post

    // 3.onreadystatechange
    xhr.onreadystatechange = function () {
      // xhr.readystate
      // 0 - 未发送    - 还未调用 send
      // 1 - 载入      - 正在发送 send
      // 2 - 载入完成  - 发送完send，已接收到全部响应
      // 3 - 交互      - 正在解析
      // 4 - 完成      - 解析完成
      if (xhr.readyState === 4) {
        // 响应内容解析完成
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status === 404) {
          reject(new Error('404 - not found'))
        }
      }
    }

    // 4.send
    xhr.send(null) // get
    // const postData = { username: 'zhangsan', password: 'xxx' }
    // xhr.send(JSON.stringify(postData)) // post
  })
  return p
}

// 测试代码：
const url = '/api/data.json'
ajax(url)
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
