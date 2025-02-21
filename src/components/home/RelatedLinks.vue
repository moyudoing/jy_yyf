<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMouseInElement } from '@vueuse/core';

// 更完整的数据类型定义
interface Resource {
  type: 'article' | 'website' | 'video' |'research';
  title: string;
  description: string;
  url: string;
  // 媒体资源
  image?: string;      // 文章封面/视频缩略图
  logo?: string;       // 网站logo
  duration?: string;   // 视频时长
  // 元数据
  source?: string;     // 来源（机构/作者）
  date?: string;       // 发布日期
  tags?: string[];     // 分类标签
  // 认证标识
  verified?: boolean;  // 是否官方认证
  rating?: number;     // 用户评分（0-5）
  // 新增：是否已收藏
  isFavorite?: boolean;
}

const resources = ref<Resource[]>([
  {
    type: 'article',
    title: '菊芋营养的十大健康益处',
    description: '国际营养学期刊最新研究成果解读...',
    url: 'https://kns.cnki.net/kcms2/article/abstract?v=i_LPdPvRpB6kmzv_fjwii9oYDcuZq7bfwbcFOKrFtD_VTvoWZ2wF6dekwJacslKqkQupw_vscCbZRh0YhwhPmoyRk7iB7AQVPa1QvNpd2bYjYfUrS-Si9G9a-7NVBYgih9vvkOOr17_YrF92VanbhlK_-_USTOW476H7JnKyoSQ3KMrP3HRkTcKy57eKdvRu&uniplatform=NZKPT&language=CHS',
    image: 'src/assets/images/gs.jpg',
    date: '2023-08-15',
    tags: ['营养科学', '健康指南'],
    isFavorite: false
  },
  {
    type: 'website',
    title: '国际膳食纤维协会',
    description: '全球权威膳食营养研究机构官网',
    url: 'https://www.idf.org',
    image: 'src/assets/images/gs.jpg',
    logo: '/logos/idf-logo.png',
    source: '官方机构',
    isFavorite: false
  },
  {
    type: 'website',
    title: '国际膳食纤维协会',
    description: '全球权威膳食营养研究机构官网',
    url: 'https://www.idf.org',
    image: 'src/assets/images/gs.jpg',
    logo: '/logos/idf-logo.png',
    source: '官方机构',
    isFavorite: false
  },
  // 更多资源...
]);

// 用于存储用户收藏的资源
const favoriteResources = ref<Resource[]>([]);

// 添加收藏功能
const addToFavorite = (resource: Resource) => {
  resource.isFavorite = true;
  favoriteResources.value.push(resource);
};

// 移除收藏功能
const removeFromFavorite = (resource: Resource) => {
  resource.isFavorite = false;
  favoriteResources.value = favoriteResources.value.filter(
      (item) => item.url!== resource.url
  );
};

// 计算卡片样式的函数
const calculateCardStyle = (cardRef: HTMLElement, elementX: number, elementY: number) => {
  const rotateX = -(elementY / cardRef.clientHeight - 0.5) * 8;
  const rotateY = (elementX / cardRef.clientWidth - 0.5) * 8;
  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  };
};

const cardRefs = ref<HTMLElement[]>([]);
const elementXs = ref<number[]>([]);
const elementYs = ref<number[]>([]);
computed(() => {
  return cardRefs.value.map((cardRef, index) => {
    if (!cardRef) return {};
    return calculateCardStyle(cardRef, elementXs.value[index], elementYs.value[index]);
  });
});
// 初始化鼠标跟踪效果
onMounted(() => {
  resources.value.forEach(() => {
    const cardRef = document.createElement('div');
    cardRefs.value.push(cardRef);
    const { elementX, elementY } = useMouseInElement(cardRef);
    elementXs.value.push(elementX.value);
    elementYs.value.push(elementY.value);
  });
});
</script>

