import React, { useContext, useEffect, useState } from 'react';
import firebase, { auth } from '../firebase';
import { FirebaseContext } from './FirebaseContext';

interface authUserData extends firebase.User, Usuario{

}

export interface authData {
    currentUser: authUserData | null;
    signUp(
        email: string,
        password: string,
        username: string,
        semester: number
    ): Promise<Usuario>;
    logIn(
        email: string,
        password: string
    ): Promise<firebase.auth.UserCredential>;
    logOut(): Promise<void>;
    updateEmail(email: string): Promise<void> | undefined;
}

export const AuthContext = React.createContext<authData | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any): JSX.Element => {
    const [currentUser, setCurrentUser] = useState<authUserData | null>(null);
    const [loading, setLoading] = useState(true);
    const { usuarioM } = useContext(FirebaseContext);

    const signUp = async (
        email: string,
        password: string,
        username: string,
        semester: number
    ): Promise<Usuario> => {
        const firebaseUserCredential = await auth.createUserWithEmailAndPassword(
            email,
            password
        );
        const uid = firebaseUserCredential.user?.uid;

        const user: Usuario = {
            nombre: username,
            correo: email,
            isAdmin: false,
            semestre: semester,
        };
        return new Promise((res, rej) => {
            res(usuarioM.createCustomDoc(user, uid));
        });
    };

    const logIn = (email: string, password: string) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const logOut = () => {
        return auth.signOut();
    };

    const updateEmail = (email: string) => {
        return currentUser?.updateEmail(email);
    };

    useEffect(() => {
        const getData = async (user: firebase.User | null) => {
            if(user && usuarioM){
                try {
                    const userData = await usuarioM.read(user.uid);
                    setCurrentUser({...user, ...userData});
                    
                } catch (error) {
                    console.error("Error al obtener los datos de usuario");
                }
            }
        };
        const unsuscribe = auth.onAuthStateChanged((user) => {
            getData(user);
            setLoading(false);
        });
        return unsuscribe;
    }, [usuarioM]);

    const value: authData = {
        currentUser: currentUser,
        signUp: signUp,
        logIn: logIn,
        logOut: logOut,
        updateEmail: updateEmail,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
