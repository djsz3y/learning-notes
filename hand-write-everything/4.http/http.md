# HTTP

## 题目

HTTP：

- [x] 常见的状态码有哪些？
- [x] 304 表示什么，和 302 有什么区别？
- [x] 介绍一下 HTTP 缓存策略？
- [ ] Connection 为 keep-alive 表示什么？

DNS：

- [x] 介绍一下 DNS

TCP：

- [x] 三次握手
- [ ] 四次挥手

HTTPS：

- [ ] 介绍一下 HTTPS 的工作原理
- [x] HTTPS 和 HTTP 有什么区别

CDN：

- [ ] 介绍一下 CDN 是什么以及它的应用场景？
- [ ] CDN 的回源是什么？

一个老套但是经典的问题：

- [x] 从输入 URL 到页面展示，发生了什么

## 知识点

### 1.HTTP 状态码【done】

#### ① 状态码分类

- 1xx 服务器收到请求
- 2xx 请求成功，如 200
- 3xx 重定向，如 302
- 4xx 客户端错误，如 404
- 5xx 服务端错误，如 500

#### ② 常见状态码

- 200 成功
- 301 永久重定向（配合 location，浏览器自动处理）（浏览器访问，location 重定向，301 浏览器记住 location 重定向的地址，下次直接访问这个。）
- 302 临时重定向（配合 location，浏览器自动处理）（浏览器访问，location 重定向，下次浏览器还访问上次访问的地址等待地址返回 302，然后 location 再重定向）

---

1. 百度搜索出的网址 a 标签都是百度的地址，做了 302 跳转。

比如：

```
状态代码: 302 Found
Location: http://www.techweb.com.cn/it/2022-02-21/2879604.shtml
```

2. 还有通过长链接生成短链接（短网址），短网址会跳到这个链接。

---

- 304 资源未被修改（资源被请求过了，资源没有过期可以继续用本地缓存的结果。）（讲缓存会重点讲，很重要）
- 404 资源未找到
- 403 没有权限
- 500 服务器错误
- 504 网关超时（服务器可能是很多台机器，服务器内部做处理跳转时可能超时）

#### ③ 关于协议和规范

（了解规范，遵守规范，和其他系统兼容，不被历史淘汰）

- 就是一个约定
- 要求大家都跟着执行
- 不要违反规范，例如 IE 浏览器（早期 IE 浏览器，反规范、反协议，最终被历史淘汰掉）

### 2.HTTP Headers

（这个问题很常见）（一个说不上来只能说对 http 极度有限，极度不熟悉，看过准备过，都能说上来几个的）

演示：

- 发请求发的 url，什么 methods 去发送，还包括 Request Headers，Preview，Response 返回页面，返回 json，返回图片，返回结果等等，还返回 Response Headers
- 所以要请求还是返回，都要有 headers（所以 http headers 很重要）

#### ①Request Headers

1. Accept：浏览器可接收的数据格式
2. Accept-Encoding：浏览器可接收的压缩算法，如 gzip（客户端支持什么样的压缩算法）（把 100kb 信息压缩一下，浏览器可以自己解压，前后端压缩算法 gzip 都是通用的）
3. Accept-Language：浏览器可接收的语言，如 zh-CN

4. Connection：keep-alive 一次 TCP 连接重复使用（和服务端建立连接后，重复使用连接，把资源一次性请求完成，保证一定的效率）
5. cookie：（同域每次请求资源都会把 cookie 带上，浏览器自己带的）
6. Host：（域名）

7. User-Agent：（简称 UA）浏览器信息（服务端通过 UA 得知多少人用 Chrome，多少人用安卓、小米手机等，UA 有手机系统浏览器信息）
8. Content-type：发送数据的格式，如 application/json（json 还是二进制，一般 get 没有，get 是向服务端获取数据，不向服务端请求数据）

#### ②Response Headers

1. Content-type：返回数据的格式，如 application/json（json、html、css、图片格式等要告诉我）
2. Content-length：返回数据的大小，多少字节
3. Content-Encoding：返回数据的压缩算法，如 gzip（服务端通过这个告诉客户端用什么算法压缩的，这样客户端像浏览器自动根据压缩算法解压，解压完就可以用了）
4. Set-Cookie：（服务端改 cookie 通过 Set-Cookie 改 cookie）

#### 演示

#### 自定义 header

> axios-js.com/docs/#Request-Config

```
// `headers` are custom headers to be sent
headers: { 'X-Requested-With' : 'XMLHttpRequest' },
```

请求头的某个名 key 和请求头 key 对应的 value，有些 api、接口要求在 headers 里加秘钥或某个特定值才能把请求通过不然就是非法请求，比如简单的一些强烈验证可以通过这种方式，没加就非法加了就验证通过。

#### ③ 缓存相关的 headers（缓存讲）

Cache-Control
Last-Modified
Etag
Expires
If-Modified,If-Modified-Since
If-None-Match

**答题时若问 headers，说上前头的再说缓存 headers，再把缓存学好！**

### 3.HTTP Methods【done】

#### ① 传统 methods（10 年前，移动互联网不发达，都用 PC）

- get 获取服务器的数据
- post 向服务器提交数据
- 简单的网页功能，就这两个操作

#### ② 现在 methods

（设计 API，严格按约定，规范，去执行）

- get 获取数据
- post 新建数据
- patch/put 更新数据
- delete 删除数据

#### ③Restful Api（回答先说这两个功能）

- 一种新的 API 设计方法（早已推广使用）
- 传统 0API 设计：把每个 url 当做一个功能 ⭐
- Restful API 设计：把每个 url 当做一个唯一的资源（唯一资源的标识、ID）⭐

【1】如何设计成一个资源？

    • 尽量不用url参数
    • 用method表示操作类型

【2】不使用 url 参数

    • 传统API设计：/api/list?pageIndex=2（传统API把url当做一个功能）
    • Restful API设计：/api/list/2（Restful API把url当做一个唯一的资源、标识）

【3】用 method 表示操作类型（传统 API 设计）（传统 API 设计：把每个 url 当做一个功能，是获取服务端还是推送服务单）

    • post请求    /api/create-blog
    • post请求    /api/update-blog?id=100
    • get请求      /api/get-blog?id=100

【4】⭐ 用 method 表示操作类型（Restful API 设计）（Restful API 设计：把每个 url 当做一个唯一的资源）（只看 url 只是个资源的标识，看请求 method 才知道做什么的）

    • post请求    /api/blog
    • patch请求    /api/blog/100
    • get请求    /api/blog/100

【5】最后：

    • 尽量不要在url中做参数，
    • 以及要用method做操作类型

### 4.HTTP 缓存【done】（本上）

1. 强制缓存
2. 协商缓存（对比缓存）
3. 综述
4. 刷新页面对 http 缓存的影响
5. http 和 https 的区别
6. 加密方式
7. https 证书
