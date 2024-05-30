<template>
  <div class="content">
    <div class="hearder">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" v-if="isCreate" @click="handleNewUserClick"
        >新建数据</el-button
      >
    </div>

    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column
          align="center"
          type="selection"
          width="50px"
        ></el-table-column>
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        ></el-table-column>
        <el-table-column
          align="center"
          label="用户名"
          prop="name"
          width="150px"
        ></el-table-column>
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        ></el-table-column>
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        ></el-table-column>
        <el-table-column align="center" label="状态" width="100px">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateAt" align="center">
          <template #default="{ row }">
            {{ formatUTC(row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px" align="center">
          <template #default="scope">
            <el-button
              v-if="isUpdate"
              size="small"
              type="primary"
              text
              icon="Edit"
              @click="hanleEditBtnClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="isDelete"
              size="small"
              type="danger"
              text
              icon="Delete"
              @click="handleDeleteBtnclick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="sizes, prev, pager, next, jumper,total"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useSystemStore from '@/store/main/system/system'

import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import usePermissions from '@/hooks/usePermissions'

// 自定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 用戶按钮权限
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:update')
const isQuery = usePermissions('users:query')

// 发起cation，获取userList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

// 获取usersList数据,进行展示
// 这里要么采用storeToRefs或者使用计算属性，不然会遇到一个BUG:第一次加载的时候数据为空
// 因为systemStore.postUsersListAction()是异步的，第一次加载的时候数据没有拿回来，后面因为数据不是响应式的，所以才会有这个BUG
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 页面相关的逻辑

// 每页条数发生改变
function handleSizeChange() {
  fetchUserListData()
}
// 当前页码发生改变
function handleCurrentChange() {
  fetchUserListData()
}

// 定义函数，用于发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  // 发起网络请求
  const info = { size, offset }
  const queryInfo = { ...info, ...formData }

  systemStore.postUsersListAction(queryInfo)
}

// 删除按钮
function handleDeleteBtnclick(id) {
  systemStore.deleteUserByIdAction(id)
}

// 新建/编辑用户的操作
function handleNewUserClick() {
  emit('newClick')
}

function hanleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 暴露网络请求方法
defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  .hearder {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .title {
      font-size: 22px;
    }
  }
  .table {
    :deep(.el-table__cell) {
      padding: 18px 0;
    }
    .el-button {
      margin: 0;
      padding: 5px 8px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
