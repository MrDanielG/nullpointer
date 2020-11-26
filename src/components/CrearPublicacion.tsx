import React from 'react';
import {
    Form,
    Input,
    Button,
    Typography,
} from 'antd';



class CrearPublicacion extends React.Component {
    render() {
        return (
            <>
                <Typography.Title level={3}>
                    Crear una nueva publicación 
                </Typography.Title>
                <Form
                    layout="vertical"
                >
                    <Form.Item label="Título de la publicación">
                        <Input placeholder="Escribe tu pregunta" />
                    </Form.Item>
                    <Form.Item label="Cuerpo de la publicación">
                        <Input.TextArea placeholder="Explica tu pregunta" />
                    </Form.Item>
                    <Form.Item label="Etiquetas">
                        <Input placeholder="Agrega etiquetas a tu publicación" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Crear
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
};



export default CrearPublicacion;
