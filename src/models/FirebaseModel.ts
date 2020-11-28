import firebase, { db, convertDate } from '../firebase';

class FirebaseModel<T extends DocData> {
    protected collection: firebase.firestore.CollectionReference;
    public data: T[];

    constructor(collection: string) {
        this.collection = db.collection(collection);
        this.data = [];

    }
    protected addToCollection(collection: firebase.firestore.CollectionReference, data: T): T {
        const doc = collection.doc();
        doc.set(data);
        return { ...data, id: doc.id };
    }
    getCollection() {
        return this.collection;
    }
    subscribe(setData: (data: T[]) => void): () => void {
        return this.collection.onSnapshot(snapshot => {
            this.data = snapshot.docs.map(doc => {
                return convertDate({ ...doc.data(), id: doc.id })
            }) as T[];
            setData(this.data);
        });
    }
    create(data: T): T {
        return this.addToCollection(this.collection, data);
    }
    read(id: string): T | undefined {
        return this.data.find(item => item.id === id);
    }
    update(id: string, data: Partial<T>) {
        this.collection.doc(id).update(data);
    }
    remove(id: string) {
        this.collection.doc(id).delete();
    }



}

export default FirebaseModel;

