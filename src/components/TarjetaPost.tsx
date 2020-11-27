import React from 'react'
import { Button, Card, message, Tag, Typography, Space } from 'antd';
import { UpOutlined, AlignLeftOutlined, CheckCircleTwoTone } from '@ant-design/icons';

const { Text, Link } = Typography;
export const TarjetaPost = () => {
    return (
        <div>
            <Card
                title="Título post"
                extra={<a href="#">Más</a>} style={{ width: 700 }}
                actions={[
                    <CheckCircleTwoTone twoToneColor="#52c41a" key="check"/>,
                    <UpOutlined key="up" about="12"/>,
                    <AlignLeftOutlined key="align"/>,
                    <Text type="secondary">Fecha de publicación</Text>
                ]}>
                <p>Lorem ipsum</p>
                <p>Card content</p>
                <p>Card content</p>
                <Tag>Tag 1</Tag>
                <Tag>Tag 2</Tag>
                <Tag>Tag 3</Tag>
            </Card>
        </div>
    )
}

