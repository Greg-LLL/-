<template>
  <div class="model">
    <el-dialog
      v-model="dailogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.label">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="formData[item.prop]"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option
                      :label="option.label"
                      :value="option.value"
                    ></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dailogVisible = false">取消</el-button>
          <el-button type="primary" @click="hanleConfirm"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

// 定义props
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()

const dailogVisible = ref(false)
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
// 定义表单数据
const formData = reactive<any>(initialData)

const isNewRef = ref(true)
const editData = ref()

// 设置dailogVisible方法,避免直接改数据
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dailogVisible.value = true
  isNewRef.value = isNew
  // 编辑数据
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

// 获取role和department数据

// 确定按钮
const systemStore = useSystemStore()
function hanleConfirm() {
  dailogVisible.value = false
  let infoData = { ...formData }
  if (props.otherInfo) {
    infoData = { ...formData, ...props.otherInfo }
  }
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value.id,
      infoData
    )
  } else {
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
}

defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.model {
  .form {
    padding: 0 20px;
  }
}
</style>
