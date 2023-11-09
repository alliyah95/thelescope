import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContextType, WrapperElement } from "../types";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { User } from "firebase/auth";

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setIsLoading(false);
            if (currentUser) {
                setUser(currentUser);
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
