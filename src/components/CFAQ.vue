<template>
  <section class="py-20 bg-[linear-gradient(180deg,#ffffff_0%,#f8f9ff_100%)] relative overflow-hidden">

    <!-- Background decorations -->
    <div class="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none" style="background: radial-gradient(circle, rgba(61,59,255,0.06) 0%, transparent 70%); transform: translate(30%, -30%);"></div>
    <div class="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none" style="background: radial-gradient(circle, rgba(61,59,255,0.04) 0%, transparent 70%); transform: translate(-30%, 30%);"></div>

    <div class="max-w-5xl mx-auto px-6 relative z-10">

      <!-- Header -->
      <div class="mb-20 fade-in-up">
        <div class="flex items-center gap-3 mb-6">
          <div class="flex gap-1">
            <span class="w-2 h-2 rounded-full bg-[#3D3BFF]"></span>
            <span class="w-2 h-2 rounded-full bg-[#3D3BFF] opacity-50"></span>
            <span class="w-2 h-2 rounded-full bg-[#3D3BFF] opacity-20"></span>
          </div>
          <span class="text-[#3D3BFF] text-sm font-bold tracking-widest uppercase">{{ t('faq.label', 'FAQ') }}</span>
        </div>
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 class="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.05] max-w-lg">
            {{ t('faq.title_start', 'Got') }}
            <span class="relative inline-block">
              <span class="relative z-10">{{ t('faq.title_highlight', 'questions?') }}</span>
              <svg class="absolute pointer-events-none" style="left:-4%;top:-15%;width:108%;height:130%;" viewBox="0 0 300 70" fill="none" aria-hidden="true">
                <defs>
                  <filter id="faq-rough">
                    <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="3" seed="5"/>
                    <feDisplacementMap in="SourceGraphic" scale="2" xChannelSelector="R" yChannelSelector="G"/>
                  </filter>
                </defs>
                <path
                  ref="pathRef"
                  d="M 15,48 C 35,18 80,6 150,5 C 220,4 268,14 285,32 C 294,44 288,60 255,66 C 210,74 100,74 42,64 C 16,59 6,46 16,37 C 24,28 65,22 130,20"
                  stroke="#3D3BFF"
                  stroke-width="4"
                  stroke-linecap="round"
                  :stroke-dasharray="pathLength"
                  :stroke-dashoffset="dashOffset"
                  style="transition: stroke-dashoffset 1s cubic-bezier(0.45,0.05,0.15,1); filter: url(#faq-rough)"
                />
              </svg>
            </span>
          </h2>
          <p class="text-gray-400 text-lg leading-relaxed max-w-xs md:text-right font-medium">
            {{ t('faq.subtitle', 'Everything you need to know about our platform.') }}
          </p>
        </div>
      </div>

      <!-- FAQ Items -->
      <div class="space-y-3">
        <div
          v-for="(item, index) in faqItems"
          :key="item.question"
          class="stagger-item"
          :style="{ animationDelay: `${index * 0.08}s` }"
        >
          <div
            @click="toggle(index)"
            class="faq-item relative rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden"
            :class="activeIndex === index ? 'faq-active' : 'faq-inactive'"
          >
            <div
              class="absolute -right-12 -top-12 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none"
              :class="activeIndex === index ? 'opacity-100 bg-[#3D3BFF]/20' : 'opacity-0 bg-[#3D3BFF]/10'"
            ></div>

            <!-- Active: number accent -->
            <div
              class="absolute left-0 top-0 bottom-0 flex items-center justify-center transition-all duration-500 overflow-hidden"
              :style="{
                width: activeIndex === index ? '70px' : '0px',
                opacity: activeIndex === index ? 1 : 0,
                background: 'linear-gradient(180deg, #3D3BFF 0%, #2F2CE3 100%)',
              }"
            >
              <span class="text-white font-black text-lg select-none" style="writing-mode: horizontal-tb;">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>

            <!-- Content -->
            <div
              class="transition-all duration-500"
              :style="{ paddingLeft: activeIndex === index ? '86px' : '28px' }"
            >
              <div class="pr-6 md:pr-8 py-6 md:py-7 flex items-center justify-between gap-6">
                <span
                  class="text-lg md:text-xl font-bold transition-colors duration-300 leading-snug"
                  :class="activeIndex === index ? 'text-gray-900' : 'text-gray-700'"
                >
                  {{ item.question }}
                </span>

                <!-- Icon -->
                <div
                  class="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500"
                  :style="{
                    background: activeIndex === index ? 'linear-gradient(135deg, #3D3BFF 0%, #5A57FF 100%)' : '#EEF0FF',
                    boxShadow: activeIndex === index ? '0 8px 28px rgba(61,59,255,0.35)' : 'none',
                    transform: activeIndex === index ? 'rotate(45deg) scale(1.06)' : 'rotate(0deg)',
                  }"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <line x1="8" y1="2" x2="8" y2="14" :stroke="activeIndex === index ? 'white' : '#3D3BFF'" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="2" y1="8" x2="14" y2="8" :stroke="activeIndex === index ? 'white' : '#3D3BFF'" stroke-width="2.5" stroke-linecap="round"/>
                  </svg>
                </div>
              </div>

              <!-- Answer -->
              <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
                <div v-show="activeIndex === index" class="overflow-hidden">
                  <div class="pr-6 md:pr-8 pb-7 text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl">
                    {{ item.answer }}
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-16 p-8 md:p-10 rounded-3xl border border-[#E7E9FF] flex flex-col md:flex-row items-center justify-between gap-6 fade-in-up" style="background: linear-gradient(135deg, #F5F6FF 0%, #EEF0FF 100%); animation-delay: 0.6s;">
        <div>
          <p class="text-xl font-black text-gray-900 mb-1">{{ t('faq.cta_title', 'Still have questions?') }}</p>
          <p class="text-gray-500 font-medium">{{ t('faq.cta_sub', 'Our team is happy to help you anytime.') }}</p>
        </div>
        <button
          class="flex-shrink-0 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95"
          style="background: #3D3BFF; box-shadow: 0 12px 40px rgba(61,59,255,0.35);"
        >
          {{ t('faq.cta_btn', 'Contact us →') }}
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const activeIndex = ref(0);

// Marker animation
const pathRef = ref(null);
const pathLength = ref(900);
const dashOffset = ref(900);

onMounted(() => {
  setTimeout(() => {
    if (pathRef.value) {
      const len = pathRef.value.getTotalLength();
      pathLength.value = len;
      dashOffset.value = len;
      requestAnimationFrame(() => {
        setTimeout(() => { dashOffset.value = 0; }, 300);
      });
    }
  }, 100);
});

const faqItems = computed(() => ([
  {
    question: t('faq.q1', 'Как производится оплата?'),
    answer: t('faq.a1', 'Оплата производится напрямую репетитору после каждого проведенного занятия. Мы не берем комиссию с учеников и не требуем предоплаты на сайте.')
  },
  {
    question: t('faq.q2', 'В чем отличие вашего сайта от досок объявлений?'),
    answer: t('faq.a2', 'Мы тщательно проверяем каждого репетитора, подтверждаем их дипломы и собираем честные отзывы. Наша система подбора помогает найти идеального учителя именно под ваши цели.')
  },
  {
    question: t('faq.q3', 'Сколько стоят ваши репетиторы?'),
    answer: t('faq.a3', 'Стоимость варьируется в зависимости от опыта преподавателя и предмета. У нас есть как начинающие специалисты, так и топовые эксперты — вы всегда найдете вариант под свой бюджет.')
  },
  {
    question: t('faq.q4', 'Есть ли дополнительные расходы?'),
    answer: t('faq.a4', 'Нет, использование платформы для поиска репетитора абсолютно бесплатно. Вы платите только за сами уроки.')
  },
  {
    question: t('faq.q5', 'На каких языках занимаются репетиторы?'),
    answer: t('faq.a5', 'Большинство занятий проводятся на узбекском и русском языках. Также у нас много учителей иностранных языков.')
  },
  {
    question: t('faq.q6', 'В каких городах есть репетиторы?'),
    answer: t('faq.a6', 'Наши репетиторы работают по всему Узбекистану: Ташкент, Самарканд, Бухара и другие города, а также в формате онлайн по всему миру.')
  }
]));

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const enter = (el) => {
  el.style.height = '0';
  el.offsetHeight;
  el.style.height = el.scrollHeight + 'px';
  el.style.transition = 'height 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
};
const afterEnter = (el) => { el.style.height = 'auto'; };
const leave = (el) => {
  el.style.height = el.scrollHeight + 'px';
  el.offsetHeight;
  el.style.height = '0';
  el.style.transition = 'height 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
};
</script>

<style scoped>
.faq-inactive {
  background: #f6f7ff;
  border: 1px solid rgba(61, 59, 255, 0.08);
}
.faq-inactive:hover {
  background: #fff;
  border-color: rgba(61, 59, 255, 0.2);
  box-shadow: 0 14px 44px rgba(61, 59, 255, 0.1);
}
.faq-active {
  background: #fff;
  border: 1px solid rgba(61, 59, 255, 0.3);
  box-shadow: 0 20px 65px rgba(61, 59, 255, 0.14);
}

.stagger-item {
  opacity: 0;
  transform: translateY(16px);
  animation: fadeUp 0.5s ease forwards;
}
@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-up {
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.expand-enter-active,
.expand-leave-active {
  overflow: hidden;
}
</style>
