# 面试官：说说 typescript 的数据类型有哪些？

## 一、是什么

[1]和 JS 一样：

- 拥有几乎相同的基础类型，
- 在 js 基础上提供了更加实用的类型供开发使用

[2]开发阶段：

- 为变量定义明确的类型，
- 在编译阶段进行类型检查，
- 类型不符合预期结果的时候出现错误提示。

## 二、有哪些

### 【1】TS 数据类型主要有如下：

1. boolean 布尔类型
2. number 数值类型
3. string 字符串类型
4. symbol
5. undefined & null
6. Array & Tuple 数组和元组
7. enum 枚举类型
8. object & function 对象和函数
9. any 任意类型
10. void 没有类型
11. never 永远不存在的类型
12. unknown 未知类型

#### [1]boolean 布尔类型

```ts
let flag: boolean = true
// flag = 123; // 错误
flag = false // 正确
```

#### [2]number 数值类型

1. 和 js 一样，TS 的数值类型都是**浮点数**：

```ts
let num: number = 123
// num = '456' // 错误
num = 456 // 正确
```

2. 可支持二进制、八进制、十进制、十六进制：

```ts
let decLiteral: number = 6 // 十进制
let hexLiteral: number = 0xf00d // 十六进制
let binaryLiteral: number = 0b1010 // 二进制
let octalLiteral: number = 0o744 // 八进制
```

#### [3]string 字符串类型

- 和 js 一样，双引号 "" 、单引号 '' 表示字符串

```ts
let str: string = 'this is ts'
str = 'test'
```

- ts 作为超集，当然可以使用模板字符串 `` 进行包裹，通过 ${} 嵌入变量

```ts
let name: string = `Gene`
let age: number = 37
let sentence: string = `Hello, my name is ${name}`
```

#### [4]symbol

#### [5]null & undefined

- `null` 是一个表示“什么都没有”的空对象引用，是一个只有一个值的特殊类型；
- `undefined` 表示“没有设置值”；
- 默认情况下，`null` & `undefined` 是所有类型的子类型，就是说可以把它们赋值给所有类型的变量，比如 `number` 类型的变量。
- 但如果 TS 配置了 `--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 和它们各自。

```ts
let num: number | undefined // 数值类型 或者 undefined
console.log(num) // 正确
num = 123
console.log(num) // 正确
```

#### [6]array & tuple 数组和元组

##### [6.1]array 数组类型

1）跟 `js` 一致，通过 `[]` 进行包裹；

2）有两种写法：

- ① 元素类型后面接上 `[]`

```ts
let arr: string[] = ['12', '23']
arr = ['45', '56']
```

- ② 使用数组泛型，`Array<元素类型>`：

```ts
let arr: Array<number> = [1, 2]
arr = ['45', '56']
```

##### [6.2]tuple 元组类型

- 允许表示一个\*已知**\*元素数量和类型**的数组，
- 各元素的类型不必相同；
- 赋值的类型、位置、个数需要和定义（声明）的类型、位置、个数一致。

```ts
let tupleArr: [number, string, boolean]
tupleArr = [12, '34', true] // ok
tupleArr = [12, '34'] // no ok
```

#### [7]enum 枚举类型

- enum 类型是对 JavaScript 标准数据类型的一个补充；
- 使用枚举类型可以为一组数值赋予友好的名字。

```ts
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green
```

#### [8]object & function 对象和函数

##### [8.1]object 对象类型

- 非原始类型，
- 常见的形式通过 `{}` 进行包裹

```ts
let obj: object
obj = { name: 'Wang', age: 25 }
```

##### [8.2]function 函数类型

#### [9]any 任意类型

- 指定任何类型的值，
- 期望类型检查器跳过编译阶段的检查，使用 any 类型；
- any 类型允许被赋值为任意类型，甚至可以调用其属性、方法

```ts
let num: any = 123
num = 'str'
num = true
```

- 定义存储各种类型数据的数组时，示例代码如下：

```ts
let arrayList: any[] = [1, false, 'fine']
arrayList[1] = 100
```

#### [10]void 没有类型

- 标识方法返回值的类型，表示该方法没有返回值。
- 和 any 相反，一般配合函数去使用 `function fn1(): void {}`

```ts
function hello(): void {
  alert('Hello Runoob')
}
```

#### [11]never 永远不存在的类型

- 是其他类型（包括 null & undefined）的子类型，可以赋值给任何类型，代表从不会出现的值。
- 但是，没有类型是 never 的子类型，这意味着声明 never 的变量只能被 never 类型所赋值。
- never 类型一般用来指定那些总是会抛出异常、无限循环。
- 返回 never 的函数必须存在无法达到的终点。

```ts
let a: never
a = 123 // 错误的写法

a = (() => {
  // 正确的写法
  throw new Error('错误')
})()

// 返回 never 的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}
```

#### [12]unknown 未知类型

[12.1]

1. 和 any 有点类似
2. unknown 未知类型的变量：获取属性不存在时，会报错；any 获取属性不正确，不会报错；
3. unknown 使用类型断言，  
   ① as 手动类型转换，  
   ② 更规范更安全，  
   ③ 自动转换为需要的类型

```ts
const b: unknown = 100 // 1.
b.length // 2.
;(b as string).length // 3.
```

[12.2]其中，类型断言（Type Assertion），见【2】。

### 【2】类型推断和类型断言（`Type Inference` & `Type Assertion`）

#### [1]类型推断 Type Inference

1. 定义时赋值，类型明确，
2. 冒号后类型定义，可省略；

```ts
const n = 100
```

#### [2]类型断言 Type Assertion

1. 尖括号语法

```ts
let strLength: number = (<string>someValue).length
```

2. as 语法

```ts
let strLength: number = (someValue as string).length
```

## 三、总结

[1]和 js 基本一致，也分成：

1. 基本类型
2. 引用类型

[2]在基础类型上，typescript 增添了 tuple enum any void never unknown 等原始类型

# 参考文献

- https://www.tslang.cn/docs/handbook/basic-types.html
- [原文](https://github.com/febobo/web-interview/issues/246)
