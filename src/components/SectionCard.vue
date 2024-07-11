<template>
  <RoundedCard>
    <h3 v-if="$slots.header" class="p-4 font-medium text-xl border-b border-gray-200">
      <slot name="header"></slot>
    </h3>
    <div v-if="$slots.default" :class="{ 'p-4': true, 'border-b border-gray-200': $slots.footer }">
      <slot></slot>
    </div>
    <div class="p-4" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </RoundedCard>
</template>

<script setup>
import RoundedCard from '@/components/RoundedCard.vue';
</script>
