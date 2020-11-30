import FirebaseModel from './FirebaseModel';
import firebase, { db } from '../firebase';

class LikesModel extends FirebaseModel<Like> {
    constructor() {
        super('/likes');
    }

    async createLike(
        userId: string,
        postId: string,
        isReply?: boolean,
        parentId?: string
    ): Promise<void> {
        const docRef = this.collection.doc(`${postId}_${userId}`);
        const infoLike: Like = {
            idUser: userId,
            idPost: postId,
        };
        try {
            const doc = await docRef.get();

            if (!doc.exists && !isReply) {
                await docRef.set(infoLike);
                return this.addPostLike(postId);
            } else if (!doc.exists && isReply) {
                await docRef.set(infoLike);
                return this.addReplylike(parentId!, postId);
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteLike(
        userId: string,
        postId: string,
        isReply?: boolean,
        parentId?: string
    ): Promise<void> {
        const docRef = this.collection.doc(`${postId}_${userId}`);
        try {
            if (!isReply) {
                await docRef.delete();
                return this.removePostLike(postId);
            } else {
                await docRef.delete();
                return this.removeReplylike(parentId!, postId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    addPostLike(postId: string) {
        return db
            .collection('posts')
            .doc(postId)
            .update({ numVotos: firebase.firestore.FieldValue.increment(1) });
    }

    removePostLike(postId: string) {
        return db
            .collection('posts')
            .doc(postId)
            .update({ numVotos: firebase.firestore.FieldValue.increment(-1) });
    }

    addReplylike(parentId: string, postId: string) {
        return db
            .collection(`/posts/${parentId}/respuestas/`)
            .doc(postId)
            .update({ numVotos: firebase.firestore.FieldValue.increment(1) });
    }

    async removeReplylike(parentId: string, postId: string) {
        const replyRef = db
            .collection(`/posts/${parentId}/respuestas/`)
            .doc(postId);

        const doc = await replyRef.get();
        const post = doc.data() as Post;
        if (post.numVotos <= 0) {
            return;
        } else {
            return replyRef.update({
                numVotos: firebase.firestore.FieldValue.increment(-1),
            });
        }
    }
}

export default LikesModel;
