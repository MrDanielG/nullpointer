import React, { useState } from 'react';
import { Card, Avatar, Switch, Modal, message } from 'antd';
import { EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFirebase } from '../contexts/FirebaseContext';
const { Meta } = Card;

export const TarjetaCuenta = ({ usuario }: any) => {
    const { usuarioM } = useFirebase();
    const [state, setState] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { nombre, correo, isAdmin, id } = usuario;

    const onChange = (checked: any) => {
        showModal();
    };

    const onDelete = () => {
        console.log('Delete');
    };

    const onDetails = () => {
        console.log('Detail');
    };

    const showModal = () => {
        setState(true);
    };

    const handleOk = async (id: string) => {
        if (isAdmin) {
            try {
                setConfirmLoading(true);
                await usuarioM.update(id, { isAdmin: false });
                setConfirmLoading(false);
                message.success('Usuario Actualizado');
            } catch (error) {
                console.log(error);
                message.error('Error al actualizar Usuario');
            }
        } else {
            try {
                setConfirmLoading(true);
                await usuarioM.update(id, { isAdmin: true });
                setConfirmLoading(false);
                message.success('Usuario Actualizado');
            } catch (error) {
                console.log(error);
                message.error('Error al actualizar Usuario');
            }
        }
        setState(false);
    };

    const handleCancel = (e: any) => {
        setState(false);
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
            <Modal
                title="Adminisrar Admins"
                visible={state}
                onOk={() => handleOk(id)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>
                    ¿Desea cambiar los permisos del usuario: <b>{nombre}</b>?
                </p>
            </Modal>
        </Card>
    );
};
