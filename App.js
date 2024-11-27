// import React, { useEffect, unsubscribe } from 'react';
// import AppNavigator from './src/navigation/AppNavigator';
// // import auth from '@react-native-firebase/auth';
// // import firestore from '@react-native-firebase/firestore';

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import firebase from '@react-native-firebase/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDj4c4GHg7h4sFtXI5Q5T_SdWqZOutLSlc",
    authDomain: "moneybook-a23ea.firebaseapp.com",
    projectId: "moneybook-a23ea",
    storageBucket: "moneybook-a23ea.appspot.com",
    messagingSenderId: "367316691513",
    appId: "1:367316691513:android:0a50558a38a0b7a9803be8"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default function App() {
    return <AppNavigator />;
}

