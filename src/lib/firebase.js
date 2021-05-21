import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD-CWqnBrYXpdk0syKyOXC4YEb76h6z4D8",
    authDomain: "jp3-todolist-react.firebaseapp.com",
    projectId: "jp3-todolist-react",
    storageBucket: "jp3-todolist-react.appspot.com",
    messagingSenderId: "12475153200",
    appId: "1:12475153200:web:11e83e1b60f2c8681466f5"
  };
  // Initialize Firebase
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();

  export default db;