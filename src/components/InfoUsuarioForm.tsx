import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
const { Option } = Select;

export const InfoUsuarioForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onFinish = (values: any) => {
        console.log(values);
    };

    const onSemesterChange = (value: string) => {
        console.log(value);
    };

    return (
        <div className="centered-container">
            <Card title="Info Usuario" className="card">
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    name="userInfoForm"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        name="email"
                        label="Correo"
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
                        <Input placeholder="Ej: example@mail.com" />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Nombre"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Ingresar Nombre Completo',
                            },
                        ]}
                    >
                        <Input placeholder="Ej: John Doe" />
                    </Form.Item>

                    <Form.Item
                        name="semester"
                        label="Semestre"
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
                    <Button type="primary" htmlType="submit" block>
                        Editar Perfil
                    </Button>
                </Form>
            </Card>
        </div>
    );
};
