import Home from './Home';
import Login from './Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from "./AuthProvider"

let App = () => {

  // useEffect(()=>{
  // //  firestore.collection("users").add({name:"Dev Arora"});

  //getting whole collection
  // let f = async ()=>{
  //   let querySnapshot = await firestore.collection("users").get();
    
  //   for(let i = 0; i < querySnapshot.docs.length; i++)
  //   {
  //     console.log(querySnapshot.docs[i].data());
  //   }
  // }

  // f();

  // },[])

  return (
    <>
      <AuthProvider>
      <Router>
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

        </Switch>
      </Router>
      </AuthProvider>
    </>
  );
}

export default App;
