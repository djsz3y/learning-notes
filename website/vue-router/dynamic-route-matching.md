# Dynamic Route Matching with Params

## 动态路由
```js
const routes = [
  {
    path: '/users/:id', // dynamic segments start with a colon
    component: {
      template: '<div>User</div>'
    }
  }
] // these are passed to `createRouter`

// Now URLs like /users/johnny and /users/jolyne will both map to the same route.
```

获取动态路由参数

```js
this.$route.params.id
```
