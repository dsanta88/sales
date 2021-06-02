import firebase from 'firebase/app'

  // Your web app's Firebase configuration
  const  firebaseConfig = {
    apiKey: "AIzaSyBGXrEz1jLjR84WhfEozuA9jx0BmZPDAvo",
    authDomain: "sales-d1141.firebaseapp.com",
    projectId: "sales-d1141",
    storageBucket: "sales-d1141.appspot.com",
    messagingSenderId: "194647205038",
    appId: "1:194647205038:web:9461ef10737dee07ca393f"
  };
  // Initialize Firebase
  export const firebaseApp= firebase.initializeApp(firebaseConfig)