import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const onFinish = (values: any) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

export default class Login extends Component {
    render() {
        return (
            <div className="full-container">
                <Card className="card">
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Usuario"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Por favor ingresa un nombre de usuario!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Contraseña"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Por favor ingresa una constraseña!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            {...tailLayout}
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Recordarme</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Iniciar Sesión
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}
