import React from 'react';
import {IndexRedirect, browserHistory, Route, IndexRoute} from 'react-router';
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

function checkAuth(nextState, replace) {
  const userState = store.getState().userLogin;
  if (userState == "") {
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