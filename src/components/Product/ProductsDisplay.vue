<template>
  <div class="content-header">
    <h2 class="section-title">产品视频</h2>
    <p class="section-subtitle">了解我们的产品工艺和特点</p>
  </div>
  <div class="products-grid">
    <div v-for="product in products" :key="product.id">
      <!-- 产品卡片 -->
      <div class="product-card" data-aos="fade-up">
        <!-- 产品图片 -->
        <div class="product-image">
          <img :src="product.images" :alt="product.name" class="product-img">
        </div>
        <!-- 产品信息 -->
        <div class="product-info">
          <h3 class="product-title">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-price">
            <span class="current-price">{{ product.price }}</span>
            <span v-if="product.originalPrice" class="original-price">{{ product.originalPrice }}</span>
          </div>
        </div>
        <!-- 产品链接 -->
        <div class="product-link">
          <a :href="`pages/products/${product.slug}.html`" class="btn btn-primary">了解详情</a>
        </div>
      </div>

      <div class="container-feature">
        <div class="product-feature-collapse">
          <el-collapse
              accordion
              class="feature-collapse">
            <el-collapse-item
                :title="`${product.name} 核心亮点`"
                :name="product.id"
            >
              <ul class="feature-list">
                <li
                    v-for="(feature, index) in product.features"
                    :key="index"
                    class="feature-item">
                  <el-icon class="feature-icon">
                    <el-icon-check />
                  </el-icon>
                  {{ feature }}
                </li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </div>

        <div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/modules/productsData.js';
import '@/styles/layout/section.css';

const ProductStore = useProductStore();
const products = ProductStore.getAllProducts;
</script>

<style scoped>
.container-feature{
  display: grid;
  /* 定义两列，每列宽度为 1fr（平均分配剩余空间） */
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.section-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.section-subtitle {
  font-size: 16px;
  color: #666;
}

/* 产品网格样式 */
.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* 产品卡片样式 */
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.product-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

/* 产品图片样式 */
.product-image {
  width: 30%;
  height: 200px;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-img {
  transform: scale(1.1);
}

/* 产品信息样式 */
.product-info {
  width: 50%;
  padding: 15px;
}

.product-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 12px;
}

/* 产品价格样式 */
.product-price {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.current-price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #e74c3c;
  margin-right: 10px;
}

.original-price {
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
}

/* 产品链接样式 */
.product-link {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-link {
  opacity: 1;
}

/* 按钮样式 */
.btn.btn-primary {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn.btn-primary:hover {
  background-color: #0056b3;
}

/* 折叠面板样式 */
.custom-collapse {
  margin-bottom: 20px;
}

.el-collapse-item__header {
  background-color: #f9f9f9;
  font-weight: bold;
  color: #333;
  padding: 10px 15px;
  transition: background-color 0.3s ease;
}

.el-collapse-item__header:hover {
  background-color: #eaeaea;
}

.el-collapse-item__content {
  padding: 15px;
  background-color: #fdfdfd;
}

/* 产品特点样式 */
.product-feature {
  margin-bottom: 5px;
  color: #555;
}

/* 交互按钮和下拉菜单样式 */
.product-interaction {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.badge-item {
  margin-right: 10px;
}

.el-button {
  transition: background-color 0.3s ease;
}

.el-button:hover {
  background-color: #eaeaea;
}

.dropdown-item {
  position: relative;
}

.el-dropdown-menu {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-dropdown-item {
  padding: 8px 15px;
  transition: background-color 0.3s ease;
}

.el-dropdown-item:hover {
  background-color: #f5f5f5;
}
</style>
