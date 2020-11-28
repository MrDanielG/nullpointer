import React from 'react'
import { useFirebase } from '../contexts/FirebaseContext';
import { RouteComponentProps } from 'react-router-dom';
interface RouteInfo {
    id: string;
}
interface Props extends RouteComponentProps<RouteInfo> {
    
}

export const MostrarPost = (props: Props) => {
    return (
        <div>
            {props.match.params.id}
        </div>
    )
}
