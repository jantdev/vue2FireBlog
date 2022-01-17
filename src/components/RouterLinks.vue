<template>
  <ul :class="navStyle">
    <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
    <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
    <router-link class="link" :to="{ name: 'CreatePost' }"
      >Create Post</router-link
    >
    <router-link class="link" :to="{ name: 'Login' }"
      >Login/Register</router-link
    >
  </ul>
</template>

<script>
export default {
  props: ["navStyle"],
};
</script>
