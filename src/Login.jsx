import { signInWithGoogle } from './firebase';
import {userContext} from './AuthProvider'
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';

export { signInWithGoogle } from './firebase'; 

let Login = ()=>{

    let user = useContext(userContext)

    return <> 

    {user ? <Redirect to='/' /> : ""}

    <button onClick={()=>{
        signInWithGoogle();
    }} type="button" className="btn btn-outline-primary m-4">Login With Google</button>
    </>
}

export default Login;