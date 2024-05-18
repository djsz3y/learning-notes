# root

# base

# mode

# define【done】

> Type: Record<string, any>

【1】定义全局常量替换：

- 开发 dev 期间：条目将会被定义**全局常量**
- 构建 build 期间：条目将会被定义**静态替换**

【2.1】Vite 使用 esbuild defines 来执行替换，因此值表达式必须是**包含 JSON 可序列化的值的字符串或者单个标识**。

【2.2】对于不是字符串值的，**Vite 会自动使用 `JSON.stringify` 转换为字符串**。

【3】例如：

```js
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __API_URL__: 'window.__backend_api_url'
  }
})
```

【4.1】注意：

> 对于 TS 用户，**确保添加了类型声明**（在 `env.d.ts` 或者 `vite-env.d.ts` 文件里），**来获取类型检查和智能感知**。

【4.2】例如：

```ts
// vite-env.d.ts
declare const __APP_VERSION__: string
```