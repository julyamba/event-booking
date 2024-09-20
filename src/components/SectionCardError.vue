<template>
  <SectionCard>
    <div class="space-y-4 items-center flex flex-col">
      <div class="text-red-500">
        <slot />
      </div>
      <RoundedButton v-if="fetchRetry" @click="fetchRetry">Retry now</RoundedButton>
    </div>
  </SectionCard>
</template>

<script setup>
import RoundedButton from '@/components/RoundedButton.vue';
import SectionCard from './SectionCard.vue';
defineProps({
  fetchRetry: {
    type: Function,
    required: false
  }
});
</script>
