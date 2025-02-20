<template>
  <div class="container">
    <!-- 内容头部 -->
    <div class="section-header">
      <h2 class="section-title">产品成分</h2>
      <p class="section-subtitle">营养合理搭配</p>
    </div>

    <!-- 可视化仪表盘 -->
    <div class="grid-20-15">
      <!-- 动态饼图 -->
      <div class="glass-morphism">
        <VChart :option="chartOptions" class="nutrition-chart" autoresize />
      </div>

      <!-- 成分卡片 -->
      <div class="ingredient-cards-container">
        <div v-for="item in ingredients" :key="item.name" class="ingredient-card glass-morphism"
             :style="{ borderColor: item.color }" tabindex="0" role="button"
             @click="showDescription(item)">
          <h3>{{ item.name }}</h3>
          <span class="main-value">{{ item.value }}mg</span>
          <span class="dvp">({{ item.dvp }}% DV)</span>
        </div>
      </div>
    </div>

    <!-- 显示成分描述的区域 -->
    <transition name="slide-fade">
      <div v-if="selectedIngredient" class="ingredient-description glass-morphism">
        <div class="description-header">
          <div class="title-icon">
            <i class="fas fa-leaf"></i> <!-- 示例图标 -->
            <h3>{{ selectedIngredient.name }}</h3>
          </div>
          <button @click="hideDescription">
            <i class="fas fa-times"></i> <!-- 关闭图标 -->
          </button>
        </div>
        <div class="benefits-container">
          <h4>益处</h4>
          <ul>
            <li v-for="benefit in selectedIngredient.benefits" :key="benefit">{{ benefit }}</li>
          </ul>
        </div>
        <div class="description-container">
          <h4>描述</h4>
          <p>{{ selectedIngredient.description }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from 'vue';
import VChart from 'vue-echarts';
import '@/styles/layout/section.css';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { useIngredientsData, type Ingredient } from '@/stores/modules/ingredientsData.ts';

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

// 用于存储当前选中的成分，添加类型注解
const selectedIngredient = ref<Ingredient | null>(null);

// 处理卡片点击事件
const showDescription = (ingredient: Ingredient) => {
  selectedIngredient.value = ingredient;
};

// 处理关闭描述区域事件
const hideDescription = () => {
  selectedIngredient.value = null;
};

// 提取图表配置生成逻辑到单独的函数
const generateChartOptions = (ingredients: Ingredient[]) => ({
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
      data: ingredients.map(item => ({
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
});

// 计算图表选项
const chartOptions = computed(() => generateChartOptions(ingredients.value));
</script>

<style scoped>
/* 引入 Font Awesome 图标库 */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.nutrition-chart {
  width: 100%;
  height: 100%;
}

/* 玻璃质感样式 */
.glass-morphism {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-md);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), inset 0 0 15px rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: var(--spacing-sm);
}

/* 成分卡片容器样式 */
.ingredient-cards-container {
  display: grid;
  grid-template-columns: 1.2fr;
  gap: var(--spacing-sm);
}

.ingredient-cards-container h3 {
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-xs);
}

.ingredient-cards-container .main-value {
  font-weight: bold;
  color: var(--text-color);
  font-size: var(--font-size-sm-p);
}

/* 每日摄入量百分比样式 */
.ingredient-cards-container .dvp {
  color: var(--text-color-light);
  font-size: var(--font-size-sm-p);
}

.ingredient-cards-container .ingredient-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.ingredient-cards-container .ingredient-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

/* 成分描述样式 */
.ingredient-description {
  margin-top: var(--spacing-md);
  position: relative;
}

.description-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.title-icon {
  display: flex;
  align-items: center;
}

.title-icon i {
  margin-right: var(--spacing-xs);
  color: var(--text-color);
  font-size: var(--font-size-lg);
}

.description-header button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-lg);
  color: var(--text-color);
  transition: color 0.3s ease;
}

.description-header button:hover {
  color: var(--text-color-light);
}

.benefits-container,
.description-container {
  background: rgba(255, 255, 255, 0.7);
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.benefits-container h4,
.description-container h4 {
  font-size: var(--font-size-sm-p);
  margin-bottom: var(--spacing-xs);
  color: var(--text-color);
}

.benefits-container ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.benefits-container li {
  margin-bottom: var(--spacing-xs);
  color: var(--text-color-light);
}

/* 过渡效果 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
