import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import('@/views/Recommend')
  },
  {
    path: '/singer',
    component: () => import('@/views/Singer'),
    children:[
      {
        path: ':id',
        component: ()=>import('@/views/SingerDetail')
      }
    ]
  },
  {
    path: '/toplist',
    component: () => import('@/views/TopList')
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
