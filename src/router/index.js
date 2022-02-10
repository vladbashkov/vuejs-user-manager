import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/:id',
    name: 'User-page',
    component: () => import('../components/User-page.vue')
  },
  {
    path: '/info/:id',
    name: 'User-info-page',
    component: () => import('../components/UserInfoPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
