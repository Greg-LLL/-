<template>
  <div class="main">
    <h2>main:{{ counterStore.count }}</h2>
    <h2>main:{{ counterStore.doubleCounter }}</h2>
    <h2>main:{{ counterStore.age }}</h2>
    <button @click="counterStore.changeCounterAction(20)">修改count</button>
    <button @click="counterStore.$patch({ count: 500, age: 18 })">
      批量修改
    </button>
    <div class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useCounterStore from '@/store/counter'
const counterStore = useCounterStore()
</script>

<style lang="less" scoped>
.main {
}
</style>
