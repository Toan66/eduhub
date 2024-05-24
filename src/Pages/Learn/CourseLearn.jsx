import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import IconBxsBookContent from "../../Components/Icons/IconBxsBookContent";
import IconBxsBarChartAlt2 from "../../Components/Icons/IconBxsBarChartAlt2";
import IconMoneyBillWave from "../../Components/Icons/IconMoneyBillWave";
import IconPricetags from "../../Components/Icons/IconPricetags";
import ProgressBar from "../../Components/ProgressBar";
import IconCheckCircleFill from "../../Components/Icons/IconCheckCircleFill";

function CourseLearn() {
	const { courseId } = useParams();
	const [courseDetails, setCourseDetails] = useState(null);
	const [completedPercentage, setCompletedPercentage] = useState(0);
	const [completedChapters, setCompletedChapters] = useState([]);
	const [canReview, setCanReview] = useState(false);
	const navigate = useNavigate();

	// Function to find the next chapter ID
	const findNextChapterId = () => {
		// Assuming chapters are sorted
		const nextChapter = courseDetails.chapters.$values.find(
			(chapter) => !completedChapters.includes(chapter.chapterId)
		);
		if (!nextChapter) {
			console.log("All chapters completed.");
			return null;
		} else {
			console.log(nextChapter);
		}
		return nextChapter ? nextChapter.chapterId : null;
	};

	// Handler for the Resume Course button
	const handleResumeCourse = () => {
		const nextChapterId = findNextChapterId();
		if (nextChapterId) {
			navigate(`/Learn/Course/${courseId}/Chapter/${nextChapterId}`);
		} else {
			console.log("All chapters completed or no next chapter found.");
		}
	};

	useEffect(() => {
		const fetchCourseDetails = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/course/${courseId}/details`
				);
				console.log(response.data);
				setCourseDetails(response.data);
			} catch (error) {
				console.error("Error fetching course details:", error);
			}
		};

		const fetchCompletedChapters = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Course/${courseId}/completedChapters`,
					{ withCredentials: true }
				);
				setCompletedChapters(response.data.$values);
			} catch (error) {
				console.error("Error fetching completed chapters:", error);
			}
		};

		const checkEnroll = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/course/${courseId}/isEnrolled`,
					{ withCredentials: true }
				);
				console.log(response.data);
				setCompletedPercentage(response.data.completedPercentage);
				if (!response.data.isEnrolled) {
					navigate("/Unauthorized");
					return;
				}
			} catch (error) {
				console.error("Error fetching reviews:", error);
			}
		};

		checkEnroll();
		fetchCompletedChapters();
		fetchCourseDetails();
	}, [courseId]);

	const reviewHandle = async () => {
		try {
			const response = await axios.get(
				`https://localhost:7291/api/Review/${courseId}/canReview`,
				{ withCredentials: true }
			);
			console.log(response.data);
			if (response.data.canReview == true) {
				navigate(`/Course/${courseId}/Review`);
			} else {
				Swal.fire(
					"Not allow",
					"You have already reviewed this course",
					"error"
				);
			}
		} catch (error) {
			console.error("Error fetching reviews:", error);
		}
	};

	return (
		<div className=" mx-auto p-3">
			{courseDetails && (
				<div className="flex">
					<div className="w-full lg:w-2/3">
						<div className="text-5xl font-bold">{courseDetails.courseName}</div>
						{completedPercentage > 0 && (
							<div className="my-5 ">
								<ProgressBar completed={completedPercentage} />
							</div>
						)}
						{completedPercentage === 100 ? (
							<div className="justify-center items-center my-5">
								<div className="text-2xl font-bold py-7 w-full text-center shadow-md rounded-lg bg-green-600 text-white">
									Congratulations! You've completed this Course.
								</div>
								<div className="text-right">
									<button
										onClick={reviewHandle}
										className="bg-red-400 mr-10 py-3 px-4 text-white font-semibold text-xl mt-5 rounded-lg"
									>
										Leave a review
									</button>
									<Link
										to={`/Learn/Course/${courseId}/Certificate`}
										className="bg-blue-500 py-3 px-4 text-white font-semibold text-xl mt-5 rounded-lg"
									>
										Get Cetificate
									</Link>
								</div>
							</div>
						) : completedPercentage > 0 ? (
							<div className="flex text-2xl justify-between font-bold py-7 px-5 shadow-md items-center rounded-lg my-5">
								<div className="w-7/12">Pick up where you left off</div>
								<div>
									<button
										onClick={handleResumeCourse}
										className="bg-red-500 hover:bg-red-800 duration-500 font-semibold py-3 px-3 rounded-lg text-white"
									>
										Resume course
									</button>
								</div>
							</div>
						) : (
							<></>
						)}

						<div className="text-lg py-7 px-5 text-justify bg-amber-100 shadow-md items-center rounded-lg my-5">
							<span className="font-semibold">Course Description: </span>
							{courseDetails.courseDescription}
						</div>

						<div className="flex flex-col">
							{courseDetails.chapters.$values.map((chapter) => (
								<div
									key={chapter.chapterId}
									className="border p-4 rounded-lg mb-5"
								>
									<div className="flex justify-between items-center font-semibold text-xl">
										<div className="flex items-center ">
											<div>
												{completedChapters.includes(chapter.chapterId) ? (
													<div className="flex items-center">
														<IconCheckCircleFill fill="green" />
													</div>
												) : (
													<div>
														<IconCheckCircleFill />
													</div>
												)}
											</div>
											<div className="text-2xl ml-2">
												{chapter.chapterTitle}
											</div>
										</div>
										<Link
											to={`/Learn/Course/${courseDetails.courseId}/Chapter/${chapter.chapterId}`}
											className="bg-blue-500 text-white hover:bg-blue-800 px-4 py-2 rounded-lg duration-500"
										>
											Learn
										</Link>
									</div>
									{/* {chapter.lessons.$values.length > 0 && (
										<div>
											<h4 className="font-semibold">Lessons:</h4>
											<ul className="list-disc list-inside">
												{chapter.lessons.$values.map((lesson) => (
													<li key={lesson.lessonId}>{lesson.lessonTitle}</li>
												))}
											</ul>
										</div>
									)}
									{chapter.tests.$values.length > 0 && (
										<div className="mt-4">
											<h4 className="font-semibold">Tests:</h4>
											<ul className="list-disc list-inside">
												{chapter.tests.$values.map((test) => (
													<li key={test.testId}>{test.testTitle}</li>
												))}
											</ul>
										</div>
									)} */}
								</div>
							))}
						</div>
					</div>

					<div className="w-full lg:w-1/3 lg:pl-5 ml-5 justify-between flex flex-col text-gray-600 border p-5 mt-5 text-xl rounded-xl shadow-xl">
						<img
							src={courseDetails.featureImage}
							className="w-full rounded-md"
						/>
						<p className="border-0 border-b mt-4 py-3 flex items-center justify-between">
							<span className="flex items-center">
								<span className="mr-2">
									<IconBxsBarChartAlt2 fill="DodgerBlue" />
								</span>
								Skill Level
							</span>
							<span className="float-right">
								{courseDetails.courseLevel.courseLevelName}
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
								{courseDetails.chapters.$values.length}
							</span>
						</p>
						<p className="border-0 border-b mt-4 py-3 flex items-center justify-between">
							<span className="flex items-center">
								<span className="mr-2">
									<IconPricetags fill="DodgerBlue" />
								</span>
								Category
							</span>
							<span className="float-right">
								{courseDetails.category.courseCategoryName}
							</span>
						</p>
						<p className="py-3 mt-4 flex items-center justify-between">
							<span className="flex items-center">
								<span className="mr-2">
									<IconMoneyBillWave fill="DodgerBlue" />
								</span>
								Price
							</span>
							<span className="float-right">
								{courseDetails.coursePrice.toLocaleString()} VND
							</span>
						</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default CourseLearn;
