import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'
type EditFntype = (data: any) => void
function usePageModal(editCallback?: EditFntype) {
  const modelRef = ref<InstanceType<typeof pageModal>>()
  function handleNewClick() {
    modelRef.value?.setModalVisible()
  }

  function handleEditClick(itemData: any) {
    modelRef.value?.setModalVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }
  return {
    modelRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageModal
