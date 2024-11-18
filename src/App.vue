<template>
  <router-view></router-view>
  <NavBar v-if="metaData"/>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import NavBar from '@/components/NavBar.vue'

const route = useRoute();
// 用来控制底部导航的显示问题
const metaData = computed(() => route.meta.showNavBar);
</script>
<style scoped lang="less">
@import './common/style/mixin';
</style>
