import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {userContext} from './AuthProvider'
import {auth} from "./firebase"

let Home = () => {

    let user = useContext(userContext);

    return <>

    {user ? "" : <Redirect to="/login" />}

    <h1 className="m-4">
        Home
    </h1>

    <button onClick={()=>{
        auth.signOut();
    }} type="button" class="btn btn-outline-primary m-4">Logout</button>
    </>
}

export default Home;