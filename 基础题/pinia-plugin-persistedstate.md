# 持久化存储 pinia-plugin-persistedstate

> 持久化存储

> Highly customisable with custom storage, customer serializer, paths picking...

- 自定义存储
- 客户序列化器
- 路径选择
- 高度可定制
- 兼容所有使用 pinia 的设备
- 压缩后的微小的包小于 1kB

## 1.安装

### 1）pnpm：

```bash
pnpm i pinia-plugin-persistedstate
```

### 2）npm：

```bash
npm i pinia-plugin-persistedstate
```

### 3）yarn：

```bash
yarn add pinia-plugin-persistedstate
```

## 2.添加配置到 pinia

> @/store/index.ts

```diff
/**
 * 应用程序的主要商店。
 * 它使用 Pinia 进行状态管理，并使用 pinia-plugin-persistedstate 启用持久状态。
 * @comment
 * 该存储作为默认导出，并且应安装在应用程序的入口文件中。
 * @example
 * import { createApp } from 'vue'
 * import App from './App.vue'
 * import store from './store'
 *
 * const app = createApp(App)
 * app.use(store)
 * app.mount('#app')
 *
 * @see {@link https://pinia.esm.dev/} 了解有关 Pinia 的更多信息。
 * @see {@link https://www.npmjs.com/package/pinia-plugin-persistedstate} 了解有关 pinia-plugin-persistedstate 的更多信息。
 */
+ import { createPinia } from "pinia";
+ import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

+ const pinia = createPinia();
+ pinia.use(piniaPluginPersistedstate);
```

## 3.配置 `persist` 为 `true` 在要持久化存储的文件中：

```diff
import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      someState: "hello pinia",
    };
  },
+  persist: true, // 配置
});
```

## 4.Configuration

> 上下对比

你可以通过给 persist 属性指定 options 选项，来配置一个 store 的持久化的方式：

```diff
import { defineStore } from "pinia";

+ export const useStore = defineStore("store", {
+   state: () => {
+     return {
+       someState: "hello pinia",
+     };
+   },
  persist: {
    // persist 配置
    storage: sessionStorage,
    paths: ["someState"],
  },
+ });
```

或者：

```diff
import { defineStore } from "pinia";
+ import { ref } from "vue";

export const useStore = defineStore(
  "store",
+   () => {
+     const someState = ref("hello pinia");
+     return { someState };
+   },
+   {
    persist: {
      // persist 配置同上
      storage: sessionStorage,
      paths: ["someState"],
    },
+   }
);
```

## 5.所有可用的配置选项

> [Configuration](https://prazdevs.github.io/pinia-plugin-persistedstate/guide/config.html)
