<template>
  <div>
    <h2>Login here</h2>
    <div>
      <input type="text" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <p v-if="errMsg">{{ errMsg }}</p>
      <button @click="logIn">LogIn</button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { auth } from '../firebase.js'
import { signInWithEmailAndPassword } from "firebase/auth";

import router from '../router';



//const router = useRouter()

let email = ref('')
let password = ref('')
const errMsg = ref('') // error message

//const auth = getAuth();

let logIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((data) => {
    console.log(data)
  // console.log(auth.currentUser)
    router.push('/navguard')
  })
  .catch((error) => {
    console.log(error.code)
    // switch case for firebae error codes
    switch (error.code) {
      case 'auth/invalid-email':
        errMsg.value = 'Invalid email'
        break;
      case 'auth/user-disabled':
        errMsg.value = 'User disabled'
        break;
      case 'auth/user-not-found':
        errMsg.value = 'User not found'
        break;
      case 'auth/wrong-password':
        errMsg.value = 'Wrong password'
        break;
      default:
        errMsg.value = 'Something went wrong'
        break;
    }
  })
}

  
</script>

<style lang="scss" scoped>

</style>