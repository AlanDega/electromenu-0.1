import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Welcome from './views/Welcome.vue'
import Drinks from './views/Drinks.vue'
import Foods from './views/Foods.vue'
import Order from './views/Order.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/drinks',
      name: 'drinks',
      component: Drinks
    },
    {
      path: '/foods',
      name: 'foods',
      component: Foods
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
