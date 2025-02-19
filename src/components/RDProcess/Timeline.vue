<template>
  <!-- 研发历程部分 -->
  <section id="development" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">研发历程</h2>
        <p class="section-subtitle">不断创新，持续进步</p>
        <div class="timeline-gallery">
          <div class="timeline-container">
            <div class="gallery-container">
              <!-- 研发历程将通过JavaScript动态生成 -->
              <div
                  class="gallery-item"
                  :class="{ active: index === currentIndex }"
                  :data-year="item.year"
                  v-for="(item, index) in timeline"
                  :key="index"
              >
                <div class="timeline-content">
                  <div class="timeline-year">{{ item.year }}</div>
                  <h3 class="timeline-title">{{ item.title }}</h3>
                  <p class="timeline-description">{{ item.description }}</p>
                </div>
                <div class="timeline-image">
                  <img :src="item.image" :alt="item.title" />
                </div>
              </div>
            </div>
            <div class="gallery-nav">
              <button
                  class="nav-dot"
                  :class="{ active: index === currentIndex }"
                  :data-index="index"
                  :aria-label="'查看第' + (index + 1) + '项'"
                  @click="goToSlide(index)"
                  v-for="(_, index) in timeline"
                  :key="index"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import "@/styles/layout/section.css";
import { useTimelineStore } from "@/stores/modules/timeLineData.ts";

// 从 Pinia 存储中获取 timeline 数据
const timeLineStore = useTimelineStore();
const timeline = timeLineStore.getAllTimeline;

// 初始化状态
const container = ref<HTMLElement | null>(null);
const galleryContainer = ref<HTMLElement | null>(null);
const navDots = ref<NodeListOf<HTMLButtonElement> | null>(null);
const currentIndex = ref(0);
const isAnimating = ref(false);
const startX = ref(0);
const currentX = ref(0);
let autoplayInterval: ReturnType<typeof setInterval>;

// 切换到指定幻灯片
const goToSlide = (index: number) => {
  if (isAnimating.value) return;
  isAnimating.value = true;

  currentIndex.value = index;
  const translateX = -index * 100;

  if (galleryContainer.value) {
    galleryContainer.value.style.transform = `translateX(${translateX}%)`;
  }

  // 更新导航点状态
  updateNavDots(index);
  // 更新幻灯片状态
  updateSlides(index);

  setTimeout(() => {
    isAnimating.value = false;
  }, 600);
};

// 更新导航点状态
const updateNavDots = (index: number) => {
  if (navDots.value) {
    navDots.value.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
};

// 更新幻灯片状态
const updateSlides = (index: number) => {
  if (container.value) {
    const items = container.value.querySelectorAll('.gallery-item');
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }
};

// 触摸事件处理
const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX;
  currentX.value = startX.value;
};

const handleTouchMove = (e: TouchEvent) => {
  if (isAnimating.value) return;
  e.preventDefault();

  currentX.value = e.touches[0].clientX;
  const diff = currentX.value - startX.value;
  if (galleryContainer.value && container.value) {
    const translateX =
        -currentIndex.value * 100 + (diff / container.value.offsetWidth) * 100;
    galleryContainer.value.style.transform = `translateX(${translateX}%)`;
  }
};

const handleTouchEnd = () => {
  if (isAnimating.value) return;

  const diff = currentX.value - startX.value;
  if (container.value) {
    const threshold = container.value.offsetWidth * 0.2;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex.value > 0) {
        goToSlide(currentIndex.value - 1);
      } else if (diff < 0 && currentIndex.value < timeline.length - 1) {
        goToSlide(currentIndex.value + 1);
      } else {
        goToSlide(currentIndex.value);
      }
    } else {
      goToSlide(currentIndex.value);
    }
  }
};

// 自动播放
const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    const nextIndex = (currentIndex.value + 1) % timeline.length;
    goToSlide(nextIndex);
  }, 5000);
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

