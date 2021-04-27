import React, { Component } from 'react';
import { History } from 'history';

import './App.css';
import {
    Layout,
    Menu,
    message,
    Space,
    Dropdown,
    Avatar,
    Button,
    Affix,
} from 'antd';
import { ReactComponent as NullpointerLogo } from './nullpointer_logo.svg';
import {
    FormOutlined,
    HomeOutlined,
    SettingOutlined,
    DownOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { AuthContext, authData } from './contexts/AuthContext';
import { PreguntarBtn } from './components/CrearPublicacion';
import { Link, Route } from 'react-router-dom';
import { ListaPublicaciones } from './components/ListaPublicaciones';
import { MostrarPost } from './components/MostrarPost';
import { AdminCuentas } from './components/AdminCuentas';

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
    context!: React.ContextType<typeof AuthContext>;

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
    }

    async handleLogOut() {
        const { logOut } = this.context as authData;
        try {
            await logOut();
            message.success('Sesión Terminada');
        } catch (error) {
            message.error('Error al Cerrar Sesión');
            console.log(error);
        }
    }

    render() {
        const { collapsed } = this.state;
        const { currentUser } = this.context as authData;

        const menu = (
            <Menu>
                {/*                  <Menu.Item>
                     <a
                         target="_blank"
                         rel="noopener noreferrer"
                         href="https://create-react-app.dev"
                     >
                         Mi perfil
                     </a>
                 </Menu.Item> */}
                <Menu.Item danger onClick={this.handleLogOut}>
                    Cerrar Sesión
                </Menu.Item>
            </Menu>
        );

        return (
            <>
                <Layout style={{ minHeight: '100vh' }}>
                    <Header className="app-header">
                        <Link to="/" className="app-header-logo-link">
                            <NullpointerLogo className="app-header-logo" />
                        </Link>
                        <Space className="app-header-actions" size="large">
                            {!currentUser && (
                                <>
                                    <Button type="link">
                                        <Link to="/login">Iniciar sesión</Link>
                                    </Button>
                                    <Button ghost>
                                        <Link to="/registro">Registrarse</Link>
                                    </Button>
                                </>
                            )}
                            {currentUser && (
                                <Dropdown overlay={menu}>
                                    <a
                                        className="ant-dropdown-link"
                                        onClick={(e) => e.preventDefault()}
                                        href="/#"
                                    >
                                        {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
                                        <Avatar
                                            style={{
                                                backgroundColor: '#188dba',
                                                marginRight: 10,
                                            }}
                                            icon={<UserOutlined />}
                                        />
                                        {currentUser?.email} <DownOutlined />
                                    </a>
                                </Dropdown>
                            )}
                        </Space>
                    </Header>
                    <Layout>
                        <Sider
                            collapsible
                            collapsed={collapsed}
                            onCollapse={this.onCollapse}
                            theme="light"
                        >
                            <div className="logo" />
                            <Menu
                                defaultSelectedKeys={[
                                    this.props.history.location.pathname,
                                ]}
                                mode="inline"
                                theme="light"
                            >
                                <Menu.Item
                                    key="/app/inicio"
                                    icon={<HomeOutlined />}
                                >
                                    <Link to="/app/inicio">Inicio</Link>
                                </Menu.Item>
                                {currentUser && (
                                    <>
                                        <Menu.Item
                                            key="/app/misposts"
                                            icon={<FormOutlined />}
                                        >
                                            <Link to="/app/misposts">
                                                Mis Posts
                                            </Link>
                                        </Menu.Item>
                                        {currentUser.isAdmin && (
                                            <SubMenu
                                                key="/app/ctrlpanel"
                                                icon={<SettingOutlined />}
                                                title="Panel de control"
                                            >
                                                <Menu.Item key="/app/cuentas">
                                                    <Link to="/app/cuentas">
                                                        Cuentas
                                                    </Link>
                                                </Menu.Item>
                                            </SubMenu>
                                        )}
                                    </>
                                )}
                            </Menu>
                        </Sider>
                        <Layout className="site-layout">
                            <Content style={{ margin: '0 16px' }}>
                                <Route exact path="/app/inicio">
                                    <ListaPublicaciones />
                                </Route>
                                <Route exact path="/app/misposts">
                                    <ListaPublicaciones
                                        autorId={currentUser?.uid}
                                    />
                                </Route>
                                <Route
                                    path="/app/post/:id"
                                    component={MostrarPost}
                                />
                                <Route
                                    path="/app/cuentas"
                                    component={AdminCuentas}
                                />
                            </Content>
                            {/* <Footer style={{ textAlign: 'center' }}>Nullpointer</Footer> */}
                        </Layout>
                    </Layout>
                </Layout>
                <Affix style={{ position: 'fixed', bottom: 50, right: 50 }}>
                    {currentUser && <PreguntarBtn />}
                </Affix>
            </>
        );
    }
}

export default App;
