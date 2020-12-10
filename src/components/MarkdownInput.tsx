import React, { useState } from 'react'
import { Tabs, Input, Typography } from 'antd'
import { MarkdownRender } from './MarkdownRender'

interface Props {
    value?: string;
    onChange?: (value: string) => void;
    rows?: number;
    placeholder?: string;
}

export const MarkdownInput = ({ value = "", rows = 3, ...props }: Props) => {
    const [content, setContent] = useState<string>(value);
    return (
        <div>

            <Typography.Text type="secondary">
                Puedes usar Markdown para editar el contenido del post
                        (<a href="https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown"
                    title="Aprende a usar Markdown"
                >?</a>) y usar código LaTeX para texto matemático
                        (<a href="https://es.wikibooks.org/wiki/Manual_de_LaTeX/F%C3%B3rmulas_matem%C3%A1ticas"
                    title="Aprende LaTeX para texto matemático"
                >?</a>).
                    </Typography.Text>
            <Tabs>
                <Tabs.TabPane tab="Escribir" key="tab-esc">
                    <Input.TextArea
                        rows={rows}
                        placeholder={props.placeholder}
                        value={content}
                        onChange={(event) => {
                            if (props.onChange) {
                                props.onChange(event.target.value);
                            }
                            setContent(event.target.value)
                        }}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Previsualizar" key="tab-preview">
                    <MarkdownRender content={content} />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}
