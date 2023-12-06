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
        <RouterLink to="/sessions" class="aLink">Sessions</RouterLink>
        <!-- user sessions -->
        <RouterLink to="/mySessions" class="aLink">My Sessions</RouterLink>
        </div>
      </nav>
</template>

<style>
nav {
  width: 920px;
  height: 60px;
  border-radius: 20px;
  background-color: #ddd5ca;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px auto 0 320px;
  padding: 20px;
  text-decoration: none;
}

.aLink {
  font-size: 18px;
  height: 30px;
  width: 100px;
  padding-top: 10px;
  text-align: center;
  background-color: #6d5c45;
  color: #fff;
  margin-right: 55px;
  text-decoration: none;
  border-radius: 20px;
}

/* logo */
.logo {
  font-size: 30px;
  font-weight: bold;
  color: #5f5249;
}

/* active link class */
nav a.router-link-exact-active {
  background-color: #957d5e;
}

.aLink:hover {
  background-color: #272119;
  color: #fff
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