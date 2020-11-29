import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { TarjetaCuenta } from './TarjetaCuenta';

export const AdminCuentas = () => {
    const { usuarioM } = useFirebase();
    const [usuarios, setUsuarios] = useState<Usuario[]>();
    usuarioM.subscribe(setUsuarios, usuarioM.getCollection());
    return (
        <div>
            {usuarios?.map((usuario) => {
                return <TarjetaCuenta key={usuario.id} usuario={usuario} />;
            })}
        </div>
    );
};
