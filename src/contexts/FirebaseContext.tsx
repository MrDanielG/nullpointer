import React, { useContext, useEffect, useState } from 'react';
import FirebaseModel from '../models/FirebaseModel';
import LikesModel from '../models/LikesModel';
import PostsModel from '../models/PostsModel';
import Fuse from 'fuse.js';

interface ContextData {
    usuarioM: FirebaseModel<Usuario>;
    likesM: LikesModel;
    postM: PostsModel;
    posts: Post[],
    fuseIdx: Fuse<Post>
}


const fuseOps = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    findAllMatches: true,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    useExtendedSearch: true,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: [
        "titulo",
        "contenido",
        "tags"
    ]
}

const defaultContextData = {
    usuarioM: new FirebaseModel<Usuario>('/usuarios'),
    likesM: new LikesModel(),
    postM: new PostsModel(),
    posts: [],
    fuseIdx: new Fuse<Post>([], fuseOps)
};

export const FirebaseContext = React.createContext<ContextData>(defaultContextData);

export const useFirebase = () => {
    return useContext(FirebaseContext);
}

export const FirebaseProvider: React.FC = (props) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [fuseIdx] = useState<Fuse<Post>>(defaultContextData.fuseIdx);
    useEffect(() => {
        const setData = (data: Post[]) => {
            data.sort((r1, r2) => {
                const f1 = r1.fechaCreacion.getTime();
                const f2 = r2.fechaCreacion.getTime();
                return f1 - f2;
            });
            setPosts(data);
            fuseIdx.setCollection(data);
        };
        return defaultContextData.postM.subscribe(setData);
    }, [fuseIdx]);
    return (
        <FirebaseContext.Provider value={{ ...defaultContextData, posts: posts }}>
            {props.children}
        </FirebaseContext.Provider>
    );
}

export default FirebaseProvider;