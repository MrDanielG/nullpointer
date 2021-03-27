import React, { useContext, useState } from 'react';
import { Form, Input, Button, Card, message, Select, PageHeader } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext, authData } from '../contexts/AuthContext';
const { Option } = Select;

export const Registro = () => {
    const [form] = Form.useForm();
    const { signUp } = useContext(AuthContext) as authData;
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onFinish = async ({ username, password, email, semester }: any) => {
        try {
            setLoading(true);
            const user = await signUp(email, password, username, semester);
            console.log(user);
            message.success('Usuario Registrado');
            history.push('/app/inicio');
        } catch (error) {
            message.error('Error al Registrar Usuario');
            console.log(error);
            setLoading(false);
        }
    };

    const onSemesterChange = (value: string) => {
        console.log(value);
    };

    return (
        <div className="register-container">

            <Card cover={
                <PageHeader
                    title="Registrarse"
                    onBack={() => history.goBack()}
                />}
                className="card">
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
                                <MailOutlined className="site-form-item-icon" />
                            }
                            placeholder="Correo"
                        />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Ingresar Nombre de Usuario',
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

                    <Form.Item
                        name="semester"
                        rules={[
                            {
                                required: true,
                                message: 'Ingresar Semestre en Curso',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Semestre en Curso"
                            onChange={onSemesterChange}
                        >
                            <Option value="1">Primer Semestre</Option>
                            <Option value="2">Segundo Semestre</Option>
                            <Option value="3">Tercer Semestre</Option>
                            <Option value="4">Cuarto Semestre</Option>
                            <Option value="5">Quinto Semestre</Option>
                            <Option value="6">Sexto Semestre</Option>
                            <Option value="7">Septimo Semestre</Option>
                            <Option value="8">Octavo Semestre</Option>
                            <Option value="9">Noveno Semestre</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            disabled={loading}
                        >
                            Registrarse
                        </Button>
                        Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
