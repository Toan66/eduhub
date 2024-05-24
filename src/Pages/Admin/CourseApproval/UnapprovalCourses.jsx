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
				console.log(response.data.$values);
			} catch (error) {
				console.error("Error fetching user courses:", error);
			}
		};

		fetchUserCourses();
	}, []);

	return (
		<div className="p-2">
			<div>
				{unapproveCourses.length > 0 ? (
					<>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{unapproveCourses.map((course) => (
								<div key={course.courseId} className="shadow-lg ">
									<img
										src={course.featureImage}
										alt=""
										className="h-32 w-full"
									/>
									<div className="text-lg font-semibold line-clamp-1	">
										{course.courseName}
									</div>
									<Link
										to={`/Admin/Course/${course.courseId}/Preview`}
										className="mb-2 mr-2 px-4 py-3 rounded-md text-white font-semibold bg-blue-500 float-right"
									>
										Preview
									</Link>
								</div>
							))}
						</div>
					</>
				) : (
					<div className="text-4xl font-semibold">
						No unapprove course found.
					</div>
				)}
			</div>
		</div>
	);
}

export default UnapprovalCourses;
