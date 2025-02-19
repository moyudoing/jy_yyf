<template>
  <section id="features" class="section">
    <div class="container">
      <div class="content-header">
        <h2 class="section-title">产品特点</h2>
        <p class="section-subtitle">源自天然，科技萃取，营养健康</p>
        <a class="section-link" href="">
          查看更多 <i class="fas fa-arrow-right"></i>
        </a>
      </div>
      <!-- 产品网格 -->
      <div class="features-grid">
        <!-- 有产品数据时展示 -->
        <template v-if="products.length > 0">
          <div v-for="product in products" :key="product.id" class="product-card">
            <!-- 产品徽章 -->
            <span v-if="product.badge" class="product-badge">{{ product.badge }}</span>
            <!-- 产品图片 -->
            <div class="product-image">
              <img
                  :src="product.images"
                  :alt="product.name"
                  fit="cover"
                  @error="handleNativeImageError(product)" />
              <!-- 图片遮罩层 -->
              <div class="product-overlay"></div>
            </div>
            <!-- 产品内容 -->
            <div class="product-content">
              <h3 class="product-title">{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-price">{{ product.price }}</div>
            </div>
            <!-- 查看详情按钮 -->
            <button @click="viewProductDetails(product.id)" class="product-button">查看详情</button>
          </div>
        </template>
        <!-- 无产品数据时的提示 -->
        <p v-else>暂无产品数据。</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useProductStore } from '@/stores/modules/productsData.ts';
import '@/styles/layout/section.css';

// 定义产品对象的类型
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: string;
  badge?: string;
  loadError?: boolean;
}

// 引入产品仓库
const productStore = useProductStore();
// 获取所有产品
const products = ref<Product[]>(
    productStore.getAllProducts.map((product: Product) => ({
      ...product,
      loadError: false, // 为每个产品对象添加 loadError 属性
    }))
);

// 处理图片加载失败
const handleNativeImageError = (product: Product) => {
  product.loadError = true;
};

// 查看产品详情
const viewProductDetails = (id: number) => {
  try {
    const product = productStore.getProductById(id);
    if (product) {
      console.log('产品详情:', product);
    } else {
      console.error('未找到该产品信息');
    }
  } catch (error) {
    console.error('获取产品详情时出错:', error);
  }
};

// 监听产品数据变化
watchEffect(() => {
  products.value = productStore.getAllProducts.map((product: Product) => ({
    ...product,
    loadError: false, // 数据更新时重新设置 loadError 属性
  }));
});
</script>

<style scoped>


/* 产品网格样式 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  gap: var(--spacing-xl);
}

/* 产品卡片样式 */
.product-card {
  background: var(--background-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column; /* 使子元素垂直排列 */
}

.product-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* 产品徽章样式 */
.product-badge {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  padding: 0.3rem 0.6rem;
  background: #007bff;
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 1;
}

/* 产品图片样式 */
.product-image {
  position: relative;
  height: 0;
  padding-top: 75%; /* 保持图片的宽高比，这里假设是 4:3 */
  overflow: hidden;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 等比例放大图片，填满容器 */
  transition: transform 0.6s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.12);
}

/* 产品图片遮罩层样式 */
.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

/* 产品内容样式 */
.product-content {
  padding: 1.2rem;
  flex: 1; /* 让内容部分填充剩余空间 */
}

.product-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
}

.product-description {
  color: #777;
  margin-bottom: 0.6rem;
  line-height: 1.6;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #007bff;
}

/* 图片加载失败提示样式 */
.image-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ff0000;
  font-size: 0.9rem;
}

/* 按钮样式 */
.product-button {
  display: block;
  width: 100%;
  padding: 0.9rem;
  background: #ff0000; /* 将按钮背景颜色改为红色 */
  color: white;
  border: none;
  border-radius: 0 0 12px 12px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 1.1rem;
}

.product-button:hover {
  background: #cc0000; /* 悬停时颜色变深 */
  transform: scale(1.02);
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

}
</style>
