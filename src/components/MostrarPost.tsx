import React, { useState, useEffect } from 'react'
import './MostrarPost.css';
import { useFirebase } from '../contexts/FirebaseContext';
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { PostItem } from './PostItem';
import { Steps, Typography, message } from 'antd';
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
    const [post, setPost] = useState<Post>();
    const [respuestas, setRespuestas] = useState<Post[]>();
/*     const [resp_aceptada, setRespAceptada] = useState<string>(); */
    const acceptReply = async (id: string | null) => {
        if (id) {
            try {
                await firebaseCtx.postM.update(params.id, {
                    respuesta_aceptada_id: id,
                    resuelto: true
                });
                message.success("Respuesta acceptada");
            } catch (error) {
                message.error("No se pudo actualizar el post");
                console.error(error);
                console.error("Error al actualizar el post");
            }
        }
    };

    useEffect(() => {
        const setData = (data: Post[]) => {
            data.sort((r1, r2) => {
                const f1 = r1.fechaCreacion.getTime();
                const f2 = r2.fechaCreacion.getTime();
                return f1 - f2;
            });
            setRespuestas(data);
        };
        const post = firebaseCtx.posts.find(val => val.id === params.id);
        setPost(post);
/*         setRespAceptada(post?.respuesta_aceptada_id); */
        return firebaseCtx.postM.subscribeToPostReplies(params.id, setData);
    }, [firebaseCtx, params.id]);

    return (
        <div className="mostrar-post">
            {post &&
                <PostItem post={post} isReply={false} />
            }
            <Steps direction="vertical">
                {
                    post &&
                    respuestas &&
                    currentUser &&
                    respuestas.map((respuesta) =>
                        <Steps.Step
                            icon={
                                (post.respuesta_aceptada_id === respuesta.id) ?
                                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '32px' }} /> :
                                    <MessageTwoTone style={{ fontSize: '32px' }} />
                            }
                            key={respuesta.id}
                            status="finish"
                            description={<PostItem
                                post={respuesta}
                                isReply={true}
                                parentPost={post.id}
                                canAccept={                                   
                                    post.autor_id === currentUser.uid
                                    &&  post.respuesta_aceptada_id !== respuesta.id
                                 }
                                acceptReply={acceptReply}
                            />}
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
