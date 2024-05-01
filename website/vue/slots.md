# 插槽 Slots

> https://cn.vuejs.org/guide/components/slots.html

## 1.插槽内容与出口（slot content & slot outlet）

- **组件接收 props**，props 为任意类型 JS 值
- 某些场景，**子组件接收模板内容/模板片段，并渲染**。

### `<slot>` 元素：

<img src="./imgs/slots.CKcE8XYd.png" />

- **插槽出口** (slot outlet)
- 父元素的**插槽内容** (slot content) 在哪被渲染。

### 举例：

- [演练场](https://play.vuejs.org/#eNp9Uttu1DAQ/ZXBFSpIm126Fy4hVKJVkeABEPDol6wzCe46tuVLSVXtvzN22m1aVX3znDkzc854bthna+dXEVnJKi+ctAE8hmhPuZa9NS7Al1qL67MYgtHQOtPD8XwxwVLxMdfVYqymOgoC9lbVASkCqCbsDACcKyl20CNUL4oCvDIBhNEBdYCiSBwequkQgqrFoSmbsUcCkvqHM7ejYKFq7z9x1iZ+sQ2as5yn/mnq4nSiwMSg8FZAmj+2eDg6u/PhWqXn/NAVblJTYZRxJRy1bfsxxdta7Dpnom5KUFJj7YrO1Y0km69WJ5sGuxkcrZfN6sMSlpuXFLxdv8O2fT1WG9cgtdNGYwZs3TRSdyVs7AAnb+yQ0b52ndQZnJQVaU70Jby/hUV0PomzRtKeHWH7/GnZCi00ePqAVnbzS280rTMb4kyY3kqF7ocN0mjPWTlaTblaKfPvW8aCizi7w8VfFLsn8Es/JIyznw49uivk7JAL5ALDmL74/R0Heh+SvWmiIvYzyV/ojYpJ40g7o6WT7Akvq/2aT5qW+MdfDHRu/s5UEpqY+8znjG7q/Bnr93JX83Wuo32y/X/8lhnt)

#### 父组件

> App.vue

```html
<script setup>
  import FancyButton from './FancyButton.vue'
</script>

<template>
  <FancyButton>
    Click me!
    <!-- 插槽内容 slot content -->
  </FancyButton>
</template>
```

#### 子组件

> FancyButton.vue

```html
<template>
  <button class="fancy-btn">
    <slot></slot>
    <!-- 插槽出口 slot outlet -->
  </button>
</template>

<style>
  .fancy-btn {
    color: #fff;
    background: linear-gradient(315deg, #42d392 25%, #647eff);
    border: none;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 8px;
    cursor: pointer;
  }
</style>
```

#### 最终渲染出的 DOM：

- 使用插槽，`<FancyButton>` 仅负责渲染外层的 <button> (以及相应的样式)，
- 内部内容：由父组件提供。

```html
<button class="fancy-btn">Click me!</button>
```

### 理解插槽的另一种形式【todo】

理解插槽的另一种方式是和下面的 JavaScript 函数作类比，其概念是类似的：
