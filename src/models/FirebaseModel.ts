import firebase, { db } from '../firebase';

class FirebaseModel<T extends DocData> {
    private collection: firebase.firestore.CollectionReference;
    public data: T[];
    constructor(collection: string) {
        this.collection = db.collection(collection);
        this.data = [];
    }
    getCollection() {
        return this.collection;
    }

    create(data: T): T  {
        const doc = this.collection.doc();
        doc.set(data);
        return {...data, id: doc.id};

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