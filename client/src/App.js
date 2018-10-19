import React, { Component } from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

// Bunch of components
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Posts from './components/posts/Posts';
import NotFound from './components/not-found/NotFound';

// Import CSS:
import './css/general.css';
import './App.css';
import image from './css/images/main.jpg';
// redux
import store from './store';



//check for token
if(localStorage.jwtToken){
  // Set the authtoken header auth
  setAuthToken(localStorage.jwtToken);
  //Decode Token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime){
    // Logout the user
    store.dispatch(logoutUser());
    // TODO: Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to loin
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="container">
        <img src={image} className="image" alt=""/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
        </div>
        <Footer />
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
