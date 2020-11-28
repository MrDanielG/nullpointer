import React from 'react';
import './EditableTagGroup.css';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
interface EditableTagGroupState {
    tags: string[];
    inputVisible: boolean;
    inputValue: string;
    editInputIndex: number;
    editInputValue: string;
}
interface EditableTagGroupProps {
    value?: string[];
    onChange?: (value: string[]) => void;
}
class EditableTagGroup extends React.Component<EditableTagGroupProps, EditableTagGroupState>{
    input = React.createRef<Input>();
    editInput = React.createRef<Input>();
    state = {
        tags: ['General'],
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    };

    handleClose = (removedTag: string) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });

    };

    showInput = () => {
        console.log('showinput');
        this.setState({ inputVisible: true }, () => this.input.current?.focus());
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('inputchange');
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        console.log('inputconfirm');
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags: tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('editchange');
        this.setState({ editInputValue: e.target.value });
    };

    handleEditInputConfirm = () => {
        console.log('editconfirm');
        this.setState(({ tags, editInputIndex, editInputValue }) => {
            const newTags = [...tags];
            newTags[editInputIndex] = editInputValue;

            return {
                tags: newTags,
                editInputIndex: -1,
                editInputValue: '',
            };
        });
    };

    render() {

        const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
        console.log(inputValue);
        return (
            <>
                {tags.map((tag, index) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                ref={this.editInput}
                                key={tag}
                                size="small"
                                className="tag-input"
                                value={editInputValue}
                                onChange={this.handleEditInputChange}
                                onBlur={this.handleEditInputConfirm}
                                onPressEnter={this.handleEditInputConfirm}
                            />
                        );
                    }

                    const isLongTag = tag.length > 20;

                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag}
                            closable={index !== 0}
                            onClose={() => this.handleClose(tag)}
                        >
                            <span
                                onDoubleClick={e => {
                                    if (index !== 0) {
                                        this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                                            this.editInput.current?.focus();
                                        });
                                        e.preventDefault();
                                    }
                                }}
                            >
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                            tagElem
                        );
                })}
                {inputVisible && (
                    <Input
                        ref={this.input}
                        //type="text"
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={this.showInput}>
                        <PlusOutlined /> New Tag
                    </Tag>
                )}
            </>
        );
    }
}

export default EditableTagGroup;