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
});

const AuthContextProvider: React.FC<WrapperElement> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
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

    const registerUser = (username: string, password: string) => {
        return createUserWithEmailAndPassword(auth, username, password);
    };

    const signInUser = (username: string, password: string) => {
        return signInWithEmailAndPassword(auth, username, password);
    };

    const signOutUser = () => {
        return signOut(auth);
    };

    const authContextValue: AuthContextType = {
        registerUser,
        signInUser,
        signOutUser,
        user,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuthContext = () => {
    return useContext(AuthContext);
};
