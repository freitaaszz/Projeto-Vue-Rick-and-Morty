import { createRouter, createWebHistory } from 'vue-router'
import ListagemPersonagensView from '../views/ListagemPersonagensView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'listagem',
      component: ListagemPersonagensView,
    },
  ],
})

export default router
