import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Tag, Tooltip, Typography, Avatar } from 'antd';
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
} from '@ant-design/icons';
import { useFirebase } from '../contexts/FirebaseContext';
import './PostItem.css';
import { authData, useAuth } from '../contexts/AuthContext';

interface Props {
    post: Post;
    isReply: boolean;
}

export const PostItem = (props: Props) => {
    const { usuarioM, likesM } = useFirebase();
    const { currentUser } = useAuth() as authData;
    const [usuario, setUsuario] = useState<Usuario>();
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState('');

    const like = async () => {
        setAction('liked');
        try {
            await likesM.createLike(currentUser?.uid!, props.post.id!);
        } catch (error) {
            console.log(error);
        }
    };

    const dislike = async () => {
        setAction('disliked');
        try {
            await likesM.deleteLike(currentUser?.uid!, props.post.id!);
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

    return (
        <>
            <Card bordered={false} size="small" className="post-item">
                <Row gutter={16}>
                    <Col span={21}>
                        {props.post.titulo && (
                            <Typography.Title level={4}>
                                {props.post.titulo}
                            </Typography.Title>
                        )}
                        <Typography.Paragraph>
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
                                <span className="comment-action">
                                    {dislikes}
                                </span>
                            </span>
                        </Tooltip>
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
                        Publicado el:
                        {' ' +
                            props.post.fechaCreacion.toLocaleDateString(
                                'es-MX',
                                {
                                    hour12: true,
                                    hour: 'numeric',
                                    minute: 'numeric',
                                }
                            )}
                    </Typography.Text>
                </div>
            </Card>
        </>
    );
};
