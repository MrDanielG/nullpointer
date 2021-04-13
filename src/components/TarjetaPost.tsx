import React from 'react'
import { Card, Tag, Typography } from 'antd';
import { UpOutlined, AlignLeftOutlined, CheckCircleTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;
interface Props {
    post: Post;
}
export const TarjetaPost = (props: Props) => {
    return (
        <div>
            <Card            
                title={props.post.titulo}
                extra={<Link to={`/app/post/${props.post.id}`}>Más</Link>} 
                style={{ width: 900 }}
                actions={[
                    props.post.resuelto ? <CheckCircleTwoTone twoToneColor="#52c41a" key="check"/>: <QuestionCircleOutlined />,
                    <UpOutlined key="up" about="12"/>,
                    <AlignLeftOutlined key="align"/>,
                    <Text type="secondary">{props.post.fechaCreacion.toLocaleString('es-ES', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}</Text>
                ]}>                    
                <p>{props.post.contenido} </p>
                {props.post.tags &&
                props.post.tags.map(function(item, index) {
                    return <Tag key={index} color="blue">{item}</Tag>
                })}
            </Card>
        </div>
    )
}

