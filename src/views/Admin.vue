<template>
   <div class="admin">
    <div class="container">
      <h2>Administration</h2>
     
      <div class="admin-info">
         <p>Allow create post</p>
     <div class="list" >
       <div class="user" v-for="user in users" :key="user.id">
          <p> {{user.data.email}}</p>
       <input type="checkbox" v-model="user.data.admin" @click="updateAdmin(user.id)"/>
       </div>
     
     </div>
        
        <button class="button" @click="closeAdmin">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
name:"Admin",
data(){
  return{
    users:[],
    error:null,
    errorMsg:null
  }
},
methods:{
  async updateAdmin(id){
    const dataBase = await db.collection("users").doc(id) 
    await dataBase.get().then((doc)=>{
      return doc.data().admin
    }).then((admin)=>{
        const newadmin = !admin
        return newadmin
    }).then((newadmin)=>{
      dataBase.update({
        admin:newadmin
      })
      
    }).catch(err=>{
      this.error = true
      this.errorMsg = err.message
    })
  },
  closeAdmin(){
    this.$router.push({name: 'Home'})
  } 
    
},
async created(){
  await db.collection("users").get().then((querySnapshot)=>{
  querySnapshot.forEach((doc) => {
   if(!doc.data().master){
        this.users.push({id:doc.id,data:doc.data()})
   }
    });
  }).catch(err=>{
    console.log(err)
  })

}
}
</script>

<style lang="scss" scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 60px 25px;
    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
     
      .list{
        display:flex;
        flex-direction: column;
        .user{
          padding:1rem 0rem;
          display:flex;
          justify-content: space-between;
          border-bottom:1px solid #333;
          align-items: center;
          input{
            width:30px;
            height:30px;
          }
        }
      }
      button {
        align-self: center;
      }
    }
  }
}
</style>