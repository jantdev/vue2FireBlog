<template>
    <ul :class="this.$props.navStyle">
        <router-link to="#" class="link">Home</router-link>
        <router-link to="#" class="link">Blogs</router-link>
        <router-link to="#" class="link">Creat Post</router-link>
        <router-link to="#" class="link">Login/Register</router-link>
    </ul>
</template>

<script>
export default {
    props:['navStyle'],

}
</script>

<style lang="scss">
.mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
    .link {
      padding: 15px 0;
      color: #fff;
    }
   
  }


</style>