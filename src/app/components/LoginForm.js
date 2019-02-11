import React, { Component } from 'react'
import { setCredentials } from '../actions/Actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';
import { login } from '../api/serverRequests'
import { COOKIE_NAME } from '../Constants/index'

const setCookie = (cookieValue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = COOKIE_NAME + "=" + cookieValue + ";" + expires + ";path=/";
};

class Login extends React.Component{
  constructor() {
    super();
    this.state = {
      userLogin: '',
      userPassword: '',
      error: ''
    };
  };

  handleLoginChange = (evt) => {
    this.setState({userLogin: evt.target.value});
  };

  handlePasswordChange = (evt) => {
    this.setState({userPassword: evt.target.value});
  };

  checkUser = () => {
    this.setState({error: ''});

    login(this.state.userPassword, this.state.userLogin).then((data) => {
      if(data.Auth == 'Logged'){
        this.props.setCredential(this.state.userLogin);
        setCookie(data.Auth, 7);
        browserHistory.push('/admin');
      } else {
        this.setState({error: 'Login or password is wrong'});
      }
    });
  };

  render() {
    const {error} = this.state;
    return (
      <div className="login__form">
        <form className="login__content">

          <div className="login__header">
            <ControlLabel>Login</ControlLabel>
          </div>

          <FormGroup className="login__fields">
            <FormControl
              type="text"
              value={this.state.userLogin}
              placeholder="Login"
              onChange={this.handleLoginChange}
            />

            <FormControl
              type="password"
              value={this.state.userPassword}
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />

            {error && 
              <div className="login__error">
                {error}
              </div>
            }
          </FormGroup>
          
          <Button
            bsSize="sm"
            onClick={this.checkUser}
            className="login__button"
          >
            Login →
          </Button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCredential: bindActionCreators(setCredentials, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Login)