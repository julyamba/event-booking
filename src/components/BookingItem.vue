<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <div>{{ title }}</div>
        <div>{{ status }}</div>
      </div>
      <RoundedButton variant="danger" @click="$emit('cancelled')">Cancel</RoundedButton>
    </div>
  </SectionCard>
</template>

<script setup>
import SectionCard from '@/components/SectionCard.vue';
import RoundedButton from '@/components/RoundedButton.vue';
defineProps({
  title: String,
  status: String
});
defineEmits(['cancelled']);
</script>
