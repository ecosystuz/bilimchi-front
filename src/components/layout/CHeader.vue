<template>
  <header 
    :class="[
      'fixed top-0 w-full z-40 transition-all duration-500 border-b',
      isScrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm border-gray-100' : 'bg-transparent py-5 border-transparent'
    ]"
  >
    <div class="container mx-auto px-6 flex items-center justify-between">
      
      <router-link to="/"
      >
    <div class="flex items-center gap-2 group cursor-pointer">
        <div class="w-10 h-10 bg-[#3D3BFF] rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300">
          <span class="text-white font-bold text-xl">B</span>
        </div>
        <span class="text-2xl font-black tracking-tight text-black">
          Bilimchi<span class="text-[#3D3BFF]">.</span>
        </span>
      </div>
    </router-link>

      <nav class="hidden md:flex items-center gap-8">
        <a v-for="link in navLinks" :key="link.key" href="#" 
           class="relative text-sm font-semibold text-gray-700 hover:text-black transition-colors py-2 group">
          {{ t(link.labelKey) }}
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3D3BFF] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </nav>

      <div class="flex items-center gap-6">
        <CLanguageSwitcher />
        <!-- <c-theme-switcher/> -->
        
        <button class="hidden lg:block text-sm font-bold text-black hover:text-[#3D3BFF] transition-colors">
          Log In
        </button>
        <CButton variant="outline" size="md">
            <template #prefix>
                <i class="icon-search"></i> 
                </template>
                Cabinet
            <template #suffix>
            <span>→</span>
            </template>
        </CButton>
      </div>

    </div>
  </header>
  
  <div class="h-24"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import CLanguageSwitcher from '../common/CLanguageSwitcher.vue';
import CButton from '../forms/CButton.vue';

const isScrolled = ref(false);
const { t } = useI18n();

const navLinks = [
  { key: 'findTutor', labelKey: 'header.nav.findTutor' },
  { key: 'courses', labelKey: 'header.nav.courses' },
  { key: 'educationCenters', labelKey: 'header.nav.educationCenters' },
  { key: 'forParents', labelKey: 'header.nav.forParents' }
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: fadeInDown 0.3s ease-out forwards;
}
</style>
