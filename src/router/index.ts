import { createRouter, createWebHistory } from 'vue-router'
import LDefault from '../layouts/LDefault.vue'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: LDefault,
    children: [
        {
            path: '/',
            name: 'home',
            component: ()=> import('../views/HomeView.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: ()=> import('../views/PAbout.vue')
        }
    ]
  },
  {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/PError.vue'),
    },
]

const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router
