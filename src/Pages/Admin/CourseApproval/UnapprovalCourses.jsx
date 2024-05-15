import { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
import { Link } from "react-router-dom";

function UnapprovalCourses() {
	const [unapproveCourses, setUnapproveCourses] = useState([]);
	useEffect(() => {
		const fetchUserCourses = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Course/UnapproveCourses",
					{ withCredentials: true }
				);
				setUnapproveCourses(response.data.$values);
			} catch (error) {
				console.error("Error fetching user courses:", error);
			}
		};

		fetchUserCourses();
	}, []);

	return (
		<div className="container mx-auto sm:max-w-screen-lg">
			<div>
				{unapproveCourses.length > 0 ? (
					<>
						<div className="text-2xl w-full font-bold mb-4">
							Unapproved Courses
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{unapproveCourses.map((course) => (
								<div key={course.courseId} className="shadow-lg p-5">
									<div className="text-xl my-10 font-semibold">
										{course.courseName}
									</div>
									<Link
										to={`/Course/${course.courseId}/Preview`}
										className="px-4 py-3 rounded-md text-white font-semibold bg-blue-500"
									>
										Course Preview
									</Link>
								</div>
							))}
						</div>
					</>
				) : (
					<div>No unapproved courses found.</div>
				)}
			</div>
		</div>
	);
}

export default UnapprovalCourses;
