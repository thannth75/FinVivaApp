import { initializeApp } from "firebase/app";
import {
    getAuth,
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from 
"@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyCiVO5c5MQAUTWGGZBNDOJOrIe_ijiFwGI",
    authDomain: "finviva-84932.firebaseapp.com",
    projectId: "finviva-84932",
    storageBucket: "finviva-84932.firebasestorage.app",
    messagingSenderId: "857356327086",
    appId: "1:857356327086:web:a04f9746ffe1388457353f",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };