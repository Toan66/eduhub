import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Teachers = () => {
	const [teachers, setTeachers] = useState([]);

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

	return (
		<div className="container mx-auto max-w-screen-lg">
			<h1 className="text-3xl text-blue-500 mt-10 font-bold mb-6 text-center">
				OUR SKILLED TEACHER
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{teachers.map((teacher) => (
					<Link
						to={`/Teacher/${teacher.userId}`}
						key={teacher.userId}
						className="overflow-hidden flex flex-col items-center group justify-center"
					>
						<img
							src={teacher.userInfo.avatar || "https://via.placeholder.com/150"}
							alt={teacher.userInfo.fullName}
							className="size-64 rounded-full group-hover:border-4 border-orange-500 duration-300"
						/>
						<div className="p-4 text-center">
							<h2 className="text-xl font-bold group-hover:text-blue-500 duration-300">
								{teacher.userInfo.fullName}
							</h2>
							<h2 className="text-lg  group-hover:text-orange-500 duration-300">
								{teacher.userInfo.expertise}
							</h2>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Teachers;
