import React, { createContext, userContext, useEffect, useState, Children, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ chilfren }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, setUser);
        return unsub;
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{Children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);