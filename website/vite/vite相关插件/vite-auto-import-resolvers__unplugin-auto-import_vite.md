# vite-auto-import-resolvers

> unplugin-auto-import/vite

## 推荐：

[unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)

- 其已经内置 dirs 选项，推荐优先使用

- 它的`vite resolvers`，主要处理 vite 项目本身的 api 按需自动引入。

## 目的

- 按需自动引入指定目录下模块的 api

## 基本使用

### 1.安装

```js
npm i vite-auto-import-resolvers unplugin-auto-import -D
```

### 2.配置插件

```js
// vite.config.js
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver, DirResolverHelper } from 'vite-auto-import-resolvers'

export default defineConfig({
  plugins: [
    Vue(),
    // 该辅助插件也是必须的 👇
    DirResolverHelper(),
    AutoImports({
      imports: ['vue'],
      resolvers: [dirResolver()]
    })
  ]
})
```

### 3.之后 `src/composables` 下模块的默认导出将在项目中自动按需引入

例如：

> src/composables/foo.ts

```ts
// src/composables/foo.ts
export default 100
```

> src/App.vue

```vue
<script setup>
console.log(foo) // 输出100，而且是按需自动引入的
</script>
<template>Hello World!!</template>
```

## 进阶

### 强制前缀与后缀

```js
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver, DirResolverHelper } from 'vite-auto-import-resolvers'

export default defineConfig({
  plugins: [
    Vue(),
    DirResolverHelper(),
    AutoImports({
      imports: ['vue'],
      resolvers: [
        dirResolver({ prefix: 'use' }), // 强制前缀为 use
        dirResolver({
          target: 'src/stores', // 目标目录，默认为 'src/composables'
          suffix: 'Store' // 强制后缀为 Store
        })
      ]
    })
  ]
})
```

于是

- `src/composables` 下只有 `use` 开头的模块会被按需加载
- `src/stores` 下只有 `Store` 结尾的模块会被按需加载

例如：

> src/stores/counterStore.ts

```ts
const counter = ref(100)

export default () => {
  const inc = (v: number = 1) => (counter.value += v)
  return {
    inc,
    counter
  }
}
```

```vue
<script setup lang="ts">
// 这将按需自动引入
const n = counterStore()
</script>

<template>
  <div @click="n.inc()">{{ n.counter }}</div>
</template>
```

### 包含与排除

```ts
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver, DirResolverHelper } from 'vite-auto-import-resolvers'

export default defineConfig({
  plugins: [
    Vue(),
    DirResolverHelper(),
    AutoImports({
      imports: ['vue'],
      resolvers: [
        dirResolver({
          prefix: 'use',
          include: ['foo'], // 即使 foo 模块不是以 use 开头也会被包含进来
          exclude: ['useBar'] // useBar 模块将始终被排除
        })
      ]
    })
  ]
})
```

### 规范路径

通过 `normalize` 可以控制最终路径的生成

```ts
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver, DirResolverHelper } from 'vite-auto-import-resolvers'

export default defineConfig({
  plugins: [
    Vue(),
    DirResolverHelper(),
    AutoImports({
      imports: ['vue'],
      resolvers: [
        dirResolver({
          normalize({ path, target, name }) {
            return path
          }
        })
      ]
    })
  ]
})
```

### 自动生成按需 `api` 预设

在使用 `unplugin-auto-imports` 时，需要手动管理 `imports` 👇

```ts
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImports({
      imports: ['vue', 'vue-router', 'pinia'] // 手动管理
    })
  ]
})
```

但有时，需要变动一些依赖，例如将 `pinia` 换成 `vuex` ，
这时如果配置未更改就会发生错误。
同时，如果你设置了未安装的包，这将造成无谓的性能消耗。

所以可以这样 👇

```ts
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { AutoGenerateImports } from 'vite-auto-import-resolvers'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImports({
      imports: AutoGenerateImports() // 自动管理，只有加载相应的包后，才会按需自动设置预设
    })
  ]
})
```

#### 默认支持列表

`include`

- vue
- pinia
- vuex
- vitest
- vue-i18n
- vue-router
- @vueuse/core
- @vueuse/head
- @nuxtjs/composition-api
- preact
- quasar
- react
- react-router
- react-router-dom
- svelte
- svelte/animate
- svelte/easing
- svelte/motion
- svelte/store
- svelte/transition
- vitepress
- vee-validate

`exclude`

```ts
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { AutoGenerateImports } from 'vite-auto-import-resolvers'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImports({
      imports: AutoGenerateImports({
        exclude: ['pinia'] // Pinia will always be excluded
      })
    })
  ]
})
```

## Inspire 🐳

The resolvers comes from the issue discussion of unplugin-auto-import 👉 [How should I auto import composition functions](https://github.com/unplugin/unplugin-auto-import/issues/76)。

## More 🐃

More project engineering practices，you can be see 👉 [tov-template](https://github.com/dishait/tov-template)

## License 🐸

Made with [markthree](https://github.com/markthree)

Published under [MIT License](https://github.com/dishait/vite-auto-import-resolvers/blob/main/LICENSE).

# 参考链接

- [vite-auto-import-resolvers](https://github.com/dishait/vite-auto-import-resolvers)
