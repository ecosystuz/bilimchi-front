<template>
  <section class="py-24 px-6 bg-[#F5F5F5] relative overflow-hidden">
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3D3BFF]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3D3BFF]/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      
      <div class="text-center md:text-left mb-16 fade-in-up">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-black tracking-tight">
          {{ t('features.title', 'Чем удобен наш сайт?') }}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        
        <CFeatureCard 
          :title="t('features.payment.title', 'Оплата после занятия без предоплаты')"
          :description="t('features.payment.description', 'Вы ничем не рискуете, потому что оплату производите после проведенного занятия')"
          class="stagger-card delay-100"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </template>
        </CFeatureCard>

        <CFeatureCard 
          :title="t('features.budget.title', 'Под любой бюджет')"
          :description="t('features.budget.description', 'У нас есть учителя по разным ценам. Мы подберем репетиторов по таким ценам, которые вы сами скажете')"
          class="stagger-card delay-200"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
            </svg>
          </template>
        </CFeatureCard>

        <CFeatureCard 
          :title="t('features.format.title', 'Любой формат')"
          :description="t('features.format.description', 'Вы можете заниматься онлайн или с педагогом вашего города вживую (у нас есть репетиторы из всех городов Узбекистана)')"
          class="stagger-card delay-300"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>
            </svg>
          </template>
        </CFeatureCard>

      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import CFeatureCard from './cards/CFeatureCard.vue';


const { t } = useI18n();
</script>

<style scoped>
/* Анимация для заголовка */
.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Базовый класс для карточек (они изначально скрыты) */
.stagger-card {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Задержки для создания эффекта каскада (stagger) */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 250ms; }
.delay-300 { animation-delay: 400ms; }

/* Плавная кривая Безье для дорогого ощущения анимации */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
