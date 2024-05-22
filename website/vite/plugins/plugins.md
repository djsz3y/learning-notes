# Plugins

注意：

## 官方插件 Official Plugins【】

[@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue) 【使用过】【done】

- 提供 Vue3 单文件组件支持。

[@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx)

- 提供 Vue3 JSX 支持（通过专用的 Babel 变换：[dedicated Babel transform](https://github.com/vuejs/babel-plugin-jsx)）

[@vitejs/plugin-vue2]()

- 提供 Vue 2.7 单文件组件支持。

[@vitejs/plugin-vue2-jsx]()

- 提供 Vue 2.7 JSX 支持（通过专用的 Babel 变换：[dedicated Babel transform](https://github.com/vuejs/jsx-vue2/)）

[@vitejs/plugin-react]()

- 使用 esbuild 和 Babel，以较小的封装占用空间 和 能使用 Babel 转换管道的灵活性，来实现快速的 HMR 热更新。

- 没有额外的Babel插件，构建期间过程中，仅使用esbuild。

[@vitejs/plugin-react-swc]()

- Replaces Babel with SWC during development. During builds, SWC+esbuild are used when using plugins, and esbuild only otherwise. For big projects that don't require non-standard React extensions, cold start and Hot Module Replacement (HMR) can be significantly faster.

[@vitejs/plugin-legacy]()

- Provides legacy browsers support for the production build.

## Community Plugins

- Check out awesome-vite - you can also submit a PR to list your plugins there.

## Rollup Plugins

- Vite plugins are an extension of Rollup's plugin interface. Check out the Rollup Plugin Compatibility section for more information.