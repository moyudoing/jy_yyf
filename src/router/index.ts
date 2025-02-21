import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: 'home',
                name: 'homeView',
                component: () => import('@/views/HomeView.vue'),
                meta: {
                    title: '首页',
                    icon: 'home'
                }
            },
            {
                path: 'product',
                name: 'productView',
                component: () => import('@/views/ProductView/index.vue'),
                meta: {
                    title: '产品',
                    icon: 'product'
                }
            },
            {
                path: 'guozhuangVillage',
                name: 'guozhuangVillageView',
                component: () => import('@/views/GuozhuangVillageView.vue'),
                meta: {
                    title: '美丽郭庄',
                    icon: 'guozhuangVillage'
                }
            },
            {
                path: 'rDProcess',
                name: 'rDProcessView',
                component: () => import('@/views/RDProcessView.vue'),
                meta: {
                    title: '研发历程',
                    icon: 'rDProcess'
                }
            },
            {
                path: 'team',
                name: 'teamView',
                component: () => import('@/views/TeamView/index.vue'),
                meta: {
                    title: '团队',
                    icon: 'team'
                }
            }
        ]
    }
];

const mainRouter = createRouter({
    history: createWebHashHistory('/jy_yyf/'),
    routes
});

export default mainRouter;
