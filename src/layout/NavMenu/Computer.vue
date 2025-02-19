<template>
  <el-menu
      v-if="!isMobile"
      class="desktop-nav"
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
</template>

<script setup lang="ts">
import { useNavStore } from '@/stores/navStore';

const navStore = useNavStore();
const { isMobile, activeRoute, routes, navigateTo } = navStore;
</script>

<style scoped>
.desktop-nav {
  display: flex;
  justify-content: center;
}
</style>
