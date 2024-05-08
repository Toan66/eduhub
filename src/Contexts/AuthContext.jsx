import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userRole, setUserRole] = useState(null);
	const [isAuthenticating, setIsAuthenticating] = useState(true);

	useEffect(() => {
		const role = localStorage.getItem("role");
		if (role) {
			setUserRole(role);
			setIsAuthenticating(false);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ userRole, isAuthenticating }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
