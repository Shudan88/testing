import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAqQ7dXd_b3t1jBvnx6I3uZYael0rl72qk",
    authDomain: "bt3103-week-6-6af18.firebaseapp.com",
    projectId: "bt3103-week-6-6af18",
    storageBucket: "bt3103-week-6-6af18.appspot.com",
    messagingSenderId: "201750310738",
    appId: "1:201750310738:web:fccd8d2fd22fe58ca0948b",
    measurementId: "G-ZTC37SEDWC"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;