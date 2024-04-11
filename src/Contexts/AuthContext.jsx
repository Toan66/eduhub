import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role) {
            setUserRole(role);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userRole, setUserRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;