<template>
  <div class="container">

    <div class="section-header">
      <h2 class="section-title">相关文章</h2>
      <p class="section-subtitle">了解我们的产品工艺和特点</p>
    </div>

    <div class="grid">
      <a
          v-for="(item, index) in resources"
          :key="index"
          :href="item.url"
          class="resource-card"
          :class="[item.type]"
          :target="item.type === 'website'? '_blank' : '_self'"
          rel="noopener noreferrer"
          @click="item.type === 'article'? addToFavorite(item) : ''"
      >
        <!-- 图片/Logo区域 -->
        <div class="media-area">
          <template v-if="item.type === 'website'">
            <img
                :src="item.logo"
                class="website-logo"
                :alt="item.title"
            >
          </template>
          <template v-else>
            <img
                :src="item.image"
                class="cover-image"
                :alt="item.title"
                loading="lazy">
          </template>
          <div class="type-label">
            {{ item.type === 'article'? '深度好文' : '权威网站' }}
          </div>
        </div>

        <!-- 内容区 -->
        <div class="content-area">
          <div class="meta-info">
            <template v-if="item.date">
              <time class="date">{{ item.date }}</time>
            </template>
            <span v-if="item.source" class="source">{{ item.source }}</span>
          </div>

          <h3 class="title">{{ item.title }}</h3>

          <p class="description">{{ item.description }}</p>

          <div v-if="item.tags" class="tag-list">
            <span
                v-for="(tag, tagIndex) in item.tags"
                :key="tagIndex"
                class="tag"
            >
              {{ tag }}
            </span>
          </div>

          <!-- 新增：收藏按钮和评分系统 -->
          <div class="action-buttons">
            <button
                v-if="item.type === 'article'"
                class="favorite-button"
                :class="{ 'is-favorite': item.isFavorite }"
                @click="item.isFavorite? removeFromFavorite(item) : addToFavorite(item)"
            >
              <i class="fas fa-heart"></i>
            </button>
            <div v-if="item.rating" class="rating">
              <i
                  v-for="(starIndex) in 5"
                  :key="starIndex"
                  class="fas fa-star"
                  :class="{ 'rated': starIndex < item.rating }"
              ></i>
            </div>
          </div>
        </div>

        <!-- 悬停效果 -->
        <div class="hover-effect"></div>
      </a>
    </div>
  </div>
</template>

<style>
  .resource-card {
    position: relative;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    overflow: hidden;
    display: block;
    transition: transform 0.3s ease;
    box-shadow: 0 8px 24px rgba(0,0,0,0.05);

    &:hover {
      transform: translateY(-5px);

      .hover-effect {
        opacity: 1;
      }

      .cover-image {
        transform: scale(1.05);
      }
    }

    &.website {
      border-top: 4px solid var(--medium-primary);
    }

    &.article {
      border-top: 4px solid var(--third-color);
    }

    &.research {
      border-top: 4px solid var(--secondary-color);
    }

    .media-area {
      position: relative;
      height: 180px;
      overflow: hidden;

      .type-label {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 0.3rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
      }

      .cover-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .website-logo {
        width: auto;
        height: 80px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        filter: drop-shadow(0 2px 6px rgba(0,0,0,0.1));
      }
    }

    .content-area {
      padding: 1.5rem;

      .meta-info {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        color: #7f8c8d;
        margin-bottom: 0.5rem;
      }

      .title {
        font-size: 1.2rem;
        margin: 0.5rem 0;
        color: var(--text-color);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .description {
        font-size: 0.9rem;
        color: #34495e;
        line-height: 1.6;
        margin: 0.5rem 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .tag-list {
        margin-top: 1rem;

        .tag {
          display: inline-block;
          background: rgba(52, 152, 219, 0.1);
          color: #3498db;
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          margin-right: 0.5rem;
        }
      }

      .action-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;

        .favorite-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          color: #ccc;
          transition: color 0.3s ease;

          &.is-favorite {
            color: #e74c3c;
          }
        }

        .rating {
          display: flex;
          align-items: center;

          .fa-star {
            margin-right: 0.2rem;
            color: #f39c12;
            font-size: 1.2rem;

            &.rated {
              color: #f1c40f;
            }
          }
        }
      }
    }

    .hover-effect {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
          45deg,
          rgba(255,255,255,0.1) 0%,
          rgba(255,255,255,0) 100%
      );
      opacity: 0;
      transition: opacity 0.3s;
    }
  }

</style>
