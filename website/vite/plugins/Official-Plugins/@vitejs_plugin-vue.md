# @vitejs/plugin-vue

> 注意：从 vue 3.2.13+ 和 `@vitejs/plugin-vue` 1.9.0+ 开始，`@vue/compiler-sfc` 不再作为必须的对等依赖项。

```js
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [vue()]
}
```

对于 JSX/TSX 支持，还需要 [@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx)

## 选项 Options

```ts
export interface Options {
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]

  isProduction?: boolean

  // 传递给 vue/compiler-sfc 的选项
  script?: Partial<
    Omit<
      SFCScriptCompileOptions,
      | 'id'
      | 'isProd'
      | 'inlineTemplate'
      | 'templateOptions'
      | 'sourceMap'
      | 'genDefaultAs'
      | 'customElement'
      | 'defineModel'
    >
  >

  template?: Partial<
    Omit<
      SFCTemplateCompileOptions,
      | 'id'
      | 'source'
      | 'ast'
      | 'filename'
      | 'scoped'
      | 'slotted'
      | 'isProd'
      | 'inMap'
      | 'ssr'
      | 'ssrCssVars'
      | 'preprocessLang'
    >
  >
  style?: Partial<
    Omit<
      SFCStyleCompileOptions,
      | 'filename'
      | 'id'
      | 'isProd'
      | 'source'
      | 'scoped'
      | 'cssDevSourcemap'
      | 'postcssOptions'
      | 'map'
      | 'postcssPlugins'
      | 'preprocessCustomRequire'
      | 'preprocessLang'
      | 'preprocessOptions'
    >
  >

  /**
   * 把 Vue SFC 转换自定义元素。
   * - `true`：所有的 `*.vue` 导入都会转换为自定义元素；
   * - `string | RegExp`：匹配的文件被转换为自定义元素
   *
   * @default /\.ce\.vue$/
   */
  customElement?: boolean | string | RegExp | (string | RegExp)[]

  /**
   * 使用自定义编译器sfc实例。可用于强制使用特定版本。
   */
  compiler? typeof _compiler
}
```

## 资产 URL 处理 Asset URL handling

当 `@vitejs/plugin-vue` 编译 SFC 里的 `<template>` 块时，它也会把所有遇到的静态 URL 转换为 ESM imports。

例如，如下的模板片段：

```html
<img src="../image.png" />
```

和以下一样：

```html
<script setup>
  import _imports_0 from '../image.png'
</script>

<img :src="_imports_0" />
```

默认情况下，将转换以下标签/属性组合，并且将会使用 `template.transformAssetUrls` 选项进行配置：

```js
{
  video: ['src', 'poster'],
  source: ['src'],
  img: ['src'],
  image: ['xlink: href', 'href'],
  use: ['xlink:href', 'href']
}
```

注意只有静态字符串的属性值会被转换。否则，你需要手动导入资产，例如，`import imgUrl from '../image.png'`。

## 给 `vue/compiler-sfc`传递选项的例子，Example for passing options to vue/compiler-sfc

```js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // ...
        },
        transformAssetUrls: {
          // ...
        }
      }
    })
  ]
}
```

## 转换自定义块的例子 Example for transforming custom blocks

【1】vite 配置

> vite.config.ts/js

```js
import vue from '@vitejs/plugin-vue'
import yaml from 'js-yaml'

const vueI18nPlugin = {
  name: 'vue-i18n',
  transform(code, id) {
    // 如果 .vue 文件没有 <i18n> 块，则返回
    if (!/vue&type=i18n/.test(id)) {
      return
    }
    // 解析 yaml
    if (/\.ya?ml$/.test(id)) {
      code = JSON.stringify(yaml.load(code.trim()))
    }
    // 将值挂载到组件实例的i18n的属性上
    return `export default Comp => {
      Comp.i18n = ${code}
    }`
  }
}

export default {
  plugins: [vue(), vueI18nPlugin]
}
```

【2】创建一个名为 `Demo.vue` 的文件，在 <i18n> 块中添加 `lang="yaml"`，然后就可以使用 `YAML` 的语法了：

> Demo.vue

```vue
<template>Hello</template>

<i18n lang="yaml">
message: 'world'
fullWord: 'hello world'
</i18n>
```

【3】message 被挂载在组件实例的 i18n 属性上，你可以像这样使用：

```html
<script setup lang="ts">
  import Demo from 'components/Demo.vue'
</script>

<template>
  <Demo /> {{ Demo.i18n.message }}
  <div>{{ Demo.i18n.fullWord}}</div>
</template>
```

### 解释

这个例子展示了如何创建一个 Vite 插件，用于转换 Vue 单文件组件中的自定义块。在这个例子中，它转换了 Vue 组件中的 <i18n> 块。

具体来说，例子做了以下几件事情：

1. 导入插件：示例中导入了 @vitejs/plugin-vue 来处理 Vue 单文件组件，以及 js-yaml 来解析 YAML 内容。

2. 自定义插件定义：vueI18nPlugin 对象定义了一个 Vite 插件，其中包含一个 transform 方法。这个方法接收正在转换的模块的代码和 ID。

3. 转换逻辑：

- 如果模块不是 Vue 单文件组件中的 <i18n> 块，则插件提前返回。
- 如果模块是一个 YAML 文件（通过文件扩展名 .yaml 或 .yml 来识别），则将 YAML 内容解析为 JSON 格式。
- 最后，转换后的代码将解析的内容挂载到 Vue 组件实例的 i18n 属性上。

4. 导出插件配置：导出的对象包含了 Vite 配置，其中包括 plugins 数组，其中包含了 @vitejs/plugin-vue 和自定义的 vueI18nPlugin。

这个例子展示了如何创建一个自定义的 Vite 插件，用于转换 Vue 单文件组件中的特定自定义块，比如 <i18n> 块，以增强开发工作流程，并自定义 Vue 组件的行为。

## 使用 Vue SFC 作为自定义元素 Using Vue SFCs as Custom Elements

> 要求 `vue@^3.2.0` & `@vitejs/plugin-vue@^1.4.0`

1. Vue 3.2 引入了与 SFC 一起使用的 `defineCustomElement` 方法。

2. 默认情况下，SFC 里的 `<style>` 标签在构建过程中提取并合并到 CSS 文件中。

3. 然而，当发布自定义元素库时，可能需要将样式内联为 JavaScript 字符串，以及把他们注入到自定义元素影子根中替代。

4. 从 1.4.0 开始，以 `*.ce.vue` 结尾的文件将在自定义元素模式下编译，它的 `<style>` 标签被编译为内联 CSS 字符串，并作为它的 `styles` 属性附加到组件里。

```js
import { defineCustomElement } from 'vue'
import Example from './Example.ce.vue'

console.log(Example.styles) // ['/* css content */']

// register
customElements.define('my-example', defineCustomElement(Example))
```

注意：自定义元素模式，不需要使用 `<style scoped>`，因为 CSS 已经在影子 DOM 的作用域之内了。

`customElement` 插件选项，可用于配置行为：

- `{ customElement: true }` 将以自定义模式，导入所有的 `*.vue` 文件；
- 使用字符串或者正则表达式模式 来更改文件作为自定义元素加载的方式（这个检查在 `include` 和 `exclude` 匹配之后应用）。

## 执照 License

MIT

# 参考链接

- [vitejs/vite-plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue)
