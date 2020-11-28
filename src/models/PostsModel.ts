import FirebaseModel from './FirebaseModel';
import { db, convertDate } from '../firebase';

class PostsModel  extends FirebaseModel<Post> {
    constructor(){
        super('/posts');
    }
    addComment(idPost: string, comment: Post): Post {
        const comments = db.collection('/posts/' + idPost + '/comentarios');
        return this.addToCollection(comments, comment);
    }
    addReply(idPost: string, reply: Post): Post {
        const replies = db.collection('/posts/' + idPost + '/respuestas');
        return this.addToCollection(replies, reply);
    }
    addReplyComment(idPost: string, idReply: string, comment: Post): Post {
        const comments = db.collection('/posts/' + idPost + '/repuestas' + idReply + '/comentarios');
        return this.addToCollection(comments, comment);
    }
    async getPosts() {
        return await this.collection.get().then(data => {
            return data.docs.map(v =>
                convertDate(v.data()) as Post
            )
        });
        
    }

}

export default PostsModel;