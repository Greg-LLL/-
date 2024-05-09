import { accountLoginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.token = loginResult.data.token
      this.name = loginResult.data.name
    }
  }
})

export default useLoginStore
