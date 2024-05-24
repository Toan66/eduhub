import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentEnrollments = () => {
	const [enrollments, setEnrollments] = useState([]);

	useEffect(() => {
		const fetchEnrollments = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Course/teacher/enrollments",
					{ withCredentials: true }
				);
				setEnrollments(response.data.$values);
			} catch (error) {
				console.error("Error fetching enrollments:", error);
			}
		};

		fetchEnrollments();
	}, []);

	return (
		<div className="p-3">
			<table className="min-w-full bg-white border">
				<thead>
					<tr>
						<th className="py-2 px-4 border">User ID</th>
						<th className="py-2 px-4 border">Username</th>
						<th className="py-2 px-4 border">Full Name</th>
						<th className="py-2 px-4 border">Course</th>
						<th className="py-2 px-4 border">Enrollment Date</th>
						<th className="py-2 px-4 border">Completion Percentage</th>
					</tr>
				</thead>
				<tbody>
					{enrollments.map((enrollment) => (
						<tr key={enrollment.$id}>
							<td className="py-2 px-4 border text-center">
								{enrollment.userId}
							</td>
							<td className="py-2 px-4 border">{enrollment.username}</td>
							<td className="py-2 px-4 border">{enrollment.fullName}</td>
							<td className="py-2 px-4 border truncate hover:text-blue-600">
								<Link to={`/Course/${enrollment.courseId}`}>
									{enrollment.courseName}
								</Link>
							</td>
							<td className="py-2 px-4 border text-center">
								{new Date(enrollment.enrollmentDate).toLocaleDateString()}
							</td>
							<td className="py-2 px-4 border">
								<div className="w-full bg-gray-200 rounded-full h-4">
									<div
										className="bg-blue-600 h-4 rounded-full"
										style={{ width: `${enrollment.completionPercentage}%` }}
									></div>
								</div>
								<span>{enrollment.completionPercentage}%</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{enrollments.length === 0 && (
				<div className="mt-10 text-xl">You don't have any enrollments yet.</div>
			)}
		</div>
	);
};

export default StudentEnrollments;
