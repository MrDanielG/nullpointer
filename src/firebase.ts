import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBlW3vO9e2knuaaB-Qb07ux4aDPOyeJw2E',
    authDomain: 'nullpointer-dc5e2.firebaseapp.com',
    databaseURL: 'https://nullpointer-dc5e2.firebaseio.com',
    projectId: 'nullpointer-dc5e2',
    storageBucket: 'nullpointer-dc5e2.appspot.com',
    messagingSenderId: '204712167391',
    appId: '1:204712167391:web:0fb3bd4e4de0b0a527e66a',
};

export function convertDate(firebaseObject: any) {
    if (!firebaseObject) return null;

    for (const [key, value] of Object.entries<any>(firebaseObject)) {

        // covert items inside array
        if (value && Array.isArray(value))
            firebaseObject[key] = value.map(item => convertDate(item));

        // convert inner objects
        if (value && typeof value === 'object') {
            firebaseObject[key] = convertDate(value);
        }

        // convert simple properties
        if (value && value.hasOwnProperty('seconds'))
            firebaseObject[key] = (value as firebase.firestore.Timestamp).toDate();
    }
    return firebaseObject;
}

// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
export const auth = fb.auth();
export const db = fb.firestore();
export default firebase;
