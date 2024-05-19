import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import IconClose from "../../Components/Icons/IconClose";
import IconDragHandleDots2 from "../../Components/Icons/IconDragHandleDots2";
import IconDragHorizontal from "../../Components/Icons/IconDragHorizontal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TestEditor = () => {
	const navigate = useNavigate();
	const { testId } = useParams();
	const [testData, setTestData] = useState({
		testTitle: "",
		testDescription: "",
		questions: [],
	});
	const [testTitle, setTestTitle] = useState("");
	const [testDescription, setTestDescription] = useState("");
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const fetchTest = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Test/${testId}/details`
				);
				// Chuyển đổi dữ liệu nhận được từ API
				const formattedData = {
					testTitle: response.data.testTitle,
					testDescription: response.data.testDescription,
					questions: response.data.questions.$values.map((q) => ({
						...q,
						answers: q.answers.$values,
					})),
				};
				// Cập nhật state với dữ liệu đã chuyển đổi
				setTestData(formattedData);
				setTestTitle(response.data.testTitle);
				setTestDescription(response.data.testDescription);
				setQuestions(formattedData.questions);
				console.log(formattedData);
			} catch (error) {
				console.error("Error fetching test data:", error);
				Swal.fire("Failed to load test data.");
			}
		};

		fetchTest();
	}, [testId]);

	const handleAddQuestion = () => {
		setQuestions([
			...questions,
			{ questionText: "", answers: [{ answerText: "", isCorrect: true }] },
		]);
	};

	const handleAddAnswer = (questionIndex) => {
		const newQuestions = [...questions];
		newQuestions[questionIndex].answers.push({
			answerText: "",
			isCorrect: false,
		});
		setQuestions(newQuestions);
	};

	const handleQuestionChange = (e, questionId) => {
		const newQuestions = questions.map((question) =>
			question.questionId === questionId
				? { ...question, questionText: e.target.value }
				: question
		);
		setQuestions(newQuestions);
	};

	const handleAnswerChange = (e, questionId, answerId) => {
		const newQuestions = questions.map((question) => {
			if (question.questionId === questionId) {
				const newAnswers = question.answers.map((answer) =>
					answer.answerId === answerId
						? { ...answer, answerText: e.target.value }
						: answer
				);
				return { ...question, answers: newAnswers };
			}
			return question;
		});
		setQuestions(newQuestions);
	};

	const handleSelectCorrectAnswer = (questionId, answerId) => {
		const newQuestions = questions.map((question) => {
			if (question.questionId === questionId) {
				const newAnswers = question.answers.map((answer) => ({
					...answer,
					isCorrect: answer.answerId === answerId,
				}));
				return { ...question, answers: newAnswers };
			}
			return question;
		});
		setQuestions(newQuestions);
	};

	const handleRemoveQuestion = (questionId) => {
		const newQuestions = questions.filter(
			(question) => question.questionId !== questionId
		);
		setQuestions(newQuestions);
	};

	const handleRemoveAnswer = (questionId, answerId) => {
		const newQuestions = questions.map((question) => {
			if (question.questionId === questionId) {
				const newAnswers = question.answers.filter(
					(answer) => answer.answerId !== answerId
				);
				return { ...question, answers: newAnswers };
			}
			return question;
		});
		setQuestions(newQuestions);
	};

	const handleOnDragEnd = (result) => {
		if (!result.destination) return; // Kiểm tra nếu không có đích đến thì không làm gì cả

		// Sao chép mảng câu hỏi để không thay đổi trực tiếp trạng thái
		const items = Array.from(testData.questions);
		// Loại bỏ câu hỏi được kéo từ vị trí ban đầu
		const [reorderedItem] = items.splice(result.source.index, 1);
		// Chèn lại câu hỏi vào vị trí mới
		items.splice(result.destination.index, 0, reorderedItem);

		// Cập nhật trạng thái của testData với mảng câu hỏi mới
		setTestData({ ...testData, questions: items });
	};

	const handleOnDragEndAnswers = (result) => {
		// Kiểm tra xem có đích đến không, nếu không thì không làm gì cả
		if (!result.destination) return;

		// Tách ID câu hỏi và câu trả lời từ draggableId
		const ids = result.draggableId.split("-");
		const questionId = ids[1];
		const answerId = ids[2];

		// Tìm câu hỏi mà câu trả lời thuộc về
		const questionIndex = questions.findIndex(
			(q) => q.questionId.toString() === questionId
		);
		if (questionIndex === -1) return; // Nếu không tìm thấy câu hỏi, không làm gì cả

		// Sao chép mảng câu trả lời để không thay đổi trực tiếp trạng thái
		const newAnswers = Array.from(questions[questionIndex].answers);

		// Loại bỏ câu trả lời được kéo từ vị trí ban đầu
		const [reorderedAnswer] = newAnswers.splice(result.source.index, 1);

		// Chèn lại câu trả lời vào vị trí mới
		newAnswers.splice(result.destination.index, 0, reorderedAnswer);

		// Cập nhật mảng câu hỏi với mảng câu trả lời mới
		const newQuestions = [...questions];
		newQuestions[questionIndex] = {
			...newQuestions[questionIndex],
			answers: newAnswers,
		};

		// Cập nhật trạng thái của câu hỏi với mảng mới
		setQuestions(newQuestions);
	};

	// Add or remove questions/answers, handle submission, etc., as needed

	return (
		<div className="container mx-auto max-w-screen-lg">
			<button
				onClick={() => navigate(-1)}
				type="button"
				className="flex text-lg items-center"
			>
				<svg
					className="w-5 h-5 rtl:rotate-180"
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
				<span>Back to Chapter Setup</span>
			</button>

			<h1 className="text-3xl font-bold mb-4">Edit Test</h1>

			<div className="w-full lg:max-w-screen-sm">
				<div className="mb-4">
					<label
						htmlFor="testTitle"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Test Title
					</label>
					<input
						type="text"
						id="testTitle"
						value={testTitle}
						onChange={(e) => setTestTitle(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="testDescription"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Test Description
					</label>
					<textarea
						type="text"
						id="testDescription"
						value={testDescription}
						onChange={(e) => setTestDescription(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
			</div>

			{/* {testData.questions.map((question) => (
                <div key={question.questionId} className="mb-4">
                    {console.log(question.questionId)}
                    <h2 className="text-xl font-bold mb-2">Question {question.questionId + 1}</h2>
                    <p>{question.questionContent}</p>
                    {question.answers.map((answer) => (
                        <div key={answer.answerId}>
                            {console.log(answer.answerId)}
                            <div className="mb-4">
                                <label htmlFor="questionText" className="block text-gray-700 text-sm font-bold mb-2">Answer: </label>
                                <div>{answer.answerContent}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))} */}

			<div className=" ">
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="questions">
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{/* questions, answers mapping */}
								{testData.questions.map((question) => (
									<Draggable
										key={question.questionId}
										draggableId={`question-${question.questionId}`}
										index={question.questionPosition - 1}
									>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												className="p-4 border-2 border-gray-200 rounded-lg shadow-sm space-y-4"
											>
												<div
													{...provided.dragHandleProps}
													className="align-middle text-center flex items-center justify-center"
												>
													<IconDragHorizontal />
												</div>
												<div className="flex justify-between">
													<input
														type="text"
														placeholder="Câu hỏi"
														value={question.questionContent}
														onChange={(e) =>
															handleQuestionChange(e, question.questionId)
														}
														className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
													/>
													<button
														type="button"
														onClick={() =>
															handleRemoveQuestion(question.questionId)
														}
														className="ml-2 px-4 py-2 text-xl"
													>
														<IconClose />
													</button>
												</div>

												<DragDropContext
													onDragEnd={(result) =>
														handleOnDragEndAnswers(result, question.questionId)
													}
												>
													<Droppable
														droppableId={`answers-${question.questionId}`}
													>
														{(provided) => (
															<div
																{...provided.droppableProps}
																ref={provided.innerRef}
															>
																{question.answers.map((answer) => (
																	<Draggable
																		key={answer.answerId}
																		draggableId={`answer-${question.questionId}-${answer.answerId}`}
																		index={answer.answerPosition - 1}
																	>
																		{(provided) => (
																			<div
																				ref={provided.innerRef}
																				{...provided.draggableProps}
																				className="flex items-center space-x-2 my-3"
																			>
																				<div {...provided.dragHandleProps}>
																					<IconDragHandleDots2 />
																				</div>
																				<input
																					type="text"
																					placeholder="Câu trả lời"
																					value={answer.answerContent}
																					onChange={(e) =>
																						handleAnswerChange(
																							e,
																							question.questionId,
																							answer.answerId
																						)
																					}
																					className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
																				/>
																				<input
																					type="radio"
																					name={`correctAnswer-${question.questionId}`}
																					checked={answer.isCorrect}
																					onChange={() =>
																						handleSelectCorrectAnswer(
																							question.questionId,
																							answer.answerId
																						)
																					}
																					className="form-radio"
																				/>
																				<button
																					type="button"
																					onClick={() =>
																						handleRemoveAnswer(
																							question.questionId,
																							answer.answerId
																						)
																					}
																					className="px-4 py-2 text-xl"
																				>
																					<IconClose />
																				</button>
																			</div>
																		)}
																	</Draggable>
																))}
																{provided.placeholder}
															</div>
														)}
													</Droppable>
												</DragDropContext>
											</div>
										)}
									</Draggable>
								))}

								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</div>
	);
};

export default TestEditor;
