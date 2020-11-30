import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd';
import { useFirebase } from '../contexts/FirebaseContext';



interface Props {
    idPost: string;
    idUser: string;
}

export const EditorRespuesta = (props: Props) => {
    const [respuesta, setRespuesta] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { postM } = useFirebase();
    const [form] = Form.useForm();
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRespuesta(e.target.value);
    };


    const onSubmit = () => {
        const reply: Post = {
            id: "",
            fechaCreacion: new Date(),
            fechaModificacion: new Date(),
            contenido: respuesta,
            autor_id: props.idUser,
            numVotos: 0,
            resuelto: false,
        }
        setSubmitting(true);
        postM.addReply(props.idPost, reply)
            .then(val => {
                message.success("Operación exitosa");
                form.resetFields();
                setRespuesta('');
            })
            .catch(error => {
                message.error(error);
            })
            .finally(() => {
                setSubmitting(false);
            });


    };
    return (
        <Form form={form} onFinish={onSubmit}>
            <Form.Item 
            name="contenido" 
            initialValue=""
            rules={[{required: true, message: "No puedes enviar un mensaje vacío"}]}
            >
                <Input.TextArea onChange={handleChange} rows={5} />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={respuesta === ""}
                >
                    Responder
                    </Button>
            </Form.Item>
        </Form>
    )
}

export default EditorRespuesta;