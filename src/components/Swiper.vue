<template>
  <van-swipe class="my-swipe" :autoplay="3000" lazy-render>
    <van-swipe-item 
      v-for="(image, index) in imageList" 
      :key="index"
      @click="goTo(image.redirectUrl)"
      >
      <img :src="image.carouselUrl" />
    </van-swipe-item>
  </van-swipe>
</template>
<script setup>
import { isTemplateExpression } from "typescript";
import { ref, reactive } from "vue"
const props = defineProps({
  imageList: {
    type: Array,
    default: () => [],
  },
})
const goTo = (url) =>{
  window.open(url)
}
</script>

<style lang="less" scoped>
.my-swipe {
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
