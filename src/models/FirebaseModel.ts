import firebase, { db, convertDate } from '../firebase';

class FirebaseModel<T extends DocData> {
    protected collection: firebase.firestore.CollectionReference;
    
    constructor(collection: string) {
        this.collection = db.collection(collection);

    }
    /* protected addToCollection(collection: firebase.firestore.CollectionReference, data: T): T {

        const doc = collection.doc();
        doc.set(data).then();
        return { ...data, id: doc.id };
    } */
    protected async addToCollection(collection: firebase.firestore.CollectionReference, data: T) {
        return await collection.add(data).then(docRef =>
            docRef.get().then(docData => {
                return convertDate({ ...docData.data(), id: docData.id }) as T;
            }));
    }
    getCollection() {
        return this.collection;
    }
    subscribe(setData: (data: T[]) => void, collection?: firebase.firestore.CollectionReference): () => void {
        collection = collection ? collection : this.collection;
        return collection.onSnapshot(snapshot => {
            setData(
                snapshot.docs.map(doc => {
                    return convertDate({ ...doc.data(), id: doc.id })
                }) as T[]
            );
        });
    }
    create(data: T) {
        return this.addToCollection(this.collection, data);
    }
    async read(id: string) {
        return await this.collection.doc(id).get().then(docData =>{
            return convertDate({...docData, id: docData.id}) as T
        });
    }
    update(id: string, data: Partial<T>) {
        this.collection.doc(id).update(data);
    }
    remove(id: string) {
        this.collection.doc(id).delete();
    }
    createCustomDoc(data: T, id: string | any): T {
        const doc = this.collection.doc(id);
        doc.set(data);
        return { ...data, id: doc.id };
    }
}

export default FirebaseModel;
