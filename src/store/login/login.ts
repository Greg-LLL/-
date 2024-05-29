import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '@/store/main/main'

interface ILoginState {
  token: string
  userInfo: any // 用户信息
  userMenus: any // 用户权限菜单
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  // 如何指定state的类型
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 获取登录信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      // 进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      // 这一步是为了本地存储的时候，避免存储的是响应性的数据，state会将数据变为响应式
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      //

      // 根据角色信息请求用户权限（菜单menus）
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      // 这一步是为了本地存储的时候，避免存储的是响应性的数据，state会将数据变为响应式
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 请求所有的role/department数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 动态获取所有的路由对象
      // const localRoutes: RouteRecordRaw[] = []
      // // 读取router/main当中所有的ts文件
      // const files: Record<string, any> = import.meta.glob(
      //   '../../router/main/**/*.ts',
      //   {
      //     eager: true
      //   }
      // )
      // // 将加载的对象放到localRoutes里面
      // for (const key in files) {
      //   const module = files[key]
      //   localRoutes.push(module.default)
      // }

      // // 根据菜单去匹配正确的路由
      // for (const menu of userMenus) {
      //   for (const submenu of menu.children) {
      //     const route = localRoutes.find((item) => item.path === submenu.url)
      //     if (route) router.addRoute('main', route)
      //   }
      // }

      // 重要：获取登录用户的所有按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 重要：动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 页面跳转
      router.push('/main')
    },
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 请求所有的role/department数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 获取按钮权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        // 动态添加路由=>解决页面刷新，数据丢失
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
