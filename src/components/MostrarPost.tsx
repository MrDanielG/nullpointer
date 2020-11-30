import React, { useState, useEffect } from 'react'
import './MostrarPost.css';
import { useFirebase } from '../contexts/FirebaseContext';
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { PostItem } from './PostItem';
import { Steps, Typography } from 'antd';
import { MessageTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { EditorRespuesta } from './EditorRespuesta';

interface RouteInfo {
    id: string;
}
interface Props {

}
export const MostrarPost = (props: Props) => {
    const { currentUser } = useAuth()!;
    const firebaseCtx = useFirebase();
    const params = useParams<RouteInfo>();
    const [respuestas, setRespuestas] = useState<Post[]>();
    useEffect(() => {
        const setData = (data: Post[]) => {
            setRespuestas(data);
        };
        return firebaseCtx.postM.subscribeToPostReplies(params.id, setData);
    }, [firebaseCtx.postM, params.id]);

    const post = firebaseCtx.posts.find(val => val.id === params.id)!;
    return (
        <div className="mostrar-post">
            {post &&
                <PostItem post={post} isReply={false} />
            }
            <Steps direction="vertical">
                {
                    post &&
                    respuestas &&
                    respuestas.map((respuesta) =>
                        <Steps.Step
                            icon={
                            (post.respuesta_aceptada_id === respuesta.id) ?
                            <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '32px'}} />:
                             <MessageTwoTone style={{fontSize: '32px'}} />
                            }
                            key={respuesta.id}
                            status="finish"
                            description={<PostItem post={respuesta} isReply={true} />}
                        />
                    )
                }
            </Steps>
            <br />
            <br />
            <Typography.Title level={5}>Responde a esta pregunta</Typography.Title>
            <EditorRespuesta idPost={params.id} idUser={currentUser?.uid!} />
        </div>
    )
}
