<template>
  <section class="story-container">
    <!-- 时间轴故事 -->
    <StoryTimeline :chapters="chapters" index="123"/>
    <!-- 转场到产品 -->
    <TransitionEnd />
  </section>
</template>

<script setup lang="ts">
import StoryTimeline from '@/components/guozhuangVillage/StoryTimeline.vue';
import TransitionEnd from '@/components/guozhuangVillage/TransitionEnd.vue';
import { useChaptersData } from '@/stores/modules/chaptersData';

// 使用 Pinia 存储获取章节数据
const chaptersStore = useChaptersData();
const chapters = chaptersStore.story;
</script>

<style scoped lang="scss">
.story-container {
  font-family: 'Open Sans', sans-serif;
  overflow-x: hidden;
}
</style>
