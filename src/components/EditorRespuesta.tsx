import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { FirebaseContext } from '../contexts/FirebaseContext';
interface Props {
    idPost: string;
    idUser: string;
}

export class EditorRespuesta extends React.Component<Props> {
    static contextType = FirebaseContext;
    context!: React.ContextType<typeof FirebaseContext>
    state = {
        respuesta: '',
        submitting: false,

    }
    onSubmit = () => {
        const reply: Post = {
            fechaCreacion: new Date(),
            fechaModificacion: new Date(),
            contenido: this.state.respuesta,
            autor_id: this.props.idUser,
            numVotos: 0,
            resuelto: false,
        }
        this.setState({ submitting: true });
        this.context.postM.addReply(this.props.idPost, reply)
            .then(val => {
                message.success("Operación exitosa")
            })
            .catch(error => {
                message.error(error);
            })
            .finally(() => {
                this.setState({ submitting: false });
            });


    };
    handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            respuesta: e.target.value
        });
    };
    render() {
        return (
            <>
                <Form.Item name="contenido">
                    <Input.TextArea onChange={this.handleChange} rows={5} />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={this.state.submitting}
                        onClick={this.onSubmit}>
                        Responder
                    </Button>
                </Form.Item>
            </>
        )
    }

}
