import React from 'react';
import { IndexRedirect, browserHistory, Route, IndexRoute } from 'react-router';
import configurateStore from './store/configuration';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App'
import Login from './components/LoginForm'
import Dashboard from './components/Dashboard'
import MainPages from './components/MainPages'

import Admin from './containers/Admin'
import MainPage from './containers/MainPage/MainPage';
import HomePage from './components/HomePage';

export const store = configurateStore();
export const history = syncHistoryWithStore(browserHistory, store);

function checkAuth(nextState, replace) {
  const { userState } = store.getState();
  if (!userState) {
    replace({ pathname: '/' });
  }
}

export const routes = (
  <Route path="/" component={App}>
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
      <Route component={MainPage}>
          <Route path="/home" component={HomePage}/>
          <IndexRedirect to="/home" />
      </Route>
    <Route onEnter={checkAuth}>
        <Route path="/admin" component={Admin} />
    </Route>
    <IndexRedirect to="/home" />
  </Route>
);