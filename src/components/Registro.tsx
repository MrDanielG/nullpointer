import React, { useContext, useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext, authData } from '../contexts/AuthContext';

export const Registro = () => {
    const [form] = Form.useForm();
    const { signUp, currentUser } = useContext(AuthContext) as authData;
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);

        try {
            setLoading(true);
            await signUp(values.email, values.password);
            message.success('Usuario Registrado');
            history.push('/inicio');
        } catch (error) {
            message.error('Error al Registrar Usuario');
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className="register-container">
            <Card title="Registro" className="card">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        name="email"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Ingresar tu Correo',
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
                                message: 'Ingresa una Contraseña',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (value.length >= 6) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        'Las contraseña debe ser mayor a 6 caracteres'
                                    );
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="Contraseña"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Confirmar Contraseña',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        'Las contraseñas no coinciden'
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="Confirmar Contraseña"
                        />
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
                        Ya tienes cuenta? <Link to="/">Inicia Sesión</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
