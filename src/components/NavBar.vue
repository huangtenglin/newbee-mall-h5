<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <div
        v-for="(item, index) in navList" 
        :key="index" :to="item.path" 
        class="nav-list-item"
        @click="toPath(item)"
        >
        <i :class="currentIndex === index?`${item.icon} active` : `${item.icon}`"></i>
        <span>{{ item.title }}</span>
        <span v-if="item.countClass" class="bagde">{{cartStore.cartList.length}}</span>
      </div>
    </ul>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute} from 'vue-router'
import { useCartStroe } from "@/store/cart"
let currentIndex = ref(0)
const router = useRouter();
const cartStore = useCartStroe();
const navList = reactive([
  {
    title: "首页",
    id: 1,
    icon: "iconfont icon-home1",
    path: "/"
  },
  {
    title: "分类",
    id: 2,
    icon: "iconfont icon-fenlei",
    path: "/category"
  },
  {
    title: "购物车",
    id: 3,
    icon: "iconfont icon-Cart",
    path: "/cart",
    countClass: cartStore.cartList.length > 0 ? 'badge' : ''
  },
  {
    title: "个人中心",
    id: 4,
    icon: "iconfont icon-My",
    path: "/user"
  }
])
const toPath = (item) => {
  currentIndex.value = item.id - 1;
  router.push(item.path)
}

onMounted(() =>{
  cartStore.getCartList();
})
</script>


<style lang="less" scoped>
@import '../common/style/mixin';

.iconfont {
  font-size: 24px;
}

.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  z-index: 1000;
  background: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);

  .active{
    color: @primary;
  }

  .nav-list {
    width: 100%;
    .fj();
    flex-direction: row;
    padding: 0;

    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;
      position: relative;

      .bagde{
        position: absolute;
        top: 0px;
        right: 25px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        line-height: 16px;
        text-align: center;
        background: #ee0a24;
        color: #fff;
      }

      i {
        text-align: center;
        font-size: 22px;
      }

      span {
        font-size: 12px;
      }
    }
  }
}
</style>