import { Component } from 'react';
import { History } from 'history';

import './App.css';
import { ReactComponent as NullpointerLogo } from '../nullpointer_logo.svg';

import { Layout, Menu, Button, message, Space, Affix } from 'antd';
import {
    FormOutlined,
    HomeOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { AuthContext, authData } from '../contexts/AuthContext';
import { PreguntarBtn } from './CrearPublicacion';
import { Link, Route } from 'react-router-dom';
import { ListaPublicaciones } from './ListaPublicaciones';
/* import { Registro } from './components/Registro'; */

const { Header, Content, Sider } = Layout;
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
            //this.props.history.push('/');
        } catch (error) {
            message.error('Error al Cerrar Sesión');
            console.log(error);
        }
    }

    render() {
        const { collapsed } = this.state;
        const { currentUser } = this.context as authData;

        return (
            <>
                <Layout style={{ minHeight: '100vh' }}>

                    <Header className="app-header" >
                        <Link to="/" className="app-header-logo-link">
                            <NullpointerLogo className="app-header-logo" />
                        </Link>
                        <Space className="app-header-actions" size="large">

                            {
                                !currentUser &&
                                <>
                                    <Button type="link">
                                        <Link to="/login">Iniciar sesión</Link>
                                    </Button>
                                    <Button ghost>
                                        <Link to="/registro">Registrarse</Link>
                                    </Button>
                                </>
                            }
                            {
                                currentUser &&
                                <Button type="primary" onClick={this.handleLogOut}> Salir </Button>
                            }
                        </Space>


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
                                defaultSelectedKeys={[this.props.history.location.pathname]}
                                mode="inline"
                                theme="light"
                            >
                                <Menu.Item key="/app/inicio" icon={<HomeOutlined />}>
                                    <Link to="/app/inicio">Inicio</Link>
                                </Menu.Item>
                                <Menu.Item key="/app/misposts" icon={<FormOutlined />}>
                                    <Link to="/app/misposts">Mis Posts</Link>
                                </Menu.Item>
                                <SubMenu key="/app/ctrlpanel" icon={<SettingOutlined />} title="Panel de control">
                                    <Menu.Item key="3">Cuentas</Menu.Item>
                                    <Menu.Item key="4">Posts</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout className="site-layout">
                            <Content style={{ margin: '0 16px' }}>
                                <Route exact path="/app/inicio" >
                                    <ListaPublicaciones />
                                </Route>
                                <Route exact path="/app/misposts">
                                    <ListaPublicaciones autorId={currentUser?.uid} />
                                </Route>
                                {/* <Route exact path="/app/registro">
                                    <Registro />
                                </Route> */}
                            </Content>
                            {/* <Footer style={{ textAlign: 'center' }}>Nullpointer</Footer> */}
                        </Layout>
                    </Layout>
                </Layout>
                <Affix
                    style={{ position: 'fixed', bottom: 50, right: 50 }}
                >
                    <PreguntarBtn />
                </Affix>
            </>
        );
    }
}



export default App;
