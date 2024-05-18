"use strict";
const hello = "Hello World!";
console.log(hello);
// ----------------------------------------------------------------------boolean number string
// 不显式的定义类型，也能够自动做出类型推论
let age = 1; // let age: number
// age = "zhangsan"; // 报错 不能将类型“string”分配给类型“number”。ts(2322) // ⭐
// // helloworld.ts:8:1 - error TS2322: Type 'string' is not assignable to type 'number'.
// 解决：
// let age: number = 1;
// ----------------------------------------------------------------------包装对象
// 声明未赋值 自动推断为any类型
let person; // let person: any
var str = "Hello";
var strObject = new String(str); // 创建一个字符串包装对象
console.log(strObject.length); // 访问字符串的长度属性
console.log(str.length); // 访问字符串的长度属性
// ----------------------------
// 在TS中也存在包装对象
// 报错 Type 'Boolean' is not assignable to type 'boolean'.
// let createdByNewBoolean: boolean = new Boolean(1); // ⭐
// 问题：不能将类型“Boolean”分配给类型“boolean”。
// “boolean”是基元，但“Boolean”是包装器对象。如可能首选使用“boolean”。ts(2322)
// 解决：
// 1. 使用 Boolean 对象的 valueOf() 方法返回基本数据类型的值
// let booleanObject = new Boolean(true)
// let booleanPrimitive: boolean = booleanObject.valueOf()
// 2. 使用双重否定操作符`!!`，将 Boolean 对象转换为基本数据类型
// let booleanPrimitive: boolean = !!booleanObject
// 3. 显示类型转换
// let booleanPrimitive: boolean = <boolean>booleanObject
// 4. 使用 as 关键字
// 直接赋值时的隐式转换（不推荐，因为它可能导致混淆和潜在的错误）
// let booleanPrimitive: boolean = booleanObject as unknown as boolean
// 5. 更优雅和安全的做法是尽量避免在代码中使用 Boolean 对象，而是直接使用 boolean 类型。
// 例如：
// let booleanPrimitive: boolean = true
// 6. 如果你从某个地方接收到的Boolean对象并且无法避免，那么在赋值之前进行转换是必要的：
// function someFunctionThatReturnsBooleanObject(): Boolean {
//   return  new  Boolean(true)
// }
// let booleanPrimitive: boolean = someFunctionThatReturnsBooleanObject().valueOf()
// 通过这种方式，你可以避免类型不匹配的错误
// ----------------------------------------------------------------------null 和 undefined
// ----------------------------------------------------------------------空值 void
// ----------------------------------------------------------------------any
// ----------------------------------------------------------------------unknow
// ----------------------------------------------------------------------never类型
// ----------------------------------------------------------------------类型进阶——联合类型
// ----------------------------------------------------------------------类型进阶——对象的类型
// ----------------------------------------------------------------------类型进阶——数组的类型
// ----------------------------------------------------------------------类型进阶——函数的类型
// ----------------------------------------------------------------------类型进阶——元组
