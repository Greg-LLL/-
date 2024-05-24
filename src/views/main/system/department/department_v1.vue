<template>
  <div class="department">
    <pageSerach
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <pageModal ref="modelRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import pageSerach from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'
import pageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

// 点击search，content的操作
const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}

// 重置
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

// 点击content，modal的操作
const modelRef = ref<InstanceType<typeof pageModal>>()
function handleNewClick() {
  modelRef.value?.setModalVisible()
}

function handleEditClick(itemData: any) {
  modelRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped>
.department {
}
</style>
