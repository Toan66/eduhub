import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconAccountGroup from "../../Components/Icons/IconAccountGroup";
import IconStar from "../../Components/Icons/IconStar";
import IconBxsBookContent from "../../Components/Icons/IconBxsBookContent";

function Courses() {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Course/approvedCourses"
				);
				setCourses(response.data.$values);
			} catch (error) {
				console.error("Error fetching courses:", error);
			}
		};

		fetchCourses();
	}, []);

	return (
		<div className="container mx-auto px-4 py-8 sm:max-w-screen-lg">
			<h1 className="font-bold text-3xl mb-10">All Courses</h1>
			<div className="grid lg:grid-cols-3 lg:gap-5 grid-cols-1 gap-6">
				{courses.map((course) => (
					<div
						key={course.courseId}
						className="bg-gray-50 rounded-lg shadow-md"
					>
						{course.featureImage && (
							<div className="m-4 overflow-hidden">
								<Link to={`/Course/${course.courseId}`}>
									<p className="absolute m-3 px-3 z-10 py-1 bg-blue-500 rounded-md text-white font-semibold text-sm">
										{course.courseLevelName}
									</p>
									<img
										src={course.featureImage}
										alt="Course Image"
										className="w-full h-48 object-cover rounded hover:scale-110 duration-300 transition cursor-pointer"
									/>
								</Link>
							</div>
						)}
						<div className="flex items-center m-4 justify-between">
							<Link
								to={`/Teacher/${course.teacherId}`}
								className="font-semibold flex items-center text-gray-500 hover:text-blue-500"
							>
								<img src={course.avatar} className="size-7 mr-2" />
								{course.fullName}
							</Link>
							<div className="flex items-center">
								<div className="mr-1">
									<IconStar />
								</div>
								<div className="text-gray-400">
									({course.averageRating ? course.averageRating.toFixed(1) : 0})
								</div>
							</div>
						</div>
						<Link
							to={`/Course/${course.courseId}`}
							className="text-lg font-bold m-4 hover:text-blue-500"
						>
							{course.courseName}
						</Link>

						<div className="flex justify-between m-4 pb-3 border-0 border-b">
							<div className="text-gray-400 flex items-center">
								<span className="mr-2">
									<IconAccountGroup />
								</span>
								{course.enrollments.$values.length} Students
							</div>
							<div className="text-gray-400 flex items-center mr-12">
								<span className="mr-2">
									<IconBxsBookContent />
								</span>
								{course.chapters.$values.length} Chapters
							</div>
						</div>
						<div className="flex items-center text-lg justify-between m-4">
							<div className="px-4 py-1 rounded-md text-white font-semibold bg-blue-500">
								{course.coursePrice.toLocaleString()} VND
							</div>
							<div>
								<Link
									to={`/Course/${course.courseId}`}
									className="text-blue-500 font-semibold relative after:bg-blue-500 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer"
								>
									Enroll Now →
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Courses;
