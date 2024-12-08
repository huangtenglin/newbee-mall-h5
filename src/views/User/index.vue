<template>
    <div class="user">
        <Header title="个人中心"/>
        <main class="main">
            <van-skeleton title :avatar="true" :row="3" :loading="state.loading">
                <div class="person_info">
                    <img class="person_info_avater" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="avater"></img>
                    <div v-if="state.user" class="person_info_detail">
                        <div class="nicheng" v-for="(item,index) in state.user" :key="index">
                            <span>{{item.name}}：</span>
                            <span>{{ item.title }}</span>
                        </div>
                    </div>
                </div>
            </van-skeleton>
            <div class="list">
                <div v-for="(item,index) in lists" :key="index" class="list_item" @click="handlePath(item)">
                    <span class="list_item_name">{{ item.name }}</span>
                    <van-icon name="arrow" class="list_item_icon"/>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import { getUserInfo } from '@/service/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const state = reactive({
  user: [],
  loading: true
})

const lists = [
    {
        name: '我的订单',
        path: '/create-order'
    },
    {
        name: '账号管理',
        path: '/account',
    },
    {
        name: "地址管理",
        path: '/add-address'
    },
    {
        name: '关于我们',
        path: '/about'
    }
]
// 字典匹配
const desc = {
    "introduceSign": '个性签名',
    "nickName": "昵称",
    "loginName": "登录名"
}
const initData = async () => {
    try {
        const { data } = await getUserInfo();
        // 对象数据转化
        Object.entries(data).forEach(([key,value]) =>{
            state.user.push({
                title: value,
                name: desc[key]
            })
        })
        console.log(state.user)
    } catch (error) {
        console.log("获取个人用户信息数据失败", error);
    } finally {
        state.loading = false;
    }
}

onMounted(() =>{
    initData();
})


const handlePath = (item) =>{
    router.push({path: item.path, query: item.path === '/add-address' ? { from: 'mine'}: {}})
}
</script>


<style lang='less' scoped>
.main{
    height: calc(100vh - 44px);
    background: #000;
    margin-top: 44px;
    padding: 10px;
    .person_info{
        background: linear-gradient(90deg, #1baeae, #51c7c7);
        width: 100%;
        height: 120px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        gap: 20px;
        &_avater{
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
        &_detail{
            color: white;
            font-size: 16px;
        }
    }
    .list{
        &_item{
            border-bottom: 1px solid rgba(255,255,255,.2);
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &_name{
                color: #2c3e50;
            }
            &_icon{
                font-size: 20px;
            }
            &:nth-last-child(1){
                border: none;
            }
        }

    }
}
</style>