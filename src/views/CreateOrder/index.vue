<template>
    <div class="create-order">
        <Header title="我的订单" />
        <main class="main">
            <div @click="goToAddress" class="main_address">
                <div class="main_address_person">
                    <div class="main_address_person_info">
                        <span class="name">{{state.address.userName ?? "张三"}}</span>
                        <span class="phone">{{state.address.userPhone ?? "1300000000"}}</span>
                    </div>
                    <div v-if="addressInfo" class="address">{{ addressInfo }}</div>
                </div>
                <div class="right_arrow">
                    <van-icon class="arrowIcon" name="arrow" />
                </div>
            </div>
            <div class="main_goods">
                <div v-for="item in state.cartList" class="main_goods_item">
                    <van-card :num="item.goodsCount" :price="item.sellingPrice" :title="item.goodsName"
                        :thumb="item.goodsCoverImg" />
                </div>

            </div>
            <van-submit-bar :decimal-length="0" :price="totalPrice" button-text="生成订单" @submit="onSubmit" />
        </main>
        <van-popup closeable :close-on-click-overlay="false" v-model:show="state.showPay" position="bottom"
            :style="{ height: '30%' }" @close="close">
            <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
                <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block
                    @click="handlePayOrder(1)">支付宝支付</van-button>
                <van-button color="#4fc08d" block @click="handlePayOrder(2)">微信支付</van-button>
            </div>
        </van-popup>
    </div>
</template>
<script setup>
import { reactive, onMounted, computed } from 'vue'
import { getByCartItemIds } from '@/service/cart'
import { getDefaultAddress, getAddressDetail } from '@/service/address'
import { createOrder, payOrder } from '@/service/order'
import { setLocal, getLocal } from '@/common/js/utils'
import { showLoadingToast, closeToast, showSuccessToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const state = reactive({
  cartList: [],
  address: {},
  showPay: false,
  orderNo: '',
  cartItemIds: []
})



onMounted(() =>{
    init();
})

const init = async() =>{
    showLoadingToast({ message: '加载中...', forbidClick: true });
    const { addressId, cartItemIds } = route.query;
    const _cartItemIds = cartItemIds? JSON.parse(cartItemIds) : JSON.parse(getLocal('cartItemIds'));
    setLocal('cartItemIds', _cartItemIds);
    const { data: list} = await getByCartItemIds({ cartItemIds: _cartItemIds.join(",")});
    const { data: address } = addressId ? await getAddressDetail(addressId) : await getDefaultAddress()
    if(!address){
        router.push({ path: '/add-address'})
        return;
    }
    state.cartList = list;
    console.log(state.cartList,'htl->测试商品列表')
    state.address = address;
    closeToast();
}
const addressInfo = computed(() =>{
  return  `${state.address.provinceName} ${state.address.cityName} ${state.address.regionName} `
})

const totalPrice = computed(() =>{
    let sum = 0;
    state.cartList.forEach(item =>{
        sum += item.sellingPrice * item.goodsCount;
    })
    return parseInt(sum.toString() + '00' + '.00');
})

const onSubmit = async() =>{
    const params = {
        addressId: state.address.addressId,
        cartItemIds: state.cartList.map(item => item.cartItemId)
    }
    try{
        const { data} = await createOrder(params);
        setLocal("cartItemIds",'');
        state.orderNo = data;
        state.showPay = true;
    }catch(error){
        console.log("接口返回错误",error)
    }
}

// 跳转到地址地址
const goToAddress = () =>{
    router.push({
        path: "/add-address",
        query:{
            cartItemIds: JSON.stringify(state.cartItemIds),
            from: 'create-order'
        }
    })
}
const close = () =>{
    router.push({path: 'crate-order'})
}

const handlePayOrder = async(type) =>{
    try{
        await payOrder({orderNo: state.orderNo,payType: type});
        showSuccessToast("支付成功");
        setTimeout(() =>{
            router.push({path:"/create-order"});
        },2000)
    }catch(error){
        console.log("支付接口有问题",error)
    }finally{
        state.showPay = false;
    }
}
</script>


<style lang='less' scoped>
.create-order{
    height: 100vh;
    display: flex;
    flex-direction: column;;
    .main{
        height: calc(100vh - 50px);
        width: 100%;
        margin-top:44px;
        &_address{
            display: flex;
            align-items: center;
            padding:0px 20px;
            box-sizing: border-box;
            padding-bottom: 20px;
            background-color: white;
            &_person{
                flex: 1;
                height: 50px;
                box-sizing: border-box;
                color: #000;

                &_info{
                    display: flex;
                    gap: 10px;
                    font-size: 18px;
                    color: #000;
                }
                .address{
                    font-size: 18px;
                    color: #000;
                }
            }
            .right_arrow{
                width: 10%;
                .arrowIcon{
                    font-size: 20px;
                    color: #000;
                }
            }
        }
        &_goods{
            flex: 1;
            overflow-y:auto;
        }
        &_footer{

        }
    }
    :deep(.van-card__price){
        color: red;
    }
}
</style>