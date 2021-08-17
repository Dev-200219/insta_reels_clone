import firebase from "firebase/app";
import "firebase/auth";
//firestore is the database provided to us by firebase
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBadQVrkeOZVea7ZGpxC3Tm-BfZF8xbXrw",
    authDomain: "insta-reels-clone-93680.firebaseapp.com",
    projectId: "insta-reels-clone-93680",
    storageBucket: "insta-reels-clone-93680.appspot.com",
    messagingSenderId: "939958165275",
    appId: "1:939958165275:web:ebcf212e878a364f70fdbe"
};

firebase.initializeApp(firebaseConfig);

export default firebase;