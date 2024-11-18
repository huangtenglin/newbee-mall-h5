<template>
  <router-view></router-view>
  <NavBar/>
</template>
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
<style scoped lang="less">
@import './common/style/mixin';
</style>
