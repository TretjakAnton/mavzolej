import React from 'react';
import { IndexRedirect, browserHistory, Route, IndexRoute } from 'react-router';
import configurateStore from './store/configuration';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App';
import Login from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProductEditor from './components/ProductEditor';

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
          <Route path="/monuments/:id" component={ProductEditor}/>
          <Route path="/home" component={HomePage}/>
          <IndexRedirect to="/home"/>
      </Route>
        <Route path="/admin" component={Admin} />
    <IndexRedirect to="/admin" />
  </Route>
);