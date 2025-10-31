<template>
  <Header />

  <div
    class="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-4xl mx-auto">

      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Grundy LLC Business Profile</h1>
        <p class="text-lg text-gray-600">
          Overview of Grundy LLC’s grocery delivery business and its digital payment ecosystem.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
        <p class="text-gray-700 leading-relaxed">
          Grundy LLC is a Nigerian startup building a digital marketplace that connects open-air
          market vendors and grocery shops directly to customers. The platform manages orders,
          enables cashless payments, and handles last-mile delivery through verified riders.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Mission Statement</h2>
        <p class="text-gray-700 leading-relaxed">
          To make everyday grocery shopping simple, reliable, and fully digital by connecting market
          vendors and customers through seamless ordering, digital payments, and doorstep delivery.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Offerings</h2>
        <ul class="list-disc pl-6 text-gray-700 space-y-2">
          <li>Marketplace app for browsing and ordering groceries from nearby vendors.</li>
          <li>Fast, verified last-mile delivery network for on-demand fulfillment.</li>
          <li>Cashless Paystack-powered payment system (Checkout, Transfer, and Terminal).</li>
          <li>Merchant dashboard for tracking orders, payments, and performance.</li>
        </ul>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Target Customer Base</h2>
        <ul class="list-disc pl-6 text-gray-700 space-y-2">
          <li>Urban professionals and families seeking convenience.</li>
          <li>Busy households looking to save time on grocery runs.</li>
          <li>Market vendors aiming to expand digitally.</li>
          <li>Corporate clients requiring scheduled grocery deliveries.</li>
        </ul>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Revenue Model</h2>
        <ul class="list-disc pl-6 text-gray-700 space-y-2">
          <li>10% platform commission per transaction.</li>
          <li>Premium merchant plans offering visibility and analytics tools.</li>
          <li>Delivery fees for last-mile logistics.</li>
        </ul>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Growth Vision</h2>
        <p class="text-gray-700 leading-relaxed">
          Grundy LLC aims to become Nigeria’s most trusted digital grocery marketplace — combining
          technology, payments, and logistics to make fresh food accessible to every household.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/header.vue";
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
