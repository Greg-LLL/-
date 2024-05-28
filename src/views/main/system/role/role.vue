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
    <pageModal :modal-config="modalConfig" ref="modelRef" />
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

// 弹窗逻辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modelRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style lang="less" scoped>
.role {
}
</style>
