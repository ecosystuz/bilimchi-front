<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-6 py-20 relative overflow-hidden selection:bg-[#3D3BFF]/10 selection:text-[#3D3BFF] animate-fade-in">
    
    <div class="absolute inset-0 flex items-center justify-center z-0">
      <h1 class="text-[25rem] lg:text-[45rem] font-black text-black/[0.03] tracking-tighter select-none">
        404
      </h1>
    </div>

    <div class="absolute -top-32 -left-32 w-96 h-96 bg-[#3D3BFF]/10 rounded-full blur-3xl opacity-50"></div>
    <div class="absolute -bottom-16 -right-16 w-80 h-80 bg-black/[0.05] rounded-full blur-3xl opacity-50"></div>

    <div class="max-w-3xl w-full bg-white/50 p-10 backdrop-blur-sm  rounded-[48px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-white/50 relative z-10 text-center h-full max-h-[500px]">
      
      <div class="inline-flex items-baseline gap-4 mb-8">
        <h2 class="text-7xl lg:text-9xl font-black text-black tracking-tighter">
          Ups...
        </h2>
        <span class="text-6xl lg:text-8xl font-black text-[#3D3BFF] tracking-tighter">
          404
        </span>
      </div>

      <div class="space-y-6 max-w-lg mx-auto">
        <h3 class="text-2xl lg:text-3xl font-bold text-black leading-tight">
          Страница не найдена
        </h3>
        
        <p class="text-gray-500 text-lg font-medium leading-relaxed">
          Мы искали везде, но не смогли найти то, что вы ищете. Возможно, страница была перемещена или никогда не существовала.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
        <CButton 
          variant="primary" 
          size="xl" 
          text="Вернуться на главную" 
          class="!px-10 shadow-2xl shadow-[#3D3BFF]/30"
          @click="router.push('/')"
        >
          <template #suffix>
            <span class="ml-2">→</span>
          </template>
        </CButton>
        
        <button 
          @click="router.back()"
          class="text-sm font-black text-gray-400 hover:text-black transition-all duration-300 uppercase tracking-widest"
        >
          Назад
        </button>
      </div>

      <div class="mt-16 flex justify-center opacity-20 hover:opacity-100 transition-opacity duration-500">
        <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
          <span class="text-white font-black text-xl">B</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import CButton from '../components/forms/CButton.vue';

const router = useRouter();
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Эффект легкого парения для текста Ups... */
h2 {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>