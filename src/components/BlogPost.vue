<template>
  <div class="blog-wrapper">
    <div class="blog-content">
      <div :class="post.welcomeScreen ? 'welcome' : 'blog'">
        <h2 :class="post.welcomeScreen ? 'welcome-title' : 'blog-title'">
          {{ post.title }}
        </h2>
        <p :class="post.welcomeScreen ? 'welcome-content' : 'content-preview'">
          {{ post.blogPost }}
        </p>
        <router-link
          :class="post.welcomeScreen ? 'link link-light' : 'content-preview'"
          to="#"
        >
          <span v-if="post.welcomeScreen"
            >Login/Register<Arrow class="arrow arrow-light"
          /></span>
          <span v-else>View the Post<Arrow class="arrow"/></span>
        </router-link>
      
      </div>
    </div>
      <div class="blog-photo">
          <img
            v-if="post.welcomeScreen"
            :src="require(`../assets/blogPhotos/${post.photo}.jpg`)"
            alt="post.title"
          />
          <img
            v-else
            :src="require(`../assets/blogPhotos/${post.photo}.jpg`)"
            alt="post.title"
          />
        </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
export default {
  name: "BlogPost",
  props: ["post"],
  components: { Arrow },
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex:4;
    order:2;
    .welcome{
         background-color: #303030;
    color: #fff;
    }
   div {

      h2 {
        font-size: 32px;
         font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: 768px) {
          font-size: 40px;
        }
      }
    p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }
    }
    .content-preview {
        font-size: 13px;
        max-height: 24px;
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
       .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;
        &:hover {
          border-bottom-color: #303030;
        }
      }
   
  }
  .blog-photo {
      order:1;
      flex:3;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
}
</style>
