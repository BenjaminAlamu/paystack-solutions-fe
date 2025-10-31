<template>
    <div class="flex items-center">
      <button
        class="rounded mr-2 h-8 w-8 flex items-center justify-center bg-black-800 hover:opacity-30"
        @click="emit('gotoPage', currentPage - 1)"
        :disabled="currentPage === 1"
        :class="currentPage === 1 ? 'bg-black-800 text-white cursor-not-allowed' : 'cursor-pointer'"
      >
        <arrow-icon rotate="left" color="#FFFFFF" />
      </button>
      <div v-for="(_, idx) in pageButtons" :key="idx">
        <button
          v-if="shouldRender(idx + 1) && !renderEllipsis(idx + 1)"
          @click="emit('gotoPage', idx + 1)"
          class="rounded h-8 w-8 flex items-center justify-center border text-black-800 mr-2 font-medium"
          :class="
            currentPage === idx + 1
              ? 'bg-black-800 text-white cursor-not-allowed'
              : 'border-black-800 cursor-pointer'
          "
        >
          {{ idx + 1 }}
        </button>
        <div
          class="h-8 w-8 flex items-center justify-center mr-2 font-semibold text-black-800"
          v-else
        >
          ...
        </div>
      </div>
      <button
        class="rounded mr-2 h-8 w-8 flex items-center justify-center cursor-pointer bg-black-800 hover:opacity-30"
        @click="emit('gotoPage', currentPage + 1)"
        :disabled="currentPage === totalPages || totalPages === 0"
        :class="
          currentPage === totalPages || totalPages === 0
            ? 'bg-black-800 text-white cursor-not-allowed'
            : 'cursor-pointer'
        "
      >
        <arrow-icon rotate="right" color="#FFFFFF" />
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { toRefs } from 'vue'
  import arrowIcon from '@/assets/icons/arrow-icon.vue'
 
  export interface Pagination {
  pageSize: number
  total: number
  currentPage: number
}
  
  const emit = defineEmits<{
    (e: 'gotoPage', id: number): void
  }>()
  
  const props = defineProps<Pagination>()
  const { total, pageSize, currentPage } = toRefs(props)
  
  const totalPages = Math.ceil((total.value || 0) / pageSize.value || 0)
  const pageButtons = [...Array(totalPages)]
  const shouldRender = (pageNumber: number) => {
    return (
      Math.abs(pageNumber - currentPage.value) <= 2 || pageNumber === 1 || pageNumber === totalPages
    )
  }
  const renderEllipsis = (pageNumber: number) => {
    return (
      Math.abs(pageNumber - currentPage.value) === 3 && pageNumber !== 1 && pageNumber !== totalPages
    )
  }
  </script>
  
  