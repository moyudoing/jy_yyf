<template>

  <ProductsDisplay/>
  <ProductionFlow/>
  <CommentSection/>
</template>

<script>
import ProductsDisplay from '@/components/Product/ProductsDisplay.vue'
import CommentSection from "@/components/Product/CommentSection.vue";
import ProductionFlow from "@/components/Product/ProductionFlow.vue";
export default {
  components: {ProductionFlow, ProductsDisplay, CommentSection},
 }
</script>
