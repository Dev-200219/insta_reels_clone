import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {userContext} from './AuthProvider'
import {auth} from "./firebase"
import "./Home.css"
import VideoCard from "./VideoCard"

let Home = () => {

    let user = useContext(userContext);

    return <>

    {user ? "" : <Redirect to="/login" />}

    <div className="video-container">
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
    </div>

    <button className="home-logout-btn btn btn-outline-primary m-4" onClick={()=>{
        auth.signOut();
    }} type="button">Logout</button>
    
    </>
}

export default Home;