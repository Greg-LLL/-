<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import type { EChartsOption } from 'echarts'

interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()
const echartRef = ref<HTMLElement>()
onMounted(() => {
  const echartInstance = echarts.init(echartRef.value, 'light', {
    renderer: 'canvas'
  })
  echartInstance.setOption(props.option)
})
</script>

<style lang="less" scoped>
.base-echart {
}
.echart {
  height: 300px;
}
</style>
