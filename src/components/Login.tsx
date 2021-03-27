import React, { useContext, useState } from 'react';
import { Form, Input, Button, Checkbox, Card, PageHeader, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext, authData } from '../contexts/AuthContext';

export const Login = () => {
    const { logIn, currentUser } = useContext(AuthContext) as authData;
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);

        try {
            setLoading(true);
            await logIn(values.email, values.password);
            message.success('Loggin Exitoso');
            history.push('/');
        } catch (error) {
            message.error('Contraseña o Correo Incorrecto');
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <Card className="card"
                  cover={
                      <PageHeader
                          title="Iniciar sesión"
                          onBack={() => history.push('/')}
                      />}
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Ingresa tu Correo',
                            },
                            {
                                type: 'email',
                                message: 'Ingresar un correo válido',
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
                                message: 'Ingresa tu Contraseña',
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
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Recordarme</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Olvidé mi contraseña
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            disabled={loading}
                        >
                            Iniciar Sesión
                        </Button>
                        O <Link to="/registro">Registrarse</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
