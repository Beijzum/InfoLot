//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyB57xi50lvxIl4VAk0yT_wT2V4NCSKcnSQ",
    authDomain: "infolot-6f879.firebaseapp.com",
    projectId: "infolot-6f879",
    storageBucket: "infolot-6f879.appspot.com",
    messagingSenderId: "1026901899909",
    appId: "1:1026901899909:web:23d6e578b5acb354ae07ec"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();