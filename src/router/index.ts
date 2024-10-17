import { createRouter, createWebHistory } from 'vue-router'

import CrudView from '../views/CrudView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'crud',
      component: CrudView,
    },
  ],
})

export default router
