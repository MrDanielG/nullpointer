import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { MarkdownRender } from './MarkdownRender';
import './MarkdownEditor.css';
import { MarkdownInput } from './MarkdownInput';

interface Props extends React.HTMLProps<HTMLElement> {
    content: string;
    editable?: boolean;
    onSave?: (value: string) => void;
}

export const MarkdownEditor: React.FC<Props> = ({
    editable = false,
    ...props
}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [content, setContent] = useState<string>(props.content);

    const button = props.disabled ? (
        <Tooltip title="Publicación cerrada, no se puede editar">
            <Button
                disabled
                type="link"
                icon={<EditOutlined style={{ fontSize: '16px' }} />}
            />
        </Tooltip>
    ) : (
        <Tooltip title="Editar contenido del post">
            <Button
                onClick={() => {
                    setVisible(true);
                }}
                type="link"
                icon={<EditOutlined style={{ fontSize: '16px' }} />}
            />
        </Tooltip>
    );
    
    return (
        <>
            {editable && !visible && (
                <div className="mde-edit-btn">
                    { button }
                </div>
            )}
            {!visible && <MarkdownRender content={props.content} />}
            {editable && visible && (
                <div>
                    <MarkdownInput
                        value={content}
                        onChange={(value) => {
                            setContent(value);
                        }}
                    />
                    <div className="mde-action-btns">
                        <Button
                            type="default"
                            danger
                            onClick={() => {
                                setContent(props.content);
                                setVisible(false);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                if (props.onSave) {
                                    props.onSave(content);
                                }
                                setVisible(false);
                            }}
                        >
                            Guardar
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
