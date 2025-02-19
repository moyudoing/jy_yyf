<template>
  <div>
    <div v-if="isMobile" class="mobile-menu-toggle" @click="toggleMobileMenu">
      <i class="el-icon-menu"></i>
    </div>
    <el-menu
        v-if="isMobile && isMobileMenuOpen"
        class="mobile-nav-menu"
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
import { useNavStore } from '@/stores/navStore';

const navStore = useNavStore();
const { isMobile, isMobileMenuOpen, activeRoute, routes, navigateTo, toggleMobileMenu } = navStore;
</script>

<style scoped>
.mobile-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.mobile-menu-toggle {
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.mobile-nav-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
}
</style>
