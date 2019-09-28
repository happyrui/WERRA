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

// 处理异步操作的 中间件
/**
 * store.dispatch只能接收普通JavaScript对象代表的action，现在使用redux-thunk，
 * store.dispatch就能接收函数作为参数了。异步action会先经过redux-thunk的处理，当请求返回后，
 * 再次发送一个action：dispatch({type:'RECEIVE_DATA', json})，把返回的数据发送出去，
 * 这时的action就是一个普通的JavaScript对象了，处理流程也和不使用中间件的流程一样
 */
const store = createStore(storeTree, applyMiddleware(thunk));
/**
 * Provider组件需要接收一个store属性，然后把store属性保存到context。
 * Provider组件正是通过context把store传递给子组件的，所以使用Provider组件时，一般把它作为根组件，
 * 这样内层的任意组件才可以从context中获取store对象
 */
ReactDom.render(
    <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
            <App history={history}/>
        </LocaleProvider>
    </Provider>,
    document.getElementById('app')
)