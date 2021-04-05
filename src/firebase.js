import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCVruE4oZJ6LsLqP4JTWiUvukwey078-TY",
    authDomain: "chat-app-91653.firebaseapp.com",
    projectId: "chat-app-91653",
    storageBucket: "chat-app-91653.appspot.com",
    messagingSenderId: "52683869332",
    appId: "1:52683869332:web:8f5265fc35768e08853881",
    measurementId: "G-47HPQM3JR1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider(); 
 
  export {auth,provider};
  export default db;