<template>
  <div class="min-h-screen text-gray-900">
    <Header />

    <section class="py-20 border-b">
      <div
        class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between"
      >
        <div class="space-y-6">
          <h2 class="text-5xl font-extrabold leading-tight text-gray-800">
            Fresh Groceries, Delivered Daily
          </h2>
          <p class="text-lg text-gray-600">
            Shop organic fruits, vegetables, and pantry essentials from trusted
            local sellers.
          </p>
          <main>
            <RouterLink
              to="/shop"
              class="my-8 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700"
            >
              Start Shopping
            </RouterLink>
          </main>
        </div>
        <img
          src="https://res.cloudinary.com/oluwaseun/image/upload/v1761937426/paystack/landing-page.jpg"
          alt="Fresh Groceries"
          class="w-full md:w-1/2 mt-10 md:mt-0 rounded-2xl shadow-lg object-cover h-[500px]"
        />
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-16">
      <h3 class="text-3xl font-bold text-center mb-10 text-gray-800">
        Featured Groceries
      </h3>

      <div v-if="!isfeaturedProductsLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard
          v-for="product in featuredProducts.data"
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

import { useGetFeaturedProducts } from "@/hooks";
const { featuredProducts, isfeaturedProductsLoading} = useGetFeaturedProducts();
</script>

