import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userRole, setUserRole] = useState(null);
	const [isAuthenticating, setIsAuthenticating] = useState(true);

	useEffect(() => {
		const fetchUserRole = async () => {
			const role = await localStorage.getItem("role");
			if (!role) {
				setUserRole(null);
				setIsAuthenticating(false);
			}
			if (role) {
				setUserRole(role);
				setIsAuthenticating(false);
			}
			setIsAuthenticating(false);
		};

		fetchUserRole();
	}, []);

	return (
		<AuthContext.Provider value={{ userRole, isAuthenticating }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
