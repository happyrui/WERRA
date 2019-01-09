import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Avatar , Spin, Row, Col } from 'antd';
import { getUserInfo } from './action';

@connect(
    state => state,
    {
        getUserInfo
    }
)

class User extends PureComponent {
    static propTypes = {
        getUserInfo: PropTypes.func.isRequired,
        userReducer: PropTypes.shape({
            userInfo: PropTypes.object.isRequired
        }).isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount(){
        this.setState({ loading: true });
        this.props.getUserInfo({}, () => {
            this.setState({ loading: false });
        });
    }
    render(){
        const { userInfo }  = this.props.userReducer;
        return (
            <div>
                <Spin spinning={this.state.loading}>
                    <Card
                        title='简单介绍个~'
                    >
                        <Row type='flex' justify='center' style={{ marginBottom: 20 }}>
                            <Avatar src={userInfo.avatar} />
                        </Row>
                        <Row type='flex' justify='center' style={{ marginBottom: 20 }}>
                            <h3>大名：{userInfo.name}</h3>
                        </Row>
                        <Row type='flex' justify='center' style={{ marginBottom: 20 }}>
                            <h3>年龄：{userInfo.age}</h3>
                        </Row>
                        <Row type='flex' justify='center' style={{ marginBottom: 20 }}>
                            <h3>Blog：<a href={userInfo.blog} target='_blank'>{userInfo.blog}</a></h3>
                        </Row>
                        <Row type='flex' justify='center' style={{ marginBottom: 20 }}>
                            <h3>github：<a href={userInfo.github} target='_blank'>{userInfo.github}</a></h3>
                        </Row>
                        <Row type='flex' justify='center' style={{ marginBottom: 20 }}>
                            <h3>address：{userInfo.address}</h3>
                        </Row>
                    </Card>
                </Spin>
            </div>
        )
    }
}

export default User;