<template>
  <div class="login">
    <h2>login</h2>
  </div>
</template>

<script lang="ts" setup>
import hyRequest from '@/service'
hyRequest
  .get({
    url: '/'
  })
  .then((res) => {
    console.log(res)
  })
</script>

<style lang="less" scoped>
.login {
}
</style>
