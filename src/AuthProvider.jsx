import { createContext, useEffect, useState } from "react";
import {auth} from './firebase'
import { firestore } from "./firebase";

export const userContext = createContext();

let AuthProvider = (props)=>{
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(()=>{
      let unsub = auth.onAuthStateChanged(async (user)=>{
        
        if(user)
        {
          let {displayName, email, uid, photoURL} = user;
          setUser({displayName, email, uid, photoURL});

          //creates fakeDoc reference
          let docRef = firestore.collection("users").doc(uid);
          //gets snapshot of that fake ref
          let documentSnapshot = await docRef.get();

          //since, it doesn't exist, we make fake data to real data, by setting it's values 
          if(!documentSnapshot.exists)
          {
            docRef.set({
              displayName,
              email,
              photoURL
            })
          }
        }
        else{
          setUser(null);
        }

        setLoading(false);
    });
    
      return ()=>{
        unsub();
      }   
 },[])

 return <>
  <userContext.Provider value={user}>
    {!loading && props.children}
  </userContext.Provider>
  
  </>

}

export default AuthProvider;