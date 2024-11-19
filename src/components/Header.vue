<template>
    <header class="simple-header">
        <span v-if="!noback" @click="toBack">
            <van-icon name="arrow-left" />
        </span>
        <div class="simple-header-title">{{ title }}</div>
    </header>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    back:{
        type: String,
        default: "",
    },
    noback:{
        type: Boolean,
        default: false
    }
})
const router = useRouter();

const toBack = () => {
   if(!props.back){
    router.go(-1);
   }else{
    router.push({ path: props.back})
   }
}
</script>


<style lang="less" scoped>
  @import '../common/style/mixin';
  .simple-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .simple-header-title {
      font-size: 14px;
      flex: 1;
      text-align: center;
    }
  }
</style>