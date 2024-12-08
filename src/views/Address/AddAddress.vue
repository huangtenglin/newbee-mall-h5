<template>
  <div class="add-address">
    <Header title="地址管理" />
    <div style="margin-top: 50px;" class="address-item">
      <van-address-list
        v-if="state.from != 'mine'"
        v-model="state.chosenAddressId"
        :list="state.list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      />
      <van-address-list
        v-else
        v-model="state.chosenAddressId"
        :list="state.list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Header from "@/components/Header.vue";

import { getAddressList } from '@/service/address'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const state = reactive({
  chosenAddressId: '1',
  list: [],
  from: route?.query?.from ?? ''
})

onMounted(() =>{
  init();
})

// 前往添加地址页面
const onAdd = () => {
  router.push({ path: 'edit-address', query: { type: 'add', from: state.from  } })
}
// 前往地址编辑页面
const onEdit = (item) => {
  router.push({ path: 'edit-address', query: { type: 'edit', addressId: item.id, from: state.from  } })
}
// 选择某个地址后，跳回订单生成页面
const select = (item, index) => {
  router.push({ path: 'create-order', query: { addressId: item.id, from: state.from  } })
}

const init = async() =>{
  const { data } = await getAddressList();
  if(!data){
    state.list = [];
    return;
  }
  state.list = data.map(item=>{
    return {
      id: item.addressId,
      name: item.userName,
      tel: item.userPhone,
      address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
      isDefault: !!item.defaultFlag
    }
  })
}
</script>

<style lang="less" scoped></style>
