import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCiNqiAYO2KDyig9CTasWQSqR2LEMu4NuI",
    authDomain: "homework-weeks.firebaseapp.com",
    projectId: "homework-weeks",
    storageBucket: "homework-weeks.appspot.com",
    messagingSenderId: "159981894432",
    appId: "1:159981894432:web:d03dfec40e634de062b545"
  };

// var firebaseConfig = {
//   apiKey: "AIzaSyAPlAGnfuB_VOPPMPZ7bb3iC36-vnHsOzQ",
//   authDomain: "proyecto-prueba-user.firebaseapp.com",
//   projectId: "proyecto-prueba-user",
//   storageBucket: "proyecto-prueba-user.appspot.com",
//   messagingSenderId: "791733910703",
//   appId: "1:791733910703:web:d5435ee70c3e6fea1d685a"
// };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();

  export {db,auth,firebase}