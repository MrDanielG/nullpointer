import { Component } from 'react';
import './App.css';
import { PreguntarBtn } from './components/CrearPublicacion';
import { Layout, Menu } from 'antd';
import {
    FormOutlined,
    HomeOutlined,
    SettingOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import { AuthContext, authData } from './contexts/AuthContext'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



interface AppProps {

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
        this.onCollapse = this.onCollapse.bind(this);
    }
    
    onCollapse(collapsed: boolean) {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    
    render() {
        const { collapsed } = this.state;
        const {  currentUser } = this.context as authData;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header className="header">
                    <FileTextOutlined />
                    <span style={{ paddingLeft: '5px' }}> Nullpointer </span>
                    <div style={{marginLeft: 'auto'}}>
                        <PreguntarBtn />
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
                          {currentUser?.email} 
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Nullpointer</Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}



export default App;
