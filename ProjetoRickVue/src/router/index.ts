import { createRouter, createWebHistory } from 'vue-router'
import ListagemPersonagensView from '../views/ListagemPersonagensView.vue'
import DetalhesPersonagemView from '@/views/DetalhesPersonagemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'listagem',
      component: ListagemPersonagensView,
    },
    {
    path: '/detalhes/:id', // O :id diz que esse pedaço da URL muda para cada personagem
    name: 'detalhes',
    component: DetalhesPersonagemView,
    props: true // Faz o ID virar uma prop direto na tela de detalhes
    }
  ],
})

export default router
