<template>
  <div class="dashboard">
    <!-- 顶部 数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item">
        <el-col :span="6"><CountCard v-bind="item" /></el-col
      ></template>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import CountCard from './c-cpns/count-card/count-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'

// 发起请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 从store获取数据
const { amountList } = storeToRefs(analysisStore)
</script>

<style lang="less" scoped>
.dashboard {
}
</style>
