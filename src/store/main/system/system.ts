import {
  deleteUserById,
  postUsersListData,
  newUserData,
  editUserData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'

interface ISystemState {
  usersList: any[]
  usersTotalCount: number
  pageList: any[]
  pageTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
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
    },

    // 针对页面的数据：增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },

    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      // 重新请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },

    async newPageDataAction(pageName: string, pageInfo: any) {
      const pageResult = await newPageData(pageName, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editPageResult = await editPageData(pageName, id, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
