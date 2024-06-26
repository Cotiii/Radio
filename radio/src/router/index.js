import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Rimuovi l'importazione di ContattiView.vue

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/preferiti',
    name: 'preferiti',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FavoritesView.vue')
  },{
    path: '/mappamondo',
    name: 'mappamondo',
    component: () => import(/* webpackChunkName: "about" */ '../views/mappamondo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
