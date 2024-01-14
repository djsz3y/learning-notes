# 1.是什么

## 1.3 安装

新建一个工程目录，命令行进入该目录：

```bash
npm init # 执行npm初始化命令，输入项目基本信息后，生成package.json。
npm install webpack webpack-cli --save-dev # 安装必须的 核心模块 webpack 和 命令行工具 webpack-cli。
npx webpack -v
npx webpack-cli -v # 显示各自版本号，安装成功。
```

## 1.4

# 2.意义

# 3.安装

- 安装前需要 node LTS 版本
- [https://github.com/nodejs/Release](https://github.com/nodejs/Release)查看稳定版本

## 3.1 全局安装 webpack

## 3.2 本地安装 webpack

### 3.2.1 生成文件`package.json`

创建`chapter1`文件夹，cmd 执行`npm init`生成文件`package.json`：

```javascript
npm init
```

```javascript
{
  "name": "chapter1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```

- 记录项目名称、版本、仓库地址等信息。

### 3.2.2 安装 webpack

```javascript
npm install  webpack webpack-cli --save-dev
added 117 packages in 15s
```

- 同时安装 webpack（核心模块）及 webpack-cli（命令行工具），都必须。
- `package.json`和上一个的区别，多了`devDependencies`

```javascript
{
	...
  "devDependencies": {
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0"
  }
}

```

### 3.2.3 安装成功

执行`npx webpack -v`及`npx webpack-cli -v`显示各自版本号，安装成功。

```javascript
npx webpack -v
webpack: 5.74.0
webpack-cli: 4.10.0
webpack-dev-server not installed

npx webpack-cli -v
webpack: 5.74.0
webpack-cli: 4.10.0
webpack-dev-server not installed
```

- webpack 安装在本地，无法直接命令行使用`webpack`
- 工程内部只能使用`npx webpack <command>`
- 后面简化

# 4.工程

## 4.1Hello World

### 4.1.1 创建文件`index.js、add-content.js、index.html`

```javascript
import addContent from './add-content.js'
document.write('My first Webpack app.<br />')
addContent()
```

```javascript
export default function () {
  document.write('Hello world!')
}
```

```javascript
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>My first Webpack app.</title>
</head>
<body>
    <script src="./dist/bundle.js"></script>
</body>
</html>
```

### 4.1.2 打包命令

```javascript
npx webpack --entry=./index.js --output-filename=bundle.js --mode=development

asset bundle.js 4.25 KiB [emitted] (name: main)
runtime modules 670 bytes 3 modules
cacheable modules 169 bytes
  ./index.js 105 bytes [built] [code generated]
  ./add-content.js 64 bytes [built] [code generated]
webpack 5.74.0 compiled successfully in 304 ms
```

### 4.1.3 打开 index.html

My first Webpack app.<br />Hello world!

### 4.1.4 讲解

1. `entry`（资源打包入口）：模块依赖查找，得到模块 index.js 和 add-content.js，生成最终产物
2. `output-filename`（输出资源名）：/dist/bundle.js 是打包结果
3. `mode`（打包模式）：`development`、`production`、`none`。处于相应模式，自动添加当前模式一系列配置减少人为工作量

## 4.2 使用`npm scripts`

# 5.小结
