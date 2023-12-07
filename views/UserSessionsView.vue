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
  watch: {
  userSessions(newValue) {
    console.log('UserSessionsView - Updated userSessions:', newValue);
  },
},
}
</script>
