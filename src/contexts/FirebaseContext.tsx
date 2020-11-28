import React, { useContext } from 'react';
import FirebaseModel from '../models/FirebaseModel';
import PostsModel from '../models/PostsModel';
interface ContextData {
    usuarioM: FirebaseModel<Usuario>;
    infoPublicacionM: FirebaseModel<InfoPublicacion>;
    preguntaM: FirebaseModel<Pregunta>;
    postM: PostsModel;
}

const defaultContextData = {
    usuarioM: new FirebaseModel<Usuario>('/usuarios'),
    infoPublicacionM: new FirebaseModel<InfoPublicacion>('/infopubs'),
    preguntaM: new FirebaseModel<Pregunta>('/preguntas'),
    postM: new PostsModel()
};

export const FirebaseContext = React.createContext<ContextData>(defaultContextData);

export const useFirebase = () => {
    return useContext(FirebaseContext);
}

export const FirebaseProvider: React.FC = (props) => {
    
    return(
        <FirebaseContext.Provider value={defaultContextData}>
            {props.children}
        </FirebaseContext.Provider>
    );
}

export default FirebaseProvider;