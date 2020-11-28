import firebase, { db } from '../firebase';

class FirebaseModel<T extends DocData> {
    private collection: firebase.firestore.CollectionReference;
    public data: T[];
    
    constructor(collection: string) {
        this.collection = db.collection(collection);
        this.data = [];
/*         const obs = this.collection.onSnapshot(snapshot =>{        
            this.data = snapshot.docs.map(doc => {return {...doc.data(), id: doc.id}}) as T[];
            console.log(this.data);
            console.log(this.data.length);
        } ); */
        
    }
    getCollection() {
        return this.collection;
    }
    subscribe(setData: (data: T[])=> void): () => void {
        return this.collection.onSnapshot(snapshot =>{        
            this.data = snapshot.docs.map(doc => {
                return this.convertDate( {...doc.data(), id: doc.id})
            }) as T[];           
            setData(this.data);
        });
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

    convertDate(firebaseObject: any) {
        if (!firebaseObject) return null;
    
        for (const [key, value] of Object.entries<any>(firebaseObject)) {
    
          // covert items inside array
          if (value && Array.isArray(value) )
            firebaseObject[key] = value.map(item => this.convertDate(item));
    
          // convert inner objects
          if (value && typeof value === 'object' ){
            firebaseObject[key] = this.convertDate(value);
          }
    
          // convert simple properties
          if (value && value.hasOwnProperty('seconds'))
            firebaseObject[key] = (value as firebase.firestore.Timestamp).toDate();
        }
        return firebaseObject;
      }

}

export default FirebaseModel;