import React from 'react'
import { Card, Tag, Typography } from 'antd';
import { UpOutlined, AlignLeftOutlined, CheckCircleTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { MarkdownRender } from './MarkdownRender';
import './TarjetaPost.css';

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
                className="tp-card"
                actions={[
                    props.post.resuelto ? <CheckCircleTwoTone twoToneColor="#52c41a" key="check" /> : <QuestionCircleOutlined />,
                    <UpOutlined key="up" about="12" />,
                    <AlignLeftOutlined key="align" />,
                    <Text type="secondary">{props.post.fechaCreacion.toLocaleString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}</Text>
                ]}>
                <MarkdownRender content={props.post.contenido} />
                {props.post.tags &&
                    props.post.tags.map(function (item, index) {
                        return <Tag key={index} color="blue">{item}</Tag>
                    })}
            </Card>
        </div>
    )
}

