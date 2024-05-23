<template>
  <div class="user">
    <userSearch
      @queryClick="handleQueryClick"
      @resetClick="handleResetClick"
    ></userSearch>
    <userContent
      ref="contentRef"
      @new-click="hanldeNweClick"
      @edit-click="hanldeEditeClick"
    ></userContent>
    <userModal ref="modalRef" />
  </div>
</template>

<script lang="ts" setup>
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'
import type UserContent from './c-cpns/user-content.vue'

// 对弹窗的处理
const modalRef = ref<InstanceType<typeof userModal>>()

// 对content组件操作
const contentRef = ref<InstanceType<typeof UserContent>>()
function handleQueryClick(format: any) {
  contentRef.value?.fetchUserListData(format)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 对modal组件的操作
function hanldeNweClick() {
  modalRef.value?.setModalVisible()
}
function hanldeEditeClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
