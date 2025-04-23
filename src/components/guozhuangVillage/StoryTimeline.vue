<template>
  <div class="timeline">
    <Chapter v-for="(chapter, index) in chapters" :key="index"
             :chapter="chapter" :index="index" />
  </div>
</template>

<script setup lang="ts">
import Chapter from './Chapter.vue';
import { onMounted } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { defineProps } from 'vue';

// 定义 props
defineProps({
  chapters: {
    type: Array as () => Array<{ [key: string]: any }>,
    required: true
  },
  index: {
    type: String,
    required: true
  },
});

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // 章节标题动画
  gsap.utils.toArray('.chapter-title').forEach((title: unknown) => {
    const titleElement = title as HTMLElement;
    ScrollTrigger.create({
      trigger: titleElement,
      start: 'top center',
      onEnter: () => titleElement.classList.add('active')
    });
  });

  // 媒体元素视差
  gsap.utils.toArray('.story-media').forEach((media: unknown) => {
    const mediaElement = media as HTMLElement;
    gsap.fromTo(
        mediaElement,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: mediaElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
    );
  });

  // 章节触发动画
  gsap.utils.toArray('.chapter').forEach((chapter: unknown) => {
    const chapterElement = chapter as HTMLElement;
    ScrollTrigger.create({
      trigger: chapterElement,
      start: 'top 70%',
      onEnter: () => {
        const title = chapterElement.querySelector('.chapter-title') as HTMLElement | null;
        title?.classList.add('active');
        const storyMedia = chapterElement.querySelector('.story-media') as HTMLElement | null;
        if (storyMedia) {
          gsap.to(storyMedia, {
            scale: 1.05,
            duration: 1.5,
            scrollTrigger: {
              scrub: true
            }
          });
        }
      }
    });
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

.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 0;
}
</style>
