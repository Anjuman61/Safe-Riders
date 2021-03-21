
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Components/Home/Home';
import SelectedRider from './Components/SelectedRider/SelectedRider';
import Login from './Components/Login/Login';
import NoMatch from './Components/NoMatch/NoMatch';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
export const RiderContext = createContext();

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: '',

  });
  const [riders, setRiders] = useState([])
  return (
    <UserContext.Provider value={[user, setUser]}>
      <RiderContext.Provider value={[riders, setRiders]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/contact">
              <Login></Login>
            </Route>
            <PrivateRoute path="/rider/:name">
              <SelectedRider></SelectedRider>
            </PrivateRoute>
            <PrivateRoute path="/destination">
              <SelectedRider></SelectedRider>
            </PrivateRoute>
            <Route path="*">
              <NoMatch></NoMatch>
            </Route>
          </Switch>

        </Router>

      </RiderContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
