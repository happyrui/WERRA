import React, { PureComponent } from 'react';
import { Table, Button, Select, Form, Input } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTodoList } from './action';
import './index.less';

const Option = Select.Option;

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
        }).isRequired,
        form:PropTypes.shape({
            getFieldDecorator: PropTypes.func.isRequired,
            validateFields:PropTypes.func.isRequired,
            getFieldValue:PropTypes.func.isRequired
        }).isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            viewForm: ''
        }
    }
    componentDidMount(){
        this.props.getTodoList();
    }
    changeValue = (val) => {
        console.log(val)
        const methods = [this.form1, this.form2, this.form3, this.form4, this.form5, this.form6, this.form7];
        this.setState({
            viewForm: methods[val-1]()
        })
    }
    form1 = () => {
        return (
            <Form>
                <Form.Item>
                    <Input />
                </Form.Item>
            </Form>
        )
    }
    form2 = () => {
        return (
            <Form>
                <Form.Item>
                   <Select />
                </Form.Item>
            </Form>
        )
    }
    form3 = () => {
        return (
            <Form>
                <Form.Item>
                    <Input />
                </Form.Item>
            </Form>
        )
    }
    form4 = () => {
        return (
            <Form>
                <Form.Item>
                    <Input />
                </Form.Item>
            </Form>
        )
    }
    form5 = () => {
        return (
            <Form>
                <Form.Item>
                    <Input />
                </Form.Item>
            </Form>
        )
    }
    form6 = () => {
        return (
            <Form>
                <Form.Item>
                    <Input />
                </Form.Item>
            </Form>
        )
    }
    form7 = () => {
        return (
            <Form>
                <Form.Item>
                    <Input />
                </Form.Item>
            </Form>
        )
    }
    render() {
        const columns = [
            {title:'事件',dataIndex:'item'},
            {title:'原因',dataIndex:'reson'},
            {title:'解决办法',dataIndex:'function'},
            {title:'结果',dataIndex:'result'}
        ]
        const data = this.props.todoListReducer.listData;
        console.log(this.state.viewForm)
        return (
            <div>
                <Table
                    rowKey={(record)=>record.id}
                    columns={columns}
                    dataSource={data}
                />
                <span className='changeColor'>asasasa</span>
                <Button onClick={()=> {this.props.history.push('./todoDetail')}}>跳转详情</Button>
                <Select onChange={this.changeValue} style={{ width: 120 }}>
                    <Option value={1}>表单一</Option>
                    <Option value={2}>表单二</Option>
                    <Option value={3}>表单三</Option>
                    <Option value={4}>表单四</Option>
                    <Option value={5}>表单五</Option>
                    <Option value={6}>表单六</Option>
                    <Option value={7}>表单七</Option>
                </Select>
                {this.state.viewForm ? this.state.viewForm : null}
            </div>
        )
    }
}

export default TodoList;