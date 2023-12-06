<!-- user sessions.vue -->
<!-- import view needed -->
<script setup>
import UserSessions from '../views/UserSessionsView.vue';
</script>

<!-- begin template -->
<template>
  <main>
    <!-- use component - user sessions -->
    <UserSessions :newSessions="newSessions" />
  </main>
</template>
