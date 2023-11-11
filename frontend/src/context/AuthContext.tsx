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
import { collection, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext<AuthContextType>({
    registerUser: () => {},
    signInUser: () => {},
    signOutUser: () => {},
    user: null,
    isLoading: true,
});

const AuthContextProvider: React.FC<WrapperElement> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const usersCollectionRef = collection(db, Collections.ClinicMembers);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setIsLoading(false);
            if (currentUser) {
                console.log(currentUser);
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const checkUserRole = () => {};

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
