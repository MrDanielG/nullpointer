import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Tag, Typography } from 'antd'
import { useFirebase } from '../contexts/FirebaseContext';
import './PostItem.css';
import { Avatar, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

interface Props {
    post: Post;
    isReply?: boolean;
    canAccept?: boolean;
    acceptReply?: (id: string) => void;
}

export const PostItem = (props: Props) => {
    const { usuarioM } = useFirebase();
    const [usuario, setUsuario] = useState<Usuario>()
    useEffect(() => {
        let isSubscribed = true;
        usuarioM.read(props.post.autor_id).then(user => {
            if (isSubscribed) {
                setUsuario(user);
            }
        });
        return () => { isSubscribed = false };
    }, [usuarioM, props.post.autor_id]);

    const accept = () => {
        if (props.acceptReply && props.post.id) {
            props.acceptReply(props.post.id);
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
                        {
                            props.post.titulo &&
                            <Typography.Title level={4}>
                                {props.post.titulo}
                            </Typography.Title>
                        }
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
                        {
                            props.canAccept &&
                            <Button
                                style={{backgroundColor: "#52c41a", borderColor: "#52c41a"}}
                                onClick={accept}
                                type="primary"
                                icon={<CheckOutlined />}
                            >Aceptar</Button>
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
                    <Typography.Text type="secondary">
                        Publicado el:
                        {" " +
                            props.post.fechaCreacion.toLocaleDateString('es-MX', {
                                hour12: true,
                                hour: "numeric",
                                minute: "numeric"
                            })}
                    </Typography.Text>
                </div>

            </Card>

        </>
    )
}

