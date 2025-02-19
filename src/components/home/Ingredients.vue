<template>
  <div class="container">
    <!-- 内容头部 -->
    <div class="content-header">
      <h2 class="section-title">产品成分</h2>
      <p class="section-subtitle">营养合理搭配</p>
    </div>

    <!-- 可视化仪表盘 -->
    <div class="dashboard-grid">
      <!-- 动态饼图 -->
      <div class="chart-card glassmorphism">
        <VChart :option="chartOptions" class="nutrition-chart" autoresize />
      </div>

      <!-- 成分卡片 -->
      <div class="ingredient-cards-container">
        <div v-for="item in ingredients" :key="item.name" class="ingredient-card glassmorphism"
             :style="{ borderColor: item.color }" tabindex="0" role="button">
          <h3>{{ item.name }}</h3>
          <span class="main-value">{{ item.value }}mg</span>
          <span class="dvp">({{ item.dvp }}% DV)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, toRefs } from 'vue';
import VChart from 'vue-echarts';
import '@/styles/layout/section.css';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { useIngredientsData } from '@/stores/modules/ingredientsData.ts';

// 注册必须的组件
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

const ingredientsData = useIngredientsData();
const { ingredients } = toRefs(ingredientsData);

// 计算图表选项
const chartOptions = computed(() => ({
  tooltip: {
    formatter: '{b}: {c}mg ({d}%)'
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 3
      },
      data: ingredients.value.map(item => ({
        value: item.value,
        name: item.name,
        itemStyle: { color: item.color }
      })),
      label: {
        show: false
      },
      emphasis: {
        scaleSize: 7
      }
    }
  ]
}));

watch(ingredients, () => {
}, { deep: true });
</script>

<style scoped>
/* 全局样式重置和基础样式 */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}

/* 玻璃质感样式 */
.glassmorphism {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), inset 0 0 15px rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1.5rem;
}

/* 仪表盘网格样式 */
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1.5fr; /* 调整为 2:1 的布局 */
  gap: var(--spacing-md);
}

.dashboard-grid .chart-card {
  min-height: 400px;
}

/* 成分卡片容器样式 */
.ingredient-cards-container {
  display: grid;
  grid-template-columns: 1.2fr;
  gap: var(--spacing-sm);
}

/* 成分卡片样式 */
.ingredient-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.ingredient-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}
</style>
