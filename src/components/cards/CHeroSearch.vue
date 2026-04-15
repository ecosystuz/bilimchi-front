<template>
  <section class="relative min-h-[600px] flex items-center justify-center px-6 py-20 bg-[#F5F5F5]">
    <div class="absolute top-20 left-10 w-64 h-64 bg-[#3D3BFF]/5 rounded-full blur-3xl"></div>
    
    <div class="max-w-4xl w-full bg-white p-12 md:p-16 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-white relative z-10">
      
      <div class="max-w-2xl">
        <h1 class="text-5xl md:text-7xl font-black text-black leading-[1.1] mb-8 tracking-tight">
          Find great <span class="text-[#3D3BFF]">tutors</span> in Uzbekistan
        </h1>
        <p class="text-lg text-gray-500 font-medium leading-relaxed mb-12">
          A service for selecting verified tutors with reviews based on many different criteria.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <CSelect 
          placeholder="Subject" 
          :options="['Mathematics', 'English', 'Physics', 'Programming']"
          v-model="form.subject"
        />
        <CSelect 
          placeholder="City" 
          :options="['Tashkent', 'Samarkand', 'Bukhara', 'Namangan']"
          v-model="form.city"
        />
      </div>

      <CButton 
        size="xl" 
        block 
        text="Start Search" 
        @click="handleSearch"
      />

    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue';
import CSelect from '../forms/CSelect.vue';
import CButton from '../forms/CButton.vue'; // Using the one we created earlier

const form = reactive({
  subject: '',
  city: ''
});

const handleSearch = () => {
  console.log('Searching for:', form.subject, 'in', form.city);
};
</script>