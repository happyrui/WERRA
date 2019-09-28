import React from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Route,Switch
  } from 'react-router-dom';
import PropTypes from 'prop-types';
import Calendar from './pages/calendar';
import TodoList from './pages/todoList';
import TodoDetail from './pages/todoDetail';
import OneGame from './pages/oneGame';
import User from './pages/user';

// 引入全局左侧菜单
/*
  菜单全局配置，加在Router中
  antd pro中使用 umi配置路由
*/
import LayoutBasic from './layout/';

/**
 * Route渲染组件的方式
 * 1、component  component的值是一个组件，当URL和Route匹配时，component属性定义的组件就会被渲染
 * 2、render  render的值是一个函数，这个函数返回一个React元素。这种方式可以方便地为待渲染的组件传递额外的属性
 * 3、children children的值也是一个函数，函数返回要渲染的React元素,children返回的组件都会被渲染。但是，当匹配不成功时，match属性为null
 */

const App = ((history) => {
    return (    
        <Router history={history}>
            <LayoutBasic>
                <Switch>
                    {/* Switch和exact常常联合使用，用于应用首页的导航 */}
                    <Route path="/" exact component={Calendar}></Route>
                    <Route path="/calendar" component={Calendar}></Route>
                    <Route path="/todoList" component={TodoList}></Route>
                    <Route path="/todoDetail" component={TodoDetail}></Route>
                    <Route path='/oneGame' component={OneGame}></Route>
                    <Route path='/user' component={User}></Route>
                </Switch>
            </LayoutBasic>
        </Router>
    )
});
App.propTypes = {
    history: PropTypes.shape({}).isRequired
};
export default App;