<template>
    <Header title="地址管理"/>
    <main class="main" v-if="!state.isShowAddAddress">
        <van-address-list
            v-model="state.chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
    </main>
    <AddAddress class="main" v-if="state.isShowAddAddress"/>
</template>
<script setup>
import Header from '@/components/Header.vue'
import AddAddress from '@/components/AddAddress.vue'
import { ref, reactive } from 'vue'
const state = reactive({
    chosenAddressId: "1",
    isShowAddAddress: false
})
const list = [
      {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      },
      {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
      },
    ];

    // 增加地址
    const onAdd = () =>{
        console.log("增加地址")
        state.isShowAddAddress = true;
    }
    // 编辑地址
    const onEdit = () =>{
        console.log("编辑地址")
    }

</script>


<style lang='less' scoped>
.main{
    margin-top: 50px;
}
</style>