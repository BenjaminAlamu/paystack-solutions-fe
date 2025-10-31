<template>
  <Header />
  <div
    class="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 relative"
        >
          <svg
            class="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <div
            v-if="showConfetti"
            class="absolute inset-0 animate-ping opacity-75"
          >
            <svg
              class="w-12 h-12 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p class="text-lg text-gray-600">
          {{ getSuccessMessage() }}
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div class="border-b border-gray-200 pb-4 mb-4">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-500">Order Number</p>
              <p class="text-xl font-semibold text-gray-900">
                {{ orderDetails.orderRef }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">Order Date</p>
              <p class="text-lg text-gray-900">
                {{ formatDate(orderDetails.createdAt) }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="paymentDetails.channel === 'terminal'">
          <div
            class="flex items-start space-x-3 mb-6 p-4 bg-blue-50 rounded-lg"
          >
            <svg
              class="w-5 h-5 text-blue-600 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              ></path>
            </svg>
            <div>
              <p class="text-sm font-medium text-gray-900">
                Payment on Delivery
              </p>
              <p class="text-sm text-gray-600">
                You will pay with card terminal when your order arrives, please
                use the details below for payment
              </p>
            </div>
          </div>

          <main
            class="flex flex-col items-center justify-center w-full bg-white"
          >
            <QrcodeVue
              :value="paymentDetails.offline_reference"
              :size="200"
              level="H"
            />
            <p class="mt-4 text-sm text-gray-600 text-center">
              Payment Reference:
              <span class="font-medium text-gray-800">{{
                paymentDetails.offline_reference
              }}</span>
            </p>
          </main>
        </div>

        <div
          v-else-if="paymentDetails.channel === 'checkout'"
          class="flex items-start space-x-3 mb-6 p-4 bg-green-50 rounded-lg"
        >
          <svg
            class="w-5 h-5 text-green-600 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <div>
            <p class="text-sm font-medium text-gray-900">Payment Successful</p>
            <p class="text-sm text-gray-600">
              Your payment has been processed successfully
            </p>
          </div>
        </div>

        <div class="mb-6 mt-4">
          <h3
            class="text-lg font-semibold text-gray-900 mb-3 flex items-center"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              ></path>
            </svg>
            Order Items
          </h3>
          <div class="space-y-3">
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
            >
              <div>
                <p class="text-gray-900 font-medium">{{ item.name }}</p>
                <p class="text-sm text-gray-500">
                  Quantity: {{ item.quantity }}
                </p>
              </div>
              <p class="text-gray-900 font-semibold">
                ₦{{ (item.price * item.quantity).toLocaleString() }}
              </p>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex justify-between items-center">
              <p class="text-lg font-bold text-gray-900">Total</p>
              <p class="text-2xl font-bold text-green-600">
                ₦{{ cart.totalPrice.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          @click="continueShopping"
          class="flex-1 bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/gl-header.vue";
import Footer from "@/components/gl-footer.vue";
import { ref, onMounted, onBeforeUnmount, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/store/cart";
import QrcodeVue from "qrcode.vue";

const router = useRouter();
const cart = useCartStore();

const showConfetti = ref(true);

const orderDetails = cart.getOrderDetails?.order;
const paymentDetails = cart.getOrderDetails?.paymentDetails;

watchEffect(() => {
  if (!cart.items.length || !orderDetails) {
    router.replace("/");
  }
});

onMounted(() => {
  setTimeout(() => {
    showConfetti.value = false;
  }, 7000);
});

onBeforeUnmount(() => {
  cart.clearCart();
});

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getSuccessMessage = () => {
  const mode = paymentDetails?.channel;
  if (mode === "terminal") {
    return "Your order has been placed. Pay with card terminal on delivery.";
  } else if (mode === "transfer") {
    return "Your order is pending. Your delivery driver will present a virtual account for payment.";
  }
  return "Thank you for your purchase. Your order has been successfully placed.";
};

const continueShopping = () => {
  router.push("/");
};
</script>


<style scoped>
@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
