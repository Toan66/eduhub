import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import IconClose from "../Components/Icons/IconClose";
import IconDragHandleDots2 from "../Components/Icons/IconDragHandleDots2";
import IconDragHorizontal from "../Components/Icons/IconDragHorizontal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function TestForm() {
	const { chapterId } = useParams();
	const [testTitle, setTestTitle] = useState("");
	const [testDescription, setTestDescription] = useState("");
	const navigate = useNavigate();

	const [questions, setQuestions] = useState([
		{
			questionText: "",
			answers: [{ answerText: "", isCorrect: true }],
		},
	]);

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

	const handleQuestionChange = (e, questionIndex) => {
		const newQuestions = [...questions];
		newQuestions[questionIndex].questionText = e.target.value;
		setQuestions(newQuestions);
	};

	const handleAnswerChange = (e, questionIndex, answerIndex) => {
		const newQuestions = [...questions];
		newQuestions[questionIndex].answers[answerIndex].answerText =
			e.target.value;
		setQuestions(newQuestions);
	};

	const handleSelectCorrectAnswer = (questionIndex, answerIndex) => {
		const newQuestions = [...questions];
		newQuestions[questionIndex].answers.forEach((answer) => {
			answer.isCorrect = false;
		});
		newQuestions[questionIndex].answers[answerIndex].isCorrect = true;
		setQuestions(newQuestions);
	};
	const handleRemoveQuestion = (questionIndex) => {
		const newQuestions = questions.filter(
			(_, index) => index !== questionIndex
		);
		setQuestions(newQuestions);
	};

	const handleRemoveAnswer = (questionIndex, answerIndex) => {
		const newQuestions = [...questions];
		newQuestions[questionIndex].answers = newQuestions[
			questionIndex
		].answers.filter((_, index) => index !== answerIndex);
		setQuestions(newQuestions);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Xử lý submit form ở đây
		const data = {
			testTitle: testTitle,
			testDescription: testDescription,
			questions: questions,
		};
		try {
			const response = await axios.post(
				`https://localhost:7291/api/Test/Chapter/${chapterId}/addTest`,
				{
					testTitle: testTitle,
					testDescription: testDescription,
					questions: questions,
				},
				{ withCredentials: true }
			);

			if (response.status === 200) {
				Swal.fire("Test has been created successfully!");
				navigate(-1); // Navigate back to the previous page
			}
		} catch (error) {
			console.error("Error creating lesson:", error);
			Swal.fire("An error occurred while creating the test.");
		}
	};

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;

		const items = Array.from(questions);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setQuestions(items);
	};
	const handleOnDragEndAnswers = (result) => {
		if (!result.destination) return;

		const { source, destination } = result;
		// Giả sử droppableId được đặt theo định dạng "answers-questionIndex"
		const questionIndex = parseInt(source.droppableId.split("-")[1]);
		if (
			isNaN(questionIndex) ||
			questionIndex < 0 ||
			questionIndex >= questions.length
		) {
			console.error("Invalid question index");
			return; // Thoát khỏi hàm nếu questionIndex không hợp lệ
		}

		const newQuestions = [...questions];
		const answers = [...newQuestions[questionIndex].answers]; // Lấy mảng câu trả lời của câu hỏi đó
		const [reorderedAnswer] = answers.splice(source.index, 1); // Lấy câu trả lời được kéo
		answers.splice(destination.index, 0, reorderedAnswer); // Chèn lại câu trả lời vào vị trí mới

		newQuestions[questionIndex].answers = answers; // Cập nhật mảng câu trả lời trong câu hỏi
		setQuestions(newQuestions); // Cập nhật state
	};

	return (
		<div className="p-3">
			{/* <DragDropContext>
                <Droppable droppableId="question ">
                    {(provided) => (
                        <form {...provided.droppableProps} ref={provided.innerRef} onSubmit={handleSubmit} className="space-y-6">

                            {questions.map((question, questionIndex) => (
                                <Draggable key={questionIndex} draggableId={question.questionText} index={questionIndex} >
                                    {(provided) => (

                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="p-4 border-2 border-gray-200 rounded-lg shadow-sm space-y-4">
                                            <div className="flex justify-between">
                                                <input
                                                    type="text"
                                                    placeholder="Câu hỏi"
                                                    value={question.questionText}
                                                    onChange={(e) => handleQuestionChange(e, questionIndex)}
                                                    className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
                                                />
                                                <button type="button" onClick={() => handleRemoveQuestion(questionIndex)} className="ml-2 px-4 py-2 text-xl">
                                                    <IconClose />
                                                </button>
                                            </div>
                                            {question.answers.map((answer, answerIndex) => (
                                                <div key={answerIndex} className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Câu trả lời"
                                                        value={answer.answerText}
                                                        onChange={(e) => handleAnswerChange(e, questionIndex, answerIndex)}
                                                        className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
                                                    />
                                                    <input
                                                        type="radio"
                                                        name={`correctAnswer-${questionIndex}`}
                                                        checked={answer.isCorrect}
                                                        onChange={() => handleSelectCorrectAnswer(questionIndex, answerIndex)}
                                                        className="form-radio"
                                                    />
                                                    <button type="button" onClick={() => handleRemoveAnswer(questionIndex, answerIndex)} className="px-4 py-2 text-xl">
                                                        <IconClose />
                                                    </button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => handleAddAnswer(questionIndex)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Thêm câu trả lời</button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            <button type="button" onClick={handleAddQuestion} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">Thêm câu hỏi</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">Lưu bài test</button>
                        </form>
                    )}
                </Droppable>
            </DragDropContext> */}

			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="questions">
					{(provided) => (
						<form
							{...provided.droppableProps}
							ref={provided.innerRef}
							onSubmit={handleSubmit}
							className="space-y-6"
						>
							<div className="text-3xl font-bold">Create Test</div>
							<div className="">
								<label className="text-xl font-bold">Test Title</label>
								<input
									type="text"
									placeholder="Test Title"
									value={testTitle}
									onChange={(e) => setTestTitle(e.target.value)}
									className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
								/>
								<label className="text-xl font-bold">Test Description</label>
								<textarea
									placeholder="Test Description"
									value={testDescription}
									onChange={(e) => setTestDescription(e.target.value)}
									className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors "
									rows="3"
								></textarea>
							</div>

							<div className="text-xl font-bold">Questions and Answers</div>

							{questions.map((question, questionIndex) => (
								<Draggable
									key={questionIndex}
									draggableId={`question-${questionIndex}`}
									index={questionIndex}
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
											<div className="flex justify-between text-xl">
												<input
													type="text"
													placeholder="Question"
													value={question.questionText}
													onChange={(e) =>
														handleQuestionChange(e, questionIndex)
													}
													className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
												/>
												<button
													type="button"
													onClick={() => handleRemoveQuestion(questionIndex)}
													className="ml-2 px-4 py-2 text-xl"
												>
													<IconClose />
												</button>
											</div>

											<DragDropContext onDragEnd={handleOnDragEndAnswers}>
												<Droppable droppableId={`answers-${questionIndex}`}>
													{(provided) => (
														<div
															{...provided.droppableProps}
															ref={provided.innerRef}
														>
															{question.answers.map((answer, answerIndex) => (
																<Draggable
																	key={answerIndex}
																	draggableId={`answer-${questionIndex}-${answerIndex}`}
																	index={answerIndex}
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
																				placeholder="Answer"
																				value={answer.answerText}
																				onChange={(e) =>
																					handleAnswerChange(
																						e,
																						questionIndex,
																						answerIndex
																					)
																				}
																				className="w-full p-2 border-2 text-xl border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
																			/>
																			<input
																				type="radio"
																				name={`correctAnswer-${questionIndex}`}
																				checked={answer.isCorrect}
																				onChange={() =>
																					handleSelectCorrectAnswer(
																						questionIndex,
																						answerIndex
																					)
																				}
																				className="form-radio"
																			/>
																			<button
																				type="button"
																				onClick={() =>
																					handleRemoveAnswer(
																						questionIndex,
																						answerIndex
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
															{provided.placeholder}{" "}
															{/* Ensure this is included */}
															<button
																type="button"
																onClick={() => handleAddAnswer(questionIndex)}
																className="px-4 py-2 bg-blue-500 text-white text-xl font-semibold rounded-md hover:bg-blue-600 transition-colors"
															>
																Add Answer
															</button>
														</div>
													)}
												</Droppable>
											</DragDropContext>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
							<button
								type="button"
								onClick={handleAddQuestion}
								className="px-4 py-2 text-xl font-semibold mr-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
							>
								Add Question
							</button>
							<button
								type="submit"
								className="px-4 py-2 text-xl font-semibold bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
							>
								Save Test
							</button>
						</form>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}

export default TestForm;
