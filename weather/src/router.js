import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Find from './views/Find.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:'/find',
      name:'find',
      component: Find
    }
  ]
})
