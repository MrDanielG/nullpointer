import { Button, Form, message } from 'antd';
import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { MarkdownInput } from './MarkdownInput';

interface Props extends React.HTMLProps<HTMLFormElement> {
    idPost: string;
    idUser: string;
    parentPost?: string;
    isReplay?: boolean;
    isComment?: boolean;
    onFinish?: () => void;
}

export const EditorRespuesta = (props: Props) => {
    const [respuesta, setRespuesta] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { postM } = useFirebase();
    const [form] = Form.useForm();
    // props.isComment = false; // Por defecto no es comentario

    const onSubmit = () => {
        const reply: Post = {
            id: '',
            fechaCreacion: new Date(),
            fechaModificacion: new Date(),
            contenido: respuesta,
            autor_id: props.idUser,
            numVotos: 0,
            resuelto: false,
        };
        setSubmitting(true);  
        if (!props.isComment) {
            postM
                .addReply(props.idPost, reply)
                .then((val) => {
                    message.success('Operación exitosa');
                    form.resetFields();
                    setRespuesta('');
                })
                .catch((error) => {
                    message.error(error);
                    message.error('Error al crear Respuesta');
                })
                .finally(() => {
                    setSubmitting(false);
                });
        } else if(props.isReplay) {
            postM
                .addReplyComment(props.parentPost!, props.idPost, reply)
                .then((val) => {
                    message.success('Comentario creado');
                    form.resetFields();
                    setRespuesta('');
                })
                .catch((error) => {
                    message.error(error);
                    message.error('Error al crear comentario');
                })
                .finally(() => setSubmitting(false));
        } else {
            postM
                .addComment(props.idPost, reply)
                .then((val) => {
                    message.success('Comentario creado');
                    form.resetFields();
                    setRespuesta('');
                })
                .catch((error) => {
                    message.error(error);
                    message.error('Error al crear comentario');
                })
                .finally(() => setSubmitting(false));
        }   
        if(props.onFinish) {
            props.onFinish();
        }
    };
    return (
        <Form form={form} onFinish={onSubmit} className={props.className}>
            <Form.Item
                name="contenido"
                initialValue=""
                rules={[
                    {
                        required: true,
                        message: 'No puedes enviar un mensaje vacío',
                    },
                ]}
            >
                <MarkdownInput
                    placeholder="Escribe tu repuesta"
                    onChange={(value) => {
                        setRespuesta(value);
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={respuesta === ''}
                >
                    Responder
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditorRespuesta;
