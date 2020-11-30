import FirebaseModel from './FirebaseModel';
import firebase, { db } from '../firebase';

class LikesModel extends FirebaseModel<Like> {
    constructor() {
        super('/likes');
    }

    async createLike(userId: string, postId: string): Promise<void> {
        const docRef = this.collection.doc(`${postId}_${userId}`);
        const infoLike: Like = {
            idUser: userId,
            idPost: postId,
        };
        try {
            const doc = await docRef.get();

            if (!doc.exists) {
                await docRef.set(infoLike);
                return this.addPostLike(postId);
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteLike(userId: string, postId: string): Promise<void> {
        const docRef = this.collection.doc(`${postId}_${userId}`);
        try {
            await docRef.delete();
            return this.removePostLike(postId);
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
}

export default LikesModel;
