import React from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';

const {
    Header, Content, Footer, Sider,
  } = Layout;
const SubMenu = Menu.SubMenu;

class LayoutBasic extends React.PureComponent {
    state = {
        collapsed: true,
        menu: [
            {
                match: '/todoList',
                icon: 'book',
                name: '清单列表'
            },
            {
                match: '/oneGame',
                icon: 'calendar',
                name: '一个游戏'
            },
            {
                match: '/user',
                icon: 'team',
                name: '关于我'
            }
        ]
    }
    render() {
        return (
            <Layout
                style={{ minHeight: '100vh' }}
            >
                <Sider
                    theme="dark"
                    collapsed={this.state.collapsed}
                    collapsedWidth="0"
                    breakpoint="sm"
                    onCollapse={() => { this.setState({ collapsed: !this.state.collapsed }); }}
                >
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={this.state.menu
                            .filter(item => this.props.location.pathname.indexOf(item.match)=== 0)
                            .map(item => item.match)}
                        onClick={(item) => {
                            if (item.key !== this.props.location.pathname + this.props.location.search) {
                                this.props.history.push(item.key);
                            }
                        }}
                    >
                        {
                            this.state.menu.map(item => (
                                <Menu.Item key={item.match} >
                                    <Icon type={item.icon} />
                                    <span>{item.name}</span>
                                </Menu.Item>
                            ))
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '10px', position:'sticky' }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
export default withRouter(LayoutBasic)