import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import ProductFeature from "@/components/home/ProductFeature.vue";
import Banner from "@/components/home/Banner.vue";
import Report from "@/components/home/Reports.vue";
import IntroduceVideo from "@/components/home/IntroduceVideo.vue";
import Ingredients from "@/components/home/Ingredients.vue";

// 定义路由记录
const routes: RouteRecordRaw[] = [
    {
        path: '/banner',
        name: 'Banner',
        component: Banner
    },
    {
        path: '/product-feature',
        name: 'ProductFeature',
        component: ProductFeature
    },
    {
        path: '/introduce-video',
        name: 'IntroduceVideo',
        component: IntroduceVideo
    },
    {
        path: '/report',
        name: 'Report',
        component: Report
    },
    {
        path: '/ingredients',
        name: 'Ingredients',
        component: Ingredients
    }
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
