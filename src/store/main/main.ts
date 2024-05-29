import { getEntireDepartment, getEntireRoles } from '@/service/main/main'
import { getEntireMenus } from '@/service/main/system/system'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleResult = await getEntireRoles()
      const departmentResult = await getEntireDepartment()
      const menuResult = await getEntireMenus()
      console.log(menuResult)

      this.entireRoles = roleResult.data.list
      this.entireDepartments = departmentResult.data.list
      this.entireMenus = menuResult.data.list
    }
  }
})

export default useMainStore
