import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreatedCourse = () => {
	const [userCourses, setUserCourses] = useState([]);

	useEffect(() => {
		const fetchUserCourses = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Course/ByTeacher",
					{ withCredentials: true }
				);
				setUserCourses(response.data.$values);
			} catch (error) {
				console.error("Error fetching user courses:", error);
			}
		};

		fetchUserCourses();
	}, []);

	return (
		<div className="p-4">
			<div className="my-10">
				<Link
					to="/Course/Create"
					className="px-5 py-2 rounded-md text-white font-semibold bg-black hover:bg-blue-500 text-lg"
				>
					+ Create New Course
				</Link>
			</div>

			<table className="min-w-full">
				<thead className="border-b font-semibold">
					<tr>
						<th className="font-semibold text-gray-900 px-6 py-4 text-left">
							ID
						</th>
						<th className="font-semibold text-gray-900 px-6 py-4 text-left">
							Course Name
						</th>
						<th className="font-semibold text-gray-900 px-6 py-4 text-left">
							Approval Status
						</th>
						<th className="font-semibold text-gray-900 px-6 py-4 text-left">
							Edit
						</th>
						<th className="font-semibold text-gray-900 px-6 py-4 text-left">
							Preview
						</th>
					</tr>
				</thead>
				<tbody>
					{userCourses.map((course) => (
						<tr className="border-b" key={course.courseId}>
							<td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
								{course.courseId}
							</td>
							<td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								{course.courseName}
							</td>
							<td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								{course.approvalStatus ? "Approved" : "Pending"}
							</td>
							<td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								<Link
									to={`/Course/${course.courseId}/Edit`}
									className="text-blue-500 hover:text-blue-700"
								>
									Edit
								</Link>
							</td>
							<td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								<Link
									to={`/Course/${course.courseId}/Preview`}
									className="text-blue-500 hover:text-blue-700"
								>
									Preview
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CreatedCourse;
