import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import VideoPlayer from "../../Components/VideoPlayer";

class MyUploadAdapter {
	constructor(loader) {
		this.loader = loader;
	}

	// Starts the upload process.
	upload() {
		return this.loader.file.then(
			(file) =>
				new Promise((resolve, reject) => {
					const storageRef = ref(storage, `images/${file.name}`);
					const uploadTask = uploadBytesResumable(storageRef, file);

					uploadTask.on(
						"state_changed",
						(snapshot) => {
							// Optional: Update progress
						},
						(error) => {
							reject(error);
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
								resolve({
									default: downloadURL,
								});
							});
						}
					);
				})
		);
	}
}

function MyCustomUploadAdapterPlugin(editor) {
	editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
		return new MyUploadAdapter(loader);
	};
}

function LessonEditor() {
	const { lessonId } = useParams(); // Assuming the route is setup to capture lessonId
	const navigate = useNavigate();
	const [lessonTitle, setLessonTitle] = useState("");
	const [lessonContent, setLessonContent] = useState("");
	const [video, setVideo] = useState("");
	const [uploadProgress, setUploadProgress] = useState(0);

	useEffect(() => {
		const fetchLesson = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Lesson/${lessonId}`
				);
				const lessonData = response.data;
				setLessonTitle(lessonData.lessonTitle);
				setLessonContent(lessonData.lessonContent);
				setVideo(lessonData.video);
			} catch (error) {
				console.error("Error fetching lesson data:", error);
				Swal.fire("Failed to load lesson data.");
			}
		};

		fetchLesson();
	}, [lessonId]);

	const handleVideoUpload = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const storageRef = ref(storage, `videos/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadProgress(progress);
			},
			(error) => {
				console.error("Upload error:", error);
				Swal.fire("Error uploading video: ", error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setVideo(downloadURL);
					setUploadProgress(0);
				});
			}
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(
				`https://localhost:7291/api/Lesson/${lessonId}`,
				{
					lessonTitle,
					lessonContent,
					video,
				},
				{ withCredentials: true }
			);

			Swal.fire("Lesson has been updated successfully!");
			navigate(-1); // Navigate back to the previous page
		} catch (error) {
			console.error("Error updating lesson:", error);
			Swal.fire("An error occurred while updating the lesson.");
		}
	};

	const handleDeleteLesson = async () => {
		try {
			await axios.delete(`https://localhost:7291/api/Lesson/${lessonId}`, {
				withCredentials: true,
			});
			Swal.fire("Lesson has been deleted successfully!");
			navigate(-1);
			// Navigate back to the previous page
			// navigate(-1);
		} catch (error) {
			console.error("Error deleting lesson:", error);
			Swal.fire("Failed to delete lesson.");
			// Navigate back to the previous page
			navigate(-1);
		}
	};

	return (
		<div className="container mx-auto sm:max-w-screen-lg">
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

			<button
				className="text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md inline-block float-right"
				onClick={handleDeleteLesson}
			>
				Delete Lesson
			</button>

			<h1 className="text-3xl font-bold mb-4">Edit Lesson</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="lessonTitle"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Lesson Title
					</label>
					<input
						type="text"
						id="lessonTitle"
						value={lessonTitle}
						onChange={(e) => setLessonTitle(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Lesson Content
					</label>
					<div className="prose">
						<CKEditor
							editor={ClassicEditor}
							data={lessonContent}
							config={{
								extraPlugins: [MyCustomUploadAdapterPlugin],
							}}
							onChange={(event, editor) => {
								const data = editor.getData();
								setLessonContent(data);
							}}
						/>
					</div>
				</div>

				<div className="mb-4">
					<VideoPlayer videoUrl={video} />

					<label
						htmlFor="video"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Video URL:{" "}
					</label>
					<p>{video}</p>
					<input
						type="file"
						accept="video/*"
						onChange={handleVideoUpload}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
					{uploadProgress > 0 && (
						<div className="text-sm text-gray-600">
							Uploading: {uploadProgress.toFixed(2)}%
						</div>
					)}
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Update Lesson
				</button>
			</form>
		</div>
	);
}

export default LessonEditor;
