import React, { useState, useEffect } from 'react'
import './MostrarPost.css';
import { useFirebase } from '../contexts/FirebaseContext';
import { useAuth } from '../contexts/AuthContext';
import { RouteComponentProps } from 'react-router-dom';
import { PostItem } from './PostItem';
import { Steps, Typography } from 'antd';
import { EditorRespuesta } from './EditorRespuesta';

interface RouteInfo {
    id: string;
}
interface Props extends RouteComponentProps<RouteInfo> {

}
export const MostrarPost = (props: Props) => {
    const { currentUser } = useAuth()!;
    const firebaseCtx = useFirebase();

    const [respuestas, setRespuestas] = useState<Post[]>();
    useEffect(() => {
        const setData = (data: Post[]) => {
            setRespuestas(data);
        };
        return firebaseCtx.postM.subscribeToPostReplies(props.match.params.id, setData);
    }, [firebaseCtx.postM]);
    let post = firebaseCtx.posts.find(val => val.id === props.match.params.id)!;
    return (
        <div className="mostrar-post">
            <PostItem post={post} />
            <Steps direction="vertical">
                {
                    respuestas &&
                    respuestas.map((respuesta, i) =>
                        <Steps.Step
                            key={i}
                            status="finish"
                            description={<PostItem post={respuesta} />}
                        />
                    )
                }
            </Steps>
            <br/>
            <br/>
            <Typography.Title level={5}>Responde a esta pregunta</Typography.Title>
            <EditorRespuesta idPost={props.match.params.id} idUser={currentUser?.uid!} />
        </div>
    )
}
