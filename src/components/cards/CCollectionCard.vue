<template>
  <div
    ref="cardRef"
    class="card-wrapper relative cursor-pointer rounded-[28px] overflow-hidden min-w-[280px] md:min-w-[340px] h-[420px] md:h-[500px] snap-center flex-shrink-0"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @mousemove="onMove"
  >
    <!-- Image -->
    <img
      :src="image"
      :alt="title"
      class="absolute inset-0 w-full h-full object-cover"
      :style="{ transform: `scale(${imageScale})`, transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }"
      loading="lazy"
    />

    <!-- Dark base overlay -->
    <div class="absolute inset-0 bg-black/40 transition-opacity duration-500" :style="{ opacity: isHovered ? 0.55 : 0.4 }"></div>

    <!-- Animated blue glow at bottom -->
    <div
      class="absolute bottom-0 left-0 right-0 h-[65%] transition-all duration-700"
      :style="{
        background: isHovered
          ? 'linear-gradient(to top, #3D3BFF 0%, #3D3BFF55 50%, transparent 100%)'
          : 'linear-gradient(to top, #000000cc 0%, #00000066 50%, transparent 100%)',
        opacity: isHovered ? 1 : 1,
      }"
    ></div>

    <!-- Tilt layer -->
    <div
      class="absolute inset-0"
      :style="{
        transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }"
    >
      <!-- Shine -->
      <div
        class="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        :style="{
          opacity: isHovered ? 0.18 : 0,
          background: `radial-gradient(circle at ${shineX}% ${shineY}%, white 0%, transparent 65%)`,
        }"
      ></div>

      <!-- Count badge -->
      <div class="absolute top-6 left-0 right-0 flex justify-center">
        <div
          class="badge flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-500"
          :style="{
            background: isHovered ? '#3D3BFF' : 'rgba(245,245,245,0.15)',
            color: '#F5F5F5',
            backdropFilter: 'blur(12px)',
            border: isHovered ? '1.5px solid #3D3BFF' : '1.5px solid rgba(245,245,245,0.3)',
            transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
            boxShadow: isHovered ? '0 8px 32px #3D3BFF88' : 'none',
          }"
        >
          <span
            class="inline-block w-1.5 h-1.5 rounded-full"
            :style="{ background: isHovered ? '#fff' : '#3D3BFF', transition: 'background 0.4s' }"
          ></span>
          {{ count }} {{ t('collections.courses_count_suffix') }}
        </div>
      </div>

      <!-- Bottom content -->
      <div class="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-4">

        <!-- Title -->
        <h3
          class="text-white font-black text-2xl lg:text-[28px] leading-tight text-center transition-all duration-500"
          :style="{
            transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
            textShadow: isHovered ? '0 4px 24px rgba(61,59,255,0.5)' : '0 2px 12px rgba(0,0,0,0.4)',
          }"
        >
          {{ title }}
        </h3>

        <!-- CTA button -->
        <div
          class="overflow-hidden transition-all duration-500"
          :style="{ maxHeight: isHovered ? '60px' : '0px', opacity: isHovered ? 1 : 0 }"
        >
          <button
            class="w-full py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 active:scale-95"
            style="background: #F5F5F5; color: #3D3BFF;"
          >
            Explore collection →
          </button>
        </div>

      </div>
    </div>

    <!-- Border glow ring -->
    <div
      class="absolute inset-0 rounded-[28px] pointer-events-none transition-all duration-500"
      :style="{
        boxShadow: isHovered
          ? '0 0 0 2px #3D3BFF, 0 32px 64px #3D3BFF44, 0 8px 32px #00000066'
          : '0 8px 32px rgba(0,0,0,0.25)',
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  image: { type: String, required: true },
  count: { type: [Number, String], required: true },
  title: { type: String, required: true },
});

const cardRef = ref(null);
const isHovered = ref(false);
const imageScale = ref(1);
const tiltX = ref(0);
const tiltY = ref(0);
const shineX = ref(50);
const shineY = ref(50);

const onEnter = () => {
  isHovered.value = true;
  imageScale.value = 1.08;
};

const onLeave = () => {
  isHovered.value = false;
  imageScale.value = 1;
  tiltX.value = 0;
  tiltY.value = 0;
};

const onMove = (e) => {
  if (!cardRef.value) return;
  const rect = cardRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  tiltY.value = ((x - cx) / cx) * 6;
  tiltX.value = -((y - cy) / cy) * 6;
  shineX.value = (x / rect.width) * 100;
  shineY.value = (y / rect.height) * 100;
};
</script>

<style scoped>
.card-wrapper {
  transform-style: preserve-3d;
  will-change: transform;
}

.badge {
  will-change: transform, background;
}
</style>