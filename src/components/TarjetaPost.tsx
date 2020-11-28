import React from 'react'
import { Card, Tag, Typography } from 'antd';
import { UpOutlined, AlignLeftOutlined, CheckCircleTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;
interface Props {
    id: string;
    titulo: string;
    contenido: string;
    resuelto: boolean;
    tags?: string[];
    fecha: string;
}
export const TarjetaPost = (props: Props) => {
    return (
        <div>
            <Card            
                title={props.titulo}
                extra={<Link to={`/app/post/${props.id}`}>Más</Link>} 
                style={{ width: 700 }}
                actions={[
                    props.resuelto ? <CheckCircleTwoTone twoToneColor="#52c41a" key="check"/>: <QuestionCircleOutlined />,
                    <UpOutlined key="up" about="12"/>,
                    <AlignLeftOutlined key="align"/>,
                    <Text type="secondary">{props.fecha}</Text>
                ]}>                    
                <p>{props.contenido} </p>
                {props.tags &&
                props.tags.map(function(item, index) {
                    return <Tag key={index} color="blue">{item}</Tag>
                })}
            </Card>
        </div>
    )
}

