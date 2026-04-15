<template>
  <div class="container mx-auto ">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
      
      <div class="lg:col-span-2">
        <CHeroSearch class="h-full" />
      </div>

      <div class="flex flex-col gap-6">
        
        <div class="relative flex-grow overflow-hidden rounded-[40px] shadow-sm min-h-[270px]">
          <img 
            src="/images/reward3.jpg" 
            alt="Professional Tutors"
            class="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <CPromoteCard 
          class="flex-grow"
          title="Вы репетитор?"
          description="Регистрируйтесь на нашем сайте и привлекайте клиентов бесплатно"
          buttonText="Кабинет репетитора"
          @action="handleAction"
        />
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CHeroSearch from './cards/CHeroSearch.vue'
import CPromoteCard from './cards/CPromoteCard.vue';

const handleAction = () => {
  console.log("Redirecting to tutor registration...");
};
</script>

<style scoped>
/* Ensure the components take up equal height in the grid */
:deep(.h-full) {
  height: 100%;
}
</style>