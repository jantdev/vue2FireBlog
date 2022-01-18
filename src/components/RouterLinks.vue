<template>
  <ul :class="navStyle">
    <router-link class="link" :to="{ name: 'Home' }" @click.native="closeNav">Home</router-link>
    <router-link class="link" :to="{ name: 'Blogs' }" @click.native="closeNav">Blogs</router-link>
    <router-link class="link" :to="{ name: 'CreatePost' }" @click.native="closeNav"
      >Create Post</router-link
    >
    <router-link class="link" :to="{ name: 'Login' }" @click.native="closeNav"
      >Login/Register</router-link
    >
  </ul>
  
</template>

<script>
export default {
  props: ["navStyle"],
  methods:{
    closeNav(){

      this.$emit('toggle-MobileNav')
     
    }
  }
};
</script>
