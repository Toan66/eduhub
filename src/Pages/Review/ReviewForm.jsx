import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Rating from "../../Components/Rating";
import StarRating from "../../Components/StarRating";

const ReviewForm = () => {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const [course, setCourse] = useState(null);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	useEffect(() => {
		const fetchCourseDetails = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/course/${courseId}/details`
				);
				setCourse(response.data);
			} catch (error) {
				console.error("Error fetching course details:", error);
			}
		};

		fetchCourseDetails();
	}, [courseId]);

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent the default form submission behavior

		try {
			const response = await axios.post(
				`https://localhost:7291/api/Review/${courseId}`,
				{
					rating,
					comment,
				},
				{
					withCredentials: true, // If your API requires authentication
				}
			);
			console.log("Review submitted successfully", response.data);
			setRating(0);
			setComment("");
			Swal.fire("Success", "Review submitted successfully!", "success");
			navigate(`/Course/${courseId}`);
		} catch (error) {
			console.error("Error submitting review:", error);
			Swal.fire("Failed", "Failed to submit review.", "error");
		}
	};

	if (!course) return <div>Loading course details...</div>;

	return (
		<div className="max-w-4xl mx-auto p-4">
			{/* Course details */}
			<div className="mb-8">
				<Link
					to={`/Course/${courseId}`}
					className="text-3xl font-bold mb-2 hover:text-blue-500"
				>
					{course.courseName}
				</Link>
				<img
					className="rounded-xl"
					src={course.featureImage}
					alt={course.courseName}
				/>
				<p className="text-gray-700 mb-4">{course.courseDescription}</p>
				<div className="flex items-center mb-4">
					<span>
						<Rating rating={course.rating} />
					</span>
					<span className="ml-4 text-lg text-gray-600">
						Price: {course.coursePrice.toLocaleString()} VND
					</span>
				</div>
			</div>
			<div className="bg-white shadow-md rounded-lg p-6">
				<h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="rating" className="block font-medium text-gray-700">
							Rating
						</label>
						<StarRating onChange={(rate) => setRating(rate)} />
					</div>
					<div className="mb-4">
						<label
							htmlFor="review"
							className="block text-sm font-medium text-gray-700"
						>
							Review
						</label>
						<textarea
							id="review"
							name="review"
							rows="4"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						></textarea>
					</div>
					<button
						type="submit"
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Submit Review
					</button>
				</form>
			</div>
		</div>
	);
};

export default ReviewForm;
