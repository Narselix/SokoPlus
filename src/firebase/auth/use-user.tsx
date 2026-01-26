'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth, useFirestore } from '../provider';
import { doc, onSnapshot, type Unsubscribe, type Firestore } from 'firebase/firestore';

export function useUser() {
    const auth = useAuth();
    const firestore = useFirestore();
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth || !firestore) {
            setLoading(false);
            return;
        }

        let unsubscribeSnapshot: Unsubscribe | null = null;

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setUser(user);

            if (unsubscribeSnapshot) {
                unsubscribeSnapshot();
                unsubscribeSnapshot = null;
            }

            if (user) {
                const userDocRef = doc(firestore as Firestore, 'users', user.uid);
                
                unsubscribeSnapshot = onSnapshot(userDocRef, 
                    (doc) => {
                        if (doc.exists()) {
                            setUserProfile(doc.data());
                        } else {
                            console.warn("Le document de l'utilisateur n'existe pas pour l'UID:", user.uid);
                            setUserProfile(null);
                        }
                        setLoading(false);
                    },
                    (error) => {
                        console.error("Échec de la récupération du document utilisateur:", error);
                        setUserProfile(null);
                        setLoading(false);
                    }
                );
            } else {
                setUserProfile(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeSnapshot) {
                unsubscribeSnapshot();
            }
        };
    }, [auth, firestore]);

    return { user, userProfile, loading };
}
