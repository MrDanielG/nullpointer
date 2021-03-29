import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import firebase, { auth, microsoftProvider } from '../firebase';
import { FirebaseContext } from './FirebaseContext';

export interface authData {
    currentUser: firebase.User | null;
    OAuthCredential: firebase.auth.OAuthCredential | null;
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
    msLogIn(): Promise<firebase.auth.UserCredential> | undefined;
    getUserInfo(): Promise<Response> | null;
    getUserPhoto(): Promise<string>;
    logOut(): Promise<void>;
    updateEmail(email: string): Promise<void> | undefined;
}

export const AuthContext = React.createContext<authData | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any): JSX.Element => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [
        OAuthCredential,
        setOAuthCredential,
    ] = useState<firebase.auth.OAuthCredential | null>(null);
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
    const msLogIn = () => {
        const userCred = auth.signInWithPopup(microsoftProvider);

        userCred
            .then((result) => {                                
                setOAuthCredential(result.credential);
                localStorage.setItem('OAuthCredential', JSON.stringify(result.credential));
            })
            .catch((error) => {
                console.error(error);
            });
        return userCred;
    };
    const getUserInfo = () => {
        if (OAuthCredential) {
            /*             console.log(JSON.stringify(OAuthCredential.toJSON()));
            const oid = currentUser?.providerData[0]?.uid; */
            return fetch('https://graph.microsoft.com/beta/me', {
                headers: {
                    Authorization: 'Bearer ' + OAuthCredential.accessToken,
                    'Content-Type': 'application/json',
                },
            });
        }
        return null;
    };
    const getUserPhoto = async () => {
        
        if (OAuthCredential) {
            return fetch('https://graph.microsoft.com/beta/me/photo/$value',
            {
                headers: {
                    Authorization: 'Bearer ' + OAuthCredential.accessToken,
                    'Content-Type': 'image/jpg',
                },
            }).then( res => {
                console.log(res); 
                return res.blob()
            })
            .then(image => {
                console.log(image);
                return URL.createObjectURL(image);
            });
        }
        return '';
    };
    const logOut = () => {
        localStorage.removeItem('OAuthCredential');
        return auth.signOut();
    };

    const updateEmail = (email: string) => {
        return currentUser?.updateEmail(email);
    };

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged((user) => {            
            setCurrentUser(user);
            if(user && !OAuthCredential){
                setOAuthCredential(JSON.parse(localStorage.getItem('OAuthCredential') || ''));
            }
            setLoading(false);
        });
        return unsuscribe;
    }, [OAuthCredential]);

    const value: authData = {
        currentUser: currentUser,
        OAuthCredential: OAuthCredential,
        signUp: signUp,
        logIn: logIn,
        msLogIn: msLogIn,
        getUserInfo: getUserInfo,
        getUserPhoto: getUserPhoto,
        logOut: logOut,
        updateEmail: updateEmail,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
