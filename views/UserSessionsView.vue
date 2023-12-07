<!-- user sessions view.vue -->
<!-- import view needed -->
<script setup>
import UserSessions from '../components/UserSessions.vue';
</script>

<!-- begin template -->
<template>
  <div>
    <!-- use component - user sessions -->
    <UserSessions :userSessions="userSessions" />
  </div>
</template>

<script>
export default {
  data() {
    return{
      userSessions: [],
    }
  },

  methods: {
    toggleItemStatus(sessionId) {
      // Find the corresponding user session by ID
      const userSession = this.userSessions.find((s) => s.id === sessionId);

      if (userSession) {
        // Toggle the 'added' property
        userSession.added = !userSession.added;
      }
  }
}
}
</script>