import React, { PureComponent } from 'react';
import { Button, Calendar, Badge } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getTodoList } from './action';
import './index.less';

@connect(
    state => state,
    {
        getTodoList
    }
)

class TodoList extends PureComponent {
    static propTypes = {
        getTodoList: PropTypes.func.isRequired,
        todoListReducer: PropTypes.shape({
            listData: PropTypes.array.isRequired
        }).isRequired
    };
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getTodoList();
    }
    dateCellRender = (date) => {
        let value = '';
        switch(date.dayOfYear() % 8) {
            case 1:
                value = '早班';
                break;
            case 2:
                value = '早班';
                break;
            case 3:
                value = '中班';
                break;
            case 4:
                value = '中班';
                break;
            case 5:
                value = '晚班';
                break;
            case 6:
                value = '晚班';
                break;
            case 7:
                value = '休息'
                break;
            case 0:
                value = '休息'
                break;
            default:

        }
        return (
            <Badge status='warning' text={value} />
        );
    }
    render() {
        // 2019.01.01 是早班第一天
        // 上班周期为早早，中中，晚晚，休休，8天一个周期
        return (
            <div>
                <Calendar 
                    dateCellRender={this.dateCellRender}
                    validRange={[moment('2019-01-01'), moment('2019-12-31')]}
                ></Calendar>
                <Button onClick={()=> {this.props.history.push('./todoDetail')}}>跳转详情</Button>
            </div>
        )
    }
}

export default TodoList;