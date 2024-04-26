# 2-1 构建 TypeScript 的开发环境

## 三个环境

> ◆ 学习 TypeScript 的环境  
> ◆ 构建 NPM 包的环境  
> ◆ 前端项目开发的环境

### 学习 TypeScript 的环境

> [TypeScript Playground](https://www.typescriptlang.org/play/)

[1] ts 在线编译

```ts
type A = {
  x: string
  y: string
}

const a: A = {
  x: 'sss',
  y: 'ttt',
  z: '2' // Object literal may only specify known properties, and 'z' does not exist in type 'A'.(2353)
}
```

在线编译成了：

```js
'use strict'
const a = {
  x: 'sss',
  y: 'ttt'
}
```

[2]带有类型校验提示

```ts
// ...
const a: A = {
  ...,

  z: '2' // Object literal may only specify known properties, and 'z' does not exist in type 'A'.(2353)
}
```

[3]在线运行结果

```ts
// type A...

// const a...

console.log(a)
```

<img src="ts-run-logs.png"/>

或者给 a 添加了 z 属性后，log 报错：

<img src="ts-run-errors.png"/>

04:44

### 构建 NPM 包的环境

### 前端项目开发的环境
