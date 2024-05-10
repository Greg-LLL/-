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

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  // 如何指定state的类型
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {},
    userMenus: []
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
      this.userInfo = userInfoResult.data

      // 根据角色信息请求用户权限（菜单menus）

      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusResult.data

      // 页面跳转
      router.push('/main')
    }
  }
})

export default useLoginStore
