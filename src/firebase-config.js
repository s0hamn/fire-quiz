
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {

    apiKey: "AIzaSyBNuk2h1-qLiBJP_k9qfhdXhNZCOv76bO4",

    authDomain: "firequiz-1cf38.firebaseapp.com",

    projectId: "firequiz-1cf38",

    storageBucket: "firequiz-1cf38.appspot.com",

    messagingSenderId: "32302320502",

    appId: "1:32302320502:web:c380c832cd7a217c374857",

    measurementId: "G-MMZP0MR7E4"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
