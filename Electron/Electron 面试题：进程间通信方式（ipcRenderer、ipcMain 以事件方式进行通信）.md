# Electron 面试题：进程间通信方式（ipcRenderer、ipcMain 以事件方式进行通信）

## 1.Process-进程？

- 进程是正在被执行或运行的应用程序

## 2.Chromium 和 Electron 一样，运行产生多个进程。即：

- 主进程-Main Process
- 渲染进程-Renderer Process

## 3.主进程和渲染进程的异同和特点：

主进程

主进程只有一个，作为整个程序的入口点。
可以使用 Electron API（和系统对接的 API，可以创建菜单、上传文件）。
可以创建渲染进程。
全面支持 Node.js。

- 只有主进程有权利创建 BrowserWindow

渲染进程

渲染进程可以有多个，每个都是一个单独的进程，每个都对应一个窗口。
可以使用一部分 Electron 提供的 API。
全面支持 Node.js（需要配置） 和 DOM API。

## 4.进程之间的通讯方式

> 操作系统提供了程序之间通信的桥梁 IPC 把程序连接起来；  
> Electron 给我们提供了相应的 API，可以帮助我们完成进程之间的通信。

- Electron 使用 IPC（interprocess communication）在进程之间进行通讯【通信桥梁】
- 和 Chromium 完全一致【运行方式】

## 5.为什么要在进程之间通信？

① 主进程（可操作某特定 API）done，——通知>，渲染进程 to 界面更新；

② 渲染进程 done 界面操作（页面点击某个按钮），——调用，以完成通知效果(事件的方式)>，主进程特定的 API。

③ Electron 的进程通信方式（和 DOM 事件机制一样），都是 Event Driven 事件驱动的。

## 6.进程之间如何通信？

```js
ipcMain.on('message', (event, arg) => {
  // 2. 接收两个参数：
  //  `event`-发送的事件对象，
  //  `arg`-发送的事件内容。
  // 3. 可看到 cmd 打印出了：`hello from renderer`
  // 说明消息从 Renderer Process 发送到了 Main Process。
  console.log(arg)
  // 回复信息的两种方式 —— `event.sender` 等于 `mainWindow`：
  // event.sender.send("reply", "hello from main");
  mainWindow.send('reply', 'hello from main')
})
```

```js
// 1. 加载模块 ipcRenderer
const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  // 2. 向 IPC 发送事件
  ipcRenderer.send('message', 'hello from renderer') // 可以发送任何类型的数据格式。
  // 监听来自 Main Process 的消息
  ipcRenderer.on('reply', (event, arg) => {
    // 把接收到的消息 message，通过 DOM 操作到页面上。
    document.getElementById('message').innerHTML = arg
  })
})
```
