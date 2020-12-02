import React, { useState, useRef, useEffect } from 'react'
import './ListaPublicaciones.css';
import { TarjetaPost } from './TarjetaPost';
import { useFirebase } from '../contexts/FirebaseContext';
import { Input, Tabs, Typography } from 'antd';
import { CheckCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { AyudaBusqueda } from './AyudaBusqueda';

interface Props {
    autorId?: string;
}


export const ListaPublicaciones = (props: Props) => {
    const { posts, fuseIdx } = useFirebase();
    const [postResults, setPostResults] = useState<Post[]>(posts);
    const [resueltos, setResueltos] = useState(false);
    const headerTitle = useRef<HTMLSpanElement>(null);

    const onTabChange = (key: string) => {
        if (key === "1") {
            setResueltos(false);
        } else {
            setResueltos(true);
        }
    }
    const onSearch = (querystr: string) => {

        if (headerTitle.current !== null) {
            headerTitle.current.innerText = querystr ?
                "Resultados de búsqueda" :
                (props.autorId ? "Mis posts" : "Posts recientes");
        }
        setPostResults(
            querystr ? 
            fuseIdx.search(querystr).map(res => res.item)
                : posts
        );
        

    }
    useEffect(()=>{
        setPostResults(posts);
        return () => { setPostResults([])};
    }, [posts])
    return (
        <div>
            <div className="lista-header">
                <Typography.Title level={3} >
                    <span ref={headerTitle} >
                        {
                            props.autorId ? "Mis posts" : "Posts recientes"
                        }
                    </span>
                </Typography.Title>

                <Input.Search
                    placeholder="Buscar en Nullpointer"
                    allowClear
                    onSearch={onSearch}
                    className="lista-search"
                    suffix={<AyudaBusqueda />}
                />

            </div>
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
                    postResults &&
                    postResults.map((post) =>
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
