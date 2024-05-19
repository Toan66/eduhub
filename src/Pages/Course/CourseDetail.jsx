import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Rating from "../../Components/Rating";
import IconChevronDown from "../../Components/Icons/IconChevronDown";
import IconChevronUp from "../../Components/Icons/IconChevronUp";
import IconTextBoxEditOutline from "../../Components/Icons/IconTextBoxEditOutline";
import IconStar from "../../Components/Icons/IconStar";
import IconAccountGroup from "../../Components/Icons/IconAccountGroup";
import IconBxsBookContent from "../../Components/Icons/IconBxsBookContent";
import IconBxsBarChartAlt2 from "../../Components/Icons/IconBxsBarChartAlt2";
import IconFileQuestionOutline from "../../Components/Icons/IconFileQuestionOutline";
import IconShapes from "../../Components/Icons/IconShapes";
import IconUserTie from "../../Components/Icons/IconUserTie";
import IconMoneyBillWave from "../../Components/Icons/IconMoneyBillWave";
import IconPricetags from "../../Components/Icons/IconPricetags";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAuth } from "../../Contexts/AuthContext";

function CourseDetail() {
	const { userRole } = useAuth();
	const { courseId } = useParams();
	const navigate = useNavigate();
	const [course, setCourse] = useState(null);
	const [teacher, setTeacher] = useState({});
	const [reviews, setReviews] = useState([]);
	const [openChapters, setOpenChapters] = useState({});
	const [lessonCount, setLessonCount] = useState(0);
	const [testCount, setTestCount] = useState(0);
	const [filterRating, setFilterRating] = useState(null);
	const [isEnrolled, setIsEnrolled] = useState(false);
	const handleRatingFilter = (rating) => {
		if (filterRating === rating) {
			setFilterRating(null);
		} else {
			setFilterRating(rating);
		}
	};

	const filteredReviews = filterRating
		? reviews.filter((review) => review.rating === filterRating)
		: reviews;

	const toggleChapter = (chapterId) => {
		setOpenChapters((prev) => ({
			...prev,
			[chapterId]: !prev[chapterId],
		}));
	};

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/course/${courseId}/details`
				);
				console.log(response.data);
				setCourse(response.data);
			} catch (error) {
				console.error("Error fetching course details:", error);
			}
		};
		const fetchTeacher = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/course/${courseId}/teacher`
				);
				console.log(response.data);
				setTeacher(response.data);
			} catch (error) {
				console.error("Error fetching teacher details:", error);
			}
		};
		const fetchReviews = async () => {
			try {
				// Ensure the URL is correctly pointing to the course ID
				const response = await axios.get(
					`https://localhost:7291/api/course/${courseId}/reviews`,
					{ withCredentials: true }
				);
				console.log(response.data);
				setReviews(response.data.$values);
			} catch (error) {
				console.error("Error fetching reviews:", error);
			}
		};

		const checkEnroll = async () => {
			try {
				// Ensure the URL is correctly pointing to the course ID
				const response = await axios.get(
					`https://localhost:7291/api/course/${courseId}/isEnrolled`,
					{ withCredentials: true }
				);
				console.log(response.data);
				setIsEnrolled(response.data.isEnrolled);
			} catch (error) {
				console.error("Error fetching reviews:", error);
			}
		};

		fetchCourse();
		fetchTeacher();
		fetchReviews();
		checkEnroll();
	}, [courseId]);

	// const processDataForChart = (reviews) => {
	//     const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

	//     reviews.forEach(review => {
	//         if (review.rating in starCounts) {
	//             starCounts[review.rating]++;
	//         }
	//     });

	//     return Object.entries(starCounts).map(([star, count]) => ({
	//         name: `${star} Star`,
	//         Reviews: count,
	//     }));
	// };

	// const chartData = processDataForChart(reviews);

	useEffect(() => {
		if (course) {
			updateLessonAndTestCounts(course);
		}
	}, [course]);

	const updateLessonAndTestCounts = (courseData) => {
		let totalLessons = 0;
		let totalTests = 0;

		courseData.chapters.$values.forEach((chapter) => {
			totalLessons += chapter.lessons.$values.length;
			totalTests += chapter.tests.$values.length;
		});

		setLessonCount(totalLessons);
		setTestCount(totalTests);
	};

	const handlePressBuy = () => {
		if (!userRole) {
			navigate("/Login");
			return;
		}

		// Display confirmation dialog to the user
		Swal.fire({
			title: "Are you sure?",
			text: "You want to buy this course?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, buy it!",
		}).then((result) => {
			if (result.isConfirmed) {
				handleBuy();
			} else {
				console.log("Canceled.");
			}
		});
	};

	const handleBuy = async () => {
		try {
			const response = await axios.post(
				"https://localhost:7291/api/Payment/addOrder",
				{
					courseId: courseId,
					amount: course.coursePrice,
					status: "Pending",
				},
				{ withCredentials: true }
			);
			console.log(response.data);
			Swal.fire("Purchase your order to enroll this course!");
			navigate("/MyOrder");
		} catch (error) {
			console.error("Error enrolling in course:", error);
		}
	};

	if (!course) return <div>Loading...</div>;

	return (
		<>
			<div className="m-auto w-11/12">
				<img
					className="w-full h-auto rounded-xl "
					src={course.featureImage}
					alt="Course Image"
				/>
			</div>

			<div className="container mx-auto sm:max-w-screen-lg">
				<div className="flex lg:flex-row flex-col justify-between">
					<div className="w-full lg:w-7/12">
						<div className="flex flex-row items-center mt-10 text-lg">
							<Link
								to={`/Teacher/${course.teacherId}`}
								className="flex flex-row items-center mr-20 hover:text-blue-500"
							>
								<img
									src={teacher.avatar}
									alt="Teacher Avatar"
									className="size-10 rounded-full mr-2"
								/>
								<p className="font-semibold ">By {teacher.fullName}</p>
							</Link>

							<div className="flex flex-row ">
								<Rating rating={course.averageRating} />
								<h2 className="mx-1">({reviews.length} Review)</h2>
							</div>
						</div>

						<div className="mt-5">
							<h1 className="font-bold text-4xl">{course.courseName}</h1>
						</div>

						<div className="mt-10 border p-7 rounded-lg">
							<p className="font-semibold text-2xl">Course Description </p>
							<p>{course.courseDescription}</p>
							<p className="font-semibold text-2xl">Certification</p>
							<p className=" text-justify">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
								ipsum suspendisse ultrices gravida. Risus commodo viverra
								maecenas accumsan lacus vel facilisis.
							</p>
						</div>

						<div className="mt-10 border p-7 rounded-lg">
							<p className="font-bold text-2xl">Course Chapter</p>
							{course.chapters.$values.map((chapter) => (
								<div
									key={chapter.chapterId}
									className="m-5 p-3 border rounded-md"
								>
									<button
										className="font-semibold text-xl flex justify-between items-center w-full text-left py-2"
										onClick={() => toggleChapter(chapter.chapterId)}
									>
										{chapter.chapterTitle}
										<span>
											{openChapters[chapter.chapterId] ? (
												<IconChevronUp />
											) : (
												<IconChevronDown />
											)}
										</span>
									</button>

									{openChapters[chapter.chapterId] && (
										<div>
											{chapter.lessons.$values.map((lesson) => (
												<div
													key={lesson.lessonId}
													className="pl-4 mt-4 flex flex-row items-center"
												>
													<span>
														<IconTextBoxEditOutline />
													</span>
													<p className="font-semibold text-lg ml-3">
														{lesson.lessonTitle}
													</p>
												</div>
											))}
											{chapter.tests.$values.map((test) => (
												<div
													key={test.testId}
													className="pl-4 mt-4 flex flex-row items-center"
												>
													<span>
														<IconFileQuestionOutline />
													</span>
													<p className="font-semibold text-lg ml-3">
														{test.testTitle}
													</p>
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>

						<div className="mt-10 border p-7 rounded-lg">
							<div className="flex flex-row justify-between">
								<Link to={`/Teacher/${course.teacherId}`} className="w-4/12">
									<img
										src={teacher.avatar}
										alt="Teacher Avatar"
										className="size-50"
									/>
								</Link>
								<div className="w-7/12 flex flex-col justify-between">
									<Link
										to={`/Teacher/${course.teacherId}`}
										className="font-semibold text-2xl hover:text-blue-500"
									>
										{teacher.fullName}
									</Link>
									<p>Address: {teacher.userAddress}</p>
									<p className="text-justify">{teacher.userDescription}</p>
									<p>Phone Number: {teacher.phoneNumber}</p>
									<p>Email: {teacher.email}</p>
								</div>
							</div>
						</div>

						<div className="mt-10 border p-7 rounded-lg">
							<div className="flex flex-row justify-between h-44">
								<div className="w-1/3 text-center shadow-xl justify-around flex flex-col items-center ">
									<p className="font-bold text-7xl">{course.averageRating}</p>
									<Rating rating={course.averageRating} />
									<h2 className="mx-1">({reviews.length} Review)</h2>
								</div>
								<div className="w-7/12">
									<div className="w-full text-lg h-full ">
										<div className="h-full flex flex-col justify-between">
											{[5, 4, 3, 2, 1].map((star) => {
												const reviewCount = reviews.filter(
													(review) => review.rating === star
												).length;
												const totalReviews = reviews.length;
												const widthPercentage =
													totalReviews > 0
														? (reviewCount / totalReviews) * 100
														: 0;

												return (
													<div
														key={star}
														className="flex justify-between items-center hover:bg-gray-200"
														onClick={() => handleRatingFilter(star)} // Thêm sự kiện click vào đây
														style={{ cursor: "pointer" }} // Thêm style để biết có thể click
													>
														<div className="flex items-center">
															{star} <IconStar />
														</div>
														<div
															style={{
																flexGrow: 1,
																marginLeft: "10px",
																marginRight: "20px",
																height: "10px",
																backgroundColor: "#dcdcdc",
															}}
														>
															{widthPercentage > 0 && (
																<div
																	style={{
																		height: "10px",
																		backgroundColor: "orange",
																		width: `${widthPercentage}%`,
																	}}
																></div>
															)}
														</div>
														<div>{reviewCount}</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
							</div>
							{/* <BarChart width={500} height={250} layout="vertical" data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Bar dataKey="Reviews" fill="orange" />
                            </BarChart> */}
							<p className=" my-5 font-semibold text-2xl">Reviews</p>
							{filteredReviews.map((review) => (
								<div
									key={review.reviewId}
									className="flex flex-row justify-between mb-5"
								>
									<div className="w-3/12">
										<img
											src={review.user.userInfo.avatar}
											alt="User Avatar"
											className="size-20 rounded-full"
										/>
									</div>
									<div className="w-9/12">
										<div className="flex items-center">
											<div className="font-semibold text-xl mr-5">
												{review.user.userInfo.fullName}
											</div>
											<div className="">
												<Rating rating={review.rating} />
											</div>
										</div>
										<p className="my-3">{review.comment}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="w-full lg:w-4/12 text-gray-500">
						<div className="justify-between flex flex-col border p-5 mt-5 rounded-xl shadow-xl">
							<img className="mb-5" src={course.featureImage} />
							<p className="border-0 border-b mt-4 py-3 flex items-center justify-between">
								<span className="flex items-center">
									<span className="mr-2">
										<IconAccountGroup fill="DodgerBlue" />
									</span>
									Enrolled
								</span>
								<span className="float-right">
									{course.enrollments.$values.length}
								</span>
							</p>
							<p className="border-0 border-b mt-4 py-3 flex items-center justify-between">
								<span className="flex items-center">
									<span className="mr-2">
										<IconBxsBarChartAlt2 fill="DodgerBlue" />
									</span>
									Skill Level
								</span>
								<span className="float-right">
									{course.courseLevel.courseLevelName}
								</span>
							</p>
							<p className="border-0 border-b mt-4 py-3 flex items-center justify-between">
								<span className="flex items-center">
									<span className="mr-2">
										<IconBxsBookContent fill="DodgerBlue" />
									</span>
									Chapters
								</span>
								<span className="float-right">
									{course.chapters.$values.length}
								</span>
							</p>
							<p className="border-0 border-b mt-4 py-3 flex items-center justify-between">
								<span className="flex items-center">
									<span className="mr-2">
										<IconTextBoxEditOutline fill="DodgerBlue" />
									</span>
									Lessons
								</span>
								<span className="float-right">{lessonCount}</span>
							</p>
							<p className="border-0 border-b mt-4 py-3 flex items-center justify-between">
								<span className="flex items-center">
									<span className="mr-2">
										<IconFileQuestionOutline fill="DodgerBlue" />
									</span>
									Tests
								</span>
								<span className="float-right">{testCount}</span>
							</p>
							<p className="border-0 border-b mt-4 py-3 flex items-center justify-between">
								<span className="flex items-center">
									<span className="mr-2">
										<IconPricetags fill="DodgerBlue" />
									</span>
									Category
								</span>
								<span className="float-right">
									{course.category.courseCategoryName}
								</span>
							</p>
							<p className="border-0 border-b mt-4 py-3 flex items-center justify-between">
								<span className="flex items-center">
									<span className="mr-2">
										<IconUserTie fill="DodgerBlue" />
									</span>
									Teacher
								</span>
								<span className="float-right">{teacher.fullName}</span>
							</p>
							<p className="py-3 mt-4 flex items-center justify-between">
								<span className="flex items-center">
									<span className="mr-2">
										<IconMoneyBillWave fill="DodgerBlue" />
									</span>
									Price
								</span>
								<span className="float-right">
									{course.coursePrice.toLocaleString()} VND
								</span>
							</p>
							{!isEnrolled ? (
								<button
									onClick={() => handlePressBuy()}
									className="border mt-4 py-3 rounded-xl bg-blue-500 text-white hover:bg-black duration-500 font-semibold text-2xl"
								>
									Buy Now
								</button>
							) : (
								<div className="flex flex-col">
									<div className="border w-full mt-4 py-3 rounded-xl text-center text-white bg-black duration-500 font-semibold text-2xl">
										You already enrolled
									</div>

									<Link
										to={`/Learn/Course/${course.courseId}`}
										className="text-2xl font-semibold bg-blue-500 text-white rounded-xl py-3 w-full text-center mt-6 hover:bg-blue-800 duration-500"
									>
										Learn
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CourseDetail;
