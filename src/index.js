import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import thunk from 'redux-thunk';
import history from './utils/history';
import storeTree from './store';
import App from './APP';

const store = createStore(storeTree, applyMiddleware(thunk));

ReactDom.render(
    <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
            <App history={history}/>
        </LocaleProvider>
    </Provider>,
    document.getElementById('app')
)