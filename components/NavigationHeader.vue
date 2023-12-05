<script>
import { RouterLink } from 'vue-router';

</script>

<template>
        
      <nav>
        <!-- "logo" -->
        <div class="logo">
          <p class="log-text">Web Dev Conference</p>
        </div>
        <!-- links to page -->
        <div class="links">
          <!-- home + sessions -->
        <RouterLink to="/sessions">Home</RouterLink>
        <!-- user sessions -->
        <RouterLink to="/mySessions">About</RouterLink>
        </div>
      </nav>
</template>

<style>
nav {
  width: 800px;
  height: 60px;
  border-radius: 20px;
  background-color: gainsboro;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px auto 0 auto;
  padding: 20px;
}


/* active link class */
nav a.router-link-exact-active {
  color: red;
}

nav a.router-link-exact-active:hover {
  background-color: orange;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>