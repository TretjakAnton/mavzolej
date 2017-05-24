import React, { Component } from 'react'
import { setCredentials } from '../actions/Actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { FormGroup, Button, FormControl, Glyphicon } from 'react-bootstrap';
import { login } from '../api/serverRequests'

class Login extends React.Component{
  constructor() {
    super();
    this.state = {
      userLogin: '',
      userPassword: '',
      loginValidationState: '',
      requestSend: false
    };
  };

  handleLoginChange = (evt) => {
    if(this.loginValidationState !== ''){
      this.setState({loginValidationState: ''});
    }
    this.setState({userLogin: evt.target.value});
  };

  handlePasswordChange = (evt) => {
    this.setState({userPassword: evt.target.value});
  };

  checkUser = () => {
    this.setState({requestSend: true});
    login(this.state.userPassword, this.state.userLogin).then((data) => {
      if(data.Auth == 'Logged'){
        this.props.setCredential(this.state.userLogin);
        browserHistory.push('/dashboard');
      } else{
        this.setState({loginValidationState: 'error'});
      }
      this.setState({requestSend: false});
    });
  };

  render() {
    return <div>
      <form>
        <div>
          <span>Login</span>
        </div>
        <FormGroup>
          <FormControl
            type="text"
            value={this.state.userLogin}
            placeholder="Login"
            onChange={this.handleLoginChange}
            bsStyle={this.loginValidationState}
          />
          <FormControl.Feedback />
          <FormControl
            type="password"
            value={this.state.userPassword}
            placeholder="Password"
            onChange={this.handlePasswordChange}
          />
          <FormControl.Feedback />
          <Button
            bsSize="large"
            onClick={this.checkUser}
          >
            Login →
          </Button>
        </FormGroup>
        <Button
          bsSize="large"
          onClick={this.checkUser}
        >
          <Glyphicon glyph="cog" />
        </Button>
      </form>
    </div>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCredential: bindActionCreators(setCredentials, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Login)