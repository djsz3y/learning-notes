# Configuring Vite

## Config Intellisense

## Conditional Config

## Async Config

## 配置文件使用环境变量 Using Environment Variables in Config【done】

【1】环境变量可以像平常一样，从`process.env`获得。

【2】注意：

- Vite 默认情况下不会加载 `.env` 文件，因为只有在评估 Vite 配置后才能确定要加载的文件。

【3】例如：

- `root` 和 `envDir` 选项会影响加载行为。

【4】但是：

- 如果需要，你可以使用导出的 `loadEnv` 帮助程序，来加载特定的 `.env` 文件。

```js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the 'VITE_' prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    }
  }
})
```
