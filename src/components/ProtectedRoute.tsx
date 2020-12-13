import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


interface Props extends RouteProps {

    redirectTo: string;
}

export const ProtectedRoute: React.FC<Props> = ({ children, redirectTo, ...rest }) => {
    const { currentUser } = useAuth()!;
    return (
        currentUser ?
        <Route {...rest}> {children} </Route> :
        <Redirect to={redirectTo} />
    );
}
