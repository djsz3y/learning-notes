# Getting Started

When adding Vue Router to the mix,all we need to do is map our components to the routes and let Vue Router know where to render them.

## HTML

`<router-link to="/">Go to Home</router-link>`:change the URL without reloading the page, handle URL generation as well as its encoding.
`<router-view></router-view>` will display the component that corresponds to the url.

## JavaScripts

```js
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(), // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  routes: [
    {
      path: '/',
      component: { template: '<div>Home</div>' } // 1. Define route components.
    },
    {
      path: '/component',
      component: { template: '<div>Component</div>' } // 1. Define route components.
    }
  ] // 2. Define some routes
}) // 3. Create the router instance and pass the `routes` option

// 5. Create and mount the root instance.
Vue.createApp({}).use(router).mount('#app')
// Now the app has started!

// this.$router
// this.$route
```
