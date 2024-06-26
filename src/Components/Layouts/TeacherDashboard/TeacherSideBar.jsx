import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import IconBxsBook from "./../../Icons/IconBxsBook";
import IconDashboard3Fill from "./../../Icons/IconDashboard3Fill";
import IconBarChart from "./../../Icons/IconBarChart";
import IconAccountGroup from "../../Icons/IconAccountGroup";

export default () => {
	const location = useLocation();
	const { userRole } = useAuth();

	const isActive = (path) => location.pathname === path;

	return (
		<div className="flex border-r">
			{/* Sidebar */}
			<div className="text-md font-semibold flex flex-col">
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
						to={`/Teacher/DashBoard`}
						className={`mt-5 px-2 py-4 flex items-center rounded-xl hover:text-blue-500 hover:bg-gray-200 duration-200 ${
							isActive("/Teacher/DashBoard") ? "text-white bg-blue-500 " : ""
						}`}
					>
						<span className="mr-3">
							<IconDashboard3Fill />
						</span>
						Teacher Dashboard
					</Link>
					<Link
						to={`/Teacher/CreatedCourse`}
						className={`mt-5 px-2 py-4 flex items-center rounded-xl hover:text-blue-500 hover:bg-gray-200 duration-200 ${
							isActive("/Teacher/CreatedCourse")
								? "text-white bg-blue-500 "
								: ""
						}`}
					>
						<span className="mr-3">
							<IconBxsBook />
						</span>
						Created Course
					</Link>
					<Link
						to={`/Teacher/Student`}
						className={`mt-5 px-2 py-4 flex items-center rounded-xl hover:text-blue-500 hover:bg-gray-200 duration-200 ${
							isActive("/Teacher/Student") ? "text-white bg-blue-500 " : ""
						}`}
					>
						<span className="mr-3">
							<IconAccountGroup />
						</span>
						Students
					</Link>
					<Link
						to={`/Teacher/Report`}
						className={`mt-5 px-2 py-4 flex items-center rounded-xl hover:text-blue-500 hover:bg-gray-200 duration-200 ${
							isActive("/Teacher/Report") ? "text-white bg-blue-500 " : ""
						}`}
					>
						<span className="mr-3">
							<IconBarChart />
						</span>
						Report
					</Link>
				</div>
			</div>
		</div>
	);
};
