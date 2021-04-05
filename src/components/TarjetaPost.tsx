import React from 'react'
import { Card, Tag, Typography, Button } from 'antd';
import { UpOutlined, AlignLeftOutlined, CheckCircleTwoTone, QuestionCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;
export const TarjetaPost = (props: {titulo: string, contenido: string, resuelto: boolean 
                                    tags?: string[], fecha: string}) => {
    return (
        <div>
            <Card
                style={{margin: 'auto', width: '90%'}}
                title={props.titulo}
                extra={<Button type="link">Más</Button>}
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

