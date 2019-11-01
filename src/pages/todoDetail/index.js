import React, { PureComponent } from 'react';
import { Card, Button, Divider } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ErrorBoundary, CssEx, ReactHooks, ConnectSon, CitySelector } from '../../components';
import { getTodoDetail } from './action';
import TodoDetailConnect from './TodoDetailConnect';

const Profile = ({ err }) => {
    return(
        <div>name: {err.name}</div>
    )
}

@connect(
    state => state,{
        getTodoDetail
    }
)
export default class TodoDetail extends PureComponent {
    static propTypes = {
        getTodoDetail: PropTypes.func.isRequired,
        todoDetailReducer: PropTypes.shape({
            info: PropTypes.objectOf.isRequired
        }).isRequired
    };
    //1、 构造函数，初始化运行一次，指定this,初始状态值，绑定函数
    constructor(props){
        super(props)
        this.state = {
            err: {name: '错误'}
        }
    }
    //2、 componentWillMount 组件挂载之前调用
    //4、 组件挂载结束后调用，查找DOM，请求数据
    componentDidMount(){
        this.props.getTodoDetail();
    }
    //3、 组件生成DOM，必须是JSX规则，第一次渲染。
    render() {
        const { info } = this.props.todoDetailReducer;
        const { err } = this.state;
        return (
            <div>
                <Card>
                    {info?info.asd:''}
                </Card>
                <Card>我来显示个数据</Card>
                <Button onClick={()=> {this.props.history.push('./todoList')}}>那我跳回列表</Button>
                <Divider />
                {/* react16  错误处理 */}
                <div>
                    <ErrorBoundary>
                        {/* 组件接收属性为 null时，程序会抛出TypeError，这个错误会被ErrorBoundary捕获，并在界面上显示出错提示。 */}
                        <Profile err={err} />
                    </ErrorBoundary>
                    <Button onClick={() => this.setState({err: null})}>更新</Button>
                    <Divider />
                </div>
                {/* css学习 */}
                <div>
                    <CssEx />
                    <Divider />
                </div>  
                {/* React hooks学习 */}
                <div>
                    <ReactHooks />
                    <Divider />
                </div>
                {/* React Connect 学习 */}
                {/* Provider共享容器 接收值 */}
                <TodoDetailConnect.Provider value={{name: 'ze', age: 24}}>
                    <ConnectSon />
                    <Divider />
                </TodoDetailConnect.Provider>
                {/* ts组件 */}
                <div>
                    <CitySelector 
                        value={[]} 
                        onChange={()=>{}} 
                        mode="multiple"
                        length={10}
                    />
                    <Divider />
                </div>
            </div>
        )
    }
}
// 二次渲染
/**
 * 父组件的props发生更新
 * 调用this.forceUpdate,（调用 forceUpdate() 会导致组件跳 shouldComponentUpdate() ，直接调用 render()。 ）
 * 调用this.setState （并不是一次setState会触发一次render，React可能会合并操作，再一次性进行render）
 */

// 16 新特性，return 一个数组
// return [
//     <div className="inlineTable">
//         这是一个listItem模型
//     </div>,
//     <div className="box">
//         <p className="content">文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
//     </div>,
// ]

