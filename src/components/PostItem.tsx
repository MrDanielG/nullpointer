import React from 'react'
import { Card, Col, Row, Tag, Typography } from 'antd'
import './PostItem.css';

interface Props {
    post: Post;
}

export const PostItem = (props: Props) => {
    return (
        <>
            <Card
                bordered={false}
                size="small"
                className="post-item"
            >
                <Row gutter={16}>
                    <Col span={21}>
                        <Typography.Title level={4}>
                            {props.post.titulo}
                        </Typography.Title>
                        {props.post.contenido}

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
            </Card>

        </>
    )
}
