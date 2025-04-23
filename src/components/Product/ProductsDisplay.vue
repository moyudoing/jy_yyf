<template>

<section class="section-container">

  <header class="section-header">
    <h2 class="section-title">产品成分</h2>
    <p class="section-subtitle">营养合理搭配</p>
  </header>

  <div class="products-grid">
    <div v-for="product in products" :key="product.id">

      <ProductInformationCard :product="product"/>

    </div>
  </div>

</section>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/modules/productsData.js';
import ProductInformationCard from "@/components/Product/modules/ProductInformationCard.vue";

const ProductStore = useProductStore();
const products = ProductStore.getAllProducts;
</script>

<style scoped>

.section-container{
  margin-top: 20px;
}

.products-grid {
  display: grid;
  margin: 0 auto;
  width: 95%;
  grid-template-columns: 1fr;
  gap: 20px;
}
</style>
