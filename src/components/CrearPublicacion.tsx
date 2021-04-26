import React, { useEffect } from 'react';
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
import { MarkdownInput } from './MarkdownInput';


interface CrearPublicacionProps {
    visible: boolean;
    onCreate: (values: Store) => void;
    onCancel: () => void;
    title?: string;
    okText?: string;
    post?: Post;
    edit?: boolean;
}

const CrearPublicacion: React.FC<CrearPublicacionProps> = ({
    visible,
    onCreate,
    onCancel,
    okText,
    title,
    post,
    edit = false
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (post) {
            form.setFieldsValue({
                titulo: post.titulo,
                contenido: post.contenido,
                tags: post.tags
            });
        }
    }, [form, post]);

    return (
        <>

            <Modal
                visible={visible}
                title={title ? title : "Crear un nuevo Post"}
                okText={okText ? okText : "Publicar"}
                forceRender={true}
                cancelText="Cancelar"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            onCreate(values);
                            form.resetFields();
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
                    {
                        !edit &&
                        <Form.Item
                            initialValue={post?.contenido}
                            name="contenido"
                            label="Cuerpo de la publicación"
                            rules={[{ required: true, message: 'Inserta el cuerpo de la publicación' }]}
                        >
                            <MarkdownInput placeholder="Explica tu pregunta" />
                        </Form.Item>
                    }

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
    const onCreate = (values: Store) => {
        let post: Post = {
            id: '',
            numVotos: 0,
            resuelto: false,
            fechaCreacion: new Date(),
            fechaModificacion: new Date(),
            titulo: values.titulo,
            contenido: values.contenido,
            autor_id: currentUser ? currentUser.id : '',
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
