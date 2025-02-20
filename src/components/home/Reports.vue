<template>
  <!-- 检测报告部分 -->
  <section id="reports" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">检测报告</h2>
        <p class="section-subtitle">权威机构认证，品质有保障</p>
      </div>
      <div class="grid">
        <template v-if="reportStore.reports.length > 0">
          <div
              v-for="(report, index) in reportStore.reports"
              :key="report.id"
              class="report-card"
              @click="reportStore.showReport(index)"
          >
            <img :src="report.image" :alt="report.title" class="report-thumbnail" />
            <div class="report-info">
              <h3 class="report-title">{{ report.title }}</h3>
              <p class="report-description">{{ report.description }}</p>
              <span class="report-date">{{ report.date }}</span>
            </div>
          </div>
        </template>
        <p v-else>暂无检测报告数据。</p>
      </div>
    </div>
  </section>
  <div id="report-modal" :class="{ active: reportStore.isModalActive }" @click.self="reportStore.hideReport">
    <img
        id="report-image"
        :src="reportStore.reports[reportStore.currentReportIndex]?.image"
     :alt="reportStore.reports[reportStore.currentReportIndex]?.title"/>
    <span class="modal-close" @click="reportStore.hideReport">&times;</span>
  </div>
</template>

<script setup lang="ts">
import { useReportsStore } from '@/stores/modules/reportData.ts';

// 引入报告存储
const reportStore = useReportsStore();
</script>

<style scoped>
.report-card {
  position: relative;
  cursor: pointer;
  background: var(--background-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  aspect-ratio: 1/1.4142; /* A4纸比例 */
}

.report-card:hover {
  transform: translateY(-10px) rotateY(10deg);
  box-shadow: var(--shadow-lg);
  z-index: 2;
}

.report-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.95);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.report-card:hover .report-thumbnail {
  filter: brightness(1.05);
  transform: scale(1.05);
}

/* 检测报告查看器 */
#report-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: var(--z-modal);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: var(--spacing-xl);
}

#report-modal.active {
  opacity: 1;
  visibility: visible;
}

#report-image {
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  transform: scale(0.95) translateY(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--background-color);
  padding: var(--spacing-sm);
}

#report-modal.active #report-image {
  transform: scale(1) translateY(0);
}

.modal-close {
  position: absolute;
  top: var(--spacing-xl);
  right: var(--spacing-xl);
  width: var(--icon-xl);
  height: var(--icon-xl);
  color: var(--background-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.modal-close:hover {
  transform: rotate(90deg);
}

.report-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: var(--spacing-lg);
  background: linear-gradient(
      transparent,
      rgba(0, 0, 0, 0.6) 20%,
      rgba(0, 0, 0, 0.9)
  );
  color: white;
  transform: translateY(100%);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
}

.report-card:hover .report-info {
  transform: translateY(0);
}

.report-title {
  font-size: var(--font-size-sm-p);
  color: var(--text-color-inverse);
  margin-bottom: var(--spacing-sm);
}

.report-description{
  font-size: var(--font-size-sm);
  color: var(--text-color-inverse);
  margin-bottom: var(--spacing-xs);
}

.report-date {
  font-size: var(--font-size-xs);
  color: var(--text-color-light-double);
}

</style>
