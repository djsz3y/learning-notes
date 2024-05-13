项目：

CSS 写法：

- BEM 块 元素 修饰符，举例：`notice-bar__wrap`

```css
@keyframes move {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
```

```css
@keyframes mymove {
  0% {
    top: 0px;
    left: 0px;
    background: red;
  }
  25% {
    top: 0px;
    left: 100px;
    background: blue;
  }
  50% {
    top: 100px;
    left: 100px;
    background: yellow;
  }
  75% {
    top: 100px;
    left: 0px;
    background: green;
  }
  100% {
    top: 0px;
    left: 0px;
    background: red;
  }
}
```

在 keyframes 里 `!important` 会被忽略

```css
@keyframes myexample {
  from {
    top: 0px;
  }
  50% {
    top: 100px !important;
  } /* ignored */
  to {
    top: 200px;
  }
}
```

# Vite

## plugins

> 项目使用的插件

- [ ] vue: `@vitejs/plugin-vue`
- [ ] vueSetupExtend: `vite-plugin-vue-setup-extend`
- [ ] createSvgIconsPlugin: `vite-plugin-svg-icons`
- [ ] AutoImport: `unplugin-auto-import/vite`
- [ ] Components: `unplugin-vue-components/vite`

## define

- [x] `"process.env": process.env,`
- [x] VITE_PUBLIC_DATA_JSON: cfppagejson

## server

- [ ] host
- [ ] port
- [ ] proxy

## resolve

- [ ] alias
- [ ] base

## css

- [ ] preprocessorOptions
- [ ] scss

## build

- [ ] outDir
- [ ] target
