import { db } from '../firebase';
import FirebaseModel from './FirebaseModel';

class PostsModel extends FirebaseModel<Post> {
    constructor() {
        super('/posts');
    }
    addComment(idPost: string, comment: Post) {
        const comments = db.collection('/posts/' + idPost + '/comentarios');
        return this.addToCollection(comments, comment);
    }
    addReply(idPost: string, reply: Post) {
        const replies = db.collection('/posts/' + idPost + '/respuestas');
        return this.addToCollection(replies, reply);
    }
    addReplyComment(idPost: string, idReply: string, comment: Post) {
        const comments = db.collection(
            '/posts/' + idPost + '/respuestas/' + idReply + '/comentarios'
        );
        return this.addToCollection(comments, comment);
    }
    subscribeToPostComments(idPost: string, setData: (data: Post[]) => void) {
        const comments = db.collection('/posts/' + idPost + '/comentarios');
        return this.subscribe(setData, comments);
    }
    subscribeToPostReplies(idPost: string, setData: (data: Post[]) => void) {
        const replies = db.collection('/posts/' + idPost + '/respuestas');
        return this.subscribe(setData, replies);
    }
    subscribeToReplieComments(
        idPost: string,
        idReply: string,
        setData: (data: Post[]) => void
    ) {
        const comments = db.collection(
            '/posts/' + idPost + '/respuestas' + idReply + '/comentarios'
        );
        return this.subscribe(setData, comments);
    }
}

export default PostsModel;
