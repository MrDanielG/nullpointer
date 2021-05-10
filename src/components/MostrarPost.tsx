import { CheckCircleTwoTone, MessageTwoTone } from '@ant-design/icons';
import { message, PageHeader, Result, Steps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFirebase } from '../contexts/FirebaseContext';
import { EditorRespuesta } from './EditorRespuesta';
import './MostrarPost.css';
import { PostItem } from './PostItem';

interface RouteInfo {
    id: string;
}
interface Props {}
export const MostrarPost = (props: Props) => {
    const { currentUser } = useAuth()!;
    const firebaseCtx = useFirebase();
    const params = useParams<RouteInfo>();
    const [post, setPost] = useState<Post>(); //v0.3
    const history = useHistory(); //Entrega 2
    const [respuestas, setRespuestas] = useState<Post[]>();
    /*     const [resp_aceptada, setRespAceptada] = useState<string>(); */
    const acceptReply = async (id: string | null) => {
        if (id) {
            try {
                await firebaseCtx.postM.update(params.id, {
                    respuesta_aceptada_id: id,
                    resuelto: true,
                });
                message.success('Respuesta aceptada');
            } catch (error) {
                message.error('No se pudo actualizar el post');
                console.error(error);
                console.error('Error al actualizar el post');
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
        const post = firebaseCtx.posts.find((val) => val.id === params.id);
        setPost(post);
        /*         setRespAceptada(post?.respuesta_aceptada_id); */
        return firebaseCtx.postM.subscribeToPostReplies(params.id, setData);
    }, [firebaseCtx, params.id]);

    //const post = firebaseCtx.posts.find((val) => val.id === params.id)!;//v0.3
    return (
        <div className="mostrar-post">
            <PageHeader title="Regresar" onBack={() => history.goBack()} />
            {post && (
                <PostItem
                    post={post}
                    isReply={false}
                    canDelete={respuestas?.length === 0 || currentUser?.isAdmin}
                />
            )}
            <Typography.Title level={4}>
                {respuestas &&
                    respuestas.length +
                        (respuestas.length === 1
                            ? ' respuesta'
                            : ' respuestas')}
            </Typography.Title>
            <Steps direction="vertical">
                {post &&
                    respuestas &&
                    respuestas.map(
                        (respuesta) => (
                            // Entrega2, los paréntesis que encierran todo
                            <Steps.Step
                                icon={
                                    post.respuesta_aceptada_id ===
                                    respuesta.id ? (
                                        <CheckCircleTwoTone
                                            twoToneColor="#52c41a"
                                            style={{ fontSize: '32px' }}
                                        />
                                    ) : (
                                        <MessageTwoTone
                                            style={{ fontSize: '32px' }}
                                        />
                                    )
                                }
                                key={respuesta.id}
                                status="finish"
                                description={
                                    <>
                                        <PostItem
                                            post={respuesta}
                                            isReply={true}
                                            parentPost={post.id}
                                            canDelete={true}
                                            canAccept={
                                                currentUser !== null &&
                                                post.autor_id ===
                                                    currentUser.uid &&
                                                post.respuesta_aceptada_id !==
                                                    respuesta.id
                                            }
                                            acceptReply={acceptReply}
                                        />
                                    </>
                                }
                            />
                        ) //Este paréntesis apareció en entrega 2
                    )}
            </Steps>
            {currentUser && post?.cerrado === false && (
                <>
                    <br />
                    <br />
                    <Typography.Title level={5}>
                        Responde a esta pregunta
                    </Typography.Title>
                    <EditorRespuesta
                        className="editor-respuesta"
                        idPost={params.id}
                        idUser={currentUser?.uid!}
                    />
                </>
            )}
            {post?.cerrado && (
                <Result
                    title="Pregunta cerrada"
                    subTitle="Esta pregunta ya no acepta nuevas respuestas porque ha sido cerrada por su autor."
                    status="info"
                />
            )}
        </div>
    );
};
