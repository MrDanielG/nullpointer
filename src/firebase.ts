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
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
export const auth = fb.auth();
export const db = fb.firestore();
export default firebase;
