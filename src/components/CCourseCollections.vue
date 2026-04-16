<template>
  <section class="py-24 bg-white overflow-hidden relative">
    <div class="container mx-auto">
      <div class="text-center mb-16 fade-in-up relative">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto">
          {{ t('collections.title') }}
        </h2>
        <img src="/images/line-blue.png" class="absolute -z-[1] top-20 right-48 w-full max-w-[300px]" alt="">
      </div>
    </div>

    <div class="relative group">
      <div
        ref="carouselRef"
        class="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar  pt-4"
        style="scroll-behavior: smooth;"
      >
        <div
          class="flex-shrink-0"
          :style="{ width: leftPadding + 'px' }"
        ></div>

        <CCollectionCard
          v-for="collection in collections"
          :key="collection.id"
          :image="collection.image"
          :count="collection.count"
          :title="collection.title"
        />

        <div class="min-w-[24px] flex-shrink-0"></div>
      </div>

     <div class="flex justify-center">
         <div class="items-center justify-center gap-4 mt-8 bg-[#F6F7FA] inline-flex mx-auto rounded-[50px] p-1">
        <button
          @click="scroll('left')"
          class="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center text-gray-900 hover:text-[#3D3BFF] hover:border-[#3D3BFF] hover:scale-110 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <button
          @click="scroll('right')"
          class="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center text-gray-900 hover:text-[#3D3BFF] hover:border-[#3D3BFF] hover:scale-110 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
     </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import CCollectionCard from './cards/CCollectionCard.vue';

const { t } = useI18n();
const carouselRef = ref(null);
const leftPadding = ref(24);

const calcPadding = () => {
  const maxW = 1440;
  const px = 24;
  const vw = window.innerWidth;
  leftPadding.value = vw >= maxW
    ? (vw - maxW) / 2 + px
    : px;
};

onMounted(() => {
  calcPadding();
  window.addEventListener('resize', calcPadding);
});

onUnmounted(() => {
  window.removeEventListener('resize', calcPadding);
});

const scroll = (direction) => {
  if (carouselRef.value) {
    const scrollAmount = window.innerWidth < 768 ? 300 : 400;
    const targetScroll = direction === 'left' ? -scrollAmount : scrollAmount;
    carouselRef.value.scrollBy({
      left: targetScroll,
      behavior: 'smooth'
    });
  }
};

const collections = computed(() => [
  {
    id: 1,
    count: 60,
    title: t('collections.items.freelance'),
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    count: 52,
    title: t('collections.items.it_start'),
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    count: 52,
    title: t('collections.items.remote'),
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    count: 60,
    title: t('collections.items.creative'),
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    count: 18,
    title: t('collections.items.investing'),
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800'
  }
]);
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>