import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ServiceCategory from '../views/ServiceCategory.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:categoryId',
    name: 'ServiceCategory',
    component: ServiceCategory,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

