import React, { useEffect, useState } from 'react'
import { TarjetaPost } from './TarjetaPost';
import { useFirebase } from '../contexts/FirebaseContext';
import { Tabs } from 'antd';


interface Props {
    autorId?: string;
}

export const ListaPublicaciones = (props: Props) => {
    const firebaseCtx = useFirebase();
    /* const [posts, setPosts] = useState(firebaseCtx.infoPublicacionM.data); */
    const [posts, setPosts] = useState<Post[]>();
    const [resueltos, setResueltos] = useState(false);

    /*     useEffect(() => {
            let isSubscribed = true;
            firebaseCtx.postM.getPosts().then(data =>{
                if(isSubscribed){
                    setPosts(data);
                }
            });
            return () => { isSubscribed = false};
        }, [firebaseCtx.postM]); */

    useEffect(() => {
        const setData = (data: Post[]) => {
            if(props.autorId){
                setPosts(data.filter( val => val.autor_id === props.autorId));
            } else {
                setPosts(data);
            }
            
        };
        return firebaseCtx.postM.subscribe(setData);
    }, [firebaseCtx.postM, props.autorId]);

    /*  useEffect(() => {
         const setData = (data: InfoPublicacion[]) => {
             console.log(data);
             setPosts(data);
         };
         return firebaseCtx.infoPublicacionM.subscribe(setData);
     }, [firebaseCtx.infoPublicacionM]); */
    const onTabChange = (key: string) => {
        if(key === "1"){
            setResueltos(false);
        } else {
            setResueltos(true);
        }
     }
     
    return (

        <div>
            <Tabs
                onChange={onTabChange}
                size="large"
            >
                <Tabs.TabPane tab="Abiertos" key="1" />
                <Tabs.TabPane tab="Resueltos" key="2"/>

            </Tabs>
            {
                posts &&
                posts.map((post, index) =>
                    post.resuelto === resueltos &&
                    <div key={index}>
                        <br />
                        <TarjetaPost

                            titulo={post.titulo!}
                            contenido={post.contenido}
                            resuelto={post.resuelto}
                            fecha={post.fechaCreacion.toLocaleString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                            tags={post.tags}
                        />
                        <br />
                    </div>
                )
            }

        </div>
    )
}
