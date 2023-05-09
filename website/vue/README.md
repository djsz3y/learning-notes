### Vue2 官方文档阅读笔记

大棒、奖励、画大饼。只计划 3 天内的事情。

Vue2 官方文档阅读笔记

注意：

- 本篇文章只是自己对官方文档知识的一种整合，以便日后作用于复习；
- 初学者请移步官方文档，自己阅读，自己总结。
- 本篇文章也可以查看的我的 github [Vue2 官方文档阅读笔记](https://github.com/djsz3y/learning-notes/blob/master/README.md)

[返回学习笔记目录](/README.md)

#### 1.Essentials

##### 1.1.Introduction

###### 1.1.1.What is Vue.js?

- 渐进式框架（progressive framework）
- 专注视图层，容易集成
- 结合现代工具和[支持库](https://github.com/vuejs/awesome-vue#components--libraries)
- Comparison with Other Frameworks.

###### 1.1.2.Getting Started

[Hello World example](https://codesandbox.io/s/github/vuejs/v2.vuejs.org/tree/master/src/v2/examples/vue-20-hello-world?file=/index.html)

```html
<!-- development version, includes helpful console warnings -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

```html
<!-- production version, optimized for size and speed -->
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
```

###### 1.1.3.Declarative Rendering

( not only text and attributes, )

文本插值 text interpolation

- set `app.message` to a different value.

```html
<div id="app">{{ message }}</div>
```

绑定元素属性 bind element attributes（使用 v-bind 指令 directive）

- open up your JavaScript console again and enter `app2.message = 'some new message'`

```html
<div id="app-2">
  <span v-bind:title="message">xxx</span>
</div>
```

###### 1.1.4.Conditionals and Loops

( but also the structure of the DOM. )

切换元素存在 toggle the presence of an element

- Go ahead and enter `app3.seen = false` in the console.

```html
<div id="app-3">
  <span v-if="seen">Now you see me</span>
</div>
```

powerful transition effect system

- `##### 3.1.Enter/Leave & List Transitions`

其他指令各自有不同功能（quite a few other directives），比如 `v-for`

- enter `app4.todos.push({ text: 'New item' })`.

```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">{{ todo.text }}</li>
  </ol>
</div>
```

###### 1.1.5.Handling User Input

`v-on` 指令（directive）附加在事件监听器（event listeners）上

- Vue 处理 DOM 操作
- 自己编写的代码专注底层逻辑（underlying logic）

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```

`v-model`指令双向绑定 v-model directive that makes two-way binding between form input and app state a breeze

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message" />
</div>
```

###### 1.1.6.Composing with Components

组件系统 component system

- abstraction
- tree of components

注册组件：注册命名为`todo-item`的`li`组件：

```js
// Define a new component called todo-item
Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})

var app = new Vue(...)
```

使用组件：使用注册的命名为`todo-item`的`li`组件：

```html
<ol>
  <!-- Create an instance of the todo-item component -->
  <todo-item></todo-item>
</ol>
```

定义组件的 prop 属性 modify the component definition to make it accept a prop:

```js
Vue.component('todo-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```

使用 v-bind 传递待办 pass the todo using v-bind:

```html
<div id="app-7">
  <ol>
    <!--
      Now we provide each todo-item with the todo object
      it's representing, so that its content can be dynamic.
      We also need to provide each component with a "key",
      which will be explained later.
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```js
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ]
  }
})
```

使用组件的应用程序模板：What an app’s template might look like with components?

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

###### 1.1.6.1.Relation to Custom Elements

- Custom Elements

- [Web Components Spec](https://www.w3.org/wiki/WebComponents/)

- Vue components

  1. Slot API
  2. special attribute `is`

- 包装在原生自定义组件中

- 最显著的：

  1. 跨组件数据流 cross-component data flow
  2. 自定义事件通信 custom event communication
  3. 构建工具集成 build tool integrations

- [great interoperability](https://custom-elements-everywhere.com/#vue)

- Vue CLI

###### 1.1.7.Ready for More?

- the rest of this guide
- with much finer details
- read through it all!

##### 1.2.The Vue Instance

###### 1.2.1.Creating a Vue Instance

Vue 实例：

- API reference ：full list of options

```js
// MVVM pattern-vm (short for ViewModel)
var vm = new Vue({
  // options
}) // Vue function
```

待办应用程序组件树 a todo app’s component tree might look like this:

```
Root Instance
└─ TodoList
   ├─ TodoItem
   │  ├─ TodoButtonDelete
   │  └─ TodoButtonEdit
   └─ TodoListFooter
      ├─ TodosButtonClear
      └─ TodoListStatistics
