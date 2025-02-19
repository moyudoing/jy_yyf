<template>
  <div :class="['nav-container', { 'mobile-nav': isMobile }]">
    <!-- 桌面端导航 -->
    <el-menu
        :class="{ 'desktop-nav':!isMobile }"
        mode="horizontal"
        :default-active="activeRoute"
        background-color="#333"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
      <el-menu-item v-for="route in routes" :key="route.name" :index="route.name" @click="navigateTo(route.path)">
        {{ route.meta.title }}
      </el-menu-item>
    </el-menu>
    <!-- 移动端导航 -->
    <div v-if="isMobile" class="mobile-menu-toggle" @click="toggleMobileMenu">
      <i class="el-icon-menu"></i>
    </div>
    <el-menu
        v-if="isMobileMenuOpen"
        :class="{ 'mobile-nav-menu': isMobile }"
        mode="vertical"
        :default-active="activeRoute"
        background-color="#333"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
      <el-menu-item v-for="route in routes" :key="route.name" :index="route.name" @click="navigateTo(route.path)">
        {{ route.meta.title }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import router from '@/router';

const routerInstance = useRouter();
const route = useRoute();

// 从路由配置中获取路由信息
const routes = router.getRoutes().filter(route => route.meta && route.meta.title);

// 响应式变量
const isMobile = ref(false);
const isMobileMenuOpen = ref(false);
const activeRoute = ref('');

// 导航到指定路由
const navigateTo = (path: string) => {
  routerInstance.push(path);
  if (isMobile.value) {
    toggleMobileMenu();
  }
};

// 切换移动端菜单显示状态
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 监听屏幕大小变化
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
  if (!isMobile.value) {
    isMobileMenuOpen.value = false;
  }
};

// 监听路由变化，更新激活的导航项
watchEffect(() => {
  activeRoute.value = route.name as string;
});

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>

<style scoped>

</style>
