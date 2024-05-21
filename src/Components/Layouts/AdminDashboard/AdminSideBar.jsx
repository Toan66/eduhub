import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import IconBxsBook from "./../../Icons/IconBxsBook";
import IconShoppingCart from "./../../Icons/IconShoppingCart";
import IconDashboard3Fill from "./../../Icons/IconDashboard3Fill";

export default () => {
	const location = useLocation();
	const { userRole } = useAuth();

	const isActive = (path) => location.pathname === path;

	return (
		<div className="flex border-r">
			{/* Sidebar */}
			<div className="text-xl font-semibold flex flex-col">
				<div className="mt-3">
					<Link to="/" className="text-center flex items-center justify-center">
						<img
							src="/images/logo.jpg"
							className="w-2/3 rounded-lg"
							alt="eduhub logo"
						/>
					</Link>
				</div>
				<div className="flex flex-col px-1 mt-20 h-screen">
					<Link
						to={`/Admin/DashBoard`}
						className={`mt-10 px-2 py-4 flex items-center rounded-xl hover:text-blue-500 hover:bg-gray-200 duration-200 ${
							isActive("/Admin/DashBoard") ? "text-white bg-blue-500 " : ""
						}`}
					>
						<span className="mr-3">
							<IconDashboard3Fill />
						</span>
						Admin Dashboard
					</Link>
					<Link
						to={`/Admin/AllCourse`}
						className={`mt-10 px-2 py-4 flex items-center rounded-xl hover:text-blue-500 hover:bg-gray-200 duration-200 ${
							isActive("/Admin/AllCourse") ? "text-white bg-blue-500 " : ""
						}`}
					>
						<span className="mr-3">
							<IconBxsBook />
						</span>
						All Course
					</Link>

					<Link
						to={`/Admin/UnapprovalCourses`}
						className={`mt-10 px-2 py-4 flex items-center rounded-xl hover:text-blue-500 hover:bg-gray-200 duration-200 ${
							isActive("/Admin/UnapprovalCourses")
								? "text-white bg-blue-500 "
								: ""
						}`}
					>
						<span className="mr-3">
							<IconBxsBook />
						</span>
						Unapprove Courses
					</Link>
					{/* <Link
						to={`/Admin/CreatedCourse`}
						className={`mt-10 px-2 py-4 flex items-center rounded-xl hover:text-blue-500 hover:bg-gray-200 duration-200 ${
							isActive("/Admin/CreatedCourse") ? "text-white bg-blue-500 " : ""
						}`}
					>
						<span className="mr-3">
							<IconBxsBook />
						</span>
						Created Course
					</Link> */}
				</div>
			</div>
		</div>
	);
};
