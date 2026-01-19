'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth } from '../provider';
import { doc, getDoc, Firestore } from 'firebase/firestore';
import { useFirestore } from '../provider';

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

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                try {
                    const userDocRef = doc(firestore as Firestore, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUserProfile(userDoc.data());
                    } else {
                        console.warn("Le document de l'utilisateur n'existe pas pour l'UID:", user.uid);
                        setUserProfile(null);
                    }
                } catch (error) {
                    console.error("Échec de la récupération du document utilisateur:", error);
                    setUserProfile(null);
                }
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth, firestore]);

    return { user, userProfile, loading };
}
