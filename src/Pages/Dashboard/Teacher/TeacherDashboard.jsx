import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TeacherDashboard() {
	const [enrollmentsCount, setEnrollmentsCount] = useState(0);
	const [coursesCount, setCoursesCount] = useState(0);
	const [totalEarnings, setTotalEarnings] = useState(0);

	useEffect(() => {
		const fetchEnrollments = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Course/teacher/enrollments",
					{ withCredentials: true }
				);
				setEnrollmentsCount(response.data.$values.length);
			} catch (error) {
				console.error("Error fetching enrollments:", error);
			}
		};

		const fetchCourses = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Course/ByTeacher",
					{ withCredentials: true }
				);
				setCoursesCount(response.data.$values.length);
			} catch (error) {
				console.error("Error fetching courses:", error);
			}
		};

		const fetchTotalEarnings = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Payment/completedOrdersByTeacherCourses",
					{ withCredentials: true }
				);
				const orders = response.data.$values;
				const total = orders.reduce((sum, order) => sum + order.amount, 0);
				setTotalEarnings(total);
			} catch (error) {
				console.error("Error fetching total earnings:", error);
			}
		};

		fetchEnrollments();
		fetchCourses();
		fetchTotalEarnings();
	}, []);

	return (
		<div className="">
			<h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Link
					to="/Teacher/CreatedCourse"
					className="bg-white group hover:bg-blue-500 duration-300 p-4 rounded shadow-xl h-64"
				>
					<h2 className="text-4xl text-center group-hover:text-white font-bold">
						Total Courses
					</h2>
					<p className="text-7xl text-center mt-14 group-hover:text-white font-bold">
						{coursesCount}
					</p>
				</Link>
				<Link
					to="/Teacher/Student"
					className="bg-white group hover:bg-blue-500 duration-300 p-4 rounded shadow-xl h-64"
				>
					<h2 className="text-4xl text-center group-hover:text-white font-bold">
						Total Enrollment
					</h2>
					<p className="text-7xl text-center mt-14 group-hover:text-white font-bold">
						{enrollmentsCount}
					</p>
				</Link>

				<Link
					to="/Teacher/Report"
					className="bg-white group hover:bg-blue-500 duration-300 p-4 rounded shadow-xl h-64"
				>
					<h2 className="text-4xl text-center group-hover:text-white font-bold">
						Total Earnings
					</h2>
					<p className="text-4xl text-center mt-20 group-hover:text-white font-bold">
						{totalEarnings.toLocaleString()} VND
					</p>
				</Link>
			</div>
		</div>
	);
}

export default TeacherDashboard;
