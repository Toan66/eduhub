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
			<div className="text-lg font-semibold flex flex-col">
				<div className="mt-3">
					<Link to="/" className="text-center flex items-center justify-center">
						<img
							src="/images/logo.jpg"
							className="w-2/3 rounded-lg"
							alt="eduhub logo"
						/>
					</Link>
				</div>
				<div className="flex flex-col px-5 mt-20 h-screen">
					<Link
						to={`/DashBoard`}
						className={`mt-5 px-3 py-4 flex items-center rounded-xl hover:text-blue-500 hover:bg-gray-200 duration-200 ${
							isActive("/DashBoard") ? "text-white bg-blue-500 " : ""
						}`}
					>
						<span className="mr-5">
							<IconDashboard3Fill />
						</span>
						Dashboard
					</Link>
					<Link
						to={`/DashBoard/MyCourses`}
						className={`mt-5 px-3 py-4 flex items-center rounded-xl hover:text-blue-500 hover:bg-gray-200 duration-200 ${
							isActive("/DashBoard/MyCourses") ? "text-white bg-blue-500 " : ""
						}`}
					>
						<span className="mr-5">
							<IconBxsBook />
						</span>
						My Courses
					</Link>
					<Link
						to={`/DashBoard/Order`}
						className={`mt-5 px-3 py-4 flex items-center rounded-xl hover:text-blue-500 hover:bg-gray-200 duration-200 ${
							isActive("/DashBoard/Order") ? "text-white bg-blue-500 " : ""
						}`}
					>
						<span className="mr-5">
							<IconShoppingCart />
						</span>
						Order
					</Link>
				</div>
			</div>
		</div>
	);
};
