import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext'

const RequireAuth = ({ allowedRoles }) => {
    const { userRole } = useAuth();

    // Kiểm tra xem người dùng đã đăng nhập (có token) và có role phù hợp hay không
    if (!userRole) {
        // Nếu không có token, redirect đến trang đăng nhập
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        // Nếu role không phù hợp, redirect đến trang không có quyền truy cập
        return <Navigate to="/unauthorized" replace />;
    }

    // Nếu người dùng đã đăng nhập và có role phù hợp, cho phép truy cập vào trang
    return <Outlet />;
};

export default RequireAuth