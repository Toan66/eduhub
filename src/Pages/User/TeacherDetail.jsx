import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SimpleSlider from "../Course/SimpleSlider";
import Rating from "../../Components/Rating";
import IconStar from "../../Components/Icons/IconStar";
import IconAccountGroup from "../../Components/Icons/IconAccountGroup";
import IconBxsBookContent from "../../Components/Icons/IconBxsBookContent";

function TeacherDetail() {
	const { userId } = useParams();
	const [userCourses, setUserCourses] = useState([]);
	const courseLevelMap = {};
	const navigate = useNavigate();
	const [userData, setUserData] = useState(null);
	const [userReviews, setUserReviews] = useState([]);
	const [currentPageCourses, setCurrentPageCourses] = useState(1);
	const [currentPageReviews, setCurrentPageReviews] = useState(1);
	const itemsPerPage = 4;

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/User/${userId}/detail`,
					{ withCredentials: true }
				);
				setUserData(response.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, [userId]);

	useEffect(() => {
		const fetchUserCourses = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Course/${userId}/TeacherCourses`,
					{ withCredentials: true }
				);
				const courses = response.data.$values;

				courses.forEach((course) => {
					if (course.courseLevel && course.courseLevel.$id) {
						courseLevelMap[course.courseLevel.$id] = course.courseLevel;
					}
				});

				courses.forEach((course) => {
					if (course.courseLevel && course.courseLevel.$ref) {
						course.courseLevel = courseLevelMap[course.courseLevel.$ref];
					}
				});

				setUserCourses(courses); // Cập nhật state với dữ liệu đã được xử lý
				console.log(courses);
			} catch (error) {
				console.error("Error fetching user courses:", error);
			}
		};

		const fetchReviews = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Course/ByTeacher/${userId}/reviews`,
					{ withCredentials: true }
				);
				setUserReviews(response.data.$values);
				console.log(response.data.$values);
			} catch (error) {
				console.error("Error fetching user reviews:", error);
			}
		};

		fetchUserCourses();
		fetchReviews();
	}, [userData]);

	useEffect(() => {
		const totalRating = userReviews.reduce(
			(acc, review) => acc + review.rating,
			0
		);
		const averageRating =
			userReviews.length > 0
				? (totalRating / userReviews.length).toFixed(1)
				: 0;
	}, [userReviews]);

	const indexOfLastCourse = currentPageCourses * itemsPerPage;
	const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
	const currentCourses = userCourses.slice(
		indexOfFirstCourse,
		indexOfLastCourse
	);

	const indexOfLastReview = currentPageReviews * itemsPerPage;
	const indexOfFirstReview = indexOfLastReview - itemsPerPage;
	const currentReviews = userReviews.slice(
		indexOfFirstReview,
		indexOfLastReview
	);

	const paginateCourses = (pageNumber) => setCurrentPageCourses(pageNumber);
	const paginateReviews = (pageNumber) => setCurrentPageReviews(pageNumber);

	const goBack = () => navigate(-1);

	return (
		<div className="container mx-auto sm:max-w-screen-lg">
			{userData ? (
				<div className="flex justify-between mt-5">
					<div className="w-4/12 h-auto">
						<div className="mb-3 shadow-xl bg-gray-50 rounded-lg p-10 h-auto lg:flex-row lg:h-auto flex-wrap text-center">
							<div className="flex flex-row items-center lg:w-full align-middle mb-5">
								<h3 className="text-xl w-full font-semibold"></h3>
							</div>
							<div className="w-full mb-5">
								{userData.userInfo?.avatar ? (
									<img
										className="size-48 m-auto rounded-full"
										src={userData.userInfo.avatar}
									/>
								) : (
									<>Don't have an avatar</>
								)}
							</div>

							<p className="text-center text-2xl">
								<strong>{userData.userInfo?.fullName}</strong>
							</p>
							<p className="text-center font-semibold mt-5">
								{userData.userInfo?.userAddress}
							</p>
							<p className="mt-5">
								<strong>Date of Birth:</strong>{" "}
								{new Date(userData.userInfo?.dateOfBirth).toLocaleDateString()}
							</p>
							<p className="mt-5">
								<strong>Gender:</strong> {userData.userInfo?.gender}
							</p>

							<p className="mt-5">
								<strong>Email:</strong>{" "}
								<a href={`mailto:${userData.userInfo?.email}`}>
									{userData.userInfo?.email}
								</a>
							</p>
							<p className="mt-5">
								<strong>Phone: </strong>
								<a href={`tel:${userData.userInfo.phoneNumber}`}>
									{userData.userInfo?.phoneNumber}
								</a>
							</p>
						</div>
					</div>

					<div className="w-9/12 lg:pl-10 ">
						<div>
							<div className="mt-5">
								<strong className="text-blue-500 text-xl">ABOUT ME </strong>
							</div>
							<div className="font-semibold text-3xl mt-2">
								Hello, I'm {userData.userInfo?.fullName}
							</div>
							<div className="mt-10">{userData.userInfo?.userDescription}</div>
						</div>
						<div className="py-10 my-10 h-48 bg-blue-500 rounded-xl flex justify-between">
							<div className="flex flex-col items-center justify-center w-1/3 font-bold text-xl text-white border-0 border-r">
								<div className="text-4xl mb-3">{userCourses.length}</div>
								<div>COURSE AUTHOR</div>
							</div>
							<div className="flex flex-col items-center justify-center w-1/3 font-bold text-xl text-white border-0 border-r">
								<div className="text-4xl mb-3"></div>
								<div className="text-4xl mb-3">{userReviews.length}</div>
								NUMBER OF REVIEWS
							</div>
							<div className="flex flex-col items-center justify-center w-1/3 font-bold text-xl text-white">
								<div className="text-4xl mb-3"></div>
								<div className="text-4xl mb-3">
									{userReviews.length > 0
										? (
												userReviews.reduce(
													(acc, review) => acc + review.rating,
													0
												) / userReviews.length
										  ).toFixed(1)
										: 0}
								</div>
								AVE. RATING
							</div>
						</div>
						<div className="mt-5">
							<strong className="text-blue-500 text-xl">COURSES </strong>
						</div>
						<h3 className="text-3xl font-semibold mb-4">
							Course By : {userData.userInfo.fullName}
						</h3>
						<div className="grid grid-cols-2 gap-5">
							{currentCourses.map((course) => (
								<div
									key={course.courseId}
									className="bg-gray-50 rounded-lg shadow-md"
								>
									{course.featureImage && (
										<div className="m-4 overflow-hidden">
											<Link to={`/Course/${course.courseId}`}>
												<p className="absolute m-3 px-3 z-10 py-1 bg-blue-500 rounded-md text-white font-semibold text-sm">
													{course.courseLevel.courseLevelName}
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
											<img
												src={course.teacherInfo.avatar}
												className="size-7 mr-2"
											/>
											{course.teacherInfo.fullName}
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
						<div className="flex justify-center mt-4">
							{[
								...Array(Math.ceil(userCourses.length / itemsPerPage)).keys(),
							].map((number) => (
								<button
									key={number + 1}
									onClick={() => paginateCourses(number + 1)}
									className={`px-4 py-2 mx-1 ${
										currentPageCourses === number + 1
											? "bg-blue-500 text-white"
											: "bg-gray-200"
									}`}
								>
									{number + 1}
								</button>
							))}
						</div>

						{/* <SimpleSlider courses={userCourses} /> */}
						<div className="mt-12">
							<strong className="text-blue-500 text-xl">REVIEWS </strong>
						</div>
						<h3 className="text-3xl font-semibold mb-4">
							All {userData.userInfo.fullName} reviews by student
						</h3>
						<div className="my-10">
							{userReviews.length > 0 ? (
								currentReviews.map((review) => (
									<div
										key={review.reviewId}
										className="flex flex-row justify-between mb-5"
									>
										<div className="w-2/12">
											<img
												src={review.user.userInfo.avatar}
												alt="User Avatar"
												className="size-20 rounded-full"
											/>
										</div>
										<div className="w-10/12">
											<div className="flex items-center justify-between">
												<div className="font-semibold text-xl mr-5 flex items-center">
													<div>{review.user.userInfo.fullName}</div>
													<div className="ml-5">
														<Rating rating={review.rating} />
													</div>
												</div>

												<Link
													to={`/Course/${review.courseId}`}
													className="float-right text-gray-400 hover:text-blue-500"
												>
													Course:{" "}
													{
														userCourses.find(
															(course) => course.courseId === review.courseId
														)?.courseName
													}
												</Link>
											</div>
											<p className="my-3">{review.comment}</p>
											<p className="text-gray-400">
												Posted on{" "}
												{new Date(review.reviewDate).toLocaleDateString()}
											</p>
										</div>
									</div>
								))
							) : (
								<></>
							)}
							<div className="flex justify-center mt-4">
								{[
									...Array(Math.ceil(userReviews.length / itemsPerPage)).keys(),
								].map((number) => (
									<button
										key={number + 1}
										onClick={() => paginateReviews(number + 1)}
										className={`px-4 py-2 mx-1 ${
											currentPageReviews === number + 1
												? "bg-blue-500 text-white"
												: "bg-gray-200"
										}`}
									>
										{number + 1}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="bg-white h-auto text-2xl font-bold mb-4">
					User Not Found
					<div className="flex flex-row">
						<button
							onClick={goBack}
							className="text-2xl inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded m-3"
						>
							Go Back
						</button>
						<Link
							reloadDocument
							to="/"
							className="text-2xl inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded m-3"
						>
							Home
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default TeacherDetail;
