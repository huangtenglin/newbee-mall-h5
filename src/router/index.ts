import { createWebHashHistory, createRouter } from 'vue-router';

const routes = [
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
            showNavBar: true,
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
        meta: {
            showNavBar: true,
            showHeader: false,
        }
    },
    {
        path: '/product-list',
        name: 'product-list',
        component: () => import('@/views/ProductList/index.vue'),
        meta: {
            showNavBar: false,
            showHeader: false,
        }
    }
];
// @ts-ignore
const router = createRouter({
    history: createWebHashHistory(),  // 确保使用 createWebHistory
    routes
});

export default router;