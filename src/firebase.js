import firebase from "firebase/app";
import "firebase/auth";
//firestore is the database provided to us by firebase
import "firebase/firestore";
import config from  "./config.json"

firebase.initializeApp(config);

let provider = new firebase.auth.GoogleAuthProvider(); 
export const auth = firebase.auth();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
}

export default firebase;