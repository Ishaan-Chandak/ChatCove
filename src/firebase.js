import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEPKSGNigV7y3DOXqGokkVzbtPHvtCqDM",
  authDomain: "whatsapp-clone-e6f6f.firebaseapp.com",
  projectId: "whatsapp-clone-e6f6f",
  storageBucket: "whatsapp-clone-e6f6f.appspot.com",
  messagingSenderId: "653158952223",
  appId: "1:653158952223:web:b75ebf2b9b1d7a0902d42a",
  measurementId: "G-J0NDYXEV1L"
};

const firebaseApp = firebase.initializeApp(
  firebaseConfig);

  const  db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;