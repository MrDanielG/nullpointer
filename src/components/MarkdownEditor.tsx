import React, { ReactNode, useState } from 'react';
import { Button, Input, Tooltip, Tabs, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { MarkdownRender } from './MarkdownRender';
import './MarkdownEditor.css';

interface Props {
    content: string;
    editable?: boolean;
    onSave?: (value: string) => void;
}

export const MarkdownEditor: React.FC<Props> = ({ editable = false, ...props }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [content, setContent] = useState<string>(props.content);
    return (
        <>
            {
                editable &&
                !visible &&
                <div className="mde-edit-btn">
                    <Tooltip title="Editar contenido del post">
                        <Button onClick={() => {
                            setVisible(true);
                        }}
                            type="link"
                            icon={<EditOutlined style={{ fontSize: '16px' }} />}
                        />
                    </Tooltip>
                </div>

            }

            {
                !visible &&
                <MarkdownRender content={props.content} />
            }

            {
                editable &&
                visible &&
                <div>
                    <Typography.Text type="secondary">
                        Puedes usar Markdown para editar el contenido del post
                        (<a href="https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown"
                            title="Aprende a usar Markdown"
                        >?</a>) y además usar código LaTeX para texto matemático
                        (<a href="https://es.wikibooks.org/wiki/Manual_de_LaTeX/F%C3%B3rmulas_matem%C3%A1ticas"
                            title="Aprende LaTeX para texto matemático"
                        >?</a>).
                    </Typography.Text>
                    <Tabs>
                        <Tabs.TabPane tab="Escribir" key="tab-esc">
                            <Input.TextArea
                                rows={3}
                                value={content}
                                onChange={(event) => {
                                    setContent(event.target.value)
                                }}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Previsualizar" key="tab-preview">
                            <MarkdownRender content={content} />
                        </Tabs.TabPane>
                    </Tabs>
                    <div className="mde-action-btns">
                        <Button type="default" danger
                            onClick={() => {
                                setContent(props.content);
                                setVisible(false);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button type="primary" onClick={
                            () => {
                                if (props.onSave) {
                                    props.onSave(content);
                                }
                                setVisible(false);
                            }
                        } >
                            Guardar
                        </Button>
                    </div>

                </div>

            }
        </>
    );
}
