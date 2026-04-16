<template>
  <div 
    class="relative bg-white p-10 rounded-[40px] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_-15px_rgba(61,59,255,0.15)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-[#3D3BFF]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

    <div class="w-16 h-16 mb-8 rounded-2xl bg-[#F5F5F5] flex items-center justify-center text-[#3D3BFF] group-hover:bg-[#3D3BFF] group-hover:text-white transition-colors duration-500 shadow-sm relative z-10">
      <div class="transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        <slot name="icon"></slot>
      </div>
    </div>

    <div class="relative z-10">
      <h3 class="text-xl lg:text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-[#3D3BFF] transition-colors duration-300">
        {{ title }}
      </h3>
      <p class="text-gray-500 text-base font-medium leading-relaxed">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
</script>
