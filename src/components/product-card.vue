<template>
  <div class="bg-white rounded-xl shadow hover:shadow-lg transition">
    <img
      :src="product.imageUrl"
      :alt="product.name"
      class="w-full h-48 object-cover rounded-t-xl"
    />

    <main class="px-5 pb-5">
      <h4 class="mt-4 text-lg font-semibold text-gray-800">{{ product.name }}</h4>
      <p class="text-gray-600 mt-1 text-sm">{{ product.description }}</p>

      <div class="mt-3 flex justify-between items-center">
        <span class="text-green-700 font-bold text-lg">
          ₦{{ product.price.toLocaleString() }}
        </span>

        <button
          v-if="isInCart"
          @click="cart.removeItem(product.id)"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
        >
          Remove
        </button>

        <button
          v-else
          @click="cart.addItem(product)"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
        >
          Add to Cart
        </button>
      </div>

      <div
        class="mt-4 flex items-center justify-between border-t pt-3 text-sm text-gray-500"
      >
        <span>Seller:</span>
        <span class="font-medium text-gray-700">
          {{ product.merchant.businessName }}
        </span>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types'
import { computed } from 'vue'
import { useCartStore } from '@/store/cart'

const cart = useCartStore()

const props = defineProps<{
  product: Product
}>()

const isInCart = computed(() =>
  cart.items.some((item) => item.id === props.product.id)
)
</script>
