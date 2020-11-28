import React, { useContext, useEffect, useState } from 'react';
import FirebaseModel from '../models/FirebaseModel';
import PostsModel from '../models/PostsModel';
interface ContextData {
    usuarioM: FirebaseModel<Usuario>;
    infoPublicacionM: FirebaseModel<InfoPublicacion>;
    preguntaM: FirebaseModel<Pregunta>;
    postM: PostsModel;
    posts: Post[]
}

const defaultContextData = {
    usuarioM: new FirebaseModel<Usuario>('/usuarios'),
    infoPublicacionM: new FirebaseModel<InfoPublicacion>('/infopubs'),
    preguntaM: new FirebaseModel<Pregunta>('/preguntas'),
    postM: new PostsModel(),
    posts: []
};

export const FirebaseContext = React.createContext<ContextData>(defaultContextData);

export const useFirebase = () => {
    return useContext(FirebaseContext);
}

export const FirebaseProvider: React.FC = (props) => {
    const [posts, setPosts] = useState<Post[]>([]);
     useEffect(() => {
        const setData = (data: Post[]) => {
            setPosts(data);
        };
        return defaultContextData.postM.subscribe(setData);
    }, []);
    return(
        <FirebaseContext.Provider value={{...defaultContextData, posts: posts}}>
            {props.children}
        </FirebaseContext.Provider>
    );
}

export default FirebaseProvider;