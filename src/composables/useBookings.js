import { ref } from 'vue';

const bookings = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchBookings = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
};

// this is a good practice of how UI and
// database processess data, on click event
const handleRegistration = async (event) => {
  // this is to check if already registered on a certain bookings
  if (bookings.value.some((booking) => booking.eventId === event.id && booking.userId === 1)) {
    alert('You are already registered for this event.');
    return;
  }

  // create temporary new bookings
  // with a status of 'pending'
  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending'
  };

  // then pushed it to the bookings variable
  // which then be visible on the display
  // but not yet pushed on the database
  // just for UI best practice
  bookings.value.unshift(newBooking);

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newBooking, status: 'confirmed' })
    });
    if (response.ok) {
      // after pushing it to database, if no error occurs
      // then the new booking pushed earlier will be
      // replaced to the booking pushed on the database
      // this booking has 'confirmed' status
      // so automatically it will display 'confirmed' after 'pending'
      // this is a good practice of UI
      const index = findBookingById(newBooking.id);
      bookings.value[index] = await response.json();
    } else {
      throw new Error('Failed to confirm booking');
    }
  } catch (e) {
    // if the new booking not successfully pushed
    // or encountered an error
    // it will revert
    console.error('Failed to register for event: ', e);
    bookings.value = bookings.value.filter((b) => b.id !== newBooking.id);
  }
};

const findBookingById = (id) => {
  return bookings.value.findIndex((b) => b.id === id);
};

const cancelBooking = async (bookingId) => {
  const index = findBookingById(bookingId);
  const originalBooking = bookings.value[index];
  bookings.value.splice(index, 1);

  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Booking could not be cancelled.');
    }
  } catch (e) {
    console.log('Failed to cancel booking: ', e);
    bookings.value.splice(index, 0, originalBooking);
  }
};

export default function useBookings() {
  return {
    error,
    bookings,
    loading,
    fetchBookings,
    handleRegistration,
    cancelBooking
  };
}
