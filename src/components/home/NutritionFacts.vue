<template>
  <div class="nutrition-facts-container">
    <!-- 标题区 -->
    <div class="section-header">
      <h2 class="science-title">
        <span class="gradient-text">分子级营养解析</span>
        <span class="subtitle">Science Behind the Formula</span>
      </h2>
    </div>

    <!-- 主内容区 -->
    <div class="main-grid">
      <!-- 营养成分导航 -->
      <div class="nutrient-nav">
        <div
            v-for="nutrient in nutrients"
            :key="nutrient.name"
            class="nav-card"
            :class="{ active: activeNutrient === nutrient }"
            @click="activeNutrient = nutrient"
        >
          <img
              :src="`/icons/${nutrient.icon}.svg`"
              class="nav-icon"
          >
          <div class="nav-info">
            <h3>{{ nutrient.name }}</h3>
            <div class="amount">{{ nutrient.amount }}</div>
          </div>
        </div>
      </div>

      <!-- 详细信息区 -->
      <div class="detail-panel glassmorphism">
        <!-- 分子结构可视化 -->
        <div class="molecule-viewer">
          <div class="view-controls">
            <button
                v-for="view in ['wireframe', 'ball-and-stick', 'space-filling']"
                :key="view"
                :class="{ active: structureView === view }"
            >
              {{ view === 'wireframe' ? '线框模型' : view === 'ball-and-stick' ? '球棍模型' : '空间填充' }}
            </button>
          </div>
          <div class="canvas-wrapper">
            <!-- 3D分子结构实现区域 -->
            <Molecule3DViewer
                :structure="activeNutrient.chemicalStructure"
                :display-style="structureView"
            />
          </div>
        </div>

        <!-- 健康效益仪表盘 -->
        <div class="benefit-dashboard">
          <div class="gauge-chart">
            <GaugeChart
                :option="chartOptions"
            />
            <div class="gauge-label">每日建议摄入占比</div>
          </div>

          <div class="function-list">
            <div
                v-for="(func, index) in activeNutrient.keyFunctions"
                :key="index"
                class="function-item"
            >
              <div class="index">{{ index + 1 }}</div>
              <div class="text">{{ func }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 科学背书栏 -->
    <div class="science-bar">
      <div class="research-card">
        <div class="badge">临床研究</div>
        <h4>J Nutr. 2022 研究证实</h4>
        <p>维生素D与钙协同作用可提升骨密度达37%</p>
      </div>
      <div class="divider"></div>
      <div class="certification">
        <img
            src="@/assets/favicon.ico"
            class="cert-icon"
            alt=""
        >
        <span>NSF认证成分</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import GaugeChart from 'vue-echarts';
import Molecule3DViewer from '../commen/Molecule3DViewer.vue'; // 导入3D分子查看器组件
import * as echarts from 'echarts';

interface Nutrient {
  name: string;
  icon: string;
  dailyValue: number; // %
  amount: string;
  benefits: string[];
  chemicalStructure: string;
  keyFunctions: string[];
}

const nutrients = ref<Nutrient[]>([
  {
    name: '维生素D',
    icon: 'vitamin-d',
    dailyValue: 200,
    amount: '15μg/份',
    benefits: ['促进钙吸收', '增强免疫力', '调节情绪'],
    chemicalStructure: 'C₂₇H₄₄O',
    keyFunctions: ['骨骼健康', '免疫调节', '神经传导']
  },
  // 其他营养成分数据...
]);

const activeNutrient = ref<Nutrient>(nutrients.value[0]);

// 3D分子结构动画控制
const structureView = ref<'wireframe' | 'ball-and-stick' | 'space-filling'>('ball-and-stick');

// 动态图表配置
const chartOptions = computed(() => ({
  animationDuration: 2000,
  series: [{
    type: 'gauge',
    radius: '90%',
    pointer: { show: false },
    progress: {
      show: true,
      width: 18,
      roundCap: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
            0, 0, 1, 0,
            [{ offset: 0, color: '#9b59b6' }, { offset: 1, color: '#3498db' }]
        )
      }
    },
    axisLine: { lineStyle: { width: 18 } },
    detail: {
      valueAnimation: true,
      fontSize: 24,
      offsetCenter: [0, '70%'],
      formatter: `${activeNutrient.value.dailyValue}%`
    },
    data: [{ value: activeNutrient.value.dailyValue }]
  }]
}));
</script>

