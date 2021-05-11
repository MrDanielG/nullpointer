import {
    CheckOutlined,
    DislikeFilled,
    DislikeOutlined,
    EllipsisOutlined,
    LikeFilled,
    LikeOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Dropdown,
    Menu,
    message,
    Modal,
    Row,
    Tag,
    Timeline,
    Tooltip,
    Typography,
} from 'antd';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authData, useAuth } from '../contexts/AuthContext';
import { useFirebase } from '../contexts/FirebaseContext';
import { db, convertDate } from '../firebase';
import CommentItem from './CommentItem';
import EditarPost from './EditarPost';
import EditorRespuesta from './EditorRespuesta';
import { MarkdownEditor } from './MarkdownEditor';
import './PostItem.css';

const { confirm } = Modal;

interface Props {
    post: Post;
    isReply?: boolean;
    canAccept?: boolean;
    acceptReply?: (id: string) => void;
    parentPost?: string;
    canDelete?: boolean;
}

export const PostItem = (props: Props) => {
    const { usuarioM, likesM, postM } = useFirebase();
    const { currentUser } = useAuth() as authData;
    const [usuario, setUsuario] = useState<Usuario>();
    const [action, setAction] = useState('');
    const [showReply, setShowReply] = useState<boolean>(false);
    const [comments, setComments] = useState<Post[]>();
    const history = useHistory();
    const postType = props.isReply ? 'respuesta' : 'pregunta';

    const deletePost = async (post: Post) => {
        try {
            const path = props.isReply
                ? props.parentPost + '/respuestas/' + props.post.id
                : props.post.id;
            await postM.remove(path);
            if (!props.isReply) {
                history.replace('/app/misposts');
            }

            message.info(`${postType.toUpperCase()} eliminada`);
        } catch (error) {
            message.error(`Error al eliminar la ${postType}`);
        }
    };
    const confirmDelete = () => {
        confirm({
            title: `¿Estás seguro que deseas eliminar la ${postType}?`,
            content: (
                <h4 style={{ paddingLeft: 50 }}>
                    Esta operación no se puede revertir.
                </h4>
            ),
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            width: 500,
            onOk() {
                deletePost(props.post);
            },
        });
    };
    const closePost = async (post: Post, closed: boolean = true) => {
        try {
            await postM.update(post.id, { cerrado: closed });
        } catch (error) {
            message.error(`No se pudo cerrar tu ${postType}`);
        }
    };

    const handleOnClickExtra: MenuClickEventHandler = ({
        key,
        keyPath,
        item,
        domEvent,
    }) => {
        switch (key) {
            case 'close':
                closePost(props.post);
                break;
            case 'delete':
                confirmDelete();
                break;
            case 'open':
                closePost(props.post, false);
                break;
            default:
                break;
        }
    };
    const menu = (
        <Menu onClick={handleOnClickExtra}>
            {!props.isReply &&
                (props.post.cerrado ? (
                    <Menu.Item key="open">Abrir</Menu.Item>
                ) : (
                    <Menu.Item key="close">Cerrar</Menu.Item>
                ))}
            {props.canDelete && (
                <Menu.Item danger key="delete">
                    Eliminar
                </Menu.Item>
            )}
        </Menu>
    );

    const like = async () => {
        setAction('liked');
        try {
            await likesM.createLike(
                currentUser?.uid!,
                props.post.id!,
                props.isReply,
                props.parentPost
            );
        } catch (error) {
            console.log(error);
        }
    };

    const dislike = async () => {
        setAction('disliked');
        try {
            await likesM.deleteLike(
                currentUser?.uid!,
                props.post.id!,
                props.isReply,
                props.parentPost,
                props.post.numVotos
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const setData = (data: Post[]) => {
            data.sort((r1, r2) => {
                const f1 = r1.fechaCreacion.getTime();
                const f2 = r2.fechaCreacion.getTime();
                return f1 - f2;
            });
            setComments(data);
        };
        const path =  props.isReply 
                ? `/posts/${props.parentPost}/respuestas/${props.post.id}/comentarios`
                : `/posts/${props.post.id}/comentarios`;                
        const unsubscribe = db
            .collection(
                path
            )
            .onSnapshot((snapshot) => {
                const docs = snapshot.docs.map((doc) => {
                    return convertDate({ ...doc.data(), id: doc.id });
                }) as Post[];
                setData(docs);
            });

        let isSubscribed = true;
        usuarioM.read(props.post.autor_id).then((user) => {
            if (isSubscribed) setUsuario(user);
        });
        // setComments(props.post.comentarios);
        return () => {
            isSubscribed = false;
            unsubscribe();
            if (props.parentPost)
                postM.subscribeToReplieComments(
                    props.parentPost,
                    props.post.id,
                    setData
                );
        };
    }, [usuarioM, props.post.autor_id, postM, props.parentPost, props.post.id, props.isReply]);

    const accept = () => {
        if (props.acceptReply && props.post.id) {
            props.acceptReply(props.post.id);
        }
    };
    const saveContent = async (value: string) => {
        try {
            const path = props.isReply
                ? props.parentPost + '/respuestas/' + props.post.id
                : props.post.id;
            await postM.update(path, {
                contenido: value,
                fechaModificacion: new Date(),
            });
            message.success('Se actualizó tu respuesta');
        } catch (error) {
            console.error(error);
            message.error('No se pudo actualizar tu respuesta');
        }
    };

    return (
        <>
            <Card
                bordered={false}
                size="small"
                className="post-item"
                extra={
                    (currentUser?.id === usuario?.id ||
                        currentUser?.isAdmin) && (
                        <Dropdown overlay={menu} trigger={['click']}>
                            <EllipsisOutlined
                                onClick={(e) => e.preventDefault()}
                                style={{ fontSize: 24 }}
                            />
                        </Dropdown>
                    )
                }
                title={
                    props.post.titulo && (
                        <Typography.Title level={4}>
                            {props.post.titulo}
                            {currentUser?.id === usuario?.id && (
                                <EditarPost post={props.post} />
                            )}
                        </Typography.Title>
                    )
                }
            >
                <Row gutter={16}>
                    <Col span={21}>
                        <Typography.Paragraph type="secondary">
                            {'Publicado el: ' +
                                props.post.fechaCreacion.toLocaleDateString(
                                    'es-MX',
                                    {
                                        hour12: true,
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    }
                                )}
                        </Typography.Paragraph>
                        <MarkdownEditor
                            editable={currentUser?.id === usuario?.id}
                            content={props.post.contenido}
                            onSave={saveContent}
                        />
                    </Col>
                    <Col span={3}>
                        {props.post.tags &&
                            props.post.tags.map((tag, index) => (
                                <Tag key={index} color="blue">
                                    {tag}
                                </Tag>
                            ))}
                        <br />
                        <br />
                        {currentUser && (
                            <>
                                <Tooltip key="comment-basic-like" title="Like">
                                    <span onClick={like}>
                                        {React.createElement(
                                            action === 'liked'
                                                ? LikeFilled
                                                : LikeOutlined
                                        )}
                                        <span className="comment-action">
                                            {props.post.numVotos}
                                        </span>
                                    </span>
                                </Tooltip>
                                <Tooltip
                                    key="comment-basic-dislike"
                                    title="Dislike"
                                >
                                    <span onClick={dislike}>
                                        {React.createElement(
                                            action === 'disliked'
                                                ? DislikeFilled
                                                : DislikeOutlined
                                        )}
                                        <span className="comment-action"></span>
                                    </span>
                                </Tooltip>
                            </>
                        )}

                        {props.canAccept && (
                            <Button
                                style={{
                                    backgroundColor: '#52c41a',
                                    borderColor: '#52c41a',
                                }}
                                onClick={accept}
                                type="primary"
                                icon={<CheckOutlined />}
                            >
                                Aceptar
                            </Button>
                        )}
                    </Col>
                </Row>
                <div className="post-item-footer">
                    {usuario && (
                        <Card.Meta
                            avatar={
                                <Avatar>
                                    {usuario.nombre.toUpperCase()[0]}
                                </Avatar>
                            }
                            title={usuario.nombre}
                        />
                    )}
                    <Typography.Text type="secondary">
                        {props.post.fechaCreacion.getTime() !==
                            props.post.fechaModificacion.getTime() &&
                            'Actualizado el: ' +
                                props.post.fechaModificacion.toLocaleDateString(
                                    'es-MX',
                                    {
                                        hour12: true,
                                        hour: 'numeric',
                                        minute: 'numeric',
                                    }
                                )}
                        {currentUser && (
                            <Button
                                type="link"
                                onClick={() => setShowReply(!showReply)}
                            >
                                {showReply ? 'Cancelar' : 'Comentar'}
                            </Button>
                        )}
                        {currentUser && showReply && (
                            <>
                                <br />
                                <br />
                                <Typography.Title level={5}>
                                    Añade un comentario a esta respuesta
                                </Typography.Title>
                                <EditorRespuesta
                                    className="editor-respuesta"
                                    idPost={props.post.id}
                                    idUser={currentUser?.uid!}
                                    isComment={true}
                                    isReplay={props.isReply ? true : false}
                                    parentPost={props.parentPost}
                                    onFinish={() => setShowReply(false) }
                                />
                            </>
                        )}
                    </Typography.Text>
                </div>
                <br />
                <br />

                <Timeline>
                    {comments &&
                        comments.map((comentario) => (
                            <Timeline.Item key={comentario.id}>
                                <CommentItem
                                    idPost={props.isReply ? props.parentPost! : props.post.id}
                                    idReply={props.post.id}
                                    isReply={props.isReply ? true : false}
                                    comment={comentario}
                                    editable={
                                        currentUser?.id === comentario.autor_id
                                    }
                                    canDelete={
                                        currentUser?.isAdmin ||
                                        currentUser?.id === comentario.autor_id
                                    }
                                />
                            </Timeline.Item>
                        ))}
                </Timeline>
            </Card>
        </>
    );
};
