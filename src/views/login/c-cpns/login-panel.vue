<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">后台管理系统</h1>
    <!-- 中间的tabs -->
    <el-tabs
      type="border-card"
      stretch
      v-model="activeName"
      @keyup.enter="handleLoginBtnClick"
    >
      <!-- 账号登录 -->
      <el-tab-pane name="account">
        <template #label>
          <div class="label">
            <el-icon><UserFilled /></el-icon>
            <span class="text">账号登录</span>
          </div>
        </template>
        <PaneAccount ref="accountRef" />
      </el-tab-pane>
      <!-- 手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <div class="label">
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </div>
        </template>
        <panePhone />
      </el-tab-pane>
    </el-tabs>
    <!-- 顶部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

const activeName = ref('account')
const isRemPwd = ref(false)
// 组件实例的类型，可以参考这种写法
const accountRef = ref<InstanceType<typeof PaneAccount>>()

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction()
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
