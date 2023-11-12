import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContextType, WrapperElement, Collections } from "../types";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const AuthContext = createContext<AuthContextType>({
    registerUser: () => {},
    signInUser: () => {},
    signOutUser: () => {},
    user: null,
    isLoading: true,
    isUserAdmin: false,
});

const AuthContextProvider: React.FC<WrapperElement> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);

    const usersCollectionRef = collection(db, Collections.ClinicMembers);
    const checkUserRole = async (userId: string) => {
        setIsLoading(true);
        try {
            const q = query(usersCollectionRef, where("userId", "==", userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                let isAdmin = false;
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    isAdmin = isAdmin || userData.isAdmin;
                });
                setIsUserAdmin(isAdmin);
            } else {
                console.log("No user found with the specified ID.");
            }

            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setIsLoading(false);
            if (currentUser) {
                setUser(currentUser);
                await checkUserRole(currentUser.uid);
            } else {
                setUser(null);
            }
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const registerUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUser = () => {
        return signOut(auth);
    };

    const authContextValue: AuthContextType = {
        registerUser,
        signInUser,
        signOutUser,
        user,
        isLoading,
        isUserAdmin,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuthContext = () => {
    return useContext(AuthContext);
};
