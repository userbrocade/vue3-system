import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // createWebHistory 配置路由模式和指向
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

export default router
