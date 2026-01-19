import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config';

function initializeFirebase() {
    if (getApps().length) {
        const app = getApp();
        const auth = getAuth(app);
        const firestore = getFirestore(app);
        return { app, auth, firestore };
    }

    const app = initializeApp(firebaseConfig as FirebaseOptions);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    return { app, auth, firestore };
}

export { initializeFirebase };
export { FirebaseProvider, useFirebaseApp, useAuth, useFirestore } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useUser } from './auth/use-user';
