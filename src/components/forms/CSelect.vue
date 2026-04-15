<template>
  <div class="relative w-full" ref="selectRef">
    <label v-if="label" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
      {{ label }}
    </label>
    
    <div 
      @click="isOpen = !isOpen"
      :class="[
        'group flex items-center justify-between w-full px-5 py-4 bg-white border-2 rounded-2xl cursor-pointer transition-all duration-300',
        isOpen ? 'border-[#3D3BFF] shadow-[0_0_0_4px_rgba(61,59,255,0.1)]' : 'border-gray-100 hover:border-gray-200'
      ]"
    >
      <span :class="selected ? 'text-black font-medium' : 'text-gray-400'">
        {{ selected || placeholder }}
      </span>
      
      <svg 
        class="w-5 h-5 text-gray-400 group-hover:text-[#3D3BFF] transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <transition name="slide-fade">
      <div v-if="isOpen" class="absolute w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 max-h-60 overflow-y-auto">
        <div 
          v-for="option in options" :key="option"
          @click="selectOption(option)"
          class="px-5 py-3 hover:bg-[#F5F5F5] hover:text-[#3D3BFF] transition-colors cursor-pointer text-sm font-medium"
        >
          {{ option }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
  options: Array,
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selected = ref(props.modelValue);
const selectRef = ref(null);

const selectOption = (val) => {
  selected.value = val;
  emit('update:modelValue', val);
  isOpen.value = false;
};

const close = (e) => {
  if (!selectRef.value.contains(e.target)) isOpen.value = false;
};

onMounted(() => document.addEventListener('click', close));
onUnmounted(() => document.removeEventListener('click', close));
</script>

<style scoped>
.slide-fade-enter-active { transition: all 0.3s ease-out; }
.slide-fade-leave-active { transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateY(-10px); opacity: 0; }
</style>