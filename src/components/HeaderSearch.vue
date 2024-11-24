<template>
  <header class="header-search">
    <div class="back" @click="goBack">
      <van-icon class="icon" name="arrow-left" />
    </div>
    <div class="search">
      <van-search
        v-model="mvKeyWord"
        shape="round"
        placeholder="请输入搜索关键词"
        @clear="clear"
        @click-input="descideTypeToRouter"
      />
    </div>
    <div v-if="isShowSearchButton" class="button" @click="search">
      <van-button type="primary" shape="round">搜索</van-button>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router' 
import { computed } from 'vue' 
const emits = defineEmits(["goBack", "search","updateKeyword"]);
const props = defineProps({
  keyword: {
    type: String,
    default: "",
  },
  isShowSearchButton:{
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: ""
  }
});
const router = useRouter();
const mvKeyWord = computed({
  get() {
    return props.keyword;
  },
  set(value) {
    emits("updateKeyword", value); // 触发事件，通知父组件更新
  }
});

const goBack = () => {
  emits("goBack");
};
const search = () => {
  emits("search");
};
const clear = () =>{
}

const descideTypeToRouter = () =>{
  if(props.type === 'category'){
    router.push({path: "/product-list"})
    return;
  }
}
</script>
<style lang="less" scoped>
.header-search {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  .back {
    font-size: 20px;
    padding-left: 1%;
  }
  .search {
    flex: 1;
    margin: 0px 10px;
    .van-search{
        padding: 0px;
        border-radius: 20px;
    }
  }
  .button {
    height: 40px;
    margin-right: 10px;
    :deep(.van-button__text){
        font-size: 20px;
    }
  }
}
</style>
