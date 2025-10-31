<template>
    <div class="relative mb-3">
      <label v-if="showLabel" class="flex text-sm text-default mb-1">{{ labelText }}</label>
      <input
        :class="[isInvalid ? '!border-red-300 ' : '']"
        :name="name"
        class="text-gray-600 border-gray-100 border p-3 w-full rounded min-h-[50px] placeholder:pt-3"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="trigger($event)"
        @focus="$emit('focus')"
        :type="type"
        :min="min"
      />
      <p class="text-xs text-semibold text-left text-red-500" v-if="isInvalid">
        {{ errorMessage }}
      </p>
      <slot :type="type" :reveal="reveal" name="eyeReveal" v-if="hasIcon"> </slot>
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['update:modelValue', 'reveal', 'focus'])
  defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    labelText: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    isInvalid: {
      type: Boolean
    },
    errorMessage: {
      type: String
    },
    modelValue: {
      type: String
    },
    hasIcon: {
      type: Boolean,
      required: false
    },
    min: {
      type: Number
    }
  })
  
  const reveal = () => {
    emit('reveal')
  }
  
  const trigger = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
  }
  </script>
  