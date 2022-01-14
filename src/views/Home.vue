<template>
  <div class="home">

<BlogPost v-for="(post,index) in sampleBlogPost" :key="index" :post="post"/>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost"
export default {
  name: "Home",
  components: {BlogPost},
  data(){
    return{
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPost:[
        {
        title: "Welcome!",
        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
        { title:'This is a blog post title',
        blogPost:'This is a blog post body',
        photo:'beautiful-stories'},
        { title:'This is a blog post title',
        blogPost:'This is a blog post body',
        photo:'designed-for-everyone'}
      ]
    }
  }
};
</script>

<style lang="scss">
.home{
  background:#aaa;
}

</style>