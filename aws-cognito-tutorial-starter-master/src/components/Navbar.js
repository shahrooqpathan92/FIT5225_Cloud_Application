import React, { Component } from 'react'
import { Auth } from 'aws-amplify'

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try{
      Auth.signOut();
      this.props.auth.setAuthenticationStatus(false);
      this.props.auth.setUser(null);
    }catch(error){
      console.log(error.message);
    }
  }
  render() {
    return (
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
          { <img src={require('./logo.png')} width="75" height="10" style={{maxHeight:"none"}}></img> }
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu is-info">
          <div className="navbar-start is-info" style={{marginTop:"1rem"}}>
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/Images" className="navbar-item">
              Image Upload
            </a>
            <a href="/GetTags" className="navbar-item">
              Get Tags
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item" style={{marginTop:"1rem"}}>
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p >Logged in as: {this.props.auth.user.username}</p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                  <a href="/register" className="button is-light">
                  Register
                </a>
                <a href="/login" className="button is-primary">
                  Log in
                </a>
                </div>
                )}
                {this.props.auth.isAuthenticated && (
                <a href="/" onClick={this.handleLogOut} className="button is-danger">
                  Log out
                </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
