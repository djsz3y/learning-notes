项目实战 TS

# 通用技巧

1. 新手先 any 再填坑，老手先定义数据结构写逻辑

2. 遇到新场景，没把握快速，先用 any 再填坑，填坑的过程也是 TS 技能满满提升的过程。

3. TS 发现潜在问题

1）复杂逻辑，JS 一口气写完，调试没找到毛病，加上 TS 可以找到。

2）提测质量，提测前建议 review 一下，为避免枯燥可以完善下 TS 的使用。

4. 提前定义好 TS，优势明显，有智能提示。

# 实用技巧

[1]公共数据结构，不想在每个文件中引来引去

- 编辑 tsconfig.json 的 include 字段，引入该 ts 文件。

[2]声明语句，声明全局对象，扩展全局对象 `windows` 的类型，以添加一个名为 `add` 的方法，接受两个数字类型的参数，返回一个数字类型的结果。

## 优点：

- 这种声明帮助 TS 开发中进行类型检查，确保你在调用 window.add 方法时传递正确类型的参数，并且能够正确处理返回值。

- 开发一些需要扩展全局对象功能的情况下，特别有用，

## 缺点：

- 但需要小心确保不会与现有的全局变量或方法发生冲突。

## 注意：

- 不会进行类型检查，而且 TypeScript 编译器也不会对此进行警告或错误提示。

## **这就提现了 TS 的优势：**

- 在 TS 中使用 window.add 时，编译器会进行类型检查，确保你传递正确类型的参数，并能正确处理返回值。

- JS 是动态类型语言，不会进行静态类型检查；因此，虽然可以在 JS 中给 window 对象添加新的属性或方法，但是编译器不会对这些扩展进行类型检查，需要自行确保。

- 通过 TS 的类型声明，可以获得更严格的类型检查，而 JS 则更灵活但不会进行类型检查。

## 代码

```ts
// 利用 interface 重复声明 扩展 window，该文件需要配置到 tsconfig.json 中的 includes 字段
declare interface Window {
  add(a: number, b: number): number;
}

// 声明全局变量
declare const wx: any;

// 全局扩展
export class Observable<T> {
  // ... still no implementation ...
}
declare global {
  interface Array<T> {
    toObservable(): Observable<T>;
  }
}

// 使用
[].toObservable();
```

## 我的实践

> tsconfig.json

```ts
{
  "include": ["xxx1", "xxx2", "src/test.ts"],
}
```

> src/test.ts

```ts
declare interface Window {
  add(a: number, b: number): number;
}
```

使用：

> test.vue

```html
<template> </template>
<script>
  const calculate = () => {
    // 使用 inject 访问全局的 window 对象
    window.add = (a, b) => a + b;
    if (window) {
      console.log(window.add(3, 4)); // 调用全局的 add 方法，输出: 7
    }
  };
</script>
```

# 参考链接

- [TypeScript 项目实战技巧](https://www.yuque.com/guojw/fe-project/meryek)
