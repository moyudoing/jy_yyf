<script setup lang="ts">
import {defineProps, ref} from 'vue';

interface Props {
  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    specifications: string;
    images: string;
    gallery: string[];
    features: string[];
    originalPrice: string;
  }
}

const props = defineProps<Props>();


const isModalOpen = ref(false);
const currentProduct = ref<Props['product']>();

let currentSlug = false;
const showProduct = (product: Props['product']) => {
  if (currentSlug) {
    isModalOpen.value = false;
    currentSlug = false
  }else {
    currentProduct.value = product;
    isModalOpen.value = true;
    currentSlug = true;
  }

};
</script>

<template>
  <transition name="modal-fade">
    <div class="product-card" @click="showProduct(props.product)">
      <div class="product-image">
        <slot name="image">
          <img :src="props.product.images" class="product-img" alt="">
        </slot>/
      </div>

      <div class="product-info">
        <h3 class="product-title">{{ props.product.name }}</h3>
        <p class="product-description">{{ props.product.description }}</p>
        <div class="product-price">
          <span class="current-price">{{ props.product.price }}</span>
          <span v-if="props.product.originalPrice" class="original-price">{{ product.originalPrice }}</span>
        </div>
      </div>

      <div class="product-link">
        <a :href="`pages/products/${props.product.slug}.html`" class="btn btn-primary">了解详情</a>
      </div>
    </div>
  </transition>

  <transition name="modal-fade">
    <div v-if="isModalOpen" class="modal-overlay">
      <button class="modal-close"
        @click="isModalOpen = false">
      <i class="fas fa-times text-2xl"></i>
      </button>
      <h2 class="h2">{{ currentProduct?.description }}</h2>
      <p class="">{{ currentProduct?.specifications }}</p>
      <h3 class="text-lg font-medium text-gray-800 mb-3">产品特性</h3>
      <div class="feature" >
          <div class="feature-card" v-for="(feature, index) in currentProduct?.features || []" :key="index">{{ feature }}</div>
      </div>
    </div>
  </transition>

</template>

  <style>
    .modal-fade-enter-active,
    .modal-fade-leave-active {
      transition: all 0.3s ease;
    }
    .modal-fade-enter-from,
    .modal-fade-leave-to {
      opacity: 0;
      transform: scale(0.95);
    }
    .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 640px) {
      .max-w-md {
        width: 90%;
      }
    }

  .modal-overlay {
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 2px;

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
  }
  .feature{
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    gap: var(--spacing-xl);
    margin: 0;

    .feature-card{
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
      align-items: center;
      margin: 10px auto 10px 0;
    }
  }

  .h2{
    margin: 0 auto 0.8rem 0;
    font-size: var(--font-size-2xl);
    color: var(--text-color);
  }
}
.product-card {
  border: 1px solid var(--background-alt);
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

.product-info {
  width: 50%;
  padding: 15px;

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
    color: #040404;
    margin-right: 10px;
  }

  .original-price {
    font-size: 0.9rem;
    color: #999;
    text-decoration: line-through;
  }
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
  background-color: var(--dark-primary-color);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn.btn-primary:hover {
  background-color: var(--light-primary-color);
}
</style>