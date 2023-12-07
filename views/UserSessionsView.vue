<!-- UserSessionsView.vue -->
<script setup>
import UserSessions from '../components/UserSessions.vue';
</script>

<template>
  <div>
    <!-- use component - user sessions -->
    <UserSessions :userSessions="userSessions" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userSessions: [],
    }
  },
  // Add a log statement to check the received data
  watch: {
    userSessions(newValue) {
      console.log('UserSessionsView - userSessions:', newValue);
    },
  },
}
</script>
