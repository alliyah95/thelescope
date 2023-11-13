import React, { createContext, useState, useContext, useEffect } from "react";
import {
    AuthContextType,
    WrapperElement,
    Collections,
    ClinicMember,
} from "../types";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";
import { storeUserInfo } from "../utils/clinic";

const initialUserInfo = {
    permissions: [],
    userId: "",
    name: "",
    email: "",
    isAdmin: false,
    clinicName: "",
    clinicContract: "",
};
const AuthContext = createContext<AuthContextType>({
    registerUser: () => {},
    signInUser: () => {},
    signOutUser: () => {},
    setCurrentClinic: () => {},
    user: null,
    isLoading: true,
    isUserAdmin: false,
    currentClinic: "",
    userInfo: initialUserInfo,
});

const AuthContextProvider: React.FC<WrapperElement> = ({ children }) => {
    const [currentClinic, setCurrentClinic] = useState<string>("");
    const [isUserAdmin, setIsUserAdmin] = useState<boolean>(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        return JSON.parse(isAdmin as string);
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    ("");
    const [user, loadingAuth, errorAuth] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState<ClinicMember>(initialUserInfo);

    const thelescopeUsersQery = collection(db, Collections.ThelescopeUsers);
    const [thsUsersDocs, loadingThsUsersDocs, errorThsUsersDocs] =
        useCollectionData(thelescopeUsersQery);

    useEffect(() => {
        setIsLoading(loadingAuth && loadingThsUsersDocs);
    }, [loadingAuth]);

    useEffect(() => {
        if (user) {
            thsUsersDocs?.forEach((thsUser) => {
                if (thsUser.userId === user.uid) {
                    const parsedInfo = thsUser as ClinicMember;
                    setUserInfo(parsedInfo);
                    storeUserInfo(parsedInfo);
                    return;
                }
            });
        }
    }, [user, thsUsersDocs]);

    const registerUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUser = () => {
        // TODO: delete user info from local storage
        return signOut(auth);
    };

    const authContextValue: AuthContextType = {
        registerUser,
        signInUser,
        signOutUser,
        setCurrentClinic,
        user,
        isLoading,
        isUserAdmin,
        currentClinic,
        userInfo,
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
