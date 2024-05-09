import { accountLoginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: any) {
      const loginResult = await accountLoginRequest(account)
      console.log(loginResult.data)

      this.id = loginResult.data.id
      this.token = loginResult.data.token
      this.name = loginResult.data.name
      console.log(this.id)
    }
  }
})

export default useLoginStore
