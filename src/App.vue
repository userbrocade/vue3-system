<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>

<template>
  <!-- 一级路由出口 -->
  <el-config-provider :locale="zh">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
