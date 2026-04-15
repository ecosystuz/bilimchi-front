<template>
  <button 
    @click="toggleTheme"
    class="relative w-16 h-8 flex items-center bg-[#F5F5F5] dark:bg-gray-800 rounded-full p-1 transition-all duration-500 shadow-inner group overflow-hidden"
    aria-label="Toggle Theme"
  >
    <div 
      class="absolute w-6 h-6 bg-white dark:bg-[#3D3BFF] rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      :style="{ transform: isDark ? 'translateX(32px)' : 'translateX(0px)' }"
    ></div>

    <div class="relative flex justify-between w-full px-1 z-10 pointer-events-none">
      <div 
        class="transition-all duration-500"
        :class="isDark ? 'opacity-40 scale-75 translate-x-2' : 'opacity-100 scale-100'"
      >
        <svg class="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
        </svg>
      </div>

      <div 
        class="transition-all duration-500"
        :class="isDark ? 'opacity-100 scale-100' : 'opacity-40 scale-75 -translate-x-2'"
      >
        <svg class="w-4 h-4 text-[#3D3BFF]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.1 2.9c.1-.6-.5-1.1-1.1-.9-4.6 1.1-8 5.2-8 10 0 5.5 4.5 10 10 10 4.8 0 9-3.4 10-8 .2-.6-.4-1.2-1-.9-5 .8-9.4-3.5-8.9-8.5.1-.7-.5-1.3-1.1-1.7z" />
        </svg>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  // Check system preference or localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    updateTheme();
  }
});
</script>