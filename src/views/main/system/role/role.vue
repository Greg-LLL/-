<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <pageModal
      :modal-config="modalConfig"
      ref="modelRef"
      :other-info="otherInfo"
    >
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </pageModal>
  </div>
</template>

<script lang="ts" setup>
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { ElTree } from 'element-plus'
import { nextTick } from 'vue'
import { mapMenuListToIdS } from '@/utils/map-menus'

// 弹窗逻辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modelRef, handleEditClick, handleNewClick } = usePageModal(
  newCallback,
  editCallback
)

// 获取完整的菜单，弹窗使用
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
function handleElTreeCheck(data1, data2) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIdS(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped>
.role {
}
</style>
