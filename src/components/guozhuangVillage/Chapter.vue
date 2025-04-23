<template>
  <div class="chapter" ref="chapterRef">

    <!-- 时间线 -->
    <div class="timeline-marker">
      <div class="year">{{ chapter.year }}</div>
      <div class="line" ref="lineRef"></div>
    </div>

    <!-- 内容区 -->
    <div class="chapter-content">
      <h2 class="chapter-title">
        <span class="number">0{{ index + 1 }}</span>
        {{ chapter.title }}
      </h2>

      <!-- 媒体容器 -->
      <div class="story-media">
        <video
            v-if="chapter.media.endsWith('.mp4')"
            :src="chapter.media"
            muted
            loop
            playsinline
            autoplay
        />
        <img v-else :src="chapter.media" :alt="chapter.title" />
      </div>
      <div class="text-content">
        <p class="paragraph">{{ chapter.content }}</p>
        <blockquote class="quote">{{ chapter.quote }}</blockquote>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
defineProps({
  chapter: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});
const chapterRef = ref<HTMLElement | null>(null);
const lineRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (chapterRef.value && lineRef.value) {
    // 获取章节内容的高度
    const chapterHeight = chapterRef.value.offsetHeight;
    // 设置时间线的高度
    lineRef.value.style.height = `${chapterHeight}px`;
  }
});
</script>

<style scoped lang="scss">

$primary-color: #2c3e50;
$accent-color: #e74c3c;
$golden-light: #f40000;
$background-gradient-start: rgba(151, 8, 8, 0.9);
$background-gradient-end: rgba(67, 6, 6, 0.9);

.chapter {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 4rem;
  margin-bottom: 12rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  .timeline-marker {
    position: relative;

    .year {
      font-size: 2.5rem;
      color: $golden-light;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      text-shadow: 0 0 5px rgba(241, 196, 15, 0.5);
    }

    .line {
      position: absolute;
      left: 60px;
      top: 0;
      width: 2px;
      background: linear-gradient(
              to bottom,
              $golden-light,
              rgba(241, 196, 15, 0.2)
      );
    }
  }

  .chapter-content {
    .chapter-title {
      font-size: 2.8rem;
      margin-bottom: 2rem;
      opacity: 0;
      transform: translateX(-50px);
      transition: all 1s ease;
      color: $primary-color;

      .number {
        color: $accent-color;
        margin-right: 1rem;
      }

      &.active {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .story-media {
      display: grid;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      transform: translateZ(0);
      transition: all 0.3s ease;

      video,
      img {
        width: 100%;
        height: 500px;
        object-fit: cover;
        filter: grayscale(0.2);
        transition: filter 0.5s;
      }

      &:hover {
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        transform: scale(1.02);

        video,
        img {
          filter: grayscale(0);
        }
      }
    }

    .text-content {
      margin-top: 3rem;
      padding-left: 2rem;

      .paragraph {
        font-size: 1.2rem;
        line-height: 2;
        position: relative;
        color: #555;

        &::before {
          content: '';
          position: absolute;
          left: -30px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: $accent-color;
        }
      }

      .quote {
        font-style: italic;
        font-size: 1.4rem;
        margin: 2rem 0;
        padding: 1rem;
        border-left: 4px solid $golden-light;
        background: rgba(255, 255, 255, 0.05);
        color: #777;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}
</style>
