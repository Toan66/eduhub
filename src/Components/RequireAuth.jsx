import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const RequireAuth = ({ allowedRoles }) => {
	const { userRole, isAuthenticating } = useAuth();

	if (isAuthenticating) {
		// Hiển thị spinner hoặc trả về null trong khi chờ đợi
		return <div>Loading...</div>; // Hoặc trả về null hoặc một spinner
	}

	if (!userRole) {
		return <Navigate to="/Login" replace />;
	}

	if (!allowedRoles.includes(userRole)) {
		return <Navigate to="/Unauthorized" replace />;
	}

	return <Outlet />;
};

export default RequireAuth;
