import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext'

const RequireAuth = ({ allowedRoles }) => {
    const { userRole } = useAuth();

    if (!userRole) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Nếu người dùng đã đăng nhập và có role phù hợp, cho phép truy cập vào trang
    return <Outlet />;
};

export default RequireAuth