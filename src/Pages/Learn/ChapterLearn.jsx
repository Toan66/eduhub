import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import IconPlayCircle from "../../Components/Icons/IconPlayCircle";
import IconCheck2Circle from "../../Components/Icons/IconCheck2Circle";
import ProgressBar from "../../Components/ProgressBar";

export default () => {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const { chapterId } = useParams();
	const [chapter, setChapter] = useState(null);
	const [selectedLesson, setSelectedLesson] = useState(null);
	const [selectedTest, setSelectedTest] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [completedItems, setCompletedItems] = useState({
		completedLessons: [],
		completedTests: [],
	});
	const [completionPercentage, setCompletionPercentage] = useState(0);

	useEffect(() => {
		const fetchChapter = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Chapter/${chapterId}/details`,
					{ withCredentials: true }
				);
				setChapter(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching chapter details:", error);
				navigate("/Unauthorized");
			}
		};

		const fetchCompletedItems = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Chapter/${chapterId}/completedItems`,
					{ withCredentials: true }
				);
				const data = response.data;
				setCompletedItems({
					...completedItems,
					completedLessons: data.completedLessons
						? data.completedLessons.$values
						: [],
					completedTests: data.completedTests
						? data.completedTests.$values
						: [],
				});
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching completed items:", error);
			}
		};

		const fetchCompletionPercentage = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Chapter/${chapterId}/completion`,
					{ withCredentials: true }
				);
				setCompletionPercentage(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching chapter completion:", error);
			}
		};

		const checkEnroll = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/course/${courseId}/isEnrolled`,
					{ withCredentials: true }
				);
				console.log(response.data.isEnrolled);
				if (!response.data.isEnrolled) {
					navigate("/Unauthorized");
					return;
				}
			} catch (error) {
				console.error("Error fetching reviews:", error);
			}
		};

		checkEnroll();
		fetchChapter();
		fetchCompletionPercentage();
		fetchCompletedItems();
	}, [chapterId, courseId, navigate]);

	const handleLessonSelect = (lesson) => {
		if (selectedLesson && lesson.lessonId === selectedLesson.lessonId) {
			setSelectedLesson(null);
		} else {
			setSelectedLesson(lesson);
		}
	};

	const handleTestSelect = (test) => {
		if (selectedTest && test.testId === selectedTest.testId) {
			setSelectedTest(null);
		} else {
			setSelectedTest(test);
		}
	};

	const handleSelectItem = (item, type) => {
		const itemId = type === "lesson" ? item.lessonId : item.testId;
		if (
			selectedItem &&
			itemId === selectedItem.id &&
			type === selectedItem.type
		) {
			setSelectedItem(null);
		} else {
			setSelectedItem({ ...item, id: itemId, type });
		}
	};

	const markLessonAsComplete = async (lessonId) => {
		try {
			const response = await axios.post(
				`https://localhost:7291/api/Lesson/MarkComplete`,
				{
					lessonId: lessonId,
				},
				{ withCredentials: true }
			);
			if (response.status === 200) {
				console.log("Lesson marked as complete successfully");
				navigate(0);
				// Cập nhật UI hoặc thông báo cho người dùng
			}
		} catch (error) {
			console.error("Error marking lesson as complete:", error);
			// Xử lý lỗi (hiển thị thông báo lỗi, v.v.)
		}
	};

	return (
		<div className=" mx-auto p-3">
			{chapter && (
				<div>
					<div className="flex justify-between items-center border-gray pb-3 border-b">
						<div className="text-5xl font-bold">{chapter.chapterTitle}</div>
						<Link
							to={`/Learn/Course/${courseId}`}
							className="text-2xl flex items-center font-semibold bg-black text-white px-4 py-2 rounded-lg"
						>
							<svg
								className="w-5 h-5 mr-2 rtl:rotate-180 "
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
								/>
							</svg>
							Back to Course
						</Link>
					</div>
					<div className="lg:flex w-full">
						<div className="w-full lg:w-1/4 border-gray border-r">
							<div className="mt-3">
								<div className="my-5">
									<ProgressBar
										completed={completionPercentage.completionPercent}
									/>
								</div>
								{chapter.lessons.$values.map((lesson) => (
									<button
										key={lesson.lessonId}
										onClick={() => handleSelectItem(lesson, "lesson")}
										className={`w-full flex items-center text-xl py-6 px-4 hover:font-bold hover:bg-gray-100 ${
											selectedItem &&
											selectedItem.id === lesson.lessonId &&
											selectedItem.type === "lesson"
												? "bg-gray-100 font-bold text-blue-500"
												: "font-semibold"
										}`}
									>
										<IconPlayCircle height="25px" width="25px" />
										<div className="ml-3">{lesson.lessonTitle}</div>

										{completedItems.completedLessons.includes(
											lesson.lessonId
										) && (
											<div className="text-green-500">
												<IconCheck2Circle height="21px" width="21px" />
											</div>
										)}
									</button>
								))}
								{chapter.tests.$values.map((test) => (
									<button
										key={test.testId}
										onClick={() => handleSelectItem(test, "test")}
										className={`w-full flex items-center text-xl py-6 px-4 hover:font-bold hover:bg-gray-100 ${
											selectedItem &&
											selectedItem.id === test.testId &&
											selectedItem.type === "test"
												? "bg-gray-100 font-bold text-blue-500"
												: "font-semibold"
										}`}
									>
										<IconPlayCircle height="25px" width="25px" />
										<div className="ml-3">{test.testTitle}</div>
										{completedItems.completedTests.includes(test.testId) && (
											<div className="text-green-500">
												<IconCheck2Circle height="21px" width="21px" />
											</div>
										)}
									</button>
								))}
							</div>
						</div>
						<div className="w-full lg:w-3/4 p-4">
							{selectedItem ? (
								selectedItem.type === "lesson" ? (
									<div>
										<div className="flex justify-between border-gray border-b pb-3">
											<div className="text-3xl font-bold">
												{selectedItem.lessonTitle}
											</div>
											{completedItems.completedLessons.includes(
												selectedItem.lessonId
											) ? (
												<div className="text-xl items-center flex text-white font-semibold rounded-lg px-4 py-2 bg-green-500">
													Completed
													<IconCheck2Circle height="21px" width="21px" />
												</div>
											) : (
												<button
													onClick={() => markLessonAsComplete(selectedItem.id)}
													className="text-xl items-center flex text-white font-semibold bg-green-700 rounded-lg px-4 py-2 duration-500 hover:bg-green-500"
												>
													Mark as complete
													<IconCheck2Circle height="21px" width="21px" />
												</button>
											)}
										</div>
										{selectedItem.video && (
											<video
												controls
												src={selectedItem.video}
												className="mt-4 w-full"
											>
												Your browser does not support the video tag.
											</video>
										)}
										<div
											className="prose text-lg"
											dangerouslySetInnerHTML={{
												__html: selectedItem.lessonContent,
											}}
										></div>
									</div>
								) : (
									<div>
										<div className="flex justify-between border-gray border-b pb-3">
											<div className="text-3xl font-bold">
												{selectedItem.testTitle}
											</div>
											<div className="flex">
												<Link
													className="text-xl items-center flex text-white font-semibold bg-green-700 rounded-lg px-4 py-2 duration-500 hover:bg-green-500"
													to={`/Learn/Course/${courseId}/Chapter/${chapterId}/Test/${selectedItem.testId}`}
												>
													Do test
												</Link>
												{completedItems.completedTests.includes(
													selectedItem.testId
												) && (
													<div className="text-xl items-center flex text-white font-semibold rounded-lg px-4 py-2 duration-500 bg-green-500">
														Completed
														<IconCheck2Circle height="21px" width="21px" />
													</div>
												)}
											</div>
										</div>
										{/* Thêm nội dung khác cho test nếu cần */}
										<div className="text-xl font-semibold">
											Quesion:{" "}
											<span className="font-thin">
												{selectedItem.questions.$values.length}
											</span>
										</div>
										<div className="text-xl font-semibold">
											Description:{" "}
											<span className="font-thin">
												{selectedItem.testDescription}
											</span>
										</div>
									</div>
								)
							) : (
								<div className="text-3xl font-semibold">
									Select a lesson or test
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
