<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <button 
      @click="toggleDropdown"
      class="group flex items-center gap-2 px-4 py-2 rounded-full border border-transparent hover:border-gray-200 hover:bg-[#F5F5F5] transition-all duration-300 active:scale-95"
    >
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold tracking-widest text-black uppercase">{{ currentLang }}</span>
      </div>
      
      <svg 
        class="w-4 h-4 text-gray-400 group-hover:text-[#3D3BFF] transition-transform duration-500" 
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition name="dropdown">
      <div 
        v-if="isOpen"
        class="absolute right-0 mt-3 w-44 origin-top-right overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 ring-1 ring-black/5 z-[60]"
      >
        <div class="p-1.5">
          <button 
            v-for="lang in languages" 
            :key="lang.code"
            @click="selectLang(lang)"
            class="group w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-[#3D3BFF] hover:text-white"
            :class="locale === lang.locale ? 'text-[#3D3BFF]' : 'text-gray-700'"
          >
            <span>{{ lang.name }}</span>
            
            <span 
              class="w-1.5 h-1.5 rounded-full transition-all duration-300"
              :class="locale === lang.locale ? 'bg-white scale-100' : 'bg-transparent scale-0'"
            ></span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { LOCALE_STORAGE_KEY } from '../../i18n';

const isOpen = ref(false);
const dropdownRef = ref(null);
const { locale } = useI18n();

const languages = [
  { name: "O'zbekcha", code: 'UZ', locale: 'uz' },
  { name: "Русский", code: 'RU', locale: 'ru' },
  { name: "English", code: 'EN', locale: 'en' }
];

const currentLang = computed(() => {
  const selected = languages.find((lang) => lang.locale === locale.value);
  return selected ? selected.code : locale.value.toUpperCase();
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectLang = (lang) => {
  locale.value = lang.locale;
  localStorage.setItem(LOCALE_STORAGE_KEY, lang.locale);
  isOpen.value = false;
};

// Handle Click Outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Stunning Transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
</style>