```

- 组件系统后面详细讲 component system

- Vue 组件也是 Vue 实例 all Vue components are also Vue instances
- 除了特定根的，接收相同选项 accept the same options object (except for a few root-specific options).

###### 1.2.2.Data and Methods

- 创建 Vue 实例后，所有 data 的属性都加入到 Vue 响应式系统（Vue’s reactivity system）中。
- 数据改变（data properties values），视图（view will “react”）重新渲染（updating to match the new values）。
- 创建实例后，只有存在于 data 属性里的数据才是响应式的。

```js
// Our data object
var data = { a: 1 }

// The object is added to a Vue instance
var vm = new Vue({
  data: data
})

// Getting the property on the instance
// returns the one from the original data
vm.a == data.a // => true

// Setting the property on the instance
// also affects the original data
vm.a = 2
data.a // => 2

// ... and vice-versa
data.a = 3
vm.a // => 3
```

响应式数据必须在 data 设置初始值 set some initial value，否则创建实例后添加新属性不会触发视图更新。

```js
data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}
```

然而响应式数据在 data 设置初始值后，又使用 Object.freeze()，也会阻止响应式系统跟踪视图更新的操作。

```js
var obj = {
  foo: 'bar'
}

Object.freeze(obj)

new Vue({
  el: '#app',
  data: obj
})
```

```html
<div id="app">
  <p>{{ foo }}</p>
  <!-- this will no longer update `foo`! -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
```

另外，Vue 实例会暴露一些有用的实例属性和方法，以`$`为前缀，以区别于用户自定义属性，比如：

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch is an instance method
vm.$watch('a', function (newValue, oldValue) {
  // This callback will be called when `vm.a` changes
})
```

以后咨询[API Reference](https://v2.vuejs.org/v2/api/#Instance-Properties)实例属性和方法列表。

###### 1.2.3.Instance Lifecycle Hooks

每个 Vue 实例被**创建后**经过一系列的**初始化步骤**：设置数据观察、编译模板、实例渲染到 DOM、数据改变更新 DOM（set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes.）

同时，运行生命周期钩子的函数（以便开发者在一些具体阶段添加自己的代码） lifecycle hooks, opportunity to add their own code at specific stages.

比如，created hook（实例创建后，运行代码）：

```js
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` points to the vm instance
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```

实例的生命周期的不同阶段有不同 hook 钩子函数。每个 hook 的 this context 指向 vue 实例（All lifecycle hooks are called with their this context pointing to the Vue instance invoking it.）。

生命周期钩子函数不能使用箭头函数，比如：`created: () => console.log(this.a)` or `vm.$watch('a', newValue => this.myMethod())`；  
在这些 hook 里，认为 this 是未定义变量而向父级作用域查找直到被找到；所以如果用箭头函数，会报错：`Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function`。

###### 1.2.4.Lifecycle Diagram

生命周期图

<img src="./imgs/lifecycle.png"/>

<!-- new Vue()
=> Init Event & LifeCycle

=> `beforeCreate`

=> Init injections & reactivity

=> `created`

Has "el" option?

Has "template" option? -->

##### 1.3.Template Syntax

Computed Properties and Watchers

Class and Style Bindings

Conditional Rendering

List Rendering

Event Handling

Form Input Bindings

Components Basics

#### 2.Components In-Depth

Component Registration

Props

Custom Events

Slots

Dynamic & Async Components

Handling Edge Cases

#### 3.Transitions & Animation

##### 3.1.Enter/Leave & List Transitions

###### 3.1.1.Overview

###### 3.1.2.Transitioning Single Elements/Components

##### 3.2.State Transitions

#### 4.Reusability & Composition

Mixins

Custom Directives

Render Functions & JSX

Plugins

Filters

#### 5.Tooling

Single File Components

Testing

TypeScript Support

Production Deployment

#### 6.Scaling Up

Routing

State Management

Server-Side Rendering

Security

#### 7.Internals

Reactivity in Depth

##### 7.1 Reactivity in Depth

#### 8.Migrating

Migration from Vue 1.x

Migration from Vue Router 0.7.x

Migration from Vuex 0.6.x to 1.0

Migration to Vue 2.7

#### 9.Meta
