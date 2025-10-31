<template>
  <div class="min-h-screen text-gray-900">
    <Header />

    <section class="max-w-7xl mx-auto px-6 py-16">
      <h3 class="text-3xl font-bold text-center mb-10 text-gray-800">
        All Groceries
      </h3>

      <div v-if="!isAllProductsLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard
          v-for="product in allProducts.data.data"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <footer class="py-10 border-t">
      <div class="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
        <p>
          &copy; {{ new Date().getFullYear() }} Grundy LLC. Freshness Delivered
          Daily.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ProductCard from "@/components/product-card.vue";
import Header from "@/components/header.vue";

import { useGetAllProducts } from "@/hooks";
const { allProducts, isAllProductsLoading } = useGetAllProducts();
</script>

<style>
body {
  @apply bg-white;
}
</style>
