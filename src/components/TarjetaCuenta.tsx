import { Card, Avatar, Switch } from 'antd';
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import React from 'react';
const { Meta } = Card;

export const TarjetaCuenta = () => {
    function onChange(checked: any) {
        console.log(`switch to ${checked}`);
    }

    return (
        <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
                <SettingOutlined key="setting" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Nombre Usuaro"
                description="Correo"
            />
            {/* <p>
                Administrador: <Switch defaultChecked onChange={onChange} />
            </p> */}
        </Card>
    );
};
