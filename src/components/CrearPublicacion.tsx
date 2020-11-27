import React from 'react';
import {
    Form,
    Input,
    Button,
    Modal
} from 'antd';
import { Store } from 'antd/lib/form/interface';



interface CrearPublicacionProps {
    visible: boolean;
    onCreate: (values: Store) => void;
    onCancel: () => void;
}

const CrearPublicacion: React.FC<CrearPublicacionProps> = ({
    visible,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm();
    return (
        <>

            <Modal
                visible={visible}
                title="Crear una nueva publicación"
                okText="Create"

                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            console.log('Values: ', values);
                            form.resetFields();
                            onCreate(values)
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="cosa"
                        label="Título de la publicación"
                        rules={[{ required: true, message: 'Inserta la pegunta' }]}
                    >
                        <Input placeholder="Escribe tu pregunta" />
                    </Form.Item>
                    <Form.Item
                        name="cuerpo"
                        label="Cuerpo de la publicación"
                        rules={[{ required: true, message: 'Inserta el cuerpo de la publicación' }]}
                    >
                        <Input.TextArea placeholder="Explica tu pregunta" />
                    </Form.Item>
                    <Form.Item
                        name="etiquetas"
                        label="Etiquetas"
                    >
                        <Input placeholder="Agrega etiquetas a tu publicación" />
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
};

export const PreguntarBtn: React.FC = () => {
    const [visible, setVisible] = React.useState(false);

    const onCreate = (values: Store) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    return (
        <>
            <Button                
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Preguntar
        </Button>
            <CrearPublicacion
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </>
    );
};

export default CrearPublicacion;
