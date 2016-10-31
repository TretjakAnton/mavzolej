import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux';
import { routes, store, history } from './routes';


render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
);