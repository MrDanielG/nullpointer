import { Store } from 'antd/lib/form/interface';
import React from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { Button, message, Tooltip } from 'antd';
import CrearPublicacion from './CrearPublicacion';
import { EditOutlined } from '@ant-design/icons';
interface Props extends React.HTMLProps<HTMLElement> {
    post: Post;
}
const EditarPost: React.FC<Props> = ({ post, ...props }) => {
    const [visible, setVisible] = React.useState(false);
    const { postM } = useFirebase();

    const onCreate = async (values: Store) => {
        console.log(values);
        const postData: Partial<Post> = {
            fechaModificacion: new Date(),
            titulo: values.titulo,
            tags: values.tags,
        };
        try {
            await postM.update(post.id, postData);
            message.success('Post actualizado');
        } catch (error) {
            console.error(error, ' Error al actualizar el post');
            message.error('Error al actualizar el post');
        }
        setVisible(false);
    };
    if (props.disabled) {
        return (
            <Tooltip title="Publicación cerrada, no se puede editar">
                <Button
                    disabled
                    type="link"
                    icon={<EditOutlined style={{ fontSize: '20px' }} />}
                />
            </Tooltip>
        );
    }

    return (
        <>
            <Tooltip title="Editar título y etiquetas del post">
                <Button
                    onClick={() => {
                        setVisible(true);
                    }}
                    type="link"
                    icon={<EditOutlined style={{ fontSize: '20px' }} />}
                />
            </Tooltip>

            <CrearPublicacion
                edit
                post={post}
                visible={visible}
                title="Editar Post"
                okText="Guardar"
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </>
    );
};
export default EditarPost;
