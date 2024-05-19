import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default () => {
	const navigate = useNavigate();
	const { courseId, chapterId, testId } = useParams();
	const [test, setTest] = useState(null);
	const [showTest, setShowTest] = useState(false);
	const [selectedAnswers, setSelectedAnswers] = useState([]);

	useEffect(() => {
		const fetchTestDetails = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Test/${testId}/details`,
					{ withCredentials: true }
				);
				setTest(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching test details:", error);
				navigate("/Unauthorized");
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
		fetchTestDetails();
	}, [testId, navigate]);

	const handleStartTest = () => {
		setShowTest(true);
	};

	const handleAnswerChange = (questionId, answerId) => {
		// Loại bỏ câu trả lời cũ của câu hỏi này nếu có
		const newAnswers = selectedAnswers.filter(
			(answer) => answer.questionId !== questionId
		);
		// Thêm câu trả lời mới vào mảng
		newAnswers.push({ questionId, answerId });
		setSelectedAnswers(newAnswers);
	};

	const handleSubmitTest = () => {
		console.log(selectedAnswers);
		submitTest(); // Gọi function submitTest khi nộp bài
	};

	const submitTest = async () => {
		const submitData = {
			testId: parseInt(testId),
			answers: selectedAnswers,
		};

		try {
			const response = await axios.post(
				`https://localhost:7291/api/Test/submitTest`,
				submitData,
				{ withCredentials: true }
			);
			console.log("Submit response:", response.data);
			// Xử lý sau khi submit thành công, ví dụ: thông báo hoặc chuyển hướng người dùng
		} catch (error) {
			console.error("Error submitting test:", error);
			// Xử lý lỗi, ví dụ: thông báo lỗi cho người dùng
		}
	};

	return (
		<div className="mx-auto p-3">
			{test && (
				<div>
					<div className="flex justify-between items-center border-gray pb-3 border-b">
						<div className="text-5xl font-bold">{test.testTitle}</div>
						<Link
							to={`/Learn/Course/${courseId}/Chapter/${chapterId}`}
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
							Back to Chapter
						</Link>
					</div>

					<div className="text-xl">
						<span className="font-semibold">Test Description: </span>
						{test.testDescription}
					</div>
					<button
						onClick={handleStartTest}
						className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-2xl font-semibold"
					>
						Do Test
					</button>

					{showTest && (
						<div className="mt-4 text-2xl px-32">
							{test.questions.$values.map((question, index) => (
								<div key={question.questionId} className="mb-4">
									<div className="font-semibold">
										{index + 1}. {question.questionContent}
									</div>
									{question.answers.$values.map((answer) => (
										<div
											key={answer.answerId}
											className={`p-2 ${
												selectedAnswers.find(
													(a) =>
														a.questionId === question.questionId &&
														a.answerId === answer.answerId
												)
													? "bg-gray-200"
													: "bg-transparent"
											}`}
										>
											<label className="flex items-center space-x-2">
												<input
													type="radio"
													name={`question-${question.questionId}`}
													value={answer.answerId}
													onChange={() =>
														handleAnswerChange(
															question.questionId,
															answer.answerId
														)
													}
												/>
												<span>{answer.answerContent}</span>
											</label>
										</div>
									))}
								</div>
							))}{" "}
							<button
								onClick={handleSubmitTest}
								className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-xl font-semibold"
							>
								Submit
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
