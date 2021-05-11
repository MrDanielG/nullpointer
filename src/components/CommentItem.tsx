import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, message, Modal, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import './MarkdownEditor.css';
import { MarkdownInput } from './MarkdownInput';
import { MarkdownRender } from './MarkdownRender';

interface Props {
    idPost: string;
    idReply: string;
    isReply: boolean;
    comment: Post;
    editable?: boolean;
    canDelete?: boolean;
}

const CommentItem = (props: Props) => {
    const { idPost, idReply, comment, editable, canDelete } = props;
    const [visible, setVisible] = useState<boolean>(false);
    const [content, setContent] = useState<string>(props.comment.contenido);
    const [user, setUser] = useState<Usuario>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { postM, usuarioM } = useFirebase();

    const onUpdateComment = async (value: string) => {
        try {
            const path = props.isReply 
            ? `${idPost}/respuestas/${idReply}/comentarios/${comment.id}`
            : `${idPost}/comentarios/${comment.id}`;            
            await postM.update(path, {
                contenido: value,
                fechaModificacion: new Date(),
            });
            message.success('Se actualizó tu comentario');
        } catch (error) {
            console.error(error);
            message.error('No se pudo actualizar tu comentario');
        }
    };

    const handleDeleteComment = async () => {
        try {
            const path = props.isReply 
            ? `${idPost}/respuestas/${idReply}/comentarios/${comment.id}`
            : `${idPost}/comentarios/${comment.id}`;        
            await postM.remove(path);
            message.success('Se elimino tu comentario');
        } catch (error) {
            console.error(error);
            message.error('Error al eliminar comentario');
        }
    };

    const warningModal = () => {
        Modal.confirm({
            title: 'Deseas eliminar este comentario',
            icon: <ExclamationCircleOutlined />,
            content: comment.contenido,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                try {
                    return new Promise((resolve, reject) => {
                        handleDeleteComment();
                        resolve('');
                    });
                } catch (e) {
                    return console.log('Oops errors!');
                }
            },
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        usuarioM.read(comment.autor_id).then((user) => setUser(user));
    }, [comment.autor_id, usuarioM]);

    return (
        <>
            <div className="mde-edit-btn">
                <Typography.Text type="secondary" className="authorName">
                    {user?.nombre}
                </Typography.Text>
                {editable && !visible && (
                    <Tooltip title="Editar contenido del comentario">
                        <Button
                            onClick={() => {
                                setVisible(true);
                            }}
                            type="link"
                            icon={<EditOutlined style={{ fontSize: '16px' }} />}
                        />
                    </Tooltip>
                )}
                {canDelete && !visible && (
                    <Tooltip title="Eliminar comentario">
                        <Button
                            onClick={warningModal}
                            type="link"
                            icon={
                                <DeleteOutlined style={{ fontSize: '16px' }} />
                            }
                            style={{ color: '#ff4d4f' }}
                        />
                    </Tooltip>
                )}
            </div>
            {!visible && <MarkdownRender content={comment.contenido} />}
            {editable && visible && (
                <div>
                    <MarkdownInput
                        value={content}
                        onChange={(value) => setContent(value)}
                    />
                    <div className="mde-action-btns">
                        <Button
                            type="default"
                            danger
                            onClick={() => {
                                setContent(comment.contenido);
                                setVisible(false);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                onUpdateComment(content);
                                setVisible(false);
                            }}
                        >
                            Guardar
                        </Button>
                    </div>
                </div>
            )}
            <Modal
                title="Basic Modal"
                visible={isModalVisible}
                onOk={handleDeleteComment}
                onCancel={handleCancel}
            >
                <p>¿Deseas eliminar este comentario?</p>
            </Modal>
        </>
    );
};

export default CommentItem;
