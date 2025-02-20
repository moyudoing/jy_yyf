<template>
  <div class="container">
    <!-- 健康效益时间轴 -->
    <div class="benefit-timeline">
      <el-timeline>
        <el-timeline-item v-for="(benefit, index) in healthBenefits" :key="index"
                          :color=" 'var(--dark-primary-color)'" placement="top">
          <template #dot>
            <div class="timeline-dot"
                 :style="{ background: 'var(--text-color-inverse)' }">
              {{ index + 1 }}
            </div>
          </template>
          <h4>{{ benefit.title }}</h4>
          <div v-for="description in benefit.descriptions">
            <p>{{ description }}</p>
          </div>
          <div class="related-ingredients">
            <el-tag v-for="ing in benefit.relatedTo" :key="ing" effect="dark">
              {{ ing }}
            </el-tag>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useIngredientsData } from '@/stores/modules/ingredientsData.ts';

const ingredientsData = useIngredientsData();
const { healthBenefits } = toRefs(ingredientsData);
</script>

<style scoped>
/* 时间轴样式 */
.benefit-timeline {
  margin-top: 3rem;
}

.timeline-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  font-weight: bold;
}

.related-ingredients {
  margin-top: 8px;
}
</style>
