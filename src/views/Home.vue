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
      <Loader v-if="isfeaturedProductsLoading"/>

      <div v-if="!isfeaturedProductsLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard
          v-for="product in featuredProducts.data"
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
import Footer from "@/components/gl-footer.vue";
import Header from "@/components/gl-header.vue";
import Loader from "@/components/gl-loader.vue";

import { useGetFeaturedProducts } from "@/hooks";
const { featuredProducts, isfeaturedProductsLoading} = useGetFeaturedProducts();
</script>

