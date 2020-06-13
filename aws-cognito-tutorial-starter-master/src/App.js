import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Images from './components/Images';
import GetTags from './components/getTags';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import Footer from './components/Footer';
import { Auth } from 'aws-amplify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit);


//root component for the application
class App extends Component {

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }
  //helper function to check if the user is authenticated, and set user object

  setAuthenticationStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user});
  }

  async componentDidMount(){
    //placeholder variable for session, refresh tokens automatically
    try{
      const session = await Auth.currentSession();
      this.setAuthenticationStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user)
    }catch(error){
      console.log(error);
    }
    //render page after
    this.setState({ isAuthenticating: false });

  }

  render() {
    //bundle up authentication status, user and set methods
    const authenticationProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthenticationStatus: this.setAuthenticationStatus,
      setUser: this.setUser
    }
    return (
      !this.state.isAuthenticating && 
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authenticationProps} /> 
            <Switch>
              <Route exact path="/" render={(props)=> <Home {...props} auth = {authenticationProps} />} />
              <Route exact path="/Images" render={(props)=> <Images {...props} auth = {authenticationProps} />} />
              <Route exact path="/GetTags" render={(props)=> <GetTags {...props} auth = {authenticationProps} />} />
              <Route exact path="/login" render={(props)=> <LogIn {...props} auth = {authenticationProps} />} />
              <Route exact path="/register" render={(props)=> <Register {...props} auth = {authenticationProps} />} />
              <Route exact path="/welcome" render={(props)=> <Welcome {...props} auth = {authenticationProps} />} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
