<template>
  <ul :class="navStyle">
    <router-link class="link" :to="{ name: 'Home' }" @click.native="closeNav">Home</router-link>
    <router-link class="link" :to="{ name: 'Blogs' }" @click.native="closeNav">Blogs</router-link>
    <router-link class="link" v-if="admin" :to="{ name: 'CreatePost' }" @click.native="closeNav"
      >Create Post</router-link
    >
    <router-link class="link" v-if="!user" :to="{ name: 'Login' }" @click.native="closeNav"
      >Login/Register</router-link
    >
  </ul>
  
</template>

<script>
export default {
  props: ["navStyle","user","admin"],
  methods:{
    closeNav(){

      this.$emit('toggle-MobileNav')
     
    }
  }
};
</script>


<style lang="scss" scoped>

 .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
    &:hover {
      color: #1eb8b8;
    }
 }   
 .mobile-nav{
   .link{
     color:#fff;
      padding: 15px 0;
   }
 }
</style>