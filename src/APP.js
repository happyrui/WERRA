import React from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Route,Switch
  } from 'react-router-dom';
import PropTypes from 'prop-types';
import TodoList from './pages/todoList';
import TodoDetail from './pages/todoDetail';

// 引入全局左侧菜单
/*
  菜单全局配置，加在Router中
  antd pro中使用 umi配置路由
*/
import LayoutBasic from './layout/';

const App = ((history) => {
    return (    
        <Router history={history}>
            <LayoutBasic>
                <Switch>
                    <Route path="/" exact component={TodoList}></Route>
                    <Route path="/todoList" exact component={TodoList}></Route>
                    <Route path="/todoDetail" exact component={TodoDetail}></Route>
                </Switch>
            </LayoutBasic>
        </Router>
    )
});
App.propTypes = {
    history: PropTypes.shape({}).isRequired
};
export default App;