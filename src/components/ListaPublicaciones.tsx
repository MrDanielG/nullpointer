import React, { useState } from 'react'
import './ListaPublicaciones.css';
import { TarjetaPost } from './TarjetaPost';
import { useFirebase } from '../contexts/FirebaseContext';
import { Tabs } from 'antd';
import { CheckCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';



interface Props {
    autorId?: string;
}

export const ListaPublicaciones = (props: Props) => {
    const { posts } = useFirebase();
    const [resueltos, setResueltos] = useState(false);
    const onTabChange = (key: string) => {
        if (key === "1") {
            setResueltos(false);
        } else {
            setResueltos(true);
        }
    }
    return (

        <div>
            <Tabs onChange={onTabChange}>
                <Tabs.TabPane tab={
                    <span>
                        <QuestionCircleOutlined />
                        Abiertos
                    </span>
                } key="1" />
                <Tabs.TabPane tab={
                    <span>
                        <CheckCircleOutlined />
                        Resueltos
                    </span>
                } key="2" />

            </Tabs>
            <div className="resultados">
                {
                    posts &&
                    posts.map((post) =>
                        (props.autorId ? post.autor_id === props.autorId : true) &&
                        post.resuelto === resueltos &&
                        <div key={post.id}>
                            <br />
                            <TarjetaPost post={post} />
                            <br />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
