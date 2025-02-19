<template>
  <div class="mobile-products-nav">
    <!-- 移动端产品导航内容 -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeThreshold = 100;
  if (touchEndX.value < touchStartX.value - swipeThreshold) {
    window.location.href = '../../../pages/products/high-entropy.html';
  }
};

onMounted(() => {
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchend', handleTouchEnd);
});
</script>
