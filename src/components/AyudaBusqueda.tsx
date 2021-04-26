import React from 'react';
import { Collapse, Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


interface Props {

}

export const AyudaBusqueda = (props: Props) => {
    return (
        <Popover
            title="Búsqueda avanzada"
            placement="leftTop"
            content={
                <>
                    <p style={{ width: 400, textAlign: 'justify' }} >
                        Puedes usar operadores de búsqueda avanzada. El espacio en
                        blanco es el operador AND y '|' es el operador OR. Para
                        escapar el espacio usa comillas dobles, p.e. ="lengueje ptyhon"
                        para una búsqueda exacta.
                        </p>
                    <Collapse ghost>
                        <Collapse.Panel key="1" header="Más operadores">
                            <table style={{ width: 600, textAlign: 'left' }}>
                                <thead>
                                    <tr>
                                        <th>Operador</th>
                                        <th>Tipo de coincidencia</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>jscript </code>
                                        </td>
                                        <td>fuzzy-match</td>
                                        <td>
                                            Elementos que coinciden de forma aproximada
                                            <code> jscript </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>=scheme </code>
                                        </td>
                                        <td>Coincidenca exacta</td>
                                        <td>
                                            Elementos que son esquema
                                            <code> scheme </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>'python </code>
                                        </td>
                                        <td>Incluir coincidencia</td>
                                        <td>
                                            Elementos que incluyen
                                            <code> python </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>!ruby </code>
                                        </td>
                                        <td>Coincidencia exacta inversa</td>
                                        <td>
                                            Elementos que no incluyen
                                            <code> ruby </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>^java </code>
                                        </td>
                                        <td>Prefijo de coincidencia exacta</td>
                                        <td>
                                            Elementos que inician con
                                            <code> java </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>!^earlang </code>
                                        </td>
                                        <td>Coincidenca exacta de prefijo inverso</td>
                                        <td>
                                            Elementos que no inician con
                                            <code> earlang </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>.js$ </code>
                                        </td>
                                        <td>Sufijo coincidencia exacta</td>
                                        <td>
                                            Elementos que terminan con
                                            <code> .js </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>!.go$ </code>
                                        </td>
                                        <td>Sufijo inverso coincidencia exacta</td>
                                        <td>
                                            Elementos que no terminan con
                                            <code> .go </code>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </Collapse.Panel>
                    </Collapse>

                </>
            }
        >
            <QuestionCircleOutlined />
        </Popover>
    );
}
