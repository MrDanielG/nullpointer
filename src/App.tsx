import React, { Component } from 'react';
import { History } from 'history';

import './App.css';
import { Layout, Menu, message, Space, Dropdown, Avatar, Button, Affix } from 'antd';
import { ReactComponent as NullpointerLogo } from './nullpointer_logo.svg';
import {
    FormOutlined,
    HomeOutlined,
    SettingOutlined,
    FileTextOutlined,
    DownOutlined,
    UserOutlined
} from '@ant-design/icons';
import { AuthContext, authData } from './contexts/AuthContext';
import { PreguntarBtn } from './components/CrearPublicacion';
import { Link, Route } from 'react-router-dom';
import { ListaPublicaciones } from './components/ListaPublicaciones';
import { MostrarPost } from './components/MostrarPost';
import { AdminCuentas } from './components/AdminCuentas'

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
        const { logOut } = this.context!;
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
        //Lo comentado es del tag v0.3.0
        // const { currentUser } = this.context!;
        // const menu = (
        //     <Menu>
        //         <Menu.Item>
        //             <a
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 href="https://create-react-app.dev"
        //             >
        //                 Mi perfil
        //             </a>
        //         </Menu.Item>
        //         <Menu.Item danger onClick={this.handleLogOut}>
        //             Cerrar Sesión
        //         </Menu.Item>
        //     </Menu>
        // );
        // return (
        //     <Layout style={{ minHeight: '100vh' }}>
        //         <Header
        //             className="app-header"
        //             style={{ position: 'fixed', zIndex: 1, width: '100%' }}
        //         >
        //             <FileTextOutlined />
        //             <span style={{ paddingLeft: '5px' }}> Nullpointer </span>
        //             <Space className="app-header-actions" size="large">
        //                 <PreguntarBtn />
        //                 <Dropdown overlay={menu}>
        //                     <a
        //                         className="ant-dropdown-link"
        //                         onClick={(e) => e.preventDefault()}
        //                     >
        //                         {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
        //                         <Avatar
        //                             style={{ backgroundColor: '#188dba' }}
        //                             icon={<UserOutlined />}
        //                         />
        //                         {'   ' + currentUser?.email} <DownOutlined />
        //                     </a>
        //                 </Dropdown>
        //             </Space>
        //         </Header>
        //         <Layout>
        //             <Sider
        //                 collapsible
        //                 collapsed={collapsed}
        //                 onCollapse={this.onCollapse}
        //                 theme="light"
        //                 style={{
        //                     //overflow: 'auto',
        //                     height: '100vh',
        //                     position: 'fixed',
        //                     left: 0,
        //                     top: 65,
        //                     overflow: 'auto',
        //                 }}
        //             >
        //                 <div className="logo" />
        //                 <Menu
        //                     defaultSelectedKeys={[
        //                         this.props.history.location.pathname,
        //                     ]}
        //                     mode="inline"
        //                     theme="light"
        //                 >
        //                     <Menu.Item
        //                         key="/app/inicio"
        //                         icon={<HomeOutlined />}
        //                     >
        //                         <Link to="/app/inicio">Inicio</Link>
        //                     </Menu.Item>
        //                     <Menu.Item
        //                         key="/app/misposts"
        //                         icon={<FormOutlined />}
        //                     >
        //                         <Link to="/app/misposts">Mis Posts</Link>
        //                     </Menu.Item>
        //                     {(currentUser?.isAdmin) && 
        //                     <SubMenu 
        //                         key="/app/ctrlpanel"
        //                         icon={<SettingOutlined />}
        //                         title="Panel de control"
        //                     >
                                
        //                         <Menu.Item key="/app/cuentas">
        //                             <Link to="/app/cuentas">Cuentas</Link>
        //                         </Menu.Item> 
        //                         <Menu.Item key="4">Posts</Menu.Item>
        //                     </SubMenu>}
        //                 </Menu>
        //             </Sider>
        //             <Layout
        //                 className="site-layout"
        //                 style={{
        //                     marginLeft: 200,
        //                     marginTop: 75,
        //                     //display: 'flex',
        //                     // justify-content: 'center',
        //                     //align-items: 'center',
        //                     //flex-direction: 'column',
        //                 }}
        //             >
        //                 <Content style={{ margin: '0 16px' }}>
        //                     <Route path="/app/inicio">
        //                         <ListaPublicaciones />
        //                     </Route>
        //                     <Route path="/app/misposts">
        //                         <ListaPublicaciones
        //                             autorId={currentUser?.uid}
        //                         />
        //                     </Route>
        //                     <Route
        //                         path="/app/post/:id"
        //                         component={MostrarPost}
        //                     />
        //                     <Route
        //                         path="/app/cuentas"
        //                         component={AdminCuentas}
        //                     />
        //                 </Content>
        //                 <Footer style={{ textAlign: 'center' }}>
        //                     Nullpointer
        //                 </Footer>
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
                                {
                                    currentUser &&
                                    <>
                                    <Menu.Item key="/app/misposts" icon={<FormOutlined />}>
                                        <Link to="/app/misposts">Mis Posts</Link>
                                    </Menu.Item>
                                    <SubMenu key="/app/ctrlpanel" icon={<SettingOutlined />} title="Panel de control">
                                        <Menu.Item key="3">Cuentas</Menu.Item>
                                        <Menu.Item key="4">Posts</Menu.Item>
                                    </SubMenu>
                                    </>
                                }


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
                                <Route path="/app/post/:id" component={MostrarPost} />
                                <Route path="/app/cuentas" component={AdminCuentas} />
                            </Content>
                            {/* <Footer style={{ textAlign: 'center' }}>Nullpointer</Footer> */}
                        </Layout>
                    </Layout>
                </Layout>
                <Affix
                    style={{ position: 'fixed', bottom: 50, right: 50 }}
                >
                    {
                        currentUser &&
                        <PreguntarBtn />
                    }

                </Affix>
            </>
        );
    }
}



export default App;
