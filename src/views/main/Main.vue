<template>
  <div class="main">
    <h2>main:{{ counterStore.count }}</h2>
    <h2>main:{{ counterStore.doubleCounter }}</h2>
    <h2>main:{{ counterStore.age }}</h2>
    <button @click="counterStore.changeCounterAction(20)">修改count</button>
    <button @click="counterStore.$patch({ count: 500, age: 18 })">
      批量修改
    </button>
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
