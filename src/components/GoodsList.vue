<template>
  <div class="goods-list">
    <div class="goods-list_header">{{ title }}</div>
    <div class="goods-list_container">
      <div
        v-for="item in goodsList"
        :key="item.goodsId"
        @click="goToDetail(item)"
        class="goods-list_container_item"
      >
        <img :src="$filters.prefix(item.goodsCoverImg)" alt="背景图" />
        <div class="good-desc">
          <div class="title">{{ item.goodsName }}</div>
          <div class="price">¥ {{ item.sellingPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(["emitGoToDetail"])
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  goodsList: {
    type: <any>Array,
    default: () => [],
  },
  paddingBottom:{
    type: String,
    default: "0px"
  }
})
const goToDetail = (item: any) => {
  emits("emitGoToDetail", item)
}
</script>

<style lang="less" scoped>
@import "@/common/style/mixin";
.goods-list {
    padding-bottom: v-bind("props.paddingBottom");
  &_header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }
  &_container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    &_item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1px solid #e9e9e9;
      padding: 10px 10px;
      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }
      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;
        .title {
          // color: #222333;
          color: white;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
</style>
