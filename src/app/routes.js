import React from 'react'
import { browserHistory, Route, IndexRoute } from 'react-router'
import configurateStore from './store/configuration';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App'
import Login from './components/LoginForm'
import Dashboard from './components/Dashboard'

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
    <Route path="login" component={Login} />
    <Route onEnter={checkAuth}>
      <Route path="dashboard" component={Dashboard} />
    </Route>
    <IndexRoute component={Login} />
  </Route>
);