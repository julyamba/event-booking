<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <div>{{ title }}</div>
        <div><component :is="icon" :class="{ 'animate-spin': pending }" :color="color" /></div>
      </div>
      <RoundedButton variant="danger" @click="$emit('cancelled')">Cancel</RoundedButton>
    </div>
  </SectionCard>
</template>

<script setup>
import SectionCard from '@/components/SectionCard.vue';
import RoundedButton from '@/components/RoundedButton.vue';
import { LoaderCircle, Check } from 'lucide-vue-next';
import { computed } from 'vue';
const props = defineProps({
  title: String,
  status: String
});
const pending = computed(() => props.status === 'pending');
const icon = computed(() => (pending.value ? LoaderCircle : Check));
const color = computed(() => (pending.value ? '#a6a6a6' : '#4eb558'));
defineEmits(['cancelled']);
</script>
