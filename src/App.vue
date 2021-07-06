<template>
  <div id="app">
    <div class="title">What do I need to do today?</div>
    <input v-model="myTodo" /><button @click="addTodo">Add</button>
    <div v-if="errors !==''" id="errors">{{errors}}</div>

    <div v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">
        <div class="title">Todos that neeed to be done today</div>

        <div v-for="item in this.$store.getters.getItems" :key="item.id">
          {{item.title}}<br/><br/><small style="cursor: pointer" @click="deleteItem(item.id)">Delete</small>
          <br />
        </div>
    </div>
  </div>
</template>

<script>
import {db} from '@/main'
export default {
  name: 'App',
  beforeCreate:function(){
    this.$store.dispatch('setItems')
  },
  data(){
    return{
      myTodo: '',
      errors:''
    }
  },
  methods:{
    addTodo(){
      this.errors = ''
      if(this.myTodo !== ''){
         db.collection('items').add({
           title: this.myTodo,
           createdAt: Date.now()
         }).then((response) =>{
            if(response){
              this.myTodo = ''
            }
         }).catch((error) =>{
           this.errors = error
         })
      }else{
        this.errors = 'Enter a todo'
      }
    },
    deleteItem(id){
      if(id){
        db.collection('items').doc(id).delete()
        .then(function(){
          console.log('deleted item')
        }).catch(function(e){
          this.errors = e
        })
      }else{
        this.errors = 'No ID'
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body,html,#app {
  background: #8ac8e5;
}
#app{
  width: 360px;
  margin: auto;
  margin-top: 15px;
}

input, button {
  border: 0;
  width: 100%;
  margin: 0 0 10px;
  padding: 7px;
}
input{
  font-size: 12px;
}
button {
  background: #23a2b8;
  border: 0;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
.title{
  font-size: 14px;
  font-weight: 700;
  padding: 0 0 10px 0;
  margin: 0 0 10px 0;
  border-bottom: 1px solid #666;
}
#errors{
  background: #ff0000;
  color: #fff;
  padding: 5px;
}
</style>
