import React from 'react';
import {IndexRedirect, browserHistory, Route, IndexRoute} from 'react-router';
import { COOKIE_NAME } from './Constants/index'
import configurateStore from './store/configuration';
import {syncHistoryWithStore} from 'react-router-redux';

import App from './containers/App';
import Login from './components/LoginForm';
import ProductEditor from './components/ProductEditor';

import Admin from './containers/Admin'
import MainPage from './containers/MainPage/MainPage';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';

export const store = configurateStore();
export const history = syncHistoryWithStore(browserHistory, store);

const checkCookie = () => {
  let name = COOKIE_NAME + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
};

function checkAuth(nextState, replace) {
  const userState = store.getState().userLogin;
  if (userState == "" && !checkCookie()) {
    replace({pathname: '/login'});
  }
}

export const routes = (
  <Route path="/" component={App}>
    <Route path="/login" component={Login}/>
    <Route component={MainPage}>
      <Route path="/monuments/:id" component={ProductEditor}/>
      <Route path="aboutUs" component={AboutUs}/>
      <Route path="/home" component={HomePage}/>
      <IndexRedirect to="/home"/>
    </Route>
    <Route onEnter={checkAuth}>
      <Route path="/admin" component={Admin}/>
    </Route>
    <IndexRedirect to="/home"/>
  </Route>
);