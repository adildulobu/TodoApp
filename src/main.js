import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyDDqvHHHEj1qgveBThC1pLiF7xt31HlGCw",
  authDomain: "todoapp-ac559.firebaseapp.com",
  projectId: "todoapp-ac559",
  storageBucket: "todoapp-ac559.appspot.com",
  messagingSenderId: "353429547097",
  appId: "1:353429547097:web:430dde5d3c42796957e948"
}

firebase.initializeApp(config)

export const db = firebase.firestore()

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
