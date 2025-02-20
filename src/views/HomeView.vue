<script setup lang="ts">
import ProductFeature from "../components/home/ProductFeature.vue";
import Banner from "../components/home/Banner.vue";
import Report from "../components/home/Reports.vue";
import IntroduceVideo from "@/components/home/IntroduceVideo.vue";
import Ingredients from "@/components/home/Ingredients.vue";
import HealthBenefitsTimeline from "@/components/home/HealthBenefitsTimeline.vue";
import RelatedLinks from "@/components/home/RelatedLinks.vue";

</script>

<template>

  <div>
    <Banner/>
    <ProductFeature/>
    <IntroduceVideo/>
    <Report/>
    <Ingredients/>
    <HealthBenefitsTimeline/>
    <RelatedLinks/>
  </div>

</template>

<style scoped>
h1 {
  color: #333;
}

p {
  color: #666;
  margin-bottom: 20px;
}
</style>
