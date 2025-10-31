<template>
  <Header />

  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Search Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Find Your Order</h1>
        <p class="text-lg text-gray-600">
          Enter your order reference code to view your order details.
        </p>
      </div>

      <!-- Search Form -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <form @submit.prevent="handleSearch" class="flex flex-col sm:flex-row gap-4">
          <input
            v-model="orderCode"
            type="text"
            placeholder="Enter order reference (e.g. ORD-abc123)"
            class="flex-1 border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          />
          <button
            type="submit"
            :disabled="isSingleOrderLoading || !orderCode"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSingleOrderLoading ? "Searching..." : "Search Order" }}
          </button>
        </form>

        <p v-if="errorMessage" class="text-red-600 text-sm mt-4 text-center">
          {{ errorMessage }}
        </p>
      </div>

      <!-- Order Details -->
<!-- Order Details -->
<div v-if="singleOrder?.data" class="bg-white rounded-lg shadow-lg p-6">
  <div class="text-center mb-6">
    <svg
      class="w-16 h-16 text-green-500 mx-auto mb-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <h2 class="text-2xl font-bold text-gray-900 mb-1">Order Found!</h2>
    <p class="text-gray-600">Here are your order details.</p>
  </div>

  <div class="border-t border-gray-200 pt-4 space-y-4">
    <div class="flex justify-between">
      <span class="text-gray-500">Order Reference:</span>
      <span class="font-semibold">{{ singleOrder.data.orderRef }}</span>
    </div>

    <div class="flex justify-between">
      <span class="text-gray-500">Order Date:</span>
      <span>{{ formatDate(singleOrder.data.createdAt) }}</span>
    </div>

    <div class="flex justify-between items-center">
      <span class="text-gray-500">Order Status:</span>
      <span
        class="px-3 py-1 rounded-full text-sm font-semibold"
        :class="statusClass(singleOrder.data.status)"
      >
        {{ singleOrder.data.status.toUpperCase() }}
      </span>
    </div>

    <div v-if="singleOrder.data.paymentDetails" class="border-t border-gray-100 pt-4 mt-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">Payment Details</h3>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-500">Payment Reference:</span>
          <span>{{ singleOrder.data.paymentDetails.paymentReference }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Channel:</span>
          <span class="capitalize">{{ singleOrder.data.paymentDetails.channel }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Amount:</span>
          <span class="font-medium text-green-600">
            ₦{{ Number(singleOrder.data.paymentDetails.amount).toLocaleString() }}
          </span>
        </div>
        <div class="flex justify-between items-center">
      <span class="text-gray-500">Payment Status:</span>
      <span
        class="px-3 py-1 rounded-full text-sm font-semibold"
        :class="statusClass(singleOrder.data.paymentDetails.status)"
      >
        {{ singleOrder.data.paymentDetails?.status?.toUpperCase() || 'pending' }}
      </span>
    </div>
      </div>
    </div>

    <!-- Collapsible Order Items -->
    <div class="border-t border-gray-100 pt-4 mt-4">
      <div
        class="flex items-center justify-between cursor-pointer"
        @click="showItems = !showItems"
      >
        <h3 class="text-lg font-semibold text-gray-800">Order Items</h3>
        <svg
          :class="['w-5 h-5 text-gray-600 transform transition-transform duration-300', showItems ? 'rotate-180' : 'rotate-0']"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <transition name="fade">
        <div v-if="showItems" class="mt-4 space-y-4">
          <div
            v-for="item in singleOrder.data.items"
            :key="item.id"
            class="flex items-center border rounded-lg p-3 shadow-sm hover:shadow-md transition"
          >
            <img
              :src="item.product.imageUrl"
              alt="Product image"
              class="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div class="flex-1">
              <h4 class="font-semibold text-gray-800">{{ item.product.name }}</h4>
              <p class="text-gray-500 text-sm">Qty: {{ item.quantity }}</p>
            </div>
            <div class="text-right">
              <p class="text-gray-600 text-sm">₦{{ Number(item.price).toLocaleString() }}</p>
              <p class="font-semibold text-green-600">
                ₦{{ Number(item.subtotal).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="flex justify-between border-t border-gray-200 pt-4 mt-4">
      <p class="text-lg font-bold text-gray-900">Total:</p>
      <p class="text-2xl font-bold text-green-600">
        ₦{{ Number(singleOrder.data.totalAmount).toLocaleString() }}
      </p>
    </div>
  </div>
</div>

      <div
        v-else-if="!isSingleOrderLoading && hasSearched && !singleOrder?.data && !errorMessage"
        class="text-center mt-12"
      >
        <svg class="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M12 3C7.031 3 3 7.031 3 12C3 16.969 7.031 21 12 21C16.969 21 21 16.969 21 12C21 7.031 16.969 3 12 3Z"
          />
        </svg>
        <p class="text-gray-600 text-lg">No order found for this code.</p>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/gl-header.vue";
import Footer from "@/components/gl-footer.vue";
import { ref, watch } from "vue";
import { useGetSingleOrder } from "@/hooks";

const orderCode = ref("");
const hasSearched = ref(false);
const errorMessage = ref("");
const showItems = ref(false);

const { singleOrder, isSingleOrderLoading, singleOrderError, refetchSingleOrder } =
  useGetSingleOrder(orderCode, false);

const handleSearch = async () => {
  if (!orderCode.value.trim()) return;
  hasSearched.value = true;
  errorMessage.value = "";
  try {
    await refetchSingleOrder();
  } catch {
    errorMessage.value = "Failed to load order details.";
  }
};

watch(singleOrderError, (err) => {
  if (err) {
    errorMessage.value = "Could not fetch order details.";
  }
});

const statusClass = (status: string) => {
  const normalized = status?.toLowerCase();
  switch (normalized) {
    case "success":
      return "bg-green-100 text-green-700";
    case "pending":
    case "queued":
    case "processing":
    case "ongoing":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
    case "abandoned":
    case "reversed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};


const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

</style>