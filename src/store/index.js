import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPosts:[],
    postLoaded:null,
    blogHTML:"Write your blog title here...",
    blogTitle:"",
    blogCoverPhotoName:"",
    blogPhotoFileURL:null,
    blogPhotoPreview:null,
    editPost:null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    master:null
  },
  mutations: {
    toggleEditPost(state,payload){
      state.editPost = payload
    },
    setProfileInfo(state,doc){
      state.profileEmail = doc.data().email
      state.profileFirstName = doc.data().firstName
      state.profileLastName = doc.data().lastName
      state.profileUsername = doc.data().username
      state.profileId = doc.id
      state.profileAdmin = doc.data().admin
      state.master = doc.data().master
    },
    setProfileInitals(state){
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("").toUpperCase()+state.profileLastName.match(/(\b\S)?/g).join("").toUpperCase()
    },
    updateUser(state,payload){
      state.user = payload
    },
    changeFirstName(state,payload){
     state.profileFirstName = payload
    
    },
    changeLastName(state,payload){
      state.profileLastName = payload
     
     },
     changeUsername(state,payload){
      state.profileUsername = payload
     },
     newBlogPost(state,payload){
       state.blogHTML = payload
     },
     updateBlogTitle(state,payload){
       state.blogTitle = payload
     },
     fileNameChange(state,payload){
      state.blogCoverPhotoName = payload
     },
     createFileURL(state,payload){
      state.blogPhotoFileURL = payload
     },
     openPhotoPreview(state){
       state.blogPhotoPreview = !state.blogPhotoPreview 
     },
     filterBlogPost(state,payload){
      state.blogPosts = state.blogPosts.filter(post=> post.blogID !== payload)
     },
     setBlogState(state,payload){
       state.blogTitle = payload.blogTitle
       state.blogHTML = payload.blogHTML
       state.blogPhotoFileURL= payload.blogCoverPhoto
       state.blogCoverPhotoName = payload.blogCoverPhotoName
     }
  },
  actions: {
    async getCurrentUser({commit}){
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get()
      commit('setProfileInfo',dbResults)
      commit('setProfileInitals')
  
    },
    async updateProfileSettings({commit,state}){
      const dataBase = await db.collection('users').doc(state.profileId)
      await dataBase.update({
        firstname: state.profileFirstName,
        lastname:state.profileLastName,
        username:state.profileUsername

      })
      commit('setProfileInitals')
    },
    async getPosts({state}){
      const dataBase = await db.collection('blogPosts').orderBy('date','desc')
      const dbResults = await dataBase.get()
      dbResults.forEach((doc)=>{
       if(!state.blogPosts.some(post=> post.blogID === doc.id)){
          const payload = {
            blogID:doc.data().blogID,
            blogHTML:doc.data().blogHTML,
            blogTitle:doc.data().blogTitle,
            blogCoverPhoto:doc.data().blogCoverPhoto,
            blogDate:doc.data().date,
            blogCoverPhotoName:doc.data().blogCoverPhotoName
          }
          state.blogPosts.push(payload)
          
       }
      })
      state.postLoaded = true
  
    },
    async deletePost({commit},payload){
      const getPost = await db.collection('blogPosts').doc(payload)
      await getPost.delete()
      commit('filterBlogPost',payload)
    },
    async updatePost({commit,dispatch},payload){
      commit('filterBlogPost',payload)
      await dispatch('getPosts')
    }
  },
  getters:{
    blogPostFeed(state){
      return state.blogPosts.slice(0,2)
    },
    blogPostCards(state){
      return state.blogPosts.slice(2,6)
    },
    blogPostById(state,blogid){
      return state.blogPosts.map(id=>{
        return id===blogid
      })
    }
  },
  modules: {
  }
})
