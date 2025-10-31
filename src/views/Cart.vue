<template>
  <Header />
  <div class="min-h-screen max-w-7xl mx-auto bg-white p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

    <div v-if="cart.items.length === 0" class="text-gray-500 text-center mt-10">
      Your cart is empty 🛒
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="flex items-center gap-4 border p-4 rounded-xl"
        >
          <img
            :src="item.imageUrl"
            :alt="item.name"
            class="w-24 h-24 object-cover rounded-lg"
          />

          <div class="flex-1">
            <h4 class="font-semibold text-lg text-gray-800">{{ item.name }}</h4>
            <p class="text-sm text-gray-500">Seller:</p>
            <p class="mt-1 font-medium text-green-700">
              ₦{{ item.price.toLocaleString() }}
            </p>

            <div class="flex items-center gap-3 mt-3">
              <button
                @click="cart.decreaseQuantity(item.id)"
                class="px-2 py-1 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button
                @click="cart.increaseQuantity(item.id)"
                class="px-2 py-1 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div class="text-right">
            <p class="font-semibold text-gray-800">
              ₦{{ (item.price * item.quantity).toLocaleString() }}
            </p>
            <button
              @click="cart.removeItem(item.id)"
              class="text-red-500 text-sm mt-2 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 p-6 rounded-xl border">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Order Summary</h3>

        <div class="flex justify-between text-gray-700 mb-2">
          <span>Items:</span>
          <span>{{ cart.items.length }}</span>
        </div>

        <div class="flex justify-between text-gray-700 mb-4">
          <span>Total:</span>
          <span class="font-semibold text-green-700">
            ₦{{ cart.totalPrice.toLocaleString() }}
          </span>
        </div>

        <hr class="my-4" />

        <div class="mb-6">
          <h4 class="text-sm font-semibold text-gray-700 mb-3">
            Payment Method
          </h4>

          <div class="space-y-3">
            <label
              class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
            >
              <input
                type="radio"
                v-model="selectedPaymentMode"
                value="checkout"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <div class="flex-1">
                <span class="font-medium text-gray-800">Checkout</span>
                <p class="text-xs text-gray-500">Pay with debit/credit card</p>
              </div>
            </label>

            <label
              class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
            >
              <input
                type="radio"
                v-model="selectedPaymentMode"
                value="virtual_account"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <div class="flex-1">
                <span class="font-medium text-gray-800">Bank Transfer</span>
                <p class="text-xs text-gray-500">Transfer to our account</p>
              </div>
            </label>

            <label
              class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
            >
              <input
                type="radio"
                v-model="selectedPaymentMode"
                value="terminal"
                class="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <div class="flex-1">
                <span class="font-medium text-gray-800"
                  >Terminal on Delivery</span
                >
                <p class="text-xs text-gray-500">Pay when you receive</p>
              </div>
            </label>
          </div>
        </div>

        <button
          @click="proceedToCheckout"
          :disabled="!selectedPaymentMode"
          class="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ isCreatingOrder ? "Loading" : "Proceed to Checkout" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/header.vue";
import { useCartStore } from "@/store/cart";
import { ref } from "vue";
import { useCreateOrder } from "@/hooks";
import type { AxiosError } from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useAuthState } from "@/store/auth";

const cart = useCartStore();
const auth = useAuthState();
const selectedPaymentMode = ref<string>("");
const { handleCreateOrder, isCreatingOrder } = useCreateOrder();
const router = useRouter();
const proceedToCheckout = () => {
  if (!selectedPaymentMode.value) {
    toast.error("Please select a payment method");
    return;
  }

  const hasToken = !!auth.getToken;
  if (!hasToken) {
    toast.info("Please login ");
    return router.push("/login");
  }

  const items = cart.items.map((item) => {
    return {
      productId: item.id,
      quantity: item.quantity,
    };
  });
  handleCreateOrder(
    { items, paymentMode: selectedPaymentMode.value },
    {
      onSuccess(data) {
        cart.saveOrderDetails({
          order: data.data.order,
          paymentDetails: data.data.paymentDetails,
        });

        if (selectedPaymentMode.value === "checkout") {
          window.location.href = data.data.paymentDetails.authorization_url;
        } else {
          return router.push("/confirmation");
        }
      },
      onError(err) {
        const error = err as unknown as AxiosError<any>;
        toast.error(error.response?.data?.message);
      },
    }
  );
};
</script>
