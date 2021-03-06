import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Router from './router'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  router: Router
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
