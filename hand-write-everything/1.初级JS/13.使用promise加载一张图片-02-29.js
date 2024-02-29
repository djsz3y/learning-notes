// 1.使用 Promise 加载一张图片
function loadImg(src) {
  const p = new Promise((resolve, reject) => {
    const img = document.createElement('img')
    // 加载完之后的回调函数
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      const err = new Error(`图片加载失败${src}`)
      reject(err)
    }
    img.src = src
  })
  return p
}

// 2.根据url加载一张图片
const url = 'https://url.png'
loadImg(url)
  .then((img) => {
    console.log(img.width)
    return img
  })
  .then((img) => {
    console.log(img.height)
  })
  .catch((ex) => console.error(ex))

// 3.加载多张图片
const url1 = './url1.png',
  url2 = './url2.png'
loadImg(url1)
  .then((img1) => {
    console.log(img1.width)
    return img1 // 普通对象
  })
  .then((img1) => {
    console.log(img1.height)
    return loadImg(url2) // promise 实例
  })
  .then((img2) => {
    console.log(img2.width)
    return img2
  })
  .then((img2) => {
    console.log(img2.height)
  })
  .catch((ex) => console.error(ex))
