import React, { useEffect, useState } from 'react'
import { TarjetaPost } from './TarjetaPost';
import { useFirebase } from '../contexts/FirebaseContext';

interface Props {

}

export const ListaPublicaciones = (props: Props) => {
    const firebaseCtx = useFirebase();
    const [posts, setPosts] = useState(firebaseCtx.infoPublicacionM.data);


    useEffect(() => {
        const setData = (data: InfoPublicacion[]) => {
            console.log(data);
            setPosts(data);
        };
        return firebaseCtx.infoPublicacionM.subscribe(setData);
    }, [firebaseCtx.infoPublicacionM]);

    return (
        <div>
            {
                posts.map((post, index) =>
                    <>
                        <br />
                        <TarjetaPost
                            key={index}
                            titulo={post.titulo}
                            contenido={post.contenido}
                            resuelto={false}
                            fecha={post.fechaCreacion.toLocaleString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                            tags={['React', 'Context']}
                        />
                        <br />
                    </>
                )
            }

        </div>
    )
}
