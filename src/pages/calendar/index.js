import React, { PureComponent } from 'react';
import { Button, Calendar, Badge, DatePicker, Card } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getCalendarList } from './action';
import './index.less';

@connect(
    state => state,
    {
        getCalendarList
    }
)

class CalendarList extends PureComponent {
    static propTypes = {
        getCalendarList: PropTypes.func.isRequired,
        calendarListReducer: PropTypes.shape({
            listData: PropTypes.array.isRequired
        }).isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            changeDate: '2019-10-18'
        }
    }
    componentDidMount(){
        console.log('aaaaa');
        this.props.getCalendarList();
    }
    dateCellRender = (date) => {
        let value = '';
        // 获取现在时间距入职时间多少天
        let dBack = (moment(date.format('YYYY-MM-DD')).unix() - moment(this.state.changeDate).unix()) / 3600 / 24;
        // 过去时间，直接返回
        if(dBack < 0) return;
        // 使用数组映射 避免swtich case 判断
        let calendar = ['白', '白', '晚', '晚', '休', '休'];
        value = calendar[dBack % 6] + '班';
        return (
            <Badge status='warning' text={value} />
        );
    }
    render() {
        // 2019.01.01 是早班第一天
        // 上班周期为早早，中中，晚晚，休休，8天一个周期
        return (
            <Card bodyStyle={{ width: 600 }}>
                你多少号入职的呢？
                <DatePicker 
                    disabledDate={ (currentDate) => currentDate > moment() } 
                    onChange={(value) =>{ this.setState({ changeDate: value.format('YYYY-MM-DD') }) }}
                />
                <Calendar 
                    dateCellRender={ this.dateCellRender }
                ></Calendar>
                <Button onClick={()=> { this.props.history.push('./todoDetail')} }>跳转详情</Button>
            </Card>
        )
    }
}

export default CalendarList;