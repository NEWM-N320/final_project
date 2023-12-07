<!-- App vue -->

<script setup>
// import from vue router
import {RouterView } from 'vue-router'

//import the navigation header - only place that has this!
import NavigationHeader from './components/NavigationHeader.vue'

</script>


<!-- begin template -->
<template>
  <div id="app">
      <!-- should only have nav + router -->
  <header>

    <!-- nav header -->
      <NavigationHeader></NavigationHeader>
  </header>

  <!-- router -->
  <RouterView />
  </div>
</template>