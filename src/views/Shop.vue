<template>
  <div class="min-h-screen text-gray-900">
    <Header />

    <section class="max-w-7xl mx-auto px-6 py-16">
      <h3 class="text-3xl font-bold text-center mb-10 text-gray-800">
        All Groceries
      </h3>

      <Loader v-if="isAllProductsLoading"/>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard
          v-for="product in allProducts.data.data"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <Footer/>
  </div>
</template>

<script setup lang="ts">
import ProductCard from "@/components/gl-product-card.vue";
import Loader from "@/components/gl-loader.vue";
import Footer from "@/components/gl-footer.vue";
import Header from "@/components/gl-header.vue";
import { useGetAllProducts } from "@/hooks";
const { allProducts, isAllProductsLoading } = useGetAllProducts();
</script>

<style>
body {
  @apply bg-white;
}
</style>
