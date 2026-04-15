<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      // Base Styles
      'inline-flex items-center justify-center font-bold transition-all duration-300 active:scale-95 gap-2 relative overflow-hidden',
      'disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed',
      
      // Dynamic Sizes
      sizeClasses[size],
      
      // Dynamic Variants
      variantClasses[variant],
      
      // Full Width
      block ? 'w-full' : 'w-max'
    ]"
    @click="$emit('click', $event)"
  >
    <transition name="fade">
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-inherit">
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </transition>

    <div :class="['flex items-center gap-2', loading ? 'opacity-0' : 'opacity-100']">
      <slot name="prefix"></slot>
      
      <slot>
        <span>{{ text }}</span>
      </slot>

      <slot name="suffix"></slot>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: { type: String, default: '' },
  type: { type: String, default: 'button' },
  variant: { 
    type: String, 
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'].includes(v)
  },
  size: { 
    type: String, 
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'xl'].includes(v)
  },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  rounded: { type: String, default: 'full' } // 'lg', 'full', 'none'
});

defineEmits(['click']);

// Size configurations
const sizeClasses = {
  sm: 'px-4 py-1.5 text-xs rounded-lg',
  md: 'px-6 py-2.5 text-sm rounded-xl',
  lg: 'px-8 py-3.5 text-base rounded-2xl',
  xl: 'px-10 py-4 text-lg rounded-[20px]'
};

// Professional Variant Styles
const variantClasses = {
  primary: 'bg-[#3D3BFF] text-white hover:bg-black hover:shadow-[0_10px_20px_rgba(61,59,255,0.3)]',
  secondary: 'bg-[#F5F5F5] text-black hover:bg-gray-200',
  outline: 'bg-transparent border-2 border-[#3D3BFF] text-[#3D3BFF] hover:bg-[#3D3BFF] hover:text-white',
  ghost: 'bg-transparent text-gray-600 hover:bg-[#F5F5F5] hover:text-black',
  danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-[0_10px_20px_rgba(239,68,68,0.3)]',
  success: 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-[0_10px_20px_rgba(16,185,129,0.3)]'
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>