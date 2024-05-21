import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderDashboard from "../DashboardLayout/HeaderDashboard";
import TeacherSideBar from "./TeacherSideBar";

const LayoutTeacherDashboard = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]); // Cuộn lên đầu trang mỗi khi đường dẫn thay đổi

	return (
		<>
			<div className="flex">
				<div className="w-1/5">
					<TeacherSideBar />
				</div>
				<div className="w-4/5 flex flex-col">
					<HeaderDashboard />
					<div>
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default LayoutTeacherDashboard;
