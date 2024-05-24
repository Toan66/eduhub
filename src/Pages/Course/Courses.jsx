import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconAccountGroup from "../../Components/Icons/IconAccountGroup";
import IconStar from "../../Components/Icons/IconStar";
import IconBxsBookContent from "../../Components/Icons/IconBxsBookContent";

function Courses() {
	const [courses, setCourses] = useState([]);
	const [categories, setCategories] = useState([]);
	const [levels, setLevels] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedLevel, setSelectedLevel] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Course/approvedCourses"
				);
				setCourses(response.data.$values);
				console.log(response.data.$values);
			} catch (error) {
				console.error("Error fetching courses:", error);
			}
		};

		fetchCourses();
	}, []);

	useEffect(() => {
		const fetchCategoriesAndLevels = async () => {
			try {
				const responseCategory = await axios.get(
					"https://localhost:7291/api/Course/category"
				);
				const responseLevel = await axios.get(
					"https://localhost:7291/api/Course/level"
				);
				setCategories(responseCategory.data.$values);
				setLevels(responseLevel.data.$values);
			} catch (error) {
				console.error("Error fetching categories and levels:", error);
			}
		};

		fetchCategoriesAndLevels();
	}, []);

	const filteredCourses = courses.filter((course) => {
		return (
			(!selectedCategory || course.courseCategoryName === selectedCategory) &&
			(!selectedLevel || course.courseLevelName === selectedLevel) &&
			(course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				course.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
		);
	});

	const handleCategoryClick = (category) => {
		setSelectedCategory((prevCategory) =>
			prevCategory === category ? null : category
		);
	};

	const handleLevelClick = (level) => {
		setSelectedLevel((prevLevel) => (prevLevel === level ? null : level));
	};

	return (
		<div className="container mx-auto px-4 sm:max-w-screen-lg">
			<div className="mb-4">
				<h2 className="font-semibold text-xl mb-2">Search Courses</h2>
				<input
					type="text"
					placeholder="Search by course name or instructor"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="px-4 py-2 border rounded-md w-full"
				/>
			</div>
			<div className="mb-4">
				<h2 className="font-semibold text-xl mb-2">Filter by Category</h2>
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<button
							key={category.courseCategoryId}
							className={`px-4 py-2 rounded-md ${
								selectedCategory === category.courseCategoryName
									? "bg-blue-500 text-white"
									: "bg-gray-200"
							}`}
							onClick={() => handleCategoryClick(category.courseCategoryName)}
						>
							{category.courseCategoryName}
						</button>
					))}
				</div>
			</div>
			<div className="mb-4">
				<h2 className="font-semibold text-xl mb-2">Filter by Level</h2>
				<div className="flex flex-wrap gap-2">
					{levels.map((level) => (
						<button
							key={level.courseLevelId}
							className={`px-4 py-2 rounded-md ${
								selectedLevel === level.courseLevelName
									? "bg-blue-500 text-white"
									: "bg-gray-200"
							}`}
							onClick={() => handleLevelClick(level.courseLevelName)}
						>
							{level.courseLevelName}
						</button>
					))}
				</div>
			</div>

			{filteredCourses.length === 0 && (
				<div className="text-xl">
					<p className="text-center">No courses found</p>
				</div>
			)}

			<div className="grid lg:grid-cols-3 lg:gap-5 grid-cols-1 gap-6">
				{filteredCourses.map((course) => (
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
									({course.averageRating ? course.averageRating : 0})
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
