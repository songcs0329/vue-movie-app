import { createRouter, createWebHistory } from 'vue-router'
import MoviesWrap from '@/views/MoviesWrap.vue'
import MovieDetailWrap from '@/views/MovieDetailWrap.vue'

const routes = [
  {
    name: 'MoviesWrap',
    path: '/',
    component: MoviesWrap
  },
  {
    name: 'MovieDetailWrap',
    path: '/detail/:movieCd',
    component: MovieDetailWrap
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router