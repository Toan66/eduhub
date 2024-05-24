import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllTeachers = () => {
	const [teachers, setTeachers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		const fetchTeachers = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/User/teachers",
					{ withCredentials: true }
				);
				setTeachers(response.data.$values);
			} catch (error) {
				console.error("Error fetching teachers:", error);
			}
		};

		fetchTeachers();
	}, []);

	const indexOfLastTeacher = currentPage * itemsPerPage;
	const indexOfFirstTeacher = indexOfLastTeacher - itemsPerPage;
	const currentTeachers = teachers.slice(
		indexOfFirstTeacher,
		indexOfLastTeacher
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="p-5">
			<h1 className="text-2xl font-bold mb-5">All Teachers</h1>
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 border text-center">UserID</th>
						<th className="py-2 border text-center">Avatar</th>
						<th className="py-2 border text-center">Full Name</th>
						<th className="py-2 border text-center">Email</th>
						<th className="py-2 border text-center">Phone Number</th>
						<th className="py-2 border text-center">Expertise</th>
						<th className="py-2 border text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{currentTeachers.map((teacher) => (
						<tr key={teacher.userId}>
							<td className="py-2 border text-center">{teacher.userId}</td>
							<td className="py-2 border text-center flex justify-center">
								<img
									src={teacher.userInfo.avatar}
									alt="Avatar"
									className="w-10 h-10 rounded-full"
								/>
							</td>
							<td className="py-2 border text-center">
								{teacher.userInfo.fullName}
							</td>
							<td className="py-2 border text-center">
								{teacher.userInfo.email}
							</td>
							<td className="py-2 border text-center">
								{teacher.userInfo.phoneNumber}
							</td>
							<td className="py-2 border text-center">
								{teacher.userInfo.expertise}
							</td>
							<td className="py-2 border text-center">
								<Link
									to={`/Teacher/${teacher.userId}`}
									className="text-blue-500 hover:underline"
								>
									View Details
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex justify-center mt-5">
				{Array.from(
					{ length: Math.ceil(teachers.length / itemsPerPage) },
					(_, i) => (
						<button
							key={i}
							onClick={() => paginate(i + 1)}
							className={`px-3 py-1 mx-1 ${
								currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
							}`}
						>
							{i + 1}
						</button>
					)
				)}
			</div>
		</div>
	);
};

export default AllTeachers;
