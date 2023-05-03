### Vue Router

Vue Router 官方文档阅读笔记

[返回学习笔记目录](/README.md)

#### Setup

- Introduction

- Installation

#### Essentials

- [Getting Started](/website/vue-router/getting-started.md)

- [Dynamic Route Matching](/website/vue-router/dynamic-route-matching.md)

- Routes' Matching Syntax

- Nested Routes

- Programmatic Navigation

- Named Routes

- Named Views

- Redirect and Alias

  - **三种 redirect 方式**：

    1. 路径路由重定向（path）：`redirect: '/b'`
    2. 命名路由重定向（named route）：`redirect: { name: 'foo' }`
    3. 使用函数动态重定向（use a function for dynamic redirecting）：`redirect: (to) => {}`

    ```js
    const router = new VueRouter({
      routes: [
        {
          path: '/a',
          // redirect: '/b', // 1
          // redirect: { name: 'foo' }, // 2
          redirect: (to) => {
            // 参数to目标路由
            if (to.params.id === '3') {
              return '/user/:id/profile'
            } else {
              return '/user/:id/posts' // 返回重定向路径/位置
            }
          }, // 3
          children: [{ path: '', component: UserHome }] // 孩子如果配置path为空字符串，重定向将会不管用。
        }
      ]
    })
    ```

    【思考】：第三种使用函数动态重定向，可以应用于此页面展示用户的个人中心，但用户角色不同而布局不同的情况。  
    【注意】：孩子如果配置 path 为空字符串，重定向将会不管用。

  - **五种 alias 方式**：

    1. 绝对别名：`alias: '/absolute-alias'`
    2. 相对别名：`alias: 'relative-alias'`
    3. 多个别名：`alias: ['/multiple-alias-1', 'multiple-alias-2']`
    4. 空字符串作别名的默认子路由：`alias: ''`
    5. 嵌套别名: `alias: 'nested-alias',children: [{ path: 'foo', component: NestedFoo }]`

    ```js
    const router = new VueRouter({
      routes: [
        {
          path: '/home',
          component: Home,
          children: [
            {
              path: 'absolute',
              component: Absolute,
              alias: '/absolute-alias' // 1. 绝对别名：
            },
            {
              path: 'relative',
              component: Relative,
              alias: 'relative-alias' // 2. 相对别名：relative alias (alias to /home/relative-alias)
            },
            {
              path: 'multiple',
              component: Multiple,
              alias: ['/multiple-aliases-1', 'multiple-aliases-2'] // 3. 多个别名：multiple-aliases(alias to /multiple-aliases-1 and /home/multiple-aliases-2)
            },
            { path: 'default', component: Default, alias: '' }, // 4. 空字符串作别名的默认子路由：
            {
              path: 'nested',
              component: Nested,
              alias: 'nested-alias', // 5. 嵌套别名:
              children: [{ path: 'foo', component: NestedFoo }]
            }
          ]
        }
      ]
    })
    ```

- Passing Props to Route Components

- Different History modes

#### Advanced

- Navigation guards

- Route Meta Fields

- Data Fetching

- Composition API

- Transitions

- Scroll Behavior

- Lazy Loading Routes

- Typed Routes

- Extending RouterLink

- Navigation Failures

- Dynamic Routing
