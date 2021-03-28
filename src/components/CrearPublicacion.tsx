import React from 'react';
import {
    Form,
    Input,
    Button,
    Modal,
    Tooltip
} from 'antd';
import { QuestionOutlined } from '@ant-design/icons';
import EditableTagGroup from './EditableTagGroup';

import { Store } from 'antd/lib/form/interface';

import { useFirebase } from '../contexts/FirebaseContext';
import { useAuth } from '../contexts/AuthContext';


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
                okText="Publicar"

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
                        name="titulo"
                        label="Título de la publicación"
                        rules={[{ required: true, message: 'Inserta la pegunta' }]}
                    >
                        <Input placeholder="Escribe tu pregunta" />
                    </Form.Item>
                    <Form.Item
                        name="contenido"
                        label="Cuerpo de la publicación"
                        rules={[{ required: true, message: 'Inserta el cuerpo de la publicación' }]}
                    >
                        <Input.TextArea placeholder="Explica tu pregunta" />
                    </Form.Item>
                    <Form.Item
                        name="tags"
                        label="Etiquetas"
                    >
                        <EditableTagGroup />
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
};

export const PreguntarBtn: React.FC = () => {
    const [visible, setVisible] = React.useState(false);
    const firebaseCtx = useFirebase();
    const { currentUser } = useAuth()!;
    /*     const onCreate = (values: Store) => {
            console.log('Received values of form: ', values);
            let infoPublicacion: InfoPublicacion = {
                fechaCreacion: new Date(),
                fechaModificacion: new Date(),
                titulo: values.titulo,
                contenido: values.contenido,
                autor_id: '',
                estado: 'Abierta',
            }
            infoPublicacion = firebaseCtx.infoPublicacionM.create(infoPublicacion);
            let pregunta: Pregunta = {
                numVotos: 0,
                resuelta: false,        
                info_id: infoPublicacion.id ? infoPublicacion.id : '',
            }
            pregunta = firebaseCtx.preguntaM.create(pregunta);
            console.log('Pregunta: ', pregunta);
            setVisible(false);
        }; */
    const onCreate = (values: Store) => {
        console.log('Received values of form: ', values);
        let post: Post = {
            numVotos: 0,
            resuelto: false,
            fechaCreacion: new Date(),
            fechaModificacion: new Date(),
            titulo: values.titulo,
            contenido: values.contenido,
            autor_id: currentUser ? currentUser.uid : '',
            estado: 'Abierta',
            tags: values.tags
        }
        firebaseCtx.postM.create(post);
        setVisible(false);
    };
    return (
        <>
            <Tooltip title="Preguntar">
                <Button
                    style={{ zIndex: 1, width: 56, height: 56 }}
                    size="large"
                    type="primary"
                    shape="circle"
                    onClick={() => {
                        setVisible(true);
                    }}
                    icon={<QuestionOutlined />}
                />
            </Tooltip>
            {/* <Button
                    type="primary"
                    shape="circle"
                    onClick={() => {
                        setVisible(true);
                    }}
                >

                </Button> */}
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
