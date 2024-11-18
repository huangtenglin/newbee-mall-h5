import { createWebHashHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
            showNavBar: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/index.vue'),
        meta: {},
    },
    {
        path: "/user",
        name: 'user',
        component: () => import('@/views/User/index.vue'),
        meta: {
            showNavBar: true,
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import("@/views/Cart/index.vue"),
        meta: {
            showNavBar: true,
        }
    },
    {
        path: '/category',
        name: "category",
        component: () => import('@/views/Category/index.vue'),
        meta: {
            showNavBar: true
        }
    }
];

const router = createRouter({
    history: createWebHashHistory(),  // 确保使用 createWebHistory
    routes
});

export default router;