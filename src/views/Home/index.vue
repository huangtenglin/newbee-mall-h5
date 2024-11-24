<template>
  <div class="home">
    <header class="home-header wrap" :class="{ 'active': state.headerScroll }">
      <div @click="() => router.push('/category')">
        <i class="iconfont icon-fenlei"></i>
      </div>
      <div class="header-search">
        <span class="app-name">新蜂商城</span>
        <i class="iconfont icon-search"></i>
        <router-link
          tag="span"
          class="search-title"
          to="./product-list?from=home"
          >山河无恙，人间皆安</router-link
        >
      </div>
      <router-link
        style="color: #fff"
        tag="span"
        to="./login"
        v-if="!state.isLogin"
        >登录</router-link
      >
      <router-link style="color: #fff" tag="span" to="./user" v-else>
        <van-icon name="manager-o" />
      </router-link>
    </header>
    <main class="home-main">
      <swiper :imageList="state.swiperList"></swiper>
      <!-- 导航栏模块 -->
      <div class="category-list">
        <div
          v-for="item in state.categoryList"
          v-bind:key="item.categoryId"
          @click="tips"
        >
          <img :src="item.imgUrl" />
          <span>{{ item.name }}</span>
        </div>
      </div>
      <!-- 商品模块 -->
      <van-skeleton title :row="3" :loading="state.loading">
        <GoodsList 
          title="新品上线" 
          :goodsList="state.newGoodses" 
          @emitGoToDetail="emitGoToDetail"/>
      </van-skeleton>
      <!-- 热门商品 -->
      <van-skeleton title :row="3" :loading="state.loading">
        <GoodsList 
          title="热门商品" 
          :goodsList="state.hots" 
          @emitGoToDetail="emitGoToDetail"/>
      </van-skeleton>
      <!-- 最新推薦 -->
      <van-skeleton title :row="3" :loading="state.loading">
        <GoodsList 
          title="最新推荐" 
          :goodsList="state.recommends" 
          paddingBottom="100px"
          @emitGoToDetail="emitGoToDetail"/>
      </van-skeleton>
    </main>
  </div>
</template>
<script setup>
import { reactive, onMounted, onBeforeMount, nextTick } from "vue"
import swiper from "@/components/Swiper.vue"
import GoodsList from "@/components/GoodsList.vue"
import { useRouter } from "vue-router"
import { getHome } from "../../service/home.js"
import { showLoadingToast, closeToast, showToast } from "vant"
const router = useRouter()
const state = reactive({
  isLogin: false,
  headerScroll: false,
  hots: [],
  newGoodses: [],
  recommends: [],
  categoryList: [
    {
      name: "新蜂超市",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png",
      categoryId: 100001,
    },
    {
      name: "新蜂服饰",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png",
      categoryId: 100003,
    },
    {
      name: "全球购",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png",
      categoryId: 100002,
    },
    {
      name: "新蜂生鲜",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png",
      categoryId: 100004,
    },
    {
      name: "新蜂到家",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png",
      categoryId: 100005,
    },
    {
      name: "充值缴费",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png",
      categoryId: 100006,
    },
    {
      name: "9.9元拼",
      imgUrl: "https://s.yezgea02.com/1604041127880/9.9%402x.png",
      categoryId: 100007,
    },
    {
      name: "领劵",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png",
      categoryId: 100008,
    },
    {
      name: "省钱",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png",
      categoryId: 100009,
    },
    {
      name: "全部",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png",
      categoryId: 100010,
    },
  ],
  loading: true,
})

onMounted(() => {
  state.isLogin = localStorage.getItem("token") ? true : false
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
  })
  getHomeData()
  closeToast()
  window.addEventListener("scroll", isSrcoll)
})

onBeforeMount(() => {
  window.removeEventListener("scroll", isSrcoll)
})

// 获取首页数据
const getHomeData = async () => {
  const { data } = await getHome()
  state.swiperList = data.carousels
  state.newGoodses = data.newGoodses
  state.hots = data.hotGoodses
  state.recommends = data.recommendGoodses
  state.loading = false
}

const isSrcoll = () => {
  nextTick(() => {
    state.headerScroll =
      (document.documentElement.scrollTop || document.body.scrollTop) > 50
  })
}

const emitGoToDetail = (item) =>{
  router.push({ path: `/product/${item.goodsId}`})
}
</script>

<style lang="less" scoped>
@import "@/common/style/mixin";
.home {
  width: 100%;
  height: 100px;
  font-size: 14px;
  .home-header {
    position: fixed;
    left: 0;
    top: 0;
    .wh(100%,50px);
    .fj();
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #fff;
    z-index: 10000;
    .nbmenu2 {
      color: @primary;
    }
    &.active {
      background: @primary;
      .nbmenu2 {
        color: #fff;
      }
      .login {
        color: #fff;
      }
    }
    .iconfont {
      font-size: 20px;
    }
    .header-search {
      display: flex;
      width: 74%;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 20px;
      .login {
        color: #fff;
      }
      .app-name {
        padding: 0 10px;
        color: @primary;
        font-size: 14px;
        font-weight: bold;
        border-right: 1px solid #666;
      }
      .icon-search {
        padding: 0 10px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: white;
        line-height: 21px;
      }
    }
  }
  .home-main {
    flex: 1;
    .category-list {
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      width: 100%;
      padding-bottom: 13px;
      div {
        display: flex;
        flex-direction: column;
        width: 20%;
        text-align: center;
        img {
          .wh(36px, 36px);
          margin: 13px auto 8px auto;
        }
      }
    }
    .goods-list {
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
  }
}
</style>
