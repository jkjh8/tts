import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutDefault from '../components/Layout/LayoutDefault.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Status',
    components: {
      layout: LayoutDefault,
      default: () => import('../views/Status.vue')
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
    path: '/account',
    name: 'Account',
    components: {
      layout: LayoutDefault,
      default: () => import('../views/Users/Account.vue')
    }
  },
  {
    path: '/eventlog',
    name: 'Eventlog',
    components: {
      layout: LayoutDefault,
      default: () => import('../views/Eventlog.vue')
    }
  },
  {
    path: '/audiofiles',
    name: 'Audiofiles',
    components: {
      layout: LayoutDefault,
      default: () => import('../views/Audiofiles.vue')
    }
  },
  {
    path: '/playlist',
    name: 'Playlist',
    components: {
      layout: LayoutDefault,
      default: () => import('../views/Playlist.vue')
    }
  },
  {
    path: '/player',
    name: 'Player',
    components: {
      layout: LayoutDefault,
      default: () => import('../views/Player.vue')
    }
  },
  {
    path: '/scheduler',
    name: 'Scheduler',
    components: {
      layout: LayoutDefault,
      default: () => import('../views/Scheduler.vue')
    }
  },
  {
    path: '/utilities',
    name: 'Utilities',
    components: {
      layout: LayoutDefault,
      default: () => import('../views/Utilities.vue')
    }
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
