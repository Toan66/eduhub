import React, { useState } from "react";
import { Link } from "react-router-dom";

function SimpleSlider({ courses }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex < courses.length - 2 ? prevIndex + 1 : prevIndex
		);
	};

	return (
		<div className="flex items-center justify-center">
			<button
				onClick={handlePrev}
				disabled={currentIndex === 0}
				className="disabled:opacity-50 disabled:cursor-not-allowed p-2 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Prev
			</button>
			<div className="flex overflow-hidden">
				{courses.slice(currentIndex, currentIndex + 2).map((course) => (
					<div key={course.courseId} className="flex-none w-1/2 p-2">
						<Link
							to={`/Course/${course.courseId}`}
							className="block border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out"
						>
							{course.featureImage && (
								<img
									src={course.featureImage}
									alt="Course"
									className="w-full h-32 object-cover rounded-md"
								/>
							)}
							<div className="mt-2 font-semibold text-center">
								{course.courseName}
							</div>
						</Link>
					</div>
				))}
			</div>
			<button
				onClick={handleNext}
				disabled={currentIndex >= courses.length - 2}
				className="disabled:opacity-50 disabled:cursor-not-allowed p-2 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Next
			</button>
		</div>
	);
}

export default SimpleSlider;
