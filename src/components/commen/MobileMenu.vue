<template>
  <div>
    <button class="mobile-menu" @click="toggleNavLinks">菜单</button>
    <ul class="nav-links" :class="{ active: isNavLinksActive }">
      <!-- 导航链接内容 -->
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isNavLinksActive = ref(false);

const toggleNavLinks = () => {
  isNavLinksActive.value = !isNavLinksActive.value;
};
</script>
