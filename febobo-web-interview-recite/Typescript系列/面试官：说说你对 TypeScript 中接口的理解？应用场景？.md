# 面试官：说说你对 TypeScript 中接口的理解？应用场景？

## 一、是什么

[1]What?

1. 抽象方法的声明，
2. 第三方通过这组抽象方法调用，让具体的类执行具体的方法

[2]TS 核心功能之一：

1. 对**类型做检测**，**接口的作用**就是为这些**类型命名**，
2. 为你的代码/第三方代码**定义一个约定**。

## 二、使用方式

[1]接口定义

```ts
interface interface_name {}
```

举例：

1. js 写一个方法：

```js
const getUserName = (user) => user.name
```

2. 通过接口 interface 描述 user 参数的结构：

```ts
interface User {
  name: string
  age: number
}
```

3. ts 使用 interface 写一个方法：

```ts
const getUserName = (user: User) => user.name
```

4. 传入的对象 user 必须拥有 name age 属性，否则 typescript 在编译阶段会报错；

[2]可选属性 ?

5. 不想要 age 属性，使用可选属性  
   （age 可以是 number 类型或者 undefined 类型）

```ts
interface User {
  name: string
  age?: number
}
```

[3]只读属性 readonly

6. 想要属性变成只读属性，ts 中使用 readonly 声明  
   （修改 isOnly，报错“无法分配到 "isOnly" ，因为它是只读属性。”）。

```ts
interface User {
  name: string
  age? number
  readonly isMale: boolean
}
```

[4]**属性中存在函数**

7. 属性中有一个函数

```ts
interface User {
  name: string
  age?: number
  readonly isMale: boolean
  say: (words: string) => string
}
```

[5]**类型推断**（应该是 类型断言）

8. 传递的对象不仅仅上述的属性之外，还有其他属性，

```ts
interface User {
  name: string
  age: number
}

const getUserName = (user: User) => user.name
getUserName({ color: 'yellow' } as User) // 类型断言 Type Assertion
```

[6]接口添加字符串**索引签名**

9. 扩展对象的属性

```ts
interface User {
  name: string
  age: number
  [propName: string]: any
}
```

[7]接口还能实现**继承** 10.

```ts
interface Father {
  color: string
}

interface Son extends Father {
  name: string
  age: number
}

const fn = (user: Son) => {
  user.age // 都可调用
  user.color // 都可调用
  user.name // 都可调用
}
```

[8]也可以**继承多个**，父类逗号隔开 11.

```ts
interface Father {
  color: string
}
interface Mother {
  height: number
}
interface Son extends Father, Mother {
  name: string
  age: number
}
```

## 三、应用场景

【1】多人开发：

[1]使用 js 定义的一个函数：

```js
const getUserInfo = function(user) {
  return name: ${user.name}, age: ${user.age}
}
```

[2]多人开发，使用此函数时：

- 没有注释，出现各种运行时错误；

[3]使用接口定义参数变量后，正确调用：

```ts
interface IUser {
  name: string
  age: number
}
const getUserInfo = (user: IUser): string => {
  return `name: ${user.name}, age: ${user.age}`
} // 使用接口定义参数变量后
getUserInfo({ name: 'koala', age: 18 }) // 正确调用
```

【2】包括类也会应用到接口。
