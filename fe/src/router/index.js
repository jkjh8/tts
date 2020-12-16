import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutDefault from '../components/LayoutDefault.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      layout: LayoutDefault,
      default: Home
    }
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      layout: null,
      default: () => import('../views/Users/Login.vue')
    }
  },
  {
    path: '/register',
    name: 'Register',
    components: {
      layout: null,
      default: () => import('../views/Users/Register.vue')
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    name: 'Error',
    components: {
      layout: null,
      default: () => import('../views/404.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
