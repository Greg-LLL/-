import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'
function usePageModal() {
  const modelRef = ref<InstanceType<typeof pageModal>>()
  function handleNewClick() {
    modelRef.value?.setModalVisible()
  }

  function handleEditClick(itemData: any) {
    modelRef.value?.setModalVisible(false, itemData)
  }
  return {
    modelRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageModal
