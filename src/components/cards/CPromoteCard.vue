<template>
  <div 
    :class="[
      'relative overflow-hidden rounded-[32px] p-8 md:p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1',
      variantClasses[variant]
    ]"
  >
    <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mb-10 -mr-10"></div>

    <div class="relative z-10 flex-col md:flex-row md:items-center justify-between gap-8">
      <div class="max-w-xl">
        <h2 class="text-xl md:text-2xl font-black text-white mb-4 leading-tight">
          <slot name="title">{{ title }}</slot>
        </h2>
        <p class="text-white/80 text-md font-medium mb-4">
          <slot name="description">{{ description }}</slot>
        </p>
      </div>

      <div class="flex-shrink-0">
        <CButton 
          variant="secondary" 
          size="lg" 
          :text="buttonText"
          class="!rounded-2xl !px-10 hover:!bg-white hover:!text-black shadow-xl"
          @click="$emit('action')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CButton from '../forms/CButton.vue';

defineProps({
  title: {
    type: String,
    default: 'Are you a tutor?'
  },
  description: {
    type: String,
    default: 'Register on our site and attract clients for free.'
  },
  buttonText: {
    type: String,
    default: 'Tutor Cabinet'
  },
  variant: {
    type: String,
    default: 'primary'
  }
});

defineEmits(['action']);

const variantClasses = {
  primary: 'bg-[#3D3BFF]',
  dark: 'bg-black',
  outline: 'bg-white border-2 border-[#3D3BFF] !text-black' // Variation for other pages
};
</script>

<style scoped>
/* Optional: Pulse animation for the background decor */
.bg-white\/10 {
  animation: pulse-slow 8s infinite alternate;
}

@keyframes pulse-slow {
  from { transform: scale(1); opacity: 0.1; }
  to { transform: scale(1.2); opacity: 0.15; }
}
</style>