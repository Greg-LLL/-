import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系：patch=>component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
// 参数：to(跳转到的位置)/from(从哪里跳转过来)
// 返回值：返回值决定导航的路径（不返回或者返回underfined,默认跳转）
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    // 只有登录成功才能进入到main页面
    return '/login'
  }
})

export default router
