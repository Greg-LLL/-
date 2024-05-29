<template>
  <div class="search" v-if="isQuery">
    <!-- 输入关键字表单 -->
    <el-form
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
      ref="formRef"
      :model="searchForm"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.label">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="searchForm[item.prop]"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 重置和搜索按钮 -->
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick"
        >重置</el-button
      >
      <el-button
        size="large"
        type="primary"
        icon="Search"
        @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import usePermissions from '@/hooks/usePermissions'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

// 接受自定义事件
interface Iprops {
  searchConfig: {
    pageName: string
    labelWidth?: string
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<Iprops>()
const isQuery = usePermissions(`${props.searchConfig.pageName}`)

// 定义form的数据
const initialForm: any = []
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

const formRef = ref<InstanceType<typeof ElForm>>()
// 重置操作
function handleResetClick() {
  // 将form表单的数据重置
  formRef.value?.resetFields()
  // 将事件传出,content内部重新发送网络请求
  emit('resetClick')
}

// 查询
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
