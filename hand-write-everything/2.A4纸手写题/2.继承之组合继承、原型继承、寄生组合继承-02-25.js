// 9.1 原型链继承
function Parent() {
  this.name = 'parent'
}
Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child() {}
Child.prototype = new Parent()

var child1 = new Child()
console.log(child1.getName())
// child1.name = 'child1'                x
// var child2 = new Child()              x
// console.log(child2.name)              x

// 问题：引用类型属性，被所有实例共享。举个例子：
function Parent() {
  this.names = ['red', 'yellow', 'blue']
}

function Child() {}
Child.prototype = new Parent()

var child1 = new Child()
child1.names.push('test')
console.log(child1.names)
var child2 = new Child()
console.log(child2.names)

// 9.2 借用构造函数
function Parent() {
  this.names = ['red', 'yellow', 'blue']
}

function Child() {
  Parent.call(this)
}

var child1 = new Child()
child1.names.push('test')
console.log(child1.names)
var child2 = new Child()
console.log(child2.names)

// 优点1：避免了引用类型属性，被所有实例共享。

// 优点2：Child 可以向 Parent 传参。

function Parent(name) {
  this.name = name
}

function Child(name) {
  Parent.call(this, name)
}

var child1 = new Child('child1')
console.log(child1.name)
var child2 = new Child('child2')
console.log(child2.name)

// 缺点：方法都在构造函数中定义，每次创建实例，都会创建一遍方法；

// 9.3 组合继承
function Parent(name) {
  this.name = name
  this.colors = ['red', 'yellow', 'blue']
}
Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}
Child.prototype = new Parent()
Child.prototype.constructor = Child

var child1 = new Child('child1', 18)
child1.colors.push('green')
console.log(child1.name)
console.log(child1.age)
console.log(child1.colors)
var child2 = new Child('child2', 20)
console.log(child2.name)
console.log(child2.age)
console.log(child2.colors)

/**
 * !优点：
 * !- 融合了原型链继承和构造函数的优点，
 * !- 是JavaScript中最常用的继承模式。
 */

// 9.4 原型继承
function createObj(o) {
  function F() {}
  F.prototype = o
  return new F()
}

var person = {
  name: 'person',
  colors: ['red', 'yellow', 'blue']
}

var person1 = createObj(person)
var person2 = createObj(person)
person1.name = 'person1'
console.log(person2.name)
person1.colors.push('test')
console.log(person2.colors)

// 缺点：和原型链继承一样，引用类型的属性，所有实例都共享。

// 9.5 寄生式继承
function createObj(o) {
  var clone = Object.create(o) // ②该函数在内部以某种形式来做增强对象，
  clone.sayName = function () {
    console.log('hi')
  }
  return clone // ③最后返回对象。
} // ①创建一个仅用于封装继承过程的函数。
