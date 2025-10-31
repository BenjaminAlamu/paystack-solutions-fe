<template>
  <header class="bg-white shadow-sm sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <RouterLink to="/">
        <h1 class="text-2xl font-bold text-green-600">Grundy LLC</h1>
      </RouterLink>

      <nav class="space-x-6 text-sm font-medium">
        <RouterLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          :class="[
            'transition-colors duration-200',
            isActive(link.path)
              ? 'text-green-600 font-semibold border-b-2 border-green-600 pb-1'
              : 'text-gray-700 hover:text-green-600'
          ]"
        >
          {{ link.label }}
        </RouterLink>

        <RouterLink
          v-if="!hasToken"
          to="/login"
          :class="[
            'transition-colors duration-200',
            isActive('/login')
              ? 'text-green-600 font-semibold border-b-2 border-green-600 pb-1'
              : 'text-gray-700 hover:text-green-600'
          ]"
        >
          Login
        </RouterLink>

        <RouterLink
          v-if="!hasToken"
          to="/register"
          :class="[
            'transition-colors duration-200',
            isActive('/register')
              ? 'text-green-600 font-semibold border-b-2 border-green-600 pb-1'
              : 'text-gray-700 hover:text-green-600'
          ]"
        >
          Register
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthState } from "@/store/auth";
import { useRoute } from "vue-router";

const auth = useAuthState();
const hasToken = !!auth.getToken;
const route = useRoute();

const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/shop", label: "Shop" },
  { path: "/cart", label: "Cart" },
  { path: "/track", label: "Track Order" },
  { path: "/driver", label: "Driver Flow" },
];

const isActive = (path: string) => route.path === path;
</script>
