# CSS

> 布局  
> 定位  
> 图文样式  
> 响应式  
> CSS3 动画

## 布局

### 盒模型宽度如何计算（一定要会）

【1】css

```css
#div1 {
  width: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px;
}
```

【2】offsetWidth =（ 内容宽度 + 内边距 + 边框 ），无外边距

```js
document.getElementById('div1').offsetWidth // 122px
```

【3】补充：如何让和模型宽度 = 100px ？

- 加 `box-sizing: border-box;`

### margin 纵向重叠问题（重要）

```html
<p>AAA</p>
<p></p>
<p></p>
<p></p>
<p>BBB</p>
```

    • 相邻元素的 margin-top 和 margin-bottom 会发生重叠
    • 空白内容的<p></p>也会重叠

问：AAA 和 BBB 之间的距离为？

1. 相邻元素 margin-top 和 margin-bottom 会发生重叠
2. 空白内容 <p></p> 也会重叠
3. 答：15px;

### margin 负值问题（常用、重要）

    • margin-top 和 margin-left 负值，元素向上、向左移动
    • margin-right 负值，右侧元素左移，自身不受影响
    • margin-bottom 负值，下方元素上移，自身不受影响

### BFC 理解与应用（常考概念）

#### 什么是 BFC？

Block format context，块级格式化上下文
一块独立渲染区域，内部元素的渲染不会影响边界以外的元素（概念要理解）

#### 形成 BFC 的条件

（回忆，会 2/3 可以，一点不会就不行）

        • float 不是 none
        • position 是 absolute 或 fixed
        • overflow 不是 visible
        • display 是 flex、inline-block 等

#### BFC 的常见应用

清除浮动

- BFC 实际用例，体现 BFC 设计目的

```css
.left {
  float: left;
}
.bfc {
  overflow: hidden; /* 触发元素的 BFC */
}
```

1. 容器加上 bfc，浮动元素图片不在 container 容器范围内；
2. 加上 bfc，img 浮动元素图片就在 container 容器范围内了，就会把容器撑大。

### float 布局（常考，工作维护 PC 页面用）

#### 圣杯布局 & 双飞翼布局

##### 手写代码

##### 技术总结

    • 使用 float 布局
    • 两侧使用 margin 负值，以便和中间内容横向重叠（重要，多看）
    • 防止中间内容被两侧覆盖，一个用 padding，一个用 margin

##### 目的

    • 三栏布局，中间一栏最先加载和渲染（内容最重要）
    • 两侧内容固定，中间内容随着宽度自适应
    • 一般用于 PC 网页

#### 手写 clearfix（快速准确写出来 10s 内）

```css
.clearfix {
  zoom: 1; /* 兼容 IE 低版本 */
}
.clearfix:after {
  content: '';
  display: table;
  clear: both;
}
```

### flex 布局：

#### flex 实现一个三点的骰子（非常非常重要）

#### 常用语法

    1. flex-direction: 主轴 横向、纵向
    2. justify-content: 主轴 对齐方式：开始、结束、居中、两边对齐。
    3. align-items: 交叉轴（垂直主轴）对齐方式：开始、结束、居中对齐
    4. flex-wrap: 是否换行
    5. align-self: 子元素在交叉轴的对齐方式 开始、结束、居中对齐

## 定位

### absolute 和 relative 定位分别依据什么定位

    • relative依据自身定位（对外界不会有任何影响）
    • absolute依据最近一层的定位元素定位（向上找最近父元素直到找到定位元素的定位）（要明白）

#### 定位元素

    • absolute relative fixed
    • Body

### 居中对齐的实现方式（最重要内容之一）

#### 水平居中

    • inline 元素：text-align: center;
    • block 元素：margin:auto（非常常用）
    • absolute 元素：left: 50% + margin-left 负值

#### 垂直居中

    • inline 元素：line-height 的值等于 height 值
    • absolute 元素：top: 50% + margin-top 负值（子元素必须知道宽高）
    • absolute 元素：transform(-50%,-50%)（不必知道子元素宽高）
    • absolute 元素：top，left，bottom，right = 0 + margin: auto（终极：不必知道子元素宽高）（重点掌握，90%考）

## 图文样式

### line-height 如何继承

    • 写具体数值，如 30px，则继承该值（比较好理解）
    • 写比例，如 2/1.5，则继承该比例（比较好理解）
    • 写百分比，如 200%，则继承计算出来的值（考点）（要敏感）

## 响应式

### rem 是什么

    rem 是一个长度单位
    • px，绝对长度单位，最常用
    • em，相对长度单位，相对于父元素，不常用
    • rem，相对长度单位，相对于根元素，常用于响应式布局 `html {font-size: 100px;}`

### 响应式布局的常用方案

    • media-query，根据不同的屏幕宽度设置根元素 font-size（之前 iPhone6 演示过）详见代码
    • rem，基于根元素的相对单位（回顾）

## CSS3 动画

    关于 CSS3 动画（前面全部是重点）（面试 1h。40min：JS 面试题；20min：CSS 面试题）
    • 并不是面试的重点，除非你面试是一个专门做动画的职位
