<template>
  <Header />

  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-3xl mx-auto">
      <!-- Search Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Mock Driver</h1>
        <p class="text-lg text-gray-600">
          This is a mock page, showing how the driver can receive payments via a
          Terminal or a Dedicated Virtual Account
        </p>
      </div>

      <!-- Search Form -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <form
          @submit.prevent="handleSearch"
          class="flex flex-col sm:flex-row gap-4"
        >
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

      <div v-if="singleOrder?.data" class="bg-white rounded-lg shadow-lg p-6">
        <div class="text-center mb-6">
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

          <div class="border-t border-gray-100 pt-4 mt-4">
            <div class="flex items-center justify-between cursor-pointer">
              <h3 class="text-lg font-semibold text-gray-800">Total Items</h3>
              <p class="text-gray-500 text-sm">
                Qty: {{ singleOrder.data.items.length }}
              </p>
            </div>
          </div>

          <div
            v-if="singleOrder.data.paymentDetails"
            class="border-t border-gray-100 pt-4 mt-4"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-3">
              Payment Details
            </h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-500">Payment Reference:</span>
                <span>{{
                  singleOrder.data.paymentDetails.paymentReference
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Channel:</span>
                <span class="capitalize">{{
                  singleOrder.data.paymentDetails.channel
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Amount:</span>
                <span class="font-medium text-green-600">
                  ₦{{
                    Number(
                      singleOrder.data.paymentDetails.amount
                    ).toLocaleString()
                  }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500">Payment Status:</span>
                <span
                  class="px-3 py-1 rounded-full text-sm font-semibold"
                  :class="statusClass(singleOrder.data.paymentDetails.status)"
                >
                  {{
                    singleOrder.data.paymentDetails?.status?.toUpperCase() ||
                    "pending"
                  }}
                </span>
              </div>
            </div>
          </div>


          <main v-if="singleOrder.data.status === 'pending'" class="border-t border-gray-100 pt-4">
            <main
            class="flex flex-col items-center justify-center w-full bg-white"
          >
            <button
              v-if="
                singleOrder.data.paymentDetails.channel === 'virtual_account' &&
                !bankDetails.account_number
              "
              @click="generateDVA"
              class="flex-1 bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              {{ isAttachingDVA ? "Loading..." : "Generate DVA" }}
            </button>
          </main>

          <main
            v-if="singleOrder.data.paymentDetails.channel === 'terminal'"
            class="flex flex-col items-center justify-center w-full bg-white"
          >
            <QrcodeVue
              :value="singleOrder.data.paymentDetails.offline_reference"
              :size="200"
              level="H"
            />
            <p class="mt-4 text-sm text-gray-600 text-center">
              Terminal Reference:
              <span class="font-medium text-gray-800">{{
                singleOrder.data.paymentDetails.offline_reference
              }}</span>
            </p>
          </main>

          <div
            v-if="bankDetails.account_number"
            class="border-t border-gray-100 pt-4 mt-4"
          >
            <div class="flex items-center justify-between cursor-pointer">
              <h3 class="text-lg font-semibold text-gray-800">
                Virtual Account Details
              </h3>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-500">Bank Name:</span>
                <span>{{ bankDetails.bank.name }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-500">Account Name:</span>
                <span>{{ bankDetails.account_name }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-500">Account Number:</span>
                <span>{{ bankDetails.account_number }}</span>
              </div>
            </div>
          </div>

          <main
            class="flex flex-col items-center justify-center w-full bg-white my-4"
          >
            <button
              v-if="
                singleOrder.data.paymentDetails.channel === 'terminal' ||
                bankDetails.account_number
              "
              @click="verifyTransaction"
              class="flex-1 bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              {{
                isVerifyMockTransactionLoading
                  ? "Loading..."
                  : "I've made Payment"
              }}
            </button>
          </main>
          </main>

          <!-- Total -->
          <div class="flex justify-between border-t border-gray-200 pt-4 mt-4">
            <p class="text-lg font-bold text-gray-900">Total:</p>
            <p class="text-2xl font-bold text-green-600">
              ₦{{ Number(singleOrder.data.totalAmount).toLocaleString() }}
            </p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="
          !isSingleOrderLoading &&
          hasSearched &&
          !singleOrder?.data &&
          !errorMessage
        "
        class="text-center mt-12"
      >
        <svg
          class="w-20 h-20 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
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
import { ref, watch } from "vue";
import { useGetSingleOrder, useAttachDVA, useMockCall } from "@/hooks";
import { toast } from "vue3-toastify";
import Footer from "@/components/gl-footer.vue";

type PaystackDVAResponse = {
  bank: {
    name: string;
    id: number;
    slug: string;
  };
  account_name: string;
  account_number: string;
};

const orderCode = ref("");
const bankDetails = ref({} as PaystackDVAResponse);
const hasSearched = ref(false);
const errorMessage = ref("");
import QrcodeVue from "qrcode.vue";
import type { AxiosError } from "axios";

const {
  singleOrder,
  isSingleOrderLoading,
  singleOrderError,
  refetchSingleOrder,
} = useGetSingleOrder(orderCode, false);

const { isAttachingDVA, handleAttachDVA } = useAttachDVA();
const { isVerifyMockTransactionLoading, handleMockTransaction } = useMockCall();

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

const generateDVA = () => {
  handleAttachDVA(orderCode.value, {
    onSuccess(data) {
      bankDetails.value = data.data;
    },
    onError(err) {
      const error = err as unknown as AxiosError<any>;
      toast.error(error.response?.data?.message);
    },
  });
};

const verifyTransaction = () => {
  handleMockTransaction(orderCode.value, {
    onSuccess(data) {
      bankDetails.value = {} as PaystackDVAResponse;
      refetchSingleOrder();
    },
    onError(err) {
      const error = err as unknown as AxiosError<any>;
      toast.error(error.response?.data?.message);
    },
  });
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
