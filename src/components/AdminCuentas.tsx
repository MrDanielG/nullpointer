import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { TarjetaCuenta } from './TarjetaCuenta';

export const AdminCuentas = () => {
    const { usuarioM } = useFirebase();
    const [usuarios, setUsuarios] = useState<Usuario[]>();
    usuarioM.subscribe(setUsuarios, usuarioM.getCollection());
    return (
        <Row>
            {usuarios?.map((usuario) => {
                return (
                    <Col
                        key={usuario.id}
                        xs={24}
                        sm={16}
                        md={12}
                        lg={10}
                        xl={6}
                    >
                        <TarjetaCuenta usuario={usuario} />
                    </Col>
                );
            })}
        </Row>
    );
};
