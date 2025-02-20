import { createRouter, createWebHistory } from 'vue-router';

import Product from '@/views/ProductView/index.vue';
import GuozhuangVillage from "@/views/GuozhuangVillageView.vue";
import RDProcess from "@/views/RDProcessView.vue";
import Home from '@/views/HomeView.vue'
import Team from '@/views/TeamView/index.vue'


const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'homeView',
        component: Home,
        meta: {
            title: '首页',
            icon: 'home'
        },
        // children: [
        //     {
        //         path: '/banner',
        //         name: 'banner',
        //         component: Banner,
        //         meta: {
        //             icon: 'banner'
        //         }
        //     },
        //
        // ]
    },
    {
        path: '/product',
        name: 'productView',
        component: Product,
        meta: {
            title: '产品',
            icon: 'product'
        }
    },
    {
        path: '/guozhuangVillage',
        name: 'guozhuangVillageView',
        component: GuozhuangVillage,
        meta: {
            title: '美丽郭庄',
            icon: 'guozhuangVillage'
        }
    },
    {
        path: '/rDProcess',
        name: 'rDProcessView',
        component: RDProcess,
        meta: {
            title: '研发历程',
            icon: 'rDProcess'
        }
    },
    {
        path: '/team',
        name: 'teamView',
        component: Team,
        meta: {
            title: '团队',
            icon: 'team'
        }
    }
];

const router = createRouter({
    history: createWebHistory('/jy_yyf/'),
    routes
});

export default router;
