'use client';

import React, { createContext, useContext } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';

interface FirebaseContextType {
    app: FirebaseApp | null;
    auth: Auth | null;
    firestore: Firestore | null;
    storage: FirebaseStorage | null;
}

const FirebaseContext = createContext<FirebaseContextType>({
    app: null,
    auth: null,
    firestore: null,
    storage: null,
});

export const FirebaseProvider: React.FC<{
    children: React.ReactNode;
    value: { app: FirebaseApp; auth: Auth; firestore: Firestore; storage: FirebaseStorage };
}> = ({ children, value }) => {
    return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};

export const useFirebaseApp = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebaseApp must be used within a FirebaseProvider');
    }
    return context.app;
};

export const useAuth = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a FirebaseProvider');
    }
    return context.auth;
};

export const useFirestore = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirestore must be used within a FirebaseProvider');
    }
    return context.firestore;
};

export const useStorage = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useStorage must be used within a FirebaseProvider');
    }
    return context.storage;
};
