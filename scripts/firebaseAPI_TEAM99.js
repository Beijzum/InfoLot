//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyAcdKViSLPBY1XyqxHxymaQ6TbFb2dx69s",
  authDomain: "comp1800-202330-44bc8.firebaseapp.com",
  projectId: "comp1800-202330-44bc8",
  storageBucket: "comp1800-202330-44bc8.appspot.com",
  messagingSenderId: "111807672226",
  appId: "1:111807672226:web:29963b809db90b4b5b8cfb"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();