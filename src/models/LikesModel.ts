import FirebaseModel from './FirebaseModel';
import firebase, { db } from '../firebase';

class LikesModel extends FirebaseModel<Like> {
    constructor() {
        super('/likes');
    }

    async createLike(userId: string, postId: string): Promise<void> {
        const doc = this.collection.doc(`${postId}_${userId}`);
        const infoLike: Like = {
            idUser: userId,
            idPost: postId,
        };
        try {
            await doc.set(infoLike);
            return this.addPostLike(postId);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteLike(userId: string, postId: string): Promise<void> {
        const doc = this.collection.doc(`${postId}_${userId}`);
        try {
            await doc.delete();
            return this.removePostLike(postId);
        } catch (error) {
            console.log(error);
        }
    }

    addPostLike(postId: string) {
        return db
            .collection('post')
            .doc(postId)
            .update({ numVotos: firebase.firestore.FieldValue.increment(1) });
    }

    removePostLike(postId: string) {
        return db
            .collection('post')
            .doc(postId)
            .update({ numVotos: firebase.firestore.FieldValue.increment(-1) });
    }
}

export default LikesModel;
