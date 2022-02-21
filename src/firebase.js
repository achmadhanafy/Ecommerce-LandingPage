import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCMasr1gATxwSH9R1Ji8_muQxRtd3Bst8",
    authDomain: "web-d4f00.firebaseapp.com",
    projectId: "web-d4f00",
    storageBucket: "web-d4f00.appspot.com",
    messagingSenderId: "362987629595",
    appId: "1:362987629595:web:8c6f53efc9a16611541cbe",
    measurementId: "G-1C0031SZ7X"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};