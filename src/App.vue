<template>
  <div id="app">
    <NavMenu class="nav-menu" />
    <div class="main-content">
      <!-- 通过绑定路由的 fullPath 作为 key，确保每次路由变化时组件重新渲染 -->
      <router-view :key="$route.fullPath" />
    </div>

    <Footer class="footer"/>
    <SideNav class="side-nav"/>
  </div>
</template>

<script setup lang="ts">
import NavMenu from '@/layout/NavMenu/index.vue';
import Footer from '@/layout/Footer.vue'
import SideNav from '@/layout/SideNav.vue'
</script>

<style scoped>
/* 全局样式 */
body {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 主要内容区域样式 */
.main-content {
  flex: 1;
  padding-top: 60px; /* 空出导航栏的空间 */
}

</style>
