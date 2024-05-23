import { getEntireDepartment, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleResult = await getEntireRoles()
      const departmentResult = await getEntireDepartment()
      this.entireRoles = roleResult.data.list
      this.entireDepartments = departmentResult.data.list
    }
  }
})

export default useMainStore
