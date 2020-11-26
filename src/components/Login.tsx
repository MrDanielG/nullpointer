import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../index.css';

const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
};
export default class Login extends Component {
    render() {
        return (
            <div className="full-container">
                <Card title="Inicia Sesión" className="card">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ingresar tu nombre de Usuario',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Nombre de Usuario"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ingresa tu contraseña',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Contrseña"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Recordarme</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Olvide mi contraseña
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Iniciar Sesión
                            </Button>
                            O <a href="">Registrarse</a>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}
