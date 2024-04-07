import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: HelloWorld
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.view.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