<style scoped lang="scss">
/* 定义颜色变量 */
$primary-color: #2c3e50;
$accent-color: #3498db;
$science-purple: #9b59b6;
$background-color: #f9f9f9;
$card-bg-color: rgba(255, 255, 255, 0.9);
$shadow-color: rgba(0, 0, 0, 0.1);

.nutrition-facts-container {
  font-family: 'Open Sans', sans-serif;
  background-color: $background-color;
  padding: 2rem 0;

  .section-header {
    text-align: center;
    padding: 2rem 0;

    .science-title {
      font-family: 'Roboto Condensed', sans-serif;

      .gradient-text {
        background: linear-gradient(135deg, $science-purple, $accent-color);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        display: block;
        font-size: 3rem;
        font-weight: bold;
      }

      .subtitle {
        font-size: 1rem;
        letter-spacing: 0.2em;
        color: #7f8c8d;
      }
    }
  }

  .main-grid {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .nutrient-nav {
    .nav-card {
      background: $card-bg-color;
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      box-shadow: 0 4px 8px $shadow-color;

      &:hover {
        transform: translateX(8px);
        box-shadow: 0 6px 12px $shadow-color;
      }

      &.active {
        border-left: 4px solid $science-purple;
        background: linear-gradient(
                to right,
                rgba(155, 89, 182, 0.1) 0%,
                $card-bg-color 50%
        );
      }

      .nav-icon {
        width: 35px;
        margin-right: 0.8rem;
        filter: drop-shadow(0 2px 4px $shadow-color);
      }

      .nav-info {
        h3 {
          font-size: 1.1rem;
          margin: 0;
          color: $primary-color;
        }

        .amount {
          font-size: 0.8rem;
          color: #7f8c8d;
        }
      }
    }
  }

  .detail-panel {
    border-radius: 16px;
    padding: 1.5rem;
    background: $card-bg-color;
    box-shadow: 0 4px 8px $shadow-color;

    .molecule-viewer {
      height: 350px;
      position: relative;

      .view-controls {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 10;

        button {
          background: $card-bg-color;
          border: 1px solid #ddd;
          padding: 0.4rem 0.8rem;
          margin-left: 0.4rem;
          border-radius: 15px;
          transition: all 0.3s ease;
          font-size: 0.9rem;

          &:hover {
            background: #f0f0f0;
          }

          &.active {
            background: $science-purple;
            color: white;
          }
        }
      }
    }

    .benefit-dashboard {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 1.5rem;
      margin-top: 1.5rem;

      .gauge-chart {
        position: relative;

        .gauge-label {
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          font-size: 0.9rem;
          color: #7f8c8d;
        }
      }

      .function-list {
        .function-item {
          display: flex;
          align-items: center;
          padding: 0.8rem;
          background: rgba(155, 89, 182, 0.05);
          margin-bottom: 0.8rem;
          border-radius: 6px;

          .index {
            width: 25px;
            height: 25px;
            background: $science-purple;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 0.8rem;
            font-size: 0.9rem;
          }

          .text {
            font-size: 0.9rem;
            color: $primary-color;
          }
        }
      }
    }
  }

  .science-bar {
    max-width: 1100px;
    margin: 2rem auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(52, 152, 219, 0.1);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 8px $shadow-color;

    .research-card {
      position: relative;

      .badge {
        position: absolute;
        top: -10px;
        left: -15px;
        background: #e74c3c;
        color: white;
        padding: 0.2rem 0.8rem;
        border-radius: 15px;
        font-size: 0.7rem;
      }

      h4 {
        font-size: 1.1rem;
        margin: 0;
        color: $primary-color;
      }

      p {
        font-size: 0.9rem;
        color: #7f8c8d;
        margin: 0.5rem 0 0;
      }
    }

    .divider {
      width: 1px;
      height: 60px;
      background: #ccc;
    }

    .certification {
      display: flex;
      align-items: center;

      .cert-icon {
        width: 40px;
        margin-right: 0.8rem;
      }

      span {
        font-size: 0.9rem;
        color: $primary-color;
      }
    }
  }
}
</style>
