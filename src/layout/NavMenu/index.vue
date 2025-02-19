<template>
  <div class="nav-container">
    <Computer />
    <MobileTerminal />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNavStore } from '@/stores/navStore';
import Computer from './Computer.vue';
import MobileTerminal from './MobileTerminal.vue';

const navStore = useNavStore();
const { checkScreenSize } = navStore;



onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>

<style scoped>
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
