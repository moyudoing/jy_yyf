<template>
  <div class="banner">
    <el-carousel height="var(--container-height-medium)">
      <el-carousel-item v-for="(image, index) in bannerImages" :key="index">
        <img :src="image" alt="BannerImage" class="banner-image">
      </el-carousel-item>
    </el-carousel>
    <div class="banner-overlay">
      <h1>菊芋营养粉</h1>
      <p class="subtitle">源自天然 • 科技萃取 • 营养健康</p>
      <div class="banner-buttons">
        <a class="btn btn-primary hover-lift" href="">了解更多</a>
        <a class="btn btn-outline hover-lift" href="">联系我们</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 使用 import.meta.glob 动态导入图片
const imageModules = import.meta.glob('@/assets/images/banner/*.{png,jpg}', { eager: true });
const bannerImages = ref<string[]>(Object.values(imageModules).map((module: any) => module.default));

</script>

<style scoped lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Banner 容器 */
.banner {
  position: relative;
  width: 100%;
  height: var(--container-height-medium);
  overflow: hidden;
  background: var(--background-dark)
}

.el-carousel {
  width: 100%;
  height: 100%;
}

/* Banner 图片 */
.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.banner:hover .banner-image {
  transform: scale(1);
}

/* Banner 遮罩 */
.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  color: var(--text-color-inverse);
}

.banner-overlay h1 {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.banner-overlay .subtitle {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

/* Banner 按钮组 */
.banner-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.banner-buttons .btn {
  min-width: 160px;
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

/* 动画效果 */
@keyframes bannerFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .banner {
    min-height: 500px;
  }

  .banner-overlay h1 {
    font-size: 2.5rem;
  }

  .banner-overlay .subtitle {
    font-size: 1.25rem;
  }

  .banner-buttons {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .banner-buttons .btn {
    width: 100%;
    max-width: 300px;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
