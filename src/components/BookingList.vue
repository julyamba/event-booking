<template>
  <template v-if="error">
    <SectionCardError :fetch-retry="fetchBookings"
      >Could not load bookings at the moment. Please try again.</SectionCardError
    >
  </template>
  <template v-else>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!loading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
          @cancelled="cancelBooking(booking.id)"
        />
      </template>
      <template v-else>
        <LoadingBookingCard v-for="i in 4" :key="i" />
      </template>
    </section>
  </template>
</template>

<script setup>
import { onMounted } from 'vue';
import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingCard from '@/components/LoadingBookingCard.vue';
import useBookings from '@/composables/useBookings';
import SectionCardError from '@/components/SectionCardError.vue';

const { error, bookings, loading, fetchBookings, cancelBooking } = useBookings();

onMounted(() => {
  fetchBookings();
});
</script>
