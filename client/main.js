import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// prep Router
const routes = [
  { path: '/', component: () => import('layouts/mainLayout.vue') },
  { path: '/login', component: () => import('layouts/loginLayout.vue') }
]

// prep Vue
const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes // short for `routes: routes`
})

Vue.config.productionTip = false
Vue.use(VueRouter)

// init Vue
new Vue({
  el: '#happ',
  router,
  render: h => h(App),
})