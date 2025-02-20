<template>
  <section id="features" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">产品特点</h2>
        <p class="section-subtitle">源自天然，科技萃取，营养健康</p>
        <a class="section-link" href="">
          查看更多 <i class="fas fa-arrow-right"></i>
        </a>
      </div>
      <!-- 产品网格 -->
      <div class="grid">
        <!-- 有产品数据时展示 -->
        <template v-if="products.length > 0">
          <div v-for="product in products" :key="product.id" class="product-card">
            <!-- 产品图片 -->
            <div class="product-image">
              <img
                  :src="product.images"
                  :alt="product.name"
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



/* 产品卡片样式 */
/* product-card 类用于定义单个产品卡片的样式 */
.product-card {
  /* 设置卡片的背景颜色为 --background-color 变量指定的值 */
  background: var(--background-color);
  /* 设置卡片的圆角半径为 12px */
  border-radius: 12px;
  /* 隐藏溢出卡片边界的内容 */
  overflow: hidden;
  /* 为卡片添加阴影效果，模拟立体效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 为卡片的所有属性添加过渡效果，过渡时间为 0.3 秒，过渡函数为 ease */
  transition: all 0.3s ease;
  /* 设置卡片的定位方式为相对定位，方便子元素进行绝对定位 */
  position: relative;
  /* 使用 Flexbox 布局 */
  display: flex;
  /* 设置 Flex 容器内的子元素垂直排列 */
  flex-direction: column;
}

/* 当鼠标悬停在产品卡片上时的样式 */
.product-card:hover {
  /* 将卡片向上移动 12px，产生悬浮效果 */
  transform: translateY(-12px);
  /* 增加卡片的阴影效果，使其在悬停时更加突出 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* 产品图片样式 */
/* product-image 类用于定义产品图片容器的样式 */
.product-image {
  /* 设置图片容器的定位方式为相对定位，方便子元素进行绝对定位 */
  position: relative;
  /* 初始高度设置为 0，通过 padding-top 来保持宽高比 */
  height: 0;
  /* 设置图片容器的顶部内边距为 75%，实现 4:3 的宽高比 */
  padding-top: 75%;
  /* 隐藏溢出图片容器边界的内容 */
  overflow: hidden;
}

/* 产品图片容器内的图片样式 */
.product-image img {
  /* 设置图片的定位方式为绝对定位，相对于图片容器进行定位 */
  position: absolute;
  /* 图片顶部与图片容器顶部对齐 */
  top: 0;
  /* 图片左侧与图片容器左侧对齐 */
  left: 0;
  /* 设置图片的宽度为 100%，填满图片容器 */
  width: 100%;
  /* 设置图片的高度为 100%，填满图片容器 */
  height: 100%;
  /* 等比例缩放图片，使其填满容器，可能会裁剪部分图片 */
  object-fit: cover;
  /* 为图片的缩放属性添加过渡效果，过渡时间为 0.6 秒，过渡函数为 ease */
  transition: transform 0.6s ease;
}

/* 当鼠标悬停在产品卡片上时，图片的样式 */
.product-card:hover .product-image img {
  /* 将图片放大到 1.12 倍，产生缩放效果 */
  transform: scale(1.12);
}

/* 产品图片遮罩层样式 */
/* product-overlay 类用于定义产品图片上的遮罩层样式 */
.product-overlay {
  /* 设置遮罩层的定位方式为绝对定位，相对于图片容器进行定位 */
  position: absolute;
  /* 遮罩层顶部与图片容器顶部对齐 */
  top: 0;
  /* 遮罩层左侧与图片容器左侧对齐 */
  left: 0;
  /* 设置遮罩层的宽度为 100%，覆盖整个图片容器 */
  width: 100%;
  /* 设置遮罩层的高度为 100%，覆盖整个图片容器 */
  height: 100%;
  /* 设置遮罩层的背景为线性渐变，从透明过渡到半透明黑色 */
  background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5));
  /* 初始时遮罩层的透明度为 0，即不可见 */
  opacity: 0;
  /* 为遮罩层的透明度属性添加过渡效果，过渡时间为 0.3 秒，过渡函数为 ease */
  transition: opacity 0.3s ease;
}

/* 当鼠标悬停在产品卡片上时，遮罩层的样式 */
.product-card:hover .product-overlay {
  /* 将遮罩层的透明度设置为 1，使其可见 */
  opacity: 1;
}

/* 产品内容样式 */
/* product-content 类用于定义产品卡片内的内容区域样式 */
.product-content {
  /* 设置内容区域的内边距为 1.2rem */
  padding: 1.2rem;
  /* 让内容区域填充剩余的空间 */
  flex: 1;
}

/* 产品标题样式 */
.product-title {
  /* 设置产品标题的字体大小为 1.4rem */
  font-size: 1.4rem;
  /* 设置产品标题的字体粗细为 600 */
  font-weight: 600;
  /* 设置产品标题底部的外边距为 0.6rem */
  margin-bottom: 0.6rem;
}

/* 产品描述样式 */
.product-description {
  /* 设置产品描述的文字颜色为 --text-color-light 变量指定的值 */
  color: var(--text-color-light);
  /* 设置产品描述底部的外边距为 0.6rem */
  margin-bottom: 0.6rem;
  /* 设置产品描述的行高为 1.6 */
  line-height: 1.6;
}

/* 产品价格样式 */
.product-price {
  /* 设置产品价格的字体大小为 1.2rem */
  font-size: 1.2rem;
  /* 设置产品价格的字体粗细为 600 */
  font-weight: 600;
  /* 设置产品价格的文字颜色为 --text-color-primary 变量指定的值 */
  color: var(--text-color-primary);
}

/* 按钮样式 */
/* product-button 类用于定义产品卡片上的按钮样式 */
.product-button {
  /* 将按钮以块级元素的形式显示 */
  display: block;
  /* 设置按钮的宽度为 100%，填满产品卡片底部 */
  width: 100%;
  /* 设置按钮的内边距为 0.9rem */
  padding: 0.9rem;
  /* 设置按钮的背景颜色为 --dark-primary-color 变量指定的值 */
  background: var(--dark-primary-color);
  /* 设置按钮的文字颜色为 --text-color-inverse 变量指定的值 */
  color: var(--text-color-inverse);
  /* 移除按钮的边框 */
  border: none;
  /* 设置按钮底部的圆角半径为 12px */
  border-radius: 0 0 12px 12px;
  /* 将鼠标指针悬停在按钮上时的样式设置为手型 */
  cursor: pointer;
  /* 为按钮的背景颜色属性添加过渡效果，过渡时间为 0.3 秒，过渡函数为 ease */
  transition: background 0.3s ease;
  /* 设置按钮的字体大小为 1.1rem */
  font-size: 1.1rem;
}
</style>
