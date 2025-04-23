<template>
  <div class="process-flow">
      <g
          v-for="(step, index) in steps"
          :key="`circle-${index}`"
          @mouseenter="playStepAnimation(index)"
      >
        <circle :cx="step.x || 0" :cy="step.y || 0" r="20" fill="#3498db" />
        <text :x="step.x || 0" :y="(step.y || 0) + 5" text-anchor="middle" fill="white">
          {{ index + 1 }}
        </text>
      </g>
    <div class="step-cards">
      <div
          v-for="(step, index) in steps"
          :key="`card-${index}`"
          class="step-card"
          @mouseenter="playStepAnimation(index)"
      >
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

// 定义步骤数据的类型
interface Step {
  title: string;
  description: string;
  icon: string;
  path: string;
  duration: number;
  lineDash: number[];
  x?: number;
  y?: number;
}

// 初始化步骤数据
const steps = ref<Step[]>([
  {
    title: '原料筛选',
    description: '11',
    icon: 'mdi-filter',
    path: 'M12 15l5-6H7z',
    duration: 0.8,
    lineDash: [324, 324],
  },
  {
    title: '加工工艺',
    description: '11',
    icon: 'mdi-cogs',
    path: 'M24 15l5-6H19z',
    duration: 0.8,
    lineDash: [324, 324],
  },
  {
    title: '加工工艺',
    description: '11',
    icon: 'mdi-cogs',
    path: 'M24 15l5-6H19z',
    duration: 0.8,
    lineDash: [324, 324],
  },
  {
    title: '加工工艺',
    description: '11',
    icon: 'mdi-cogs',
    path: 'M24 15l5-6H19z',
    duration: 0.8,
    lineDash: [324, 324],
  },
  {
    title: '加工工艺',
    description: '11',
    icon: 'mdi-cogs',
    path: 'M24 15l5-6H19z',
    duration: 0.8,
    lineDash: [324, 324],
  },
]);

// 播放步骤动画的函数
const playStepAnimation = (index: number) => {
  const step = steps.value[index];
  if (!step) {
    console.error(`步骤 ${index} 不存在`);
    return;
  }
  const pathElement = document.getElementById(`path-${index}`);
  if (!pathElement) {
    console.error(`未找到 ID 为 path-${index} 的路径元素`);
    return;
  }
  gsap.to(step, {
    lineDash: [0, 324],
    duration: step.duration,
    onUpdate: () => {
      pathElement.style.strokeDasharray = step.lineDash.join(' ');
    },
  });
};
</script>

<style lang="scss" scoped>
.process-flow {
  margin: 0 auto;
  width: 90%;
  position: relative;

  .step-card {
    transition: transform 0.3s;
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
  }

  svg {
    width: 100%;
    height: 400px;
  }
}
</style>
