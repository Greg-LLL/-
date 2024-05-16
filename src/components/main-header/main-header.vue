<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuClick">
      <!-- <template v-if="isFold">
        <el-icon size="28px"><Fold /></el-icon>
      </template>
      <template v-else>
        <el-icon size="28px"><Expand /></el-icon>
      </template> -->
      <!-- 动态组件，判断图标 -->
      <el-icon>
        <component :is="isFold ? 'Fold' : 'Expand'" />
      </el-icon>
    </div>
    <div class="content">
      <headerCrumb />
      <headerInfo />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import headerInfo from './c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue'

// 0.内部自定义事件
const emit = defineEmits(['foldChange'])

// 1.记录状态
const isFold = ref(false)
function handleMenuClick() {
  // 1.内部改变状态
  isFold.value = !isFold.value

  // 2.触发事件，传递参数
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
