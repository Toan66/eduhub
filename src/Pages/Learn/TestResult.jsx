import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default () => {
	const navigate = useNavigate();
	const { courseId, chapterId, testId, resultId } = useParams();
	const [testResult, setTestResult] = useState(null);

	useEffect(() => {
		const fetchTestResult = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Test/attempts/${resultId}`
				);
				setTestResult(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Failed to fetch test result:", error);
				// Handle error, e.g., navigate back or show a message
			}
		};

		if (resultId) {
			fetchTestResult();
		}
	}, [resultId]);

	return (
		<>
			{testResult && (
				<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-5 p-4">
					<div className="md:flex">
						<div className="p-4 text-3xl">
							<div className="uppercase tracking-wide text-indigo-500 font-semibold">
								Test Result
							</div>
							<p className="block mt-1 leading-tight font-medium text-black">
								Attempt ID: {testResult.testAttemptId}
							</p>
							<p className="mt-4 text-gray-500">Test ID: {testResult.testId}</p>
							<p className="mt-4 text-gray-500">User ID: {testResult.userId}</p>
							<p className="mt-4 text-gray-500">
								Attempt Date:{" "}
								{new Date(testResult.attemptDate).toLocaleString()}{" "}
							</p>
							<p className="mt-4 text-gray-500">Score: {testResult.score}</p>
							{testResult.score >= 8 ? (
								<p className="mt-4 text-3xl font-bold text-green-500">
									You pass the test!
								</p>
							) : (
								<p className="mt-4 text-3xl font-bold text-red-500">
									You fail the test {":((("}
								</p>
							)}
						</div>
					</div>
					<Link
						to={`/Learn/Course/${courseId}/Chapter/${chapterId}`}
						className="text-2xl flex w-1/2 float-right justify-center items-center font-semibold bg-black text-white px-4 py-2 rounded-lg"
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
			)}
		</>
	);
};
