<template>
  <div class="pane-account">
    <el-form
      label-width="60px"
      :model="account"
      :rules="accountRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" size="large" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" size="large" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { FormRules, ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '../../../types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

// 定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入账号信息', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,18}$/, message: '账号格式不正确', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[0-9a-z]{6,}$/, message: '密码至少须满足6位', trigger: 'blur' }
  ]
}

// 登录逻辑
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((vaild) => {
    if (vaild) {
      // 获取用户的账号密码
      const name = account.name
      const password = account.password

      // 发送请求（携带账号密码）
      loginStore.loginAccountAction({ name, password }).then((res) => {
        // 判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.deleteCache(CACHE_NAME)
          localCache.deleteCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('账号或密码格式错误')
    }
  })
}

defineExpose({ loginAction })
</script>

<style lang="less" scoped>
.pane-account {
}
</style>
