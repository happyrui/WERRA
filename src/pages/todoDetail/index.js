import React, { PureComponent, useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTodoDetail } from './action';

// @connect(
//     state => state,{
//         getTodoDetail
//     }
// )

// class TodoDetail extends PureComponent {
//     static propTypes = {
//         getTodoDetail: PropTypes.func.isRequired,
//         todoDetailReducer: PropTypes.shape({
//             info: PropTypes.objectOf.isRequired
//         }).isRequired
//     };
//     //1、 构造函数，初始化运行一次，指定this,初始状态值，绑定函数
//     constructor(props){
//         super(props)
//     }
//     //2、 componentWillMount 组件挂载之前调用
//     //4、 组件挂载结束后调用，查找DOM，请求数据
//     componentDidMount(){
//         this.props.getTodoDetail();
//     }
//     //3、 组件生成DOM，必须是JSX规则，第一次渲染。
//     render() {
//         const { info } = this.props.todoDetailReducer;
//         return (
//             <div>
//                 <Card>
//                     {info?info.asd:''}
//                 </Card>
//                 <Card>我来显示个数据</Card>
//                 <Button onClick={()=> {this.props.history.push('./todoList')}}>那我跳回列表</Button>
//             </div>
//         )
//     }
// }
// 二次渲染
/**
 * 父组件的props发生更新
 * 调用this.forceUpdate,（调用 forceUpdate() 会导致组件跳 shouldComponentUpdate() ，直接调用 render()。 ）
 * 调用this.setState （并不是一次setState会触发一次render，React可能会合并操作，再一次性进行render）
 */

 // 使用 react hooks
 /**
  *  在函数式组件中使用 state 和其他react 特性
  */
const TodoDetail = () => {
    const [count, setCount] = useState(10);
    const [aa, setAa] = useState(2)
    
    // 接收两个参数，回调函数，状态依赖数组
    // 回调函数： 在组件第一次render和之后的每次update后运行，React保证在DOM已经更新完成之后才会运行回调
    // 状态依赖数组： 当配置了状态依赖项后，只有检测到配置的状态变化时，才会调用回调函数。
    useEffect(() => {
        console.log('aaaaa');
    }, [count])
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
            Click me
            </button>
            <p>You clicked {aa} times</p>
            <button onClick={() => setAa(aa * 2)}>
            Click me
            </button>
        </div>
    );
}
TodoDetail.propTypes = {
    getTodoDetail: PropTypes.func.isRequired,
    todoDetailReducer: PropTypes.shape({
        info: PropTypes.objectOf.isRequired
    }).isRequired
};

export default TodoDetail;