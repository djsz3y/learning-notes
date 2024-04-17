# HTML

## 如何理解 HTML 语义化

    • 让人更容易读懂（增加代码可读性）
    • 让搜索引擎更容易读懂（更好的 SEO）

举例：

```html
<div>
  <h1>标题</h1>
  <p>文字</p>
  <ul>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
  </ul>
</div>
```

## 块状元素&内联元素？（html、css 结合，常考）

    • display: block/table;
              有 div h1 h2 table ul ol p 等（独占一行）
    • display: inline/inline-block;
              有 span img input button 等（不会独占一行，挤到换行）

# 掘金「2021」高频前端面试题汇总之 HTML 篇

> 作者：CUGGZ
> 链接：https://juejin.cn/post/6905294475539513352
> 来源：稀土掘金
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 1.src 和 href 的区别

https://juejin.cn/post/6905294475539513352#heading-1

src 和 href 都是用来引用外部的资源，他们的区别如下：

- src：表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置。src 会将其指向的资源下载并应用到文档内，如请求 js 脚本。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，所以一般 js 脚本会放在页面底部。
- href：表示超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。当浏览器识别到它指向的文件时，就会并行下载资源，不会停止对当前文档的处理。常用在 a、link 等标签上。

## 2.对 HTML 语义化的理解

https://juejin.cn/post/6905294475539513352#heading-2

语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。通俗来讲就是用正确的标签做正确的事情。

语义化的优点如下：

- 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于 SEO。除此之外，语义类还支持读屏软件，根据文章可以自动生成目录；
- 对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能清晰的看出网页的结构，便于团队的开发与维护。

常见的语义化标签：

```html
<header>头部</header>

<nav>导航栏</nav>

<section>区块（有语义化的div）</section>

<main>主要区域</main>

<article>主要内容</article>

<aside>侧边栏</aside>

<footer>底部</footer>
```

## 4.script 标签中 defer 和 async 的区别

https://juejin.cn/post/6905294475539513352#heading-4

## 6.HTML5 有哪些更新

https://juejin.cn/post/6905294475539513352#heading-6

## 8.行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

https://juejin.cn/post/6905294475539513352#heading-15
