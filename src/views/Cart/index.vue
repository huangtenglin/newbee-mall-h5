<template>
  <div v-if="cartStroe.cartList.length > 0" class="cart-box">
    <Header title="购物车" />
    <main class="cart-box_body">
      <van-checkbox-group
        @change="groupChange"
        v-model="state.result"
        ref="checkboxGroup"
        shape="square"
      >
        <van-swipe-cell
          v-for="(item, index) in state.list"
          :key="index"
          :right-width="50"
        >
          <div class="good-item">
            <van-checkbox :name="item.cartItemId" />

            <div class="good-img">
              <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
            </div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{ item.goodsName }}</span>
                <span>x{{ item.goodsCount }}</span>
              </div>
              <div class="good-btn">
                <div class="price">¥{{ item.sellingPrice }}</div>
                <van-stepper
                  integer
                  :min="1"
                  :max="5"
                  :model-value="item.goodsCount"
                  :name="item.cartItemId"
                  async-change
                  @change="onChange"
                />
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              square
              icon="delete"
              type="danger"
              class="delete-button"
              @click="deleteGood(item.cartItemId)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </main>
    <van-submit-bar
      v-if="state.list.length > 0"
      class="submit-all van-hairline--top"
      :price="total * 100"
      button-text="结算"
      button-type="primary"
      @submit="onSubmit"
    >
      <van-checkbox @click="allCheck" v-model:checked="state.checkAll"
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
  <div v-else class="cart-empty">
    <div class="img"></div>
    <span class="span">购物车空空如也</span>
    <van-button @click="goTo" class="button" size="large" round type="success"
      >前往选购</van-button
    >
  </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
import { ref, reactive, onMounted, computed } from "vue";
import { useCartStroe } from "@/store/cart";
import { useRouter, useRoute } from "vue-router";
import { showLoadingToast, closeToast, showFailToast } from "vant";
import { getCart, deleteCartItem, modifyCart } from "@/service/cart";
const router = useRouter();

const state = reactive({
  checked: false,
  list: [],
  all: false,
  result: [],
  checkAll: false,
});
const cartStroe = useCartStroe();

const total = computed(() => {
  let sum = 0;
  let _list = state.list.filter((item) =>
    state.result.includes(item.cartItemId)
  );
  _list.forEach((item) => {
    sum += item.sellingPrice * item.goodsCount;
  });
  return sum;
});

onMounted(() => {
  cartStroe.getCartList();
  init();
});

const init = async () => {
  showLoadingToast({ message: "加载中...", forbidClick: true });
  const { data } = await getCart({ pageNumber: 1 });
  state.list = data;
  state.result = data.map((item) => item.cartItemId);
  closeToast();
};

const goTo = () => {
  router.push("/");
};

const onChange = async(value, detail) => {
  if (value > 5) {
    showFailToast("商品数量不能超过5");
    return;
  }
  if (value < 1) {
    showFailToast("商品数量不能小于1");
    return;
  }
  if (state.list.find(item => item.cartItemId == detail.name)?.goodsCount == value) return
  showLoadingToast({ message: '修改中...', forbidClick: true });
  const params = {
    cartItemId: detail.name,
    goodsCount: value
  }
  await modifyCart(params)
  /**
   * 修改完成后，没有请求购物车列表，是因为闪烁的问题，
   * 这边手动给操作的购物车商品修改数据
  */
    state.list.forEach(item =>{
        if(item.cartItemId === detail.name){
            item.goodsCount = value;
        }
    })
    closeToast()
};

const allCheck = () => {
  if (!state.checkAll) {
    state.result = state.list.map((item) => item.cartItemId);
  } else {
    state.result = [];
  }
};
const deleteGood = async (id) => {
  await deleteCartItem(id);
  cartStroe.getCartList();
  init();
};

const groupChange = (result) => {
  state.checkAll = result.length === state.list.length;
  state.result = result;
};

const onSubmit = () => {
  if(!state.result.length){
    showFailToast('请选择商品');
    return;
  }
  const params = JSON.stringify(state.result);
  router.push({ path: '/create-order', query: { cartItemIds: params } })
};
</script>

<style lang="less" scoped>
@import "@/common/style/mixin";
.cart-box {
  .cart-box_body {
    padding-left: 10px;
    margin-top: 50px;

    .good-item {
      display: flex;
      .good-img {
        img {
          .wh(100px, 100px);
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
  }
}
.cart-empty {
  display: flex;
  width: 100vw;
  height: calc(100% - 50px);
  align-items: center;
  flex-direction: column;
  justify-content: center; /* 垂直居中对齐 */
  gap: 10px;
  .img {
    width: 275px;
    height: 200px;
    background-size: cover;
    background-image: url("@/assets/emptyCart.png");
  }
  .span {
    font-size: 20px;
    color: #fff;
  }
  .button {
    width: 80%;
  }
}
</style>
