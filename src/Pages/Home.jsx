import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import IconAccountGroup from "../Components/Icons/IconAccountGroup";
import IconStar from "../Components/Icons/IconStar";
import IconBxsBookContent from "../Components/Icons/IconBxsBookContent";

function Home() {
	const [courses, setCourses] = useState([]);
	// const [categories, setCategories] = useState([]);

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

	// useEffect(() => {
	// 	const fetchCategories = async () => {
	// 		try {
	// 			const responseCategory = await axios.get(
	// 				"https://localhost:7291/api/Course/category"
	// 			);
	// 			setCategories(responseCategory.data.$values);
	// 			console.log(responseCategory.data.$values);
	// 		} catch (error) {
	// 			console.error("Error fetching categories:", error);
	// 		}
	// 	};

	// 	fetchCategories();
	// }, []);

	return (
		<div>
			<div className="flex flex-col min-h-screen">
				{/* Hero Section */}
				<div
					className=" text-white py-10 h-80 items-center flex"
					style={{
						backgroundImage: "url(" + "../src/assets/hero-home.jpg" + ")",
					}}
				>
					<div className="container mx-auto max-w-screen-lg">
						<h2 className="text-3xl md:text-5xl font-bold mb-2">
							Learn Anything, Anytime, Anywhere
						</h2>
						<p className="text-xl mb-8">
							Start learning today with our online courses.
						</p>
						<Link
							to="/Course"
							className="bg-white text-orange-600 text-2xl hover:text-white hover:bg-blue-500 duration-300 font-bold py-2 px-4 rounded"
						>
							Browse Courses
						</Link>
					</div>
				</div>

				{/* Courses Section */}
				<div className="py-10">
					<div className="container mx-auto ">
						<h3 className="text-3xl font-bold text-center mb-10">
							Popular Courses
						</h3>
						<div className="grid lg:grid-cols-3 lg:gap-5 grid-cols-1 gap-6 max-w-screen-lg m-auto">
							{/* Course Card */}
							{courses.slice(0, 3).map((course) => (
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
												(
												{course.averageRating
													? course.averageRating.toFixed(1)
													: 0}
												)
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
				</div>

				{/* Categories */}
				<div className="py-10 container mx-auto max-w-screen-lg">
					<div className="text-3xl font-bold">Top categories</div>
					<div className="grid lg:grid-cols-4 lg:gap-5 grid-cols-2 gap-6 mt-6">
						<Link to="/Category/1">
							<div className="overflow-hidden">
								<img
									className="hover:scale-110 duration-300 overflow-hidden"
									src="../src/assets/category/lohp-category-development-2x-v2.jpg"
									alt="123"
								/>
							</div>

							<span className="font-semibold text-xl">Programming</span>
						</Link>
						<Link to="/Category/5">
							<div className="overflow-hidden">
								<img
									className="hover:scale-110 duration-300 overflow-hidden"
									src="../src/assets/category/lohp-category-design-2x-v2.jpg"
									alt="123"
								/>
							</div>

							<span className="font-semibold text-xl">Design</span>
						</Link>
						<Link to="/Category/3">
							<div className="overflow-hidden">
								<img
									className="hover:scale-110 duration-300 overflow-hidden"
									src="../src/assets/category/lohp-category-marketing-2x-v2.jpg"
									alt="123"
								/>
							</div>

							<span className="font-semibold text-xl">Marketing</span>
						</Link>
						<Link to="/Category/2">
							<div className="overflow-hidden">
								<img
									className="hover:scale-110 duration-300 overflow-hidden"
									src="../src/assets/category/lohp-category-it-and-software-2x-v2.jpg"
									alt="123"
								/>
							</div>

							<span className="font-semibold text-xl">Skill</span>
						</Link>
						<Link to="/Category/10">
							<div className="overflow-hidden">
								<img
									className="hover:scale-110 duration-300 overflow-hidden"
									src="../src/assets/category/lohp-category-business-2x-v2.jpg"
									alt="123"
								/>
							</div>

							<span className="font-semibold text-xl">Business</span>
						</Link>
						<Link to="/Category/7">
							<div className="overflow-hidden">
								<img
									className="hover:scale-110 duration-300 overflow-hidden"
									src="../src/assets/category/lohp-category-personal-development-2x-v2.jpg"
									alt="123"
								/>
							</div>

							<span className="font-semibold text-xl">Health and Fitness</span>
						</Link>
						<Link to="/Category/9">
							<div className="overflow-hidden">
								<img
									className="hover:scale-110 duration-300 overflow-hidden"
									src="../src/assets/category/lohp-category-photography-2x-v2.jpg"
									alt="123"
								/>
							</div>

							<span className="font-semibold text-xl">Photography & Video</span>
						</Link>
						<Link to="/Category/4">
							<div className="overflow-hidden">
								<img
									className="hover:scale-110 duration-300 overflow-hidden"
									src="../src/assets/category/lohp-category-music-2x-v2.jpg"
									alt="123"
								/>
							</div>

							<span className="font-semibold text-xl">Music</span>
						</Link>
					</div>
				</div>

				{/* Start Teaching to day */}
				<div className="py-10">
					<div className="flex flex-col md:flex-row w-full lg:w-5/6 m-auto">
						<div className="w-full lg:w-1/2 md:pl-20">
							<img src="../src/assets/instructor-2x-v3.jpg" />
						</div>
						<div className="w-full lg:w-1/2 pl-20 flex flex-col justify-center">
							<div className="font-bold text-4xl">Become a teacher</div>
							<div className="text-xl mt-10">
								Teachers from around the world teach millions of learners on
								EDUHUB. We provide the tools and skills to teach what you love.
							</div>
							<div className="mt-10">
								<Link
									to="/Teacher/DashBoard"
									className="px-4 py-3 bg-blue-500 font-semibold text-xl text-white hover:bg-black duration-500"
								>
									Start teaching today
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
