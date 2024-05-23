import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderDashboard from "../DashboardLayout/HeaderDashboard";
import AdminSideBar from "./AdminSideBar";

const LayoutDashBoard = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]); // Cuộn lên đầu trang mỗi khi đường dẫn thay đổi

	return (
		<>
			<div className="flex">
				<div className="w-1/6">
					<AdminSideBar />
				</div>
				<div className="w-5/6 flex flex-col">
					<HeaderDashboard />
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default LayoutDashBoard;
