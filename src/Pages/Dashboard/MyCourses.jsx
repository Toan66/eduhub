import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default () => {
	const [userCourses, setUserCourses] = useState([]);

	useEffect(() => {
		const fetchUserCourses = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Course/enrolledCourses",
					{ withCredentials: true }
				);
				setUserCourses(response.data.$values);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching user courses:", error);
			}
		};

		fetchUserCourses();
	}, []);

	return (
		<div className="p-3">
			{userCourses.length === 0 && (
				<div>
					<div className="text-3xl">You haven't enrolled any course yet!</div>
					<div className="mt-5">
						<Link
							className="bg-blue-500 mt-10 px-4 py-3 text-white font-semibold text-2xl rounded-xl hover:bg-black duration-300"
							to="/Course"
						>
							Browse Course
						</Link>
					</div>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
				{userCourses.map((course) => (
					<Link
						to={`/Learn/Course/${course.courseId}`}
						key={course.courseId}
						className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white"
					>
						<div className="overflow-hidden">
							<img
								className="w-full h-48 object-cover hover:scale-110 duration-300 transition"
								src={course.course.featureImage}
								alt="Course Image"
							/>
						</div>

						<div className="px-3 py-4">
							<div className="font-semibold text-lg mb-2">
								{course.course.courseName}
							</div>
						</div>
						<div className="px-3 pb-2">
							<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
								<div
									className="bg-blue-600 h-2.5 rounded-full"
									style={{ width: `${course.completionPercentage}%` }}
								></div>
							</div>
							<p className="text-sm text-gray-600 mt-2">
								Completion: {course.completionPercentage}%
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};
