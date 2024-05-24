import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const RequireAuth = ({ allowedRoles }) => {
	const { userRole, isAuthenticating } = useAuth();

	if (isAuthenticating) {
		return <div>Loading...</div>;
	}

	if (!userRole) {
		return <Navigate to="/Login" replace />;
	}

	if (!allowedRoles.includes(userRole)) {
		return <Navigate to="/Unauthorized" replace />;
	}

	if (allowedRoles.includes(userRole)) {
		return <Outlet />;
	}
};

export default RequireAuth;
