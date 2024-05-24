import { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
import { Link } from "react-router-dom";

function AllCourse() {
	const [courses, setAllCourse] = useState([]);
	useEffect(() => {
		const fetchUserCourses = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Course/All",
					{ withCredentials: true }
				);
				setAllCourse(response.data.$values);
				console.log(response.data.$values);
			} catch (error) {
				console.error("Error fetching user courses:", error);
			}
		};

		fetchUserCourses();
	}, []);

	return (
		<div className="p-2">
			<div className="">
				{courses.length > 0 ? (
					<>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{courses.map((course) => (
								<div key={course.courseId} className="shadow-lg p-1">
									<img className="w-full h-32" src={course.featureImage} />
									<div className="text-lg font-semibold line-clamp-1	">
										{course.courseName}
									</div>
									<div>
										{course.approvalStatus ? (
											<div className="text-green-500 font-semibold">
												Approved
											</div>
										) : (
											<div className="text-red-500 font-semibold">
												Unapproved
											</div>
										)}
									</div>
									<Link
										to={`/Admin/Course/${course.courseId}/Preview`}
										className="px-4 py-3 rounded-md text-white font-semibold bg-blue-500 float-right"
									>
										Preview
									</Link>
								</div>
							))}
						</div>
					</>
				) : (
					<div>No courses found.</div>
				)}
			</div>
		</div>
	);
}

export default AllCourse;
