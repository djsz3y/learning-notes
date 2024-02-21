阅读 React 官方文档笔记

https://react.dev/

# 简介【done】

[1] 一行命令设置现代 Web 应用程序

[2] 没有版本不匹配 Only One Dependency

[3] 设置直接编辑配置文件

[4] 几秒开始 Get started in seconds

- 创建 my-app 的项目

```bash
npx create-react-app my-app
```

[5] 易于维护 Easy to Maintain

- 一行命令升级 Create React App 新版本发布

```bash
npm install react-scripts@latest
```

参考链接：[Create React App 首页](https://create-react-app.dev/)

> GET STARTED

# Quick Start

## Quick Start【done】

You will learn

- 创建 & 嵌套组件
- 标签 & 样式
- 展示数据
- 条件 & 列表渲染
- 响应事件 & 更新屏幕
- 组件间共享数据

### 1.Creating and nesting components【done】

[1] 创建组件：声明 MyButton 组件名必须大写，html 标签小写

```jsx
function MyButton() {
  return <button>I'm a button</button>
}
```

[2] 嵌套组件：MyButton 组件嵌套在 MyApp 组件中

```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  )
}
```

参考链接：[Creating and nesting components ](https://react.dev/learn#components)

### 2.Writing markup with JSX【done】

JSX 标记语法，可选，大多数 React 应用为了方便都使用

React JSX 组件必须返回唯一一个 JSX 标签：`return (<div></div>)`或`return (<></>)`

HTML 移植 JSX 在线转换工具：[HTML to JSX online converter](https://transform.tools/html-to-jsx)

```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </>
  )
}
```

参考链接：[Writing markup with JSX](https://react.dev/learn#writing-markup-with-jsx)

### 3.Adding styles【done】

CSS class 用 `className`：

```html
<img className="avatar" /> //className
```

style 文件：

```css
/* In your CSS */
.avatar {
  border-radius: 50%;
}
```

React 不规定如何添加 css 文件：

- HTML 添加 link 标签方式
- 构建工具和框架查其文档

参考链接：[Adding styles](https://react.dev/learn#adding-styles)

### 4.Displaying data【done】

[1] JSX 中，JS 里放标签，内部用**花括号**`{}`嵌入变量以展示：

[2] 两种**传递属性值**的方式：

- [2.1]传字符串：双引号内嵌字符串；e.g.`className="avatar"`
- [2.2]传变量值：花括号内嵌变量；e.g.`src={user.imageUrl}`

```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90
}

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1> //1.
      <img
        className="avatar" //2.1.
        src={user.imageUrl} //2.2.
        alt={'Photo of ' + user.name} //3.
        style={{
          width: user.imageSize,
          height: user.imageSize
        }} //4.
      />
    </>
  )
}
```

[3] 花括号里，放字符串拼接：`alt={'Photo of ' + user.name}`

[字符串拼接 string concatenation](https://javascript.info/operators#string-concatenation-with-binary)

[4] 双花括号：=> 单花括号，放对象（JSX 花括号内常规{}对象）`style={{ width: user.imageSize, height: user.imageSize }}`

参考链接：[Displaying data](https://react.dev/learn#displaying-data)

### 5.Conditional rendering【done】

[1] if 语句有条件的包含 JSX：

```jsx
let content
if (isLoggedIn) {
  content = <AdminPanel />
} else {
  content = <LoginForm />
}
return <div>{content}</div>
```

[2] 三元表达式`a?b:c`，更紧凑的方式：

```jsx
function LoggedInPanelOrForm() {
  return <div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
}
```

[3] 不用 else`isLoggedIn && <AdminPanel />`，更短的逻辑语法：

```jsx
<div>{isLoggedIn && <AdminPanel />}</div>
```

[4] 有条件的指定属性

参考链接：[Conditional rendering](https://react.dev/learn#conditional-rendering)

### 6.Rendering lists【done】

[1] 渲染组件列表：使用 for 循环 、 map 方法。  
for loop and the array map() function to render lists of components.

[2] li 有 key 属性，唯一标识（字符串/数字，数据库 ID），区分兄弟项。  
通过 key 得知你插入、删除、排序每一项。

```jsx
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 }
] // 产品数组

export default function ShoppingList() {
  const listItems = products.map(
    //-------------------------------------------------[1]
    (product) => (
      <li
        key={product.id} //----------------------------[2]
        style={{
          color: product.isFruit ? 'magenta' : 'darkgreen'
        }}
      >
        {product.title}
      </li>
    )
  ) // 产品数组 map 循环，返回 li

  return (
    <ul>{listItems}</ul> // 放在 ul 里返回成组件
  )
} // 一个 ShoppingList 组件
```

参考链接：[Rendering lists](https://react.dev/learn#rendering-lists)

### 7.Responding to events【done】

声明事件用 onClick={}；e.g.`onClick={handleClick}`：

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!')
  }

  return <button onClick={handleClick}>Click me</button> //onClick={}
}
```

参考链接：[Responding to events](https://react.dev/learn#responding-to-events)

### 8.Updating the screen【done】

用处：组件记录信息并展示

#### 实现一个功能：点击按钮增加计数器

[1]导入 useState

[2]在组件里声明状态变量

[3]useState()里设置初始值

[4]setCount()传递新值

**[5]多次渲染相同组件，各自状态独立**

> App.js

```jsx
//[1]导入 useState
import { useState } from 'react'

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      {/* [5]多次渲染相同组件，各自状态独立 */}
      <MyButton />
      <MyButton />
    </div>
  )
}

function MyButton() {
  //[2]在组件里声明状态变量
  //[3]useState()里设置初始值
  const [count, setCount] = useState(0)

  function handleClick() {
    // [4]setCount()传递新值
    setCount(count + 1)
  }

  return <button onClick={handleClick}>Clicked {count} times</button>
}
```

#### 总结成抽象模板：

```jsx
import { useState } from 'react'
//导出嵌套组件1的新组件MyApp
export default function 新组件MyApp() {
  return (
    <div>
      {/* //[5]多次渲染相同组件，各自状态独立 */}
      <组件1 />
      <组件1 />
    </div>
  )
}
function 组件1() {
  const [something, setSomething] = useState(第一次的初始值)

  function handleEvent(){
    setSomething(新值)
  }

  return 组件标签（绑定处理事件handleEvent）
}
```

### 9.Using Hooks【done】

use 开头的方法叫挂钩（Hooks）。

- 其他内置挂钩见 [API Built-in React Hooks](https://react.dev/reference/react)。

- 可以结合现有 Hooks 编写自己的 Hooks。

钩子更具限制性：

- 只能组件顶部调用；
- 条件、循环使用 useState 需要提取新组件。

### 10.Sharing data between components【done】

组件间如何共享数据？

独立状态：前面每个 MyButton 有独立的 count。

共享状态：每个按钮状态向上转移到包含所有按钮的最近组件，就可以共享数据。

通过状态提升（lifting state up）以及给组件传递 props ，改写上述代码为：

```jsx
import { useState } from 'react'
export default function MyApp() {
  const [count, setCount] = useState(0)
  function handleClick() {
    setCount(count + 1)
  }
  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  )
}
function MyButton({ count, OnClick }) {
  return <button onClick={OnClick}>Clicked {count} times</button>
}
```

### 11.Next Steps【done】

By now, you know the basics of how to write React code!

Check out the Tutorial to put them into practice and build your first mini-app with React.

## Tutorial: Tic-Tac-Toe

## Thinking in React

# Installation

## Installation

## Start a New React Project

## Add React to an Existing Project

## Editor Setup

## React Developer Tools

> LEARN REACT

# Describing the UI

## Describing the UI

### Your First Component

### Importing and Exporting Components

### Writing Markup with JSX

### JavaScript in JSX with Curly Braces

### Passing Props to a Component

### Conditional Rendering

### Rendering Lists

### Keeping Components Pure

## Your First Component

### Components: UI building blocks

### Defining a component

#### Step 1: Export the component

#### Step 2: Define the function

#### Step 3: Add markup

### Using a component

#### What the browser sees

#### Nesting and organizing components

### Recap

### Challenges

## Importing and Exporting Components

### The root component file

### Exporting and importing a component

### Exporting and importing multiple components from the same file

### Recap

### Challenges

## Writing Markup with JSX

### JSX: Putting markup into JavaScript

### Converting HTML to JSX

### The Rules of JSX

#### 1. Return a single root element

#### 2. Close all the tags

#### 3. camelCase all most of the things!

#### Pro-tip: Use a JSX Converter

### Recap

### Challenges

## JavaScript in JSX with Curly Braces

### Passing strings with quotes

### Using curly braces: A window into the JavaScript world

#### Where to use curly braces

### Using “double curlies”: CSS and other objects in JSX

### More fun with JavaScript objects and curly braces

### Recap

### Challenges

## Passing Props to a Component

### Familiar props

### Passing props to a component

#### Step 1: Pass props to the child component

#### Step 2: Read props inside the child component

### Specifying a default value for a prop

### Forwarding props with the JSX spread syntax

### Passing JSX as children

### How props change over time

### Recap

### Challenges

## Conditional Rendering

### Conditionally returning JSX

#### Conditionally returning nothing with `null`

### Conditionally including JSX

#### Conditional (ternary) operator (`? :`)

#### Logical AND operator (`&&`)

#### Conditionally assigning JSX to a variable

### Recap

### Challenges

## Rendering Lists

### Rendering data from arrays

### Filtering arrays of items

### Keeping list items in order with `key`

#### Where to get your `key`

#### Rules of keys

#### Why does React need keys?

### Recap

### Challenges

## Keeping Components Pure

### Purity: Components as formulas

### Side Effects: (un)intended consequences

#### Local mutation: Your component’s little secret

### Where you can cause side effects

### Recap

### Challenges

# Adding Interactivity

# Managing State

# Escape Hatches
