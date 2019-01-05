import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import history from './utils/history';
import storeTree from './store';
import App from './APP';

const store = createStore(storeTree, applyMiddleware(thunk));

ReactDom.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
    document.getElementById('app')
)