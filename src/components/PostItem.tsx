import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Tag, Typography } from 'antd'
import { useFirebase } from '../contexts/FirebaseContext';
import './PostItem.css';
import { Avatar } from 'antd';

interface Props {
    post: Post;
    isReply: boolean;
}

export const PostItem = (props: Props) => {
    const { usuarioM } = useFirebase();
    const [usuario, setUsuario] = useState<Usuario>()
    useEffect(() => {
        let isSubscribed = true;
        usuarioM.read(props.post.autor_id).then(user => {
            if (isSubscribed) {
                setUsuario(user);
                console.log("foo")
            }
        });
        return () => { isSubscribed = false };
    }, [props.post.autor_id])
    return (
        <>
            <Card
                bordered={false}
                size="small"
                className="post-item"
            >
                <Row gutter={16}>
                    <Col span={21}>
                        {
                            props.post.titulo &&
                            <Typography.Title level={4}>
                                {props.post.titulo}
                            </Typography.Title>
                        }

                        <Typography.Text strong >
                            Publicado el
                            {" " + props.post.fechaCreacion.toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                        </Typography.Text>
                        <Typography.Paragraph>
                            {props.post.contenido}
                        </Typography.Paragraph>
                    </Col>
                    <Col span={3}>
                        {
                            props.post.tags &&
                            props.post.tags.map((tag, index) =>
                                <Tag key={index} color="blue">
                                    {tag}
                                </Tag>
                            )
                        }
                    </Col>
                </Row>
                <div className="post-item-footer">
                    {
                        usuario &&
                        <Card.Meta
                            avatar={<Avatar >{usuario.nombre.toUpperCase()[0]}</Avatar>}
                            title={usuario.nombre}
                        />

                    }
                </div>

            </Card>

        </>
    )
}

