<template>
  <div class="min-h-screen flex flex-col bg-[#F5F5F5] font-sans selection:bg-[#3D3BFF]/10 selection:text-[#3D3BFF]">
    
    <CHeader />

    <main class="flex-grow relative">
      <router-view v-slot="{ Component }">
        <transition 
          name="page-slide" 
          mode="out-in"
          @before-leave="onBeforeLeave"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <CFooter />

  </div>
</template>

<script setup>
import CHeader from '../components/layout/CHeader.vue';
import CFooter from '../components/layout/CFooter.vue'

const onBeforeLeave = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
/* Stunning Page Transition: Slide + Fade */
.page-slide-enter-active,
.page-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}


main {
  display: flex;
  flex-direction: column;
}
</style>