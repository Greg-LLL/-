<template>
  <div class="department">
    <pageSerach
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope">
        <span class="leader">
          {{ scope.row[scope.prop] }}
        </span>
      </template>
    </pageContent>
    <pageModal ref="modelRef" :modal-config="modalConfigRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import pageSerach from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { computed, ref } from 'vue'
import useMainStore from '@/store/main/main'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})

// // 点击search，content的操作
// const contentRef = ref<InstanceType<typeof pageContent>>()
// function handleQueryClick(queryInfo: any) {
//   contentRef.value?.fetchPageListData(queryInfo)
// }

// // 重置
// function handleResetClick() {
//   contentRef.value?.fetchPageListData()
// }

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content，modal的操作
// const modelRef = ref<InstanceType<typeof pageModal>>()
// function handleNewClick() {
//   modelRef.value?.setModalVisible()
// }

// function handleEditClick(itemData: any) {
//   modelRef.value?.setModalVisible(false, itemData)
// }

const { modelRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style scoped>
.department {
  .leader {
    color: red;
  }
}
</style>
