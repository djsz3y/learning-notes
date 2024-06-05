# 面试官：怎么理解 ES6 中 Generator 的？使用场景？

## 一、介绍

[1]Genarator 是 ES6 的异步编程解决方案，和传统函数完全不同。

[2]之前的异步解决方案，有：

- 回调函数
- Promise

[3]那么，为什么还要有 Generator，甚至 async/await？

首先认识一下 Generator：

### Genarator 函数

[1]执行 Generator 函数，返回一个遍历器对象，就可以依次遍历 Generator 函数的内部状态。

[2]Generator 函数是一个普通函数，但有两个特征：

- function 关键字和函数名之间有一个\*
- 使用 yield 关键字，定义函数不同的状态。

```js
function* HelloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}
```

## 二、使用

[1]Generator 函数会返回 一个遍历器对象，具有 `Symbol.iterator` 属性（注意小写），并且返回的自己。

```js
function* gen() {
  // some code
  yield 1
  yield 2
  return 'ending'
}

var g = gen()

g[Symbol.iterator]() === g // 注意 小写
// true
```

[2]通过 yield 关键字，可以暂停 Generator 函数返回的遍历器对象的状态

```js
function* helloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}
var hw = helloWorldGenerator()
```

[3]上述存在三个状态：hello、world、return

[4]通过 next() 方法才会遍历到下一个内部状态，运行逻辑如下：

- ① 遇到 yield 表达式，就暂停后面的操作，并将紧跟在 yield 后面的表达式的值，作为返回对象的 value 的属性值。
- ② 下一次调用 next() 方法，就继续往下执行，直到遇到下一个 yield 表达式。
- ③ 如果没有遇到新的 yield 表达式，就一直运行到函数结束，直到遇到 return 语法，并将 return 后面表达式的值，作为返回对象的 value 的属性值。
- ④ 如果该函数没有 return 语句，则返回对象的 value 属性值为 undefined。

```js
hw.next()
// { value: 'hello', done: false}
hw.next()
// { value: 'world', done: false }
hw.next()
// { value: 'ending', done: true }
hw.next()
// { value: undefined, done: true}
```

[5]理解上述流程，理解为什么 执行 next() 方法，会产生这些结果：

- **done 判断是否存在下一个状态，value 对应状态值**

- **yield 表达式本身没有返回值，或者说 总是返回 undefined**

- **通过调用 next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值**

```js
function* foo(x) {
  var y = 2 * (yield x + 1) // x + 1 => 6 ,,
  console.log(91, y)
  var z = yield y / 3 // y / 3 => NaN ,, next() 的参数是上一个 yield 表达式的返回值，所以 上一个 yield 表达式的值 (yield x + 1) 为 undefined ，即 2 * undefined => NaN => y，所以上一行输出 91 NaN
  console.log(93, z)

  // 同理，第三次执行 a.next()，next 方法参数为 undefined，所以上一个 yield 表达式的值是 undefined，所以 z 是 undefined，所以 return 的值是 NaN，也就得到了 Object{value: NaN, done: true}
  return x + y + z // 5 + NaN + undefined => NaN
}

var a = foo(5)
a.next() // Object{value: 6, done: false}
a.next() // Object{value: NaN, done: false}
a.next() // Object{value: NaN, done: true}

// 按照顺序，想一遍，b 的情况，确实如此。
var b = foo(5)
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

[6]正因为 Generator 函数返回 Iterator 对象，因此我们还可以通过 `for...of` 进行遍历

```js
function* foo() {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
  return 6
}

for (let v of foo()) {
  console.log(v)
}
// 1 2 3 4 5
```

原生对象没有遍历接口，通过 Generator 函数 为它加上这个接口，就能使用 `for...of` 进行遍历了

```js
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj)

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]]
  }
}

let jane = { first: 'Jane', last: 'Doe' }

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`)
}
// first: Jane
// last: Doe
```

## 三、异步解决方案

> 回顾之前展开异步解决的方案：
>
> - 回调函数
> - Promise 对象
> - Generator 函数
> - async/await

### 回调函数

- 所谓回调函数，就是把任务的第二段重新写在一个函数里，等到重新执行这个任务的时候，再调用这个函数。

```js
fs.readFile('/etc/fstab', function (err, data) {
  if (err) throw err
  console.log(data)
  fs.readFile('/etc/shells', function (err, data) {
    if (err) throw err
    console.log(data)
  })
})
```

- readFile 函数的第二个参数，就是回调函数，等到操作系统返回了 `/etc/passwd`这个文件以后，回调函数才会执行

### Promise

- Promise 就是为了解决回调地狱而产生的，将回调函数的嵌套，改成链式调用；

```js
const fs = require('fs')

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) return reject(error)
      resolve(data)
    })
  })
}

readFile('/etc/fstab')
  .then((data) => {
    console.log(data)
    return readFile('/etc/shells')
  })
  .then((data) => {
    console.log(data)
  })
```

- 这种链式调用，使得异步代码的两段执行更加清晰，但是也带来了明显的问题，代码变得冗杂了，语义化并不强。

### Generator

- yield 表达式暂停函数执行，next 方法恢复函数执行，使得 Generator 函数非常适合将异步任务同步化。

```js
const gen = function* () {
  const f1 = yield readFile('/etc/fstab')
  const f2 = yield readFile('etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}
```

### async/await

- 将上面 Generator 函数改成 async/await 形式，更为简洁，语义化更强

```js
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab')
  const f2 = await readFile('/etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}
```

### ⭐ 区别

通过上述代码进行分析，将 promise、Generator、async/await 进行比较：

- promise 和 async/await 是专门用于处理异步操作的
- Generator 并不是为异步而设计出来的，它还有其他功能（对象迭代、控制输出、部署 Interator 接口。。。）
- promise 编写代码相比 Generator、async 更为复杂化，且可读性也稍差
- Generator、async 需要与 promise 对象搭配处理异步情况
- async 实质是 Generator 的语法糖，相当于会自动执行 Generator 函数
- async 使用上更为简洁，将异步代码以同步的形式进行编写，是处理异步编程的最终方案

## 四、使用场景

[1]Generator 是异步解决的一种方案，最大特点则是将异步操作同步化表达出来

```js
function* loadUI() {
  showLoadingScreen()
  yield loadUIDataAsynchronously()
  hideLoadingScreen()
}
var loader = loadUI()
// 加载UI
loader.next()

// 卸载UI
loader.next()
```

[2]包括 `redux-saga` 中间件也充分利用了 Generator 特性

```js
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

function* fetchUser(action) {
  try {
    const user = yield call(Api.fetchUser, action.payload.userId)
    yield put({type: "USER_FETCH_SUCCEEDED", user: user})
  } catch(e) {
    yield put({type: "USER_FETCH_FAILED"， message: e.message})
  }
}

function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser)
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser)
}

export default mySaga
```

[3]还能**利用 Generator 函数**，在**对象上实现 Iterator 接口**：

```js
function* iterEntries(obj) {
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    yield [key, obj[key]]
  }
}

let myObj = { foo: 3, bar: 7 }

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value)
}

// foo 3
// bar 7
```

# 参考文献

- [https://es6.ruanyifeng.com/#docs/generator-async](https://es6.ruanyifeng.com/#docs/generator-async)
- [原文](https://github.com/febobo/web-interview/issues/41)
