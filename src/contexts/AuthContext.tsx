import React, { useContext, useEffect, useState } from 'react';
import firebase, { auth } from '../firebase';

export interface authData {
    currentUser: firebase.User | null;
    signUp(
        email: string,
        password: string
    ): Promise<firebase.auth.UserCredential>;
}

export const AuthContext = React.createContext<authData | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

    const signUp = (email: string, password: string) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged((user) =>
            setCurrentUser(user)
        );
        return unsuscribe;
    }, []);

    const value: authData = {
        currentUser: currentUser,
        signUp: signUp,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
