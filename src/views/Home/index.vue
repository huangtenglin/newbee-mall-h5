<template>
    <Header title="首页"/>
    <div class="home">
        这个是home页面
        <div><i class="iconfont icon007-detective"></i></div>
    </div>
</template>
<script setup lang="ts">
import Header from "@/components/Header.vue"
import { ref, reactive } from 'vue'

</script>


<style lang='less' scoped>
.home{
    width: 100%;
    height: 100px;
    font-size: 14px;
}
</style>