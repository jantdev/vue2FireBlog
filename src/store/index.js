import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog card #1",
        blogCoverPhoto: "stock-1",
        blogData: "May 1 2021",
      },
      {
        blogTitle: "Blog card #2",
        blogCoverPhoto: "stock-2",
        blogData: "May 1 2021",
      },
      {
        blogTitle: "Blog card #3",
        blogCoverPhoto: "stock-3",
        blogData: "May 1 2021",
      },
      {
        blogTitle: "Blog card #4",
        blogCoverPhoto: "stock-4",
        blogData: "May 1 2021",
      },
    ],
    blogPosts:[],
    postLoaded:null,
    blogHTML:"Write your blog title here...",
    blogTitle:"",
    blogPhotoName:"",
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
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("")+state.profileLastName.match(/(\b\S)?/g).join("")
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
      state.blogPhotoName = payload
     },
     createFileURL(state,payload){
      state.blogPhotoFileURL = payload
     },
     openPhotoPreview(state){
       state.blogPhotoPreview = !state.blogPhotoPreview 
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
            date:doc.data().date
          }
          state.blogPosts.push(payload)
          
       }
      })
      state.postLoaded = true
      console.log(state.blogPosts)
    }
  },
  modules: {
  }
})
