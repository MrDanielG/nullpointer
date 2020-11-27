import { Component } from 'react';
import { History } from 'history';
import './App.css';
import { Layout, Menu, Button, message } from 'antd';
import {
    FormOutlined,
    HomeOutlined,
    SettingOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import { AuthContext, authData } from './contexts/AuthContext'
import { useHistory } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface AppProps {
    history: History;
}
interface AppState {
    collapsed: boolean;
}

class App extends Component<AppProps, AppState> {
    static contextType = AuthContext;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            collapsed: false,
        };
        this.handleLogOut = this.handleLogOut.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
    }

    onCollapse(collapsed: boolean) {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    async handleLogOut() {
        const { logOut } = this.context as authData;
        try {
            await logOut();
            message.success('Sesión Terminada');
            this.props.history.push('/');
        } catch (error) {
            message.error('Error al Cerrar Sesión');
            console.log(error);
        }
    }

    render() {
        const { collapsed } = this.state;
        const { currentUser } = this.context as authData;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header   >

                    <div className="logo" >
                        <FileTextOutlined />
                        <span style={{ paddingLeft: '5px' }}> Nullpointer </span>
                        <Button type="primary" onClick={this.handleLogOut}> Salir </Button>
                    </div>
                </Header>
                <Layout >
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={this.onCollapse}
                        theme="light"
                    >
                        <div className="logo" />
                        <Menu
                            defaultSelectedKeys={['1']}
                            mode="inline"
                            theme="light"
                        >
                            <Menu.Item key="1" icon={<HomeOutlined />}>
                                Inicio
                            </Menu.Item>
                            <Menu.Item key="2" icon={<FormOutlined />}>
                                Mis Posts
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<SettingOutlined />} title="Panel de control">
                                <Menu.Item key="3">Cuentas</Menu.Item>
                                <Menu.Item key="4">Posts</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Content style={{ margin: '0 16px' }}>
                            <p>Current User: </p> {currentUser?.email}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Nullpointer</Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}



export default App;
