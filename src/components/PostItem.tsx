import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Tag, Tooltip, Typography, Avatar, Button, message } from 'antd';
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
} from '@ant-design/icons';
import { useFirebase } from '../contexts/FirebaseContext';
import './PostItem.css';
import { authData, useAuth } from '../contexts/AuthContext';
import { CheckOutlined } from '@ant-design/icons';
import EditarPost from './EditarPost';

interface Props {
    post: Post;
    isReply?: boolean;
    canAccept?: boolean;
    acceptReply?: (id: string) => void;
    parentPost?: string;
}

export const PostItem = (props: Props) => {
    const { usuarioM, likesM, postM } = useFirebase();
    const { currentUser } = useAuth() as authData;
    const [usuario, setUsuario] = useState<Usuario>();
    const [action, setAction] = useState('');

    const like = async () => {
        setAction('liked');
        try {
            await likesM.createLike(
                currentUser?.uid!,
                props.post.id!,
                props.isReply,
                props.parentPost
            );
        } catch (error) {
            console.log(error);
        }
    };

    const dislike = async () => {
        setAction('disliked');
        try {
            await likesM.deleteLike(
                currentUser?.uid!,
                props.post.id!,
                props.isReply,
                props.parentPost,
                props.post.numVotos
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let isSubscribed = true;
        usuarioM.read(props.post.autor_id).then((user) => {
            if (isSubscribed) {
                setUsuario(user);
            }
        });
        return () => {
            isSubscribed = false;
        };
    }, [usuarioM, props.post.autor_id]);

    const accept = () => {
        if (props.acceptReply && props.post.id) {
            props.acceptReply(props.post.id);
        }
    };
    const editContent = async (value: string) => {
        try {
            const path =  props.parentPost + '/respuestas/' + props.post.id;
            await postM.update(path, {
                contenido: value,
                fechaModificacion: new Date()
            });
            message.success("Se actualizó tu respuesta")

        } catch (error) {
            console.error(error);
            message.error("No se pudo actualizar tu respuesta");

        }

    }
    return (
        <>

            <Card
                bordered={false}
                size="small"
                className="post-item"
            >

                <Row gutter={16}>
                    <Col span={21}>
                        {props.post.titulo && (
                            <Typography.Title level={4}>
                                {props.post.titulo}
                                {
                                    currentUser?.id === usuario?.id &&
                                    <EditarPost post={props.post} />
                                }
                            </Typography.Title>
                        )}
                        <Typography.Paragraph type="secondary">
                            {"Publicado el: " +
                                props.post.fechaCreacion.toLocaleDateString(
                                    'es-MX',
                                    {
                                        hour12: true,
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    }
                                )}
                        </Typography.Paragraph>
                        <Typography.Paragraph editable={
                            (currentUser?.id === usuario?.id) && props.isReply ?
                                {
                                    tooltip: "Editar contenido",
                                    onChange: editContent
                                }
                                : false
                        }>
                            {props.post.contenido}
                        </Typography.Paragraph>
                    </Col>
                    <Col span={3}>
                        {props.post.tags &&
                            props.post.tags.map((tag, index) => (
                                <Tag key={index} color="blue">
                                    {tag}
                                </Tag>
                            ))}
                        <br />
                        <br />

                        <Tooltip key="comment-basic-like" title="Like">
                            <span onClick={like}>
                                {React.createElement(
                                    action === 'liked'
                                        ? LikeFilled
                                        : LikeOutlined
                                )}
                                <span className="comment-action">
                                    {props.post.numVotos}
                                </span>
                            </span>
                        </Tooltip>
                        <Tooltip key="comment-basic-dislike" title="Dislike">
                            <span onClick={dislike}>
                                {React.createElement(
                                    action === 'disliked'
                                        ? DislikeFilled
                                        : DislikeOutlined
                                )}
                                <span className="comment-action"></span>
                            </span>
                        </Tooltip>

                        {props.canAccept && (
                            <Button
                                style={{
                                    backgroundColor: '#52c41a',
                                    borderColor: '#52c41a',
                                }}
                                onClick={accept}
                                type="primary"
                                icon={<CheckOutlined />}
                            >
                                Aceptar
                            </Button>
                        )}
                    </Col>
                </Row>
                <div className="post-item-footer">
                    {usuario && (
                        <Card.Meta
                            avatar={
                                <Avatar>
                                    {usuario.nombre.toUpperCase()[0]}
                                </Avatar>
                            }
                            title={usuario.nombre}
                        />
                    )}
                    <Typography.Text type="secondary">
                        {
                            props.post.fechaCreacion.getTime() !== props.post.fechaModificacion.getTime() &&
                            "Actualizado el: " +
                            props.post.fechaModificacion.toLocaleDateString('es-MX', {
                                hour12: true,
                                hour: 'numeric',
                                minute: 'numeric',
                            })
                        }
                    </Typography.Text>
                </div>
            </Card>
        </>
    );
};
