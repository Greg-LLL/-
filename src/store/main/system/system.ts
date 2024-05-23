import {
  deleteUserById,
  postUsersListData,
  newUserData,
  editUserData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'

interface ISystemState {
  usersList: any[]
  usersTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      // 自己的优化
      // if (deleteResult.code === 0) {
      //   // 重新请求数据
      //   alert('操作成功')
      //   this.postUsersListAction({ offset: 0, size: 10 })
      // } else {
      //   alert('该数据无法被删除')
      // }

      // 重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    // 新建用户
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await newUserData(userInfo)
      // 重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    // 编辑用户
    async editUserDataAction(id: number, userInfo: any) {
      // 更新用户数据
      const editResult = await editUserData(id, userInfo)
      // 重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
