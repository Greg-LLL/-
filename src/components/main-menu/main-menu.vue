<template>
  <div class="mani-menu">
    <div class="logo">
      <!-- logo -->
      <img class="img" src="@/assets/img/logo.svg" alt="11" title="22233" />
      <h2 class="title" v-show="!isFold">管理系统</h2>
    </div>
    <!-- menu -->
    <div class="menu">
      <el-menu
        :collapse="isFold"
        default-active="1"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 字符串 el-icon-monitor  => 组件 component动态组件-->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''">
                {{ subitem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>

        <!-- 系统总览 -->
        <!-- <el-sub-menu index="0">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item index="1-1">核心技术</el-menu-item>
          <el-menu-item index="1-2">商品统计</el-menu-item>
        </el-sub-menu> -->
        <!-- 系统管理 -->
        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item>用户管理</el-menu-item>
          <el-menu-item>部门管理</el-menu-item>
          <el-menu-item>菜单管理</el-menu-item>
          <el-menu-item>角色管理</el-menu-item>
        </el-sub-menu> -->
        <!-- 商品中心 -->
        <!-- <el-sub-menu index="2">
          <template #title>
            <el-icon><ShoppingBag /></el-icon>
            <span>商品中心</span>
          </template>
          <el-menu-item>商品类别</el-menu-item>
          <el-menu-item>商品信息</el-menu-item>
        </el-sub-menu> -->
        <!-- 随便聊聊 -->
        <!-- <el-sub-menu index="3">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>随便聊聊</span>
          </template>
          <el-menu-item>你的故事</el-menu-item>
          <el-menu-item>故事列表</el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useLoginStore from '@/store/login/login'

// 定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
console.log(userMenus)
</script>

<style lang="less" scoped>
.mani-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
  }
  .el-menu {
    border-right: none;
    user-select: none;
  }

  .el-sub-menu {
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135;
    }

    .el-menu-item:hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
