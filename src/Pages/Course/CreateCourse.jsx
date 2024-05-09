import React, { useEffect, useState } from "react";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.jsx";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
	const navigate = useNavigate();
	const [courseName, setCourseName] = useState("");
	const [courseDescription, setCourseDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [levelId, setLevelId] = useState("");
	const [featureImage, setFeatureImage] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [categories, setCategories] = useState([]);
	const [levels, setLevels] = useState([]);
	const [coursePrice, setCoursePrice] = useState(0); // State for course price
	const [courseEarn, setCourseEarn] = useState(0); // State for potential earnings

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const responseCategory = await axios.get(
					"https://localhost:7291/api/Course/category"
				);
				const responseLevel = await axios.get(
					"https://localhost:7291/api/Course/level"
				);
				setCategories(responseCategory.data.$values);
				setLevels(responseLevel.data.$values);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	const handleImageChange = (e) => {
		if (e.target.files[0]) {
			setFeatureImage(e.target.files[0]);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!featureImage) {
			console.error("No image selected");
			return;
		}
		const imageRef = ref(storage, `featureImages/${featureImage.name}`);
		const uploadTask = uploadBytesResumable(imageRef, featureImage);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadProgress(progress);
				console.log("Upload is " + progress + "% done");
			},
			(error) => {
				console.error("Upload failed:", error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					axios
						.post(
							"https://localhost:7291/api/Course/create",
							{
								courseName,
								courseDescription,
								categoryId,
								featureImage: downloadURL,
								courseLevelId: levelId,
								coursePrice, // Include course price in the API call
								courseEarn, // Include potential earnings in the API call
							},
							{ withCredentials: true }
						)
						.then((response) => {
							console.log(response.data);
							alert("Course created successfully");
							navigate("/Profile");
						})
						.catch((error) => {
							console.error("Error creating course:", error);
						});
				});
			}
		);
	};

	return (
		<div className="container mx-auto px-6 sm:max-w-screen-lg">
			<div className="font-semibold text-3xl">Create New Course</div>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="courseName"
						className="block text-sm font-medium text-gray-700"
					>
						Course Name
					</label>
					<input
						type="text"
						id="courseName"
						value={courseName}
						onChange={(e) => setCourseName(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
					/>
				</div>
				<div>
					<label
						htmlFor="courseDescription"
						className="block text-sm font-medium text-gray-700"
					>
						Course Description
					</label>
					<textarea
						id="courseDescription"
						value={courseDescription}
						onChange={(e) => setCourseDescription(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
						rows="3"
					></textarea>
				</div>

				<div>
					<label
						htmlFor="categoryId"
						className="block text-sm font-medium text-gray-700"
					>
						Category
					</label>
					<select
						id="categoryId"
						value={categoryId}
						onChange={(e) => setCategoryId(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
					>
						<option value="">Select a category</option>
						{categories.map((category) => (
							<option
								key={category.courseCategoryId}
								value={category.courseCategoryId}
							>
								{category.courseCategoryName}
							</option>
						))}
					</select>
				</div>

				<div>
					<label
						htmlFor="levelId"
						className="block text-sm font-medium text-gray-700"
					>
						Course Level
					</label>
					<select
						id="levelId"
						value={levelId}
						onChange={(e) => setLevelId(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
					>
						<option value="">Select a Level</option>
						{levels.map((level) => (
							<option key={level.courseLevelId} value={level.courseLevelId}>
								{level.courseLevelName}
							</option>
						))}
					</select>
				</div>

				<div>
					<label
						htmlFor="featureImage"
						className="block text-sm font-medium text-gray-700"
					>
						Feature Image
					</label>
					<input
						type="file"
						id="featureImage"
						onChange={handleImageChange}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
					/>
				</div>
				{uploadProgress > 0 && (
					<div>
						<label
							htmlFor="uploadProgress"
							className="block text-sm font-medium text-gray-700"
						>
							Upload Progress
						</label>
						<progress
							id="uploadProgress"
							value={uploadProgress}
							max="100"
							className="mt-1 block w-full"
						></progress>
						{uploadProgress < 100 ? (
							<p>Uploading: {uploadProgress.toFixed(2)}%</p>
						) : (
							<p>Upload Complete</p>
						)}
					</div>
				)}
				<div>
					<label
						htmlFor="coursePrice"
						className="block text-sm font-medium text-gray-700"
					>
						Course Price
					</label>
					<input
						type="number"
						id="coursePrice"
						value={coursePrice}
						onChange={(e) => setCoursePrice(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
					/>
				</div>
				<div>
					<label
						htmlFor="courseEarn"
						className="block text-sm font-medium text-gray-700"
					>
						Course Earn
					</label>
					<input
						type="number"
						id="courseEarn"
						value={courseEarn}
						onChange={(e) => setCourseEarn(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
					/>
				</div>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
				>
					Create Course
				</button>
			</form>
		</div>
	);
}

export default CreateCourse;