// 添加事件监听器
const addEventListeners = () => {
  if (galleryContainer.value) {
    galleryContainer.value.addEventListener('touchstart', handleTouchStart);
    galleryContainer.value.addEventListener('touchmove', handleTouchMove);
    galleryContainer.value.addEventListener('touchend', handleTouchEnd);
  }

  if (container.value) {
    container.value.addEventListener('mouseenter', stopAutoplay);
    container.value.addEventListener('mouseleave', startAutoplay);
  }
};

// 移除事件监听器
const removeEventListeners = () => {
  if (galleryContainer.value) {
    galleryContainer.value.removeEventListener('touchstart', handleTouchStart);
    galleryContainer.value.removeEventListener('touchmove', handleTouchMove);
    galleryContainer.value.removeEventListener('touchend', handleTouchEnd);
  }

  if (container.value) {
    container.value.removeEventListener('mouseenter', stopAutoplay);
    container.value.removeEventListener('mouseleave', startAutoplay);
  }
};

onMounted(() => {
  container.value = document.querySelector('.timeline-gallery');
  if (!container.value) return;

  galleryContainer.value = container.value.querySelector('.gallery-container');
  navDots.value = container.value.querySelectorAll('.nav-dot');

  // 添加事件监听
  addEventListeners();
  // 开始自动播放
  startAutoplay();

  // 使用 watchEffect 监听 currentIndex 变化，确保初始状态正确
  watchEffect(() => {
    updateNavDots(currentIndex.value);
    updateSlides(currentIndex.value);
  });
});

onUnmounted(() => {
  // 移除事件监听
  removeEventListeners();
  // 停止自动播放
  stopAutoplay();
});
</script>

<style scoped>
/* 时间线容器 */
.timeline-section {
  padding: var(--spacing-3xl) 0;
  position: relative;
  overflow: hidden;
  background: var(--background-alt);
}

.timeline-container {
  /*position: relative;*/
  /*width: 100%;*/
  /*height: 700px;*/
  /*overflow: hidden;*/
  /*border-radius: var(--radius-lg);*/
  /*margin: var(--spacing-3xl) auto;*/
  /*max-width: var(--container-max-width-1);*/
  /*background: var(--background-color);*/
  /*box-shadow: var(--shadow);*/
}

.timeline-wrapper {
  position: relative;
  padding: var(--spacing-2xl) 0;
}

/* 时间线项目 */
.timeline-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  padding: var(--spacing-xl) 0;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--primary-color);
  opacity: 0.2;
  transform: translateX(-50%);
}

.timeline-item.active {
  opacity: 1;
  transform: translateY(0);
}

/* 时间线内容 */
.timeline-content {
  padding: var(--spacing-xl);
  background: var(--background-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  transform: translateX(-30px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item.active .timeline-content {
  transform: translateX(0);
  opacity: 1;
  transition-delay: 0.2s;
}

.timeline-year {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  line-height: 1;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item.active .timeline-year {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.3s;
}

.timeline-title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--text-color);
}

.timeline-description {
  color: var(--text-color-light);
  line-height: 1.6;
}

/* 时间线图片 */
.timeline-image {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transform: perspective(1000px) rotateY(-15deg) translateX(30px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item.active .timeline-image {
  transform: perspective(1000px) rotateY(0) translateX(0);
  opacity: 1;
  transition-delay: 0.4s;
}

.timeline-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  transition: transform 0.6s ease;
}

.timeline-item:hover .timeline-image img {
  transform: scale(1);
}

/* 导航点 */
.timeline-nav {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.nav-dot {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: var(--background-alt);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.nav-dot.active {
  background: var(--primary-color);
  transform: scale(1.2);
}

/* 响应式调整 */
@media (max-width: 992px) {
  .timeline-item {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .timeline-content {
    order: 2;
    text-align: center;
    transform: translateY(30px);
  }

  .timeline-image {
    order: 1;
    transform: perspective(1000px) rotateY(0) translateY(-30px);
  }

  .timeline-item::before {
    left: 20px;
  }
}

@media (max-width: 768px) {
  .timeline-year {
    font-size: 2.5rem;
  }

  .timeline-title {
    font-size: 1.25rem;
  }

  .timeline-content {
    padding: var(--spacing-lg);
  }

  .nav-dot {
    width: 10px;
    height: 10px;
  }
}
</style>
