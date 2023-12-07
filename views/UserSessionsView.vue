<!-- user sessions view.vue -->
<!-- import view needed -->
<script setup>
import UserSessions from '../components/UserSessions.vue';
</script>

<!-- begin template -->
<template>
  <div>
    <!-- use component - user sessions -->
    <UserSessions :newSessions="newSessions" />
  </div>
</template>
