'use client';

import React, { useState, useEffect } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { SokoPlusLogo } from '@/components/icons';

interface FirebaseInstances {
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
}

export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [firebase, setFirebase] = useState<FirebaseInstances | null>(null);

    useEffect(() => {
        const instances = initializeFirebase();
        setFirebase(instances);
    }, []);

    if (!firebase) {
        return <div className="flex h-screen w-screen items-center justify-center bg-background">
             <SokoPlusLogo className="h-12 w-12 animate-spin text-primary" />
        </div>;
    }

    return (
        <FirebaseProvider value={firebase}>
            <FirebaseErrorListener />
            {children}
        </FirebaseProvider>
    );
};
