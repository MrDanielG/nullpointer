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
        tags: new Array<string>(),
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    };
    componentDidUpdate(prevProps: EditableTagGroupProps) {
        if (this.props !== prevProps && this.props.value && this.state.tags.length === 0) {
            this.setState({
                tags: this.props.value
            })
            console.log(this.props.value);
        }
    }
    handleClose = (removedTag: string) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
        if (this.props.onChange) {
            this.props.onChange(tags);

        }

    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.current?.focus());
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: e.target.value });
        
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags: tags,
            inputVisible: false,
            inputValue: '',
        });
        if (this.props.onChange) {
            this.props.onChange(tags);

        }

    };

    handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ editInputValue: e.target.value });

    };

    handleEditInputConfirm = () => {
        this.setState(({ tags, editInputIndex, editInputValue }) => {
            let newTags = [...tags];
            if (editInputValue !== '') {
                newTags[editInputIndex] = editInputValue;
            } else {

                newTags = this.state.tags.filter(tag => tag !== newTags[editInputIndex]);
            }

            if (this.props.onChange) {
                this.props.onChange(newTags);
            }
            return {
                tags: newTags,
                editInputIndex: -1,
                editInputValue: '',
            };
        });

    };

    render() {

        const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
        return (
            <>
                {
                    tags &&
                    tags.map((tag, index) => {
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
                                closable={true}
                                onClose={() => this.handleClose(tag)}
                                color="blue"
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
                    <Tag className="site-tag-plus" onClick={this.showInput} color="blue">

                        <PlusOutlined /> Nueva etiqueta
                    </Tag>
                )}
            </>
        );
    }
}

export default EditableTagGroup;