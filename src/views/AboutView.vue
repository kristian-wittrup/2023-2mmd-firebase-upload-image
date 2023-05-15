<template>
  <div>
    <h1>
      Posts page stuff
    </h1>

    <div class="" v-for="post in posts" :key="post">

      <p v-html="post.title"></p>
      <p v-html="post.description"></p>
      <p v-html="post.imgURL"></p>
  
      <img :src="post.imgURL" alt="post image" width="200" height="200">

      <br>
      <p>PostID: {{post.id}}</p>
     

      
    </div>


    <hr>
      <br>
      <h2>Add new post with image</h2>
      <input type="text" v-model="addItemData.AddItemDataTitle">
      <input type="text" v-model="addItemData.AddItemDataDescription"> 
     

      
      <input type="file" label="File input" @change="uploadImg">

      
      <br>
      <button @click.prevent="firebaseAddSingleItem()" :disabled="addItemData.uploadBtnDisabled">Add item</button>
      
      <!-- <div v-if="uploadBtnDisabled">
        <p>No image uploaded</p>
      </div> -->  
    <!--   <div v-else> -->
<!--       <button @click="testDisable()">test</button>
 -->
   

  <!--     </div> -->
    
    
    </div>
</template>

<script setup>
import { collection, addDoc  } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onMounted , reactive} from 'vue' // using reactive instead of ref, because we also use ref from firebase
import { db } from '../firebase.js'
import usePosts from '../modules/usePosts' 

const { 
  posts,
  getPostsData, 
} = usePosts()

onMounted(() => {
  getPostsData()
})

// Add item data: title, description, image URL and have the button disabled until image is uploaded
let addItemData = reactive({
  AddItemDataTitle : '',
  AddItemDataDescription : '',
  imgURL: '',
  uploadBtnDisabled: true
})

 // Add dynamic data to Firebase Firestore
 const firebaseAddSingleItem = async() => {
    await addDoc(collection(db, "posts"), {
      title: addItemData.AddItemDataTitle,
      description: addItemData.AddItemDataDescription,
      imgURL: addItemData.imgURL
    }
    ).then(() => {
      //  snackbar.value = true
    })
  }

const storage = getStorage();
 
// Firebase storage upload image + get download URL + enable button after image uploaded
const uploadImg = async(event) => {
  let file = event.target.files[0]; // get the file
  console.log("file", file)
// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');       
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);

      addItemData.imgURL = downloadURL // update variable imgURL and put the image URL link in it. 
      addItemData.uploadBtnDisabled = false // enable button after image uploaded is complete
    });
  }  
);
}
</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
