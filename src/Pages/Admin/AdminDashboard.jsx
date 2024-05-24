import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
	const [totalCourses, setTotalCourses] = useState(0);
	const [unapprovedCourses, setUnapprovedCourses] = useState(0);
	const [totalUsers, setTotalUsers] = useState(0);
	const [totalTeachers, setTotalTeachers] = useState(0);
	const [totalEarnings, setTotalEarnings] = useState(0);
	const [totalCategories, setTotalCategories] = useState(0);

	useEffect(() => {
		const fetchTotalCourses = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Course/All",
					{
						withCredentials: true,
					}
				);
				setTotalCourses(response.data.$values.length);
			} catch (error) {
				console.error("Error fetching total courses:", error);
			}
		};

		const fetchUnapprovedCourses = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Course/UnapproveCourses",
					{
						withCredentials: true,
					}
				);
				setUnapprovedCourses(response.data.$values.length);
			} catch (error) {
				console.error("Error fetching unapproved courses:", error);
			}
		};

		const fetchTotalUsers = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/User/users",
					{
						withCredentials: true,
					}
				);
				setTotalUsers(response.data.$values.length);
			} catch (error) {
				console.error("Error fetching total users:", error);
			}
		};

		const fetchTotalTeachers = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/User/teachers",
					{
						withCredentials: true,
					}
				);
				setTotalTeachers(response.data.$values.length);
			} catch (error) {
				console.error("Error fetching total teachers:", error);
			}
		};

		const fetchTotalEarnings = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Payment/paidOrders",
					{
						withCredentials: true,
					}
				);
				const orders = response.data.$values;
				const total = orders.reduce((sum, order) => sum + order.amount, 0);
				setTotalEarnings(total);
			} catch (error) {
				console.error("Error fetching total earnings:", error);
			}
		};
		const fetchCategories = async () => {
			try {
				const responseCategory = await axios.get(
					"https://localhost:7291/api/Course/category"
				);
				setTotalCategories(responseCategory.data.$values.length);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchTotalCourses();
		fetchUnapprovedCourses();
		fetchTotalUsers();
		fetchTotalTeachers();
		fetchTotalEarnings();
		fetchCategories();
	}, []);

	return (
		<div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-4">
			<Link
				to="/Admin/AllCourse"
				className="bg-white hover:text-white hover:bg-blue-500 duration-300 p-4 rounded shadow-xl h-64 items-center"
			>
				<div className="mr-4"></div>
				<div>
					<h2 className="text-2xl text-center font-semibold">Total Courses</h2>
					<p className="text-7xl font-semibold text-center mt-16">
						{totalCourses}
					</p>
				</div>
			</Link>
			<Link
				to="/Admin/UnapprovalCourses"
				className="bg-white hover:text-white hover:bg-blue-500 duration-300 p-4 rounded shadow-xl h-64 items-center"
			>
				<div className="mr-4"></div>
				<div>
					<h2 className="text-2xl text-center font-semibold">
						Unapproved Courses
					</h2>
					<p className="text-7xl font-semibold text-center mt-16">
						{unapprovedCourses}
					</p>
				</div>
			</Link>
			<Link
				to="/Admin/AllUsers"
				className="bg-white hover:text-white hover:bg-blue-500 duration-300 p-4 rounded shadow-xl h-64 items-center"
			>
				<div className="mr-4"></div>
				<div>
					<h2 className="text-2xl text-center font-semibold">Total Users</h2>
					<p className="text-7xl font-semibold text-center mt-16">
						{totalUsers}
					</p>
				</div>
			</Link>
			<Link
				to="/Admin/AllTeachers"
				className="bg-white hover:text-white hover:bg-blue-500 duration-300 p-4 rounded shadow-xl h-64 items-center"
			>
				<div className="mr-4"></div>
				<div>
					<h2 className="text-2xl text-center font-semibold">Total Teachers</h2>
					<p className="text-7xl font-semibold text-center mt-16">
						{totalTeachers}
					</p>
				</div>
			</Link>
			<Link
				to="/Admin/Category"
				className="bg-white hover:text-white hover:bg-blue-500 duration-300 p-4 rounded shadow-xl h-64 items-center"
			>
				<div className="mr-4"></div>
				<div>
					<h2 className="text-2xl text-center font-semibold">Total Category</h2>
					<p className="text-7xl font-semibold text-center mt-16 ">
						{totalCategories}
					</p>
				</div>
			</Link>
			<Link
				to="/Admin/AdminReport"
				className="bg-white hover:text-white hover:bg-blue-500 duration-300 p-4 rounded shadow-xl h-64 items-center"
			>
				<div className="mr-4"></div>
				<div>
					<h2 className="text-2xl text-center font-semibold">Total Earnings</h2>
					<p className="text-4xl text-center mt-20 font-semibold">
						{totalEarnings.toLocaleString()} VND
					</p>
				</div>
			</Link>
		</div>
	);
}

export default AdminDashboard;
