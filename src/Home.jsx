import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {userContext} from './AuthProvider'
import {auth, storage, firestore} from "./firebase"
import "./Home.css"
import VideoCard from "./VideoCard"

let Home = () => {

    let user = useContext(userContext);
    let [posts, setPosts] = useState([]);

    useEffect(()=>{
        //any change in "posts" collection will be listened by this event listener
        let unsub = firestore.collection("posts").onSnapshot((querySnapshot)=>{

            let docArr = querySnapshot.docs;
            let arr=[];

            for(let i = 0; i < docArr.length; i++)
            {
                arr.push({
                    id:docArr[i].id,
                    ...docArr[i].data()
                })
            }
            setPosts(arr);
        })

        return ()=>{
            unsub();
        }
    },[])

    return <>

    {user ? "" : <Redirect to="/login" />}

    <div className="video-container">
        {
            posts.map((singlePost)=>{
                console.log(singlePost);
                return <VideoCard key={singlePost.id} data={singlePost}/>
            })
        }
    </div>

    <button className="home-logout-btn btn btn-outline-primary m-4" onClick={()=>{
        auth.signOut();
    }} type="button">Logout</button>

    <input type="file" onClick={(e)=>{e.currentTarget.value = null}}
    
    onChange={(e)=>{
        let videoObj = e.currentTarget.files[0];
        let {name, size, type} = videoObj;

        size = size / 1000000;
        if(size > 12)
        {
            alert("File size exceeds 12MB.")
            return;
        }

        type = type.split("/")[0];
        if(type !== "video")
        {
            alert("Upload video files only");
            return;
        }

        let uploadTask = storage.ref(`/posts/${user.uid}/${Date.now() + "-" + name}`).put(videoObj); 

        uploadTask.on("state_changed",null,null,()=>{
            uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                console.log(url);

                //jo post storage mai save hui usse database mai save kr rhe hai taaki access kr paayein usse videoCard bnate time
                firestore.collection("posts").add({
                    name:user.displayName,
                    url:url,
                    likes:[],
                    comments:[]
                })

            })
        })
    
    }}
    
    
    
    />
    
    </>
}

export default Home;