<template>
  <div class="model">
    <el-dialog
      v-model="dailogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="500"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
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
const dailogVisible = ref(false)
// 定义表单数据
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

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
const mainStore = useMainStore()
const { entireDepartments, entireRoles } = storeToRefs(mainStore)

// 确定按钮
const systemStore = useSystemStore()
function hanleConfirm() {
  dailogVisible.value = false
  if (!isNewRef.value && editData.value) {
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    systemStore.newUserDataAction(formData)
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
