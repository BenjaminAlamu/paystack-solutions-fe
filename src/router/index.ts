import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/Register.vue')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: '/shop',
        name: 'shop',
        component: () => import('../views/Shop.vue')
      },
      {
        path: '/confirmation',
        name: 'confirmation',
        component: () => import('../views/OrderConfirmation.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue')
      },
      {
        path: '/track',
        name: 'track',
        component: () => import('../views/Track.vue')
      },
      {
        path: '/driver',
        name: 'driver',
        component: () => import('../views/DriverFlow.vue')
      },
    ]
  })
  
  export default router