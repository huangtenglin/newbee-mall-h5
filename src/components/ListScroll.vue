<template>
    <div ref="wrapper" class="scroll-wrapper">
        <slot></slot>
    </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue' 
import BScroll from '@better-scroll/core'
let wrapper = ref(null);
const props = defineProps({
    probeType: {
        type: Number,
        default: 1,
    },
    // 点击列表是否派发click事件
    click:{
        type: Boolean,
        defatlt: true,
    },
    // 是否开启横向滚动
    scrollX:{
        type: Boolean,
        default: false,
    },
    // 是否派发滚动事件
    listenScroll:{
        type: Boolean,
        default: false,
    },
     // 是否派发滚动到底部的事件，用于上拉加载
     pullup: {
      type: Boolean,
      default: false
    },
    // 是否派发顶部下拉的事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false
    },
    // 是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false
    },
    // 当数据更新后，刷新scroll的延时
    refreshDelay: {
      type: Number,
      default: 20
    }
})

onMounted(() =>{
    nextTick(() =>{
        initScroll();
    })
})

const initScroll = () =>{
    let scroll = new BScroll(wrapper.value,{
        probeType: 3,
        click: true
    })
}
</script>
<style style="less" scoped>
    .wrapper{
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;
        touch-action: pan-y;
    }
</style>