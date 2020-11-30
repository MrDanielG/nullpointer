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
                return this.addReplyLike(parentId!, postId);
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
        parentId?: string,
        currentLikes?: number
    ): Promise<void> {
        const docRef = this.collection.doc(`${postId}_${userId}`);
        try {
            if (!isReply) {
                await docRef.delete();
                return this.removePostLike(postId);
            } else {
                await docRef.delete();
                return this.removeReplyLike(parentId!, postId, currentLikes!);
            }
        } catch (error) {
            console.log(error);
        }
    }

    addPostLike(postId: string): Promise<void> {
        return db
            .collection('posts')
            .doc(postId)
            .update({ numVotos: firebase.firestore.FieldValue.increment(1) });
    }

    removePostLike(postId: string): Promise<void> {
        return db
            .collection('posts')
            .doc(postId)
            .update({ numVotos: firebase.firestore.FieldValue.increment(-1) });
    }

    addReplyLike(parentId: string, postId: string): Promise<void> {
        return db
            .collection(`/posts/${parentId}/respuestas/`)
            .doc(postId)
            .update({ numVotos: firebase.firestore.FieldValue.increment(1) });
    }

    async removeReplyLike(
        parentId: string,
        postId: string,
        currentLikes: number
    ): Promise<void> {
        const replyRef = db
            .collection(`/posts/${parentId}/respuestas/`)
            .doc(postId);

        if (currentLikes <= 0) {
            return;
        } else {
            return replyRef.update({
                numVotos: firebase.firestore.FieldValue.increment(-1),
            });
        }
    }
}

export default LikesModel;
