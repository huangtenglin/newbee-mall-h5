<template>
  <div class="product-detail">
    <Header title="商品详情" />
    <main class="main">
      <!-- 轮播 -->
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item
            v-for="(item, index) in state.detail.goodsCarouselList"
            :key="index"
          >
            <van-image fit="contain" :src="item" width="100%" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="main_container">
        <div class="product-info">
          <div class="product-title">
            {{ state.detail.goodsName || "" }}
          </div>
          <div class="product-desc">免邮费 顺丰快递</div>
          <div class="product-price">
            <span>¥{{ state.detail.sellingPrice || "" }}</span>
          </div>
        </div>
        <div class="product-intro">
          <ul>
            <li>概述</li>
            <li>参数</li>
            <li>安装服务</li>
            <li>常见问题</li>
          </ul>
        </div>
        <div
          class="product-content"
          v-html="state.detail.goodsDetailContent || ''"
        ></div>
      </div>
      <div class="footer">
        <van-action-bar>
          <van-action-bar-icon icon="chat-o" text="客服" />
          <van-action-bar-icon
            icon="cart-o"
            :badge="!cartStore.cartList.length ? '' : cartStore.cartList.length"
            @click="goTo()"
            text="购物车"
          />
          <van-action-bar-button
            type="warning"
            @click="handleAddCart"
            text="加入购物车"
          />
          <van-action-bar-button
            type="danger"
            @click="goToCart"
            text="立即购买"
          />
        </van-action-bar>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import { getDetail } from "@/service/good";
import { prefix } from "@/common/js/utils";
import { addCart } from "@/service/cart";
import { showSuccessToast } from "vant";
import { useCartStroe } from "@/store/cart";
const router = useRouter(),
  route = useRoute();
const cartStore = useCartStroe();

const state = reactive({
  detail: {
    goodsCarouselList: [],
    goodsName: "",
    sellingPrice: "",
    goodsDetailContent: "",
    goodsId: "",
  },
});

const cart = reactive({ count: 0 });

const goTo = () => {
  router.push({ path: "/cart" }); // 跳转到购物车组件
};

const handleAddCart = async () => {
  try {
    const { resultCode } = await addCart({
      goodsCount: 1,
      goodsId: state.detail.goodsId,
    });
    if (resultCode == 200) showSuccessToast("添加成功");
    cartStore.getCartList();
  } catch (error) {
    console.log("接口返回错误", error);
  }
};

const goToCart = async () => {
  const { data, resultCode } = await addCart({
    goodCount: 1,
    goodsId: state.detail.goodsId,
  });
  if (resultCode === 200) {
    router.push({ path: "/cart" }); // 跳转到购物车组件
  }
};

onMounted(() => {
  getDetailData();
  cartStore.getCartList();
});

const getDetailData = async () => {
  try {
    const { data } = await getDetail(route.params.id);
    data.goodsCarouselList = data.goodsCarouselList.map((i) => prefix(i));
    state.detail = data;
  } catch (error) {
    console.log("接口返回错误", error);
  }
};
</script>

<style lang="less" scoped>
@import "@/common/style/mixin";
.product-detail {
  .main {
    margin-top: 50px;
    height: calc(100vh - 50px);
    overflow: hidden;
    overflow-y: auto;
    .detail-swipe-wrap {
    }
    &_container {
      .product-info {
        padding: 0 10px;
        .product-title {
          font-size: 18px;
          text-align: left;
          color: #333;
        }
        .product-desc {
          font-size: 14px;
          text-align: left;
          color: #999;
          padding: 5px 0;
        }
        .product-price {
          .fj();
          span:nth-child(1) {
            color: #f63515;
            font-size: 22px;
          }
          span:nth-child(2) {
            color: #999;
            font-size: 16px;
          }
        }
      }
      .product-intro {
        width: 100%;
        padding-bottom: 50px;
        ul {
          width: 100%;
          margin: 10px 0;
          display: flex;
          li {
            flex: 1;
            padding: 5px 0px;
            text-align: center;
            font-size: 15px;
            border-right: 1px solid #999;
            box-sizing: border-box;
            &:last-child {
              border-right: none;
            }
          }
        }
      }
      .product-content {
        padding: 0 20px;
        img {
          width: 100%;
        }
      }
    }
  }
  .van-action-bar-button--warning {
    background: linear-gradient(to right, #6bd8d8, @primary);
  }
  .van-action-bar-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888);
  }
}
</style>
