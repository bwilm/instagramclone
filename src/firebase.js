import firebase from "firebase";


const firebaseApp =  firebase.initializeApp({

    apiKey: "AIzaSyDtXJj_Dh4sDvAjqIFbN0t4nxWLFnpgV9U",
    authDomain: "instagram-clone-b7499.firebaseapp.com",
    databaseURL: "https://instagram-clone-b7499.firebaseio.com",
    projectId: "instagram-clone-b7499",
    storageBucket: "instagram-clone-b7499.appspot.com",
    messagingSenderId: "490133263918",
    appId: "1:490133263918:web:8c8d993d2dcadf878db1bf",
    measurementId: "G-RELVRHK0YF"

});


  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();


export {db, auth, storage};