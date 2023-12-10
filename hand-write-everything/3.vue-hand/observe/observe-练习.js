// 触发更新视图
function updateView() {
    console.log('视图更新')
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype // 先拿到原型

// 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty); // 创建一个新对象，指向数组原型

// 对数组扩展一个新方法push(这样写比较麻烦：)
// arrProto.push = function() {}
// arrProto.pop = function() {}
// 可以这么写：
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
        arrProto[methodName] = function() {
            updateView() // 触发视图更新
            oldArrayProperty[methodName].call(this, ...arguments)
                // Array.prototype.push.call(this, ...arguments)
        }
    })
    // arrProto
    // // -> Array {push: ƒ, pop: ƒ, shift: ƒ, unshift: ƒ, splice: ƒ}
    // // -> pop: ƒ ()
    // // -> push: ƒ ()
    // // -> shift: ƒ ()
    // // -> splice: ƒ ()
    // // -> unshift: ƒ ()
    // // -> [[Prototype]]: Array(0)

// ===============================================

// // 【在 console 里演示】
// const oldArrayProperty1 = Array.prototype
// const arrProto1 = Object.create(oldArrayProperty1)
// arrProto1 // -> Array {}
// arrProto1.push = function() { console.log(100) } // -> ƒ () { console.log(100) }
// arrProto1 // -> Array {push: ƒ}
// arrProto1.push() // -> 100
// arrProto1.__proto__.push // -> ƒ push() { [native code] }
//     // 上述代码解释：
//     // arrProto1 的原型的 push 方法是 native code 是原生的code，并不是 console.log(100)
//     // 所以说，这两个是分开的，它不会影响数组的原型。

// ===============================================

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听
    observer(value)

    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                // 深度监听
                observer(newValue)

                // 设置新值
                // 注意， value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                value = newValue

                // 触发更新视图
                updateView()
            }
        }
    })
}

// 监听对象属性
// (就是一个入口，具体怎么监听放到 defineReactive 函数里)
function observer(target) {
    if (typeof target !== 'object' || target == null) {
        // 不是对象或数组（只监听对象或数据，像一般的值类型字符串、数字，不监听）
        return target
    }

    // =======================考点之一：Start========================

    // 污染全局的 Array 原型
    // （大忌！必须要重写数组原型 Object.create(oldArrayProperty) ，并没有污染数组（全局数组、本身真正的数组）的原型。这就是vue监听数组所要做的工作。）
    // Array.prototype.push = function () {
    //     updateView()
    //     ...
    // }

    // 由于for in 循环里的 defineReactive 函数里核心API： Object.defineProperty ，对数组是无能为力的，监听不了数组。
    // 所以这里截取一下数组：
    if (Array.isArray(target)) {
        target.__proto__ = arrProto
    }
    // 把数组的原型更改一下，改成上面重写的原型，
    // 这样下面调用 data.nums.push(4) 的时候，实际调用的是上面重写的原型，
    // 先执行触发视图更新，再执行真正的push
    // 就可以触发视图了，做到了数组的深度监听。

    // =======================考点之一：End========================

    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key]) // 用 defineReactive 函数进行监听
    }
}

// 准备数据
const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        address: '北京' // 需要深度监听
    },
    nums: [10, 20, 30]
}

// 监听数据
observer(data)

// 测试
// data.name = 'lisi'
// data.age = 21
//     // data.age = { num: 21 }
//     // data.age.num = 22
//     // age如果设置新值，为 'object' 格式，如果Object.defineProperty里set时不深度监听，
//     // 那么新设置的类型为object的值里的key设置新值时，就无法监听到变化；
//     // 所以上面的 defineReactive 函数里的 set 函数里设置新值时，要进行深度监听 observer(newValue)。
//     // 所以就引出了【Object.defineProperty缺点】

// data.x = '100' // 新增属性，监听不到--所以有 Vue.set
// delete data.name // 删除属性，监听不到--所以有 Vue.delete
// data.info.address = '上海' // 深度监听
data.nums.push(4) // 监听数组
    // Object.defineProperty不能监听数组，
    // 但是在入口方法observer里截取数组，
    // 更改成重写（先触发视图更新再调用真正的数组方法）的数组原型，就可以做到监听数组了