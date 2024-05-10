<template>
  <div class="main">
    <h2>main</h2>
    <button @click="handleExitClick">退出登录</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
// 退出登录
const router = useRouter()
function handleExitClick() {
  // 删除token，跳回登录页面
  localCache.deleteCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main {
}
</style>
