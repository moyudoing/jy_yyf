<template>
  <div class="transition-end">
    <div class="evolve-text">
      <span>现在</span>
      <div class="line"></div>
      <span>开启健康新纪元</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';

onMounted(() => {
  // 封面标题入场动画
  gsap.to('.main-title .line', {
    opacity: 1,
    y: 0,
    stagger: 0.3,
    duration: 1.5,
    ease: 'power4.out'
  });
});
</script>

<style scoped lang="scss">
// 定义颜色变量
$primary-color: #2c3e50;
$accent-color: #e74c3c;
$golden-light: #f1c40f;
$background-gradient-start: rgba(190, 21, 21, 0.9);
$background-gradient-end: rgba(67, 6, 6, 0.9);

.transition-end {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
          to right,
          $primary-color 50%,
          $accent-color 50%
  );
  background-size: 200% 100%;
  animation: gradientShift 10s ease infinite;

  .evolve-text {
    font-size: 3rem;
    color: white;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    .line {
      width: 200px;
      height: 2px;
      background: white;
      margin: 2rem auto;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: -3px;
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        animation: pulse 1.5s infinite;
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
