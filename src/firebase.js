import firebase from "firebase/app";
import "firebase/auth";
//firestore is the database provided to us by firebase
import "firebase/firestore";
import config from  "./config.json"
import "firebase/storage";

firebase.initializeApp(config);

let provider = new firebase.auth.GoogleAuthProvider(); 
export const auth = firebase.auth();
export const storage = firebase.storage();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
}

export const firestore = firebase.firestore();

export default firebase;