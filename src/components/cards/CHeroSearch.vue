<template>
  <section class="relative min-h-[600px] flex items-center justify-center px-6 py-20 bg-[#F5F5F5]">
    <div class="absolute top-20 left-10 w-64 h-64 bg-[#3D3BFF]/5 rounded-full blur-3xl"></div>
    <div class="max-w-4xl h-[550px] w-full bg-white p-12 md:p-16 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-white relative z-10">
      
      <div class="max-w-2xl">
        <h1 class="text-5xl md:text-6xl font-black text-black leading-[1.1] mb-8 tracking-tight min-h-[3.6em] md:min-h-[3.2em] lg:min-h-[2.35em]">
          <span>{{ t('hero.title.before') }}</span><span class="hero-space" aria-hidden="true">&nbsp;</span>
          <span class="rotating-word-slot" aria-live="polite">
            <span class="rotating-word rotating-word-live">
              {{ typedWord }}
            </span>
          </span>
          <span class="hero-space" aria-hidden="true">&nbsp;</span><span>{{ t('hero.title.after') }}</span>
        </h1>
        <p class="text-lg text-gray-500 font-medium leading-relaxed mb-12">
          {{ t('hero.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <CSelect 
          :placeholder="t('hero.filters.subject.placeholder')"
          :options="subjectOptions"
          v-model="form.subject"
        />
        <CSelect 
          :placeholder="t('hero.filters.city.placeholder')"
          :options="cityOptions"
          v-model="form.city"
        />
      </div>

      <CButton 
        size="xl" 
        block 
        :text="t('hero.cta')"
        @click="handleSearch"
      />

    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import CSelect from '../forms/CSelect.vue';
import CButton from '../forms/CButton.vue';

const { t, locale } = useI18n();
const TYPE_SPEED_MS = 160;
const DELETE_SPEED_MS = 120;
const WORD_HOLD_MS = 1500;
const NEXT_WORD_PAUSE_MS = 420;
const rotatingWordKeys = ['hero.title.rotating.tutors', 'hero.title.rotating.mentors'];
const typedWord = ref('');
const rotatingWordIndex = ref(0);
const isDeleting = ref(false);
let typingTimerId = null;

const form = reactive({
  subject: '',
  city: ''
});

const rotatingWords = computed(() => rotatingWordKeys.map((key) => t(key)));

const subjectOptions = computed(() => [
  t('hero.filters.subject.options.mathematics'),
  t('hero.filters.subject.options.english'),
  t('hero.filters.subject.options.physics'),
  t('hero.filters.subject.options.programming')
]);

const cityOptions = computed(() => [
  t('hero.filters.city.options.tashkent'),
  t('hero.filters.city.options.samarkand'),
  t('hero.filters.city.options.bukhara'),
  t('hero.filters.city.options.namangan')
]);

const handleSearch = () => {
  console.log('Searching for:', form.subject, 'in', form.city);
};

const stopTyping = () => {
  if (typingTimerId) {
    window.clearTimeout(typingTimerId);
    typingTimerId = null;
  }
};

const scheduleNextStep = (delay) => {
  typingTimerId = window.setTimeout(runTypewriterStep, delay);
};

const runTypewriterStep = () => {
  const words = rotatingWords.value;
  if (!words.length) {
    return;
  }

  const activeWord = words[rotatingWordIndex.value] || '';

  if (!isDeleting.value) {
    typedWord.value = activeWord.slice(0, typedWord.value.length + 1);

    if (typedWord.value === activeWord) {
      isDeleting.value = true;
      scheduleNextStep(WORD_HOLD_MS);
      return;
    }

    scheduleNextStep(TYPE_SPEED_MS);
    return;
  }

  typedWord.value = activeWord.slice(0, Math.max(typedWord.value.length - 1, 0));

  if (!typedWord.value.length) {
    isDeleting.value = false;
    rotatingWordIndex.value = (rotatingWordIndex.value + 1) % words.length;
    scheduleNextStep(NEXT_WORD_PAUSE_MS);
    return;
  }

  scheduleNextStep(DELETE_SPEED_MS);
};

const startTyping = () => {
  stopTyping();
  typedWord.value = '';
  rotatingWordIndex.value = 0;
  isDeleting.value = false;
  scheduleNextStep(NEXT_WORD_PAUSE_MS);
};

onMounted(() => {
  startTyping();
});

onUnmounted(() => {
  stopTyping();
});

watch(locale, () => {
  startTyping();
});
</script>

<style scoped>
.rotating-word-slot {
  position: relative;
  display: inline-block;
  vertical-align: baseline;
  min-width: 0.14em;
}

.rotating-word {
  display: inline-block;
  white-space: nowrap;
  padding: 0 0.02em;
  background-image: linear-gradient(130deg, #2f2ce3 0%, #3d3bff 30%, #6f6dff 55%, #3d3bff 80%, #2f2ce3 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 12px 28px rgba(61, 59, 255, 0.18);
  will-change: transform, opacity, filter;
  animation: wordSheen 4s ease-in-out infinite;
}

.rotating-word-live {
  position: relative;
}

.rotating-word-live::after {
  content: '';
  display: inline-block;
  width: 0.08em;
  height: 0.86em;
  margin-left: 0.09em;
  border-radius: 2px;
  background-color: #3d3bff;
  vertical-align: -0.05em;
  animation: cursorBlink 1s steps(1, end) infinite;
}

@keyframes wordSheen {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes cursorBlink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rotating-word {
    animation: none;
  }

  .rotating-word-live::after {
    animation: none;
    opacity: 1;
  }
}
</style>
