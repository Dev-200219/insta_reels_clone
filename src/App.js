import Home from './Home';
import Login from './Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

let App = () => {
  return (
    <div>
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
    </div>
  );
}

export default App;
