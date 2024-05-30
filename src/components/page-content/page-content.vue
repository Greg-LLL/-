<template>
  <div class="content">
    <div class="hearder">
      <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
        {{ contentConfig.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>

    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column></template
          >
          <!-- <el-table-column
            align="center"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
          /> -->

          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item" align="center">
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
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="sizes, prev, pager, next, jumper,total"
        :total="pageTotalCount"
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

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propList: any[]
    childrenTree?: any
  }
}

const props = defineProps<IProps>()

// 自定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 获取是否有对应的增删改查的权限
// const loginStore = useLoginStore()
// const { permissions } = loginStore
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 发起cation，获取userList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

// 获取usersList数据,进行展示
// 这里要么采用storeToRefs或者使用计算属性，不然会遇到一个BUG:第一次加载的时候数据为空
// 因为systemStore.postUsersListAction()是异步的，第一次加载的时候数据没有拿回来，后面因为数据不是响应式的，所以才会有这个BUG
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 页面相关的逻辑

// 每页条数发生改变
function handleSizeChange() {
  fetchPageListData()
}
// 当前页码发生改变
function handleCurrentChange() {
  fetchPageListData()
}

// 定义函数，用于发送网络请求
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  // 发起网络请求
  const info = { size, offset }
  const queryInfo = { ...info, ...formData }

  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 删除按钮
function handleDeleteBtnclick(id) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}

// 新建/编辑用户的操作
function handleNewUserClick() {
  emit('newClick')
}

function hanleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

//  监听systemStore中的actions被执行
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})

// 暴露网络请求方法
defineExpose({ fetchPageListData })
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
