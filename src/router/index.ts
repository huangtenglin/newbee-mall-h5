import { createWebHashHistory, createRouter } from 'vue-router';

const routes:any = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
            showNavBar: true,
            showHeader: false,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/index.vue'),
        meta: {
            showNavBar: false,
            showHeader: false,
        },
    },
    {
        path: "/user",
        name: 'user',
        component: () => import('@/views/User/index.vue'),
        meta: {
            showNavBar: true,
            showHeader: false,
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import("@/views/Cart/index.vue"),
        meta: {
            showNavBar: false,
            showHeader: false,
        }
    },
    {
        path: '/category',
        name: "category",
        component: () => import('@/views/Category/index.vue'),
        meta: {
            showNavBar: true,
            showHeader: false,
        }
    },
    {
        path: '/product/:id',
        name: 'product',
        component: () => import("@/views/ProductDetail/index.vue"),
        meta: {
            showNavBar:false,
            showHeader: false,
        }
    },
    {
        path: '/product-list',
        name: 'productList',
        component: () => import('@/views/ProductList/index.vue'),
        meta: {
            showNavBar: false,
            showHeader: false,
        }
    },
    {
        path: '/create-order',
        name: 'createOrder',
        component: () => import('@/views/CreateOrder/index.vue'),
        meta:{
            showNavBar: false,
            showHeader: false
        }
    },
    {
        path: '/add-address',
        name: 'addAddress',
        component: () => import("@/views/Address/AddAddress.vue"),
        meta:{
            showNavBar: false,
            showHeader: false
        }
    },
    {
        path: '/edit-address',
        name: 'editAddress',
        component: () => import("@/views/Address/EditAddress.vue"),
        meta:{
            showNavBar: false,
            showHeader: false
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import("@/views/About/index.vue"),
        meta:{
            showNavBar: false,
            showHeader: false
        }
    },
    {
        path: "/account",
        name: 'account',
        component: () => import("@/views/Account/index.vue"),
        meta:{
            showNavBar: false,
            showHeader: false
        }
    }
];
// @ts-ignore
const router = createRouter({
    history: createWebHashHistory(),  // 确保使用 createWebHistory
    routes
});

export default router;