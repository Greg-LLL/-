import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'
type CallbackFntype = (data?: any) => void
function usePageModal(
  newCallback?: CallbackFntype,
  editCallback?: CallbackFntype
) {
  const modelRef = ref<InstanceType<typeof pageModal>>()
  function handleNewClick() {
    modelRef.value?.setModalVisible()
    if (newCallback) newCallback()
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
