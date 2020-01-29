import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import About from '../views/About.vue'
import Detail from '../views/Detail.vue'
import Login from '../views/Login.vue'
import DetailFromAbout from '../views/DetailFromAbout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/DetailFromAbout',
    name: 'DetailFromAbout',
    component: DetailFromAbout
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
