<template>
  <div class="dashboard">
    <!-- 顶部 数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item">
        <el-col :span="6"><CountCard v-bind="item" /></el-col
      ></template>
    </el-row>

    <!-- 2.中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card>
          <pie-echart />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card>
          <line-echart />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card> </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import CountCard from './c-cpns/count-card/count-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
import ChartCard from './c-cpns/chart-card/chart-card.vue'
import { PieEchart, LineEchart } from '@/components/page-echarts'

// 发起请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 从store获取数据
const { amountList } = storeToRefs(analysisStore)
</script>

<style lang="less" scoped>
.dashboard {
}
.el-row {
  margin-bottom: 10px;
}
</style>
