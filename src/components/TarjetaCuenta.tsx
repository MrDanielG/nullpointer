import { Card, Avatar, Switch, Modal, Button } from 'antd';
import { EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
const { Meta } = Card;

export const TarjetaCuenta = ({ usuario }: any) => {
    const [state, setState] = useState({ visible: false });
    const { nombre, correo, isAdmin } = usuario;

    const onChange = (checked: any) => {
        showModal();
    };

    const onDelete = () => {
        console.log('Delete');
    };

    const onDetails = () => {
        console.log('Detail');
        console.log(usuario);
    };

    const showModal = () => {
        setState({
            visible: true,
        });
    };

    const handleOk = (e: any) => {
        console.log(e);
        setState({
            visible: false,
        });
    };

    const handleCancel = (e: any) => {
        console.log(e);
        setState({
            visible: false,
        });
    };

    return (
        <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
                <DeleteOutlined key="delete" onClick={onDelete} />,
                <EllipsisOutlined key="ellipsis" onClick={onDetails} />,
            ]}
        >
            <Meta
                avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={nombre}
                description={correo}
            />
            <p className="admin-text">
                Administrador
                <Switch
                    defaultChecked
                    onChange={onChange}
                    checked={isAdmin}
                    className="admin-switch"
                />
            </p>
            {}
            <Modal
                title="Adminisrar Admins"
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Desea cambiar los permisos del usuario: {nombre} </p>
            </Modal>
        </Card>
    );
};
