import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../index.css';
import { Link } from 'react-router-dom';
import { useAuth, AuthContext, authData } from '../contexts/AuthContext';

export default class Registro extends Component {
    static contextType = AuthContext;

    constructor(props: any) {
        super(props);
    }

    onFinish = (values: any) => {
        const { signUp, currentUser } = this.context as authData;
        console.log('Received values of form: ', values);
        signUp(values.email, values.password);
    };

    render() {
        return (
            <div className="register-container">
                <Card title="Registro" className="card">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ingresar tu Correo',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Correo"
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
                                placeholder="Contraseña"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Confirma tu contraseña',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Confirmar Contraseña"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Iniciar Sesión
                            </Button>
                            Ya tienes cuenta? <Link to="/">Inicia Sesión</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}
