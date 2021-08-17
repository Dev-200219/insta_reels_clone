import Home from './Home';
import Login from './Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from "./AuthProvider"

let App = () => {
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
