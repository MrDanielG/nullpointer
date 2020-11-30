import React from 'react';
import { Card, Avatar, Switch, Modal, message } from 'antd';
import {
    EllipsisOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useFirebase } from '../contexts/FirebaseContext';
const { Meta } = Card;

export const TarjetaCuenta = ({ usuario }: any) => {
    const { usuarioM } = useFirebase();
    const { nombre, correo, isAdmin, id } = usuario;

    const onChange = (checked: any) => {
        showPromiseConfirm();
    };

    const onDelete = () => {
        console.log('Delete');
    };

    const onDetails = () => {
        console.log('Detail');
    };

    function showPromiseConfirm() {
        Modal.confirm({
            title: 'Administrar Permisos',
            icon: <ExclamationCircleOutlined />,
            content: `¿Desea cambiar los permisos del usuario: ${nombre}?`,
            async onOk() {
                try {
                    if (isAdmin) {
                        await usuarioM.update(id, { isAdmin: false });
                        message.success('Usuario Actualizado');
                    } else {
                        await usuarioM.update(id, { isAdmin: true });
                        message.success('Usuario Actualizado');
                    }
                } catch (error) {
                    console.log(error);
                    message.error('Error al actualizar Usuario');
                }
            },
            onCancel() {},
        });
    }

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
        </Card>
    );
};
