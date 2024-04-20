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

1

https://juejin.cn/post/6905294475539513352#heading-1

src 和 href 都是用来引用外部的资源，它们的区别如下：

src：表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置。src 会将其指向的资源下载并应用到文档内，如请求 js 脚本。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，所以一般 js 脚本会放在页面底部。

href：表示超文本引用，它指向一些网络资源，建立和当前元素或文本文档的链接关系。当浏览器识别到它指向的文件时，就会并行下载资源，不会停止对当前文档的处理。常用在 a、link 等标签上。

## 2.对 HTML 语义化的理解

1

https://juejin.cn/post/6905294475539513352#heading-2

语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。通俗来讲就是用正确的标签做正确的事情。

语义化的优点如下：

- 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于 SEO。除此之外，语义类还支持读屏软件，根据文章可以自动生成目录；
- 对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能清晰的看出网页的结构，便于团队的开发与维护。

常见的语义化标签：

header nav section main article aside footer

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

1

https://juejin.cn/post/6905294475539513352#heading-4

如果没有 defer 或 async 属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就组赛了后续文档的加载。

下图可以直观的看出三者之间的区别：

defer 和 async 属性都是去异步加载外部的 JS 脚本文件，它们都不会阻塞页面的解析，其区别如下：

- 执行顺序：多个带 async 属性的标签，不能保证加载的顺序；多个带 defer 属性的标签，按照加载顺序执行；

- 脚本是否并行执行：async 属性，表示后续文档的加载和执行与 js 脚本的加载和执行是并行进行的，即异步执行；defer 属性，加载后续文档的过程和 js 脚本的加载（此时仅加载不执行）是并行进行的（异步），js 脚本需要等到文档所有元素解析完成之后才执行，DOMContentLoaded 事件触发执行之前。

## 6.HTML5 有哪些更新

1

https://juejin.cn/post/6905294475539513352#heading-6

1.语义化标签

- header 定义文档的页眉（头部）；
- nav：定义导航链接的部分；
- footer：定义文档或节的页脚（底部）；
- article：定义文章内容；
- section：定义文档中的节（section、区段）；
- aside：定义其所处内容之外的内容（侧边）；

  2.媒体标签

（1）audio：音频

```html
<audio src="" controls autoplay loop="true"></audio>
```

属性：

controls 控制面板
autoplay 自动播放
loop='true' 循环播放

（2）video 视频

```html
<video src="" poster="imgs/aa.jpg" controls></video>
```

属性：

- poster：指定视频还没有完全下载完毕，或者用户还没有点击播放前显示的封面。默认显示当前视频文件的第一针画面，当然通过 poster 也可以自己指定。
- controls：控制面板
- width
- height

（3）source 标签 因为浏览器对视频格式支持晨读不一样，为了能够兼容不同的浏览器，可以通过 source 来指定视频源。

```html
<video>
  <source src='aa.flv' type='video/flv'></source>
  <source src='aa.mp4' type='video/mp4'></source>
</video>
```

3.表单

表单类型：

email：能够验证当前输入的邮箱地址是否合法
url：验证 URL
number：只能输入数字，其他输入不了，而且自带上下增大减小箭头，max 属性可以设置为最大值，min 可以设置为最小值，value 为默认值。
search：输入框后面会给提供一个小叉，可以删除输入的内容，更加人性化。
range：可以提供给一个范围，其中可以设置 max 和 min 以及 value，其中 value 属性可以设置为默认值
color：提供了一个颜色拾取器
time：时分秒
data：时分秒
data：日期选择年月日
datatime：时间和日期（目前只有 Safari 支持）
datatime-local：日期时间控件
week：周控件
month：月控件

表单属性：

placeholder：提示信息
autofocus：自动获取焦点
autocomplete="on" 或者 autocomplete="off" 使用这个属性需要有两个前提：
表单必须提交过
必须有 name 属性。

required：要求输入框不能为空，必须有值才能够提交。
pattern="" 里面写入想要的正则模式，例如手机号 patte="^(+86)?\d{10}$"
multiple：可以选择多个文件或者多个邮箱
form="form 表单的 ID"

表单事件：

oninput 每当 input 里的输入框内容发生变化都会触发此事件。
oninvalid 当验证不通过时触发此事件。

4.进度条、度量器

progress 标签：用来表示任务的进度（IE、Safari 不支持），max 用来表示任务的进度，value 表示已完成多少

meter 属性：用来显示剩余容量或剩余库存（IE、Safari 不支持）

high/low：规定被视作高/低的范围
max/min：规定最大/小值
value：规定当前度量值

设置规则：min < low < high < max

5.DOM 查询操作

document.querySelector()
document.querySelectorAll()

它们选择的对象可以是标签，可以是类（需要加点），可以是 ID（需要加#）

6.Web 存储

HTML5 提供了两种在客户端存储数据的新方法：

localStorage - 没有时间限制的数据存储
sessionStorage - 针对一个 session 的数据存储

7.其他

- 拖放：拖放是一种常见的特性，即抓取对象以后拖到另一个位置。设置元素可拖放：

```html
<img draggable="true" />
```

- 画布（canvas）：canvas 元素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，可以控制其每一像素。canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

SVG：SVG 指可伸缩矢量图形，用于定义用于网络的基于矢量的图形，使用 XML 格式定义图形，图像在放大或改变尺寸的情况下其图形质量不会有损失，它是万维网联盟的标准

地理定位：Geolocation（地理定位）用于定位用户的位置。

总结：（1）新增语义化标签：nav、header、footer、aside、section、article（2）音频、视频表亲啊：audio、video（3）数据存储：localStorage、sessionStorage（4）canvas（画布）、Geolocation（地理定位）、websocket（通信协议）（5）input 标签新增属性：placeholder、autocomplete、autofocus、required（6）history API：go、forward、back、pushstate

移除的元素：

- 纯表现的元素：basefont，big，center，font，s，strike，tt，u；
- 对可用性产生负面影响的元素：frame，frameset，noframes；

## 8.行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

1

https://juejin.cn/post/6905294475539513352#heading-15

行内元素： a b span img input select strong
块级元素：div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p

空元素，即没有内容的 HTML 元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签：

常见的有： <br> <hr> <img> <input> <link> <meta>
鲜见的有：<area> <base> <col> <colgroup> <command> <embed> <keygen> <param> <source> <track> <wbr>
