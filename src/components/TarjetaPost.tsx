import React from 'react'
import { Button, Card, message, Tag, Typography, Space } from 'antd';
import { UpOutlined, AlignLeftOutlined, CheckCircleTwoTone, QuestionCircleOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;
export const TarjetaPost = (props: {titulo: string, contenido: string, resuelto: boolean 
                                    tags: string[], fecha: string}) => {
    return (
        <div>
            <Card
                title={props.titulo}
                extra={<a href="#">Más</a>} style={{ width: 700 }}
                actions={[
                    props.resuelto ? <CheckCircleTwoTone twoToneColor="#52c41a" key="check"/>: <QuestionCircleOutlined />,
                    <UpOutlined key="up" about="12"/>,
                    <AlignLeftOutlined key="align"/>,
                    <Text type="secondary">{props.fecha}</Text>
                ]}>                    
                <p>{props.contenido} </p>
                {props.tags.map(function(item, index) {
                    return <Tag key={index}>{item}</Tag>
                })}
            </Card>
        </div>
    )
}

