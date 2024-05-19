import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Pencil from "../../Components/Icons/Pencil";
import IconAddCircleOutline from "../../Components/Icons/IconAddCircleOutline";
function ChapterEditor() {
	const { chapterId } = useParams(); // Lấy ID của khóa học và chapter từ URL
	const [chapter, setChapter] = useState(null); // State lưu trữ thông tin chapter
	const [editTitle, setEditTitle] = useState(false); // Quản lý việc hiển thị form chỉnh sửa
	const [newTitle, setNewTitle] = useState(""); // Giá trị title mới
	const [editDescription, setEditDescription] = useState(false); // Quản lý việc hiển thị form chỉnh sửa mô tả
	const [newDescription, setNewDescription] = useState(""); // Giá trị mô tả mới

	const navigate = useNavigate();

	useEffect(() => {
		const fetchChapter = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Chapter/${chapterId}/details/edit`,
					{ withCredentials: true }
				);
				setChapter(response.data);
			} catch (error) {
				console.error("Error fetching chapter details:", error);
				navigate("/Unauthorized");
			}
		};

		fetchChapter();
	}, [chapterId]);

	const handleDeleteChapter = async () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to delete this chapter?",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			// Mark this function as async
			if (result.isConfirmed) {
				try {
					await axios.delete(
						`https://localhost:7291/api/Chapter/${chapterId}`,
						{
							withCredentials: true,
						}
					);
					Swal.fire("Deleted", "Chapter deleted", "success");
					navigate(-1);
				} catch (error) {
					console.error("Error deleting chapter:", error);
					Swal.fire(`Failed to delete chapter, ${error.response.data}`);
				}
			}
		});
	};

	const handleUpdateTitle = async () => {
		try {
			await axios.put(
				`https://localhost:7291/api/Chapter/${chapterId}/updateTitle`,
				{
					chapterTitle: newTitle,
				},
				{ withCredentials: true }
			);
			// Cập nhật state của course để UI phản ánh sự thay đổi
			setChapter((prev) => ({ ...prev, chapterTitle: newTitle }));
			setEditTitle(false); // Ẩn form chỉnh sửa
		} catch (error) {
			console.error("Error updating chapter title:", error);
			Swal.fire(error);
		}
	};

	const handleUpdateDescription = async () => {
		try {
			await axios.put(
				`https://localhost:7291/api/Chapter/${chapterId}/updateChapterDescription`,
				{
					chapterDescription: newDescription,
				},
				{ withCredentials: true }
			);
			// Cập nhật state của course để UI phản ánh sự thay đổi
			setChapter((prev) => ({ ...prev, chapterDescription: newDescription }));
			setEditDescription(false); // Ẩn form chỉnh sửa
		} catch (error) {
			console.error("Error updating chapter description:", error);
		}
	};

	if (!chapter) return <div>Loading...</div>;

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
				<span>Back to Course Edit</span>
			</button>

			<button
				className="text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md inline-block float-right"
				onClick={handleDeleteChapter}
			>
				Delete Chapter
			</button>

			<h1 className="text-3xl font-bold mb-4">Chapter Setup</h1>

			<div className="flex flex-col justify-between md:flex-row">
				<div className="mb-8 w-full lg:w-1/2 pr-3">
					<div className="rounded-lg bg-indigo-50 p-3 mb-6">
						<div className="flex flex-row justify-between mb-4 text-lg">
							<div className="font-semibold w-1/2">Chapter title</div>
							<button
								onClick={() => {
									setEditTitle(true);
									setNewTitle(chapter.chapterTitle);
								}}
								className="font-semibold w-autobutton text-right items-center"
							>
								<span className="inline-block mr-2">
									<Pencil />
								</span>
								Edit title
							</button>
						</div>

						{editTitle ? (
							<div>
								<input
									className="w-full p-3 h-11 rounded-md overflow-y-scroll"
									type="text"
									value={newTitle}
									onChange={(e) => setNewTitle(e.target.value)}
								/>
								<button
									className="text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5"
									onClick={handleUpdateTitle}
								>
									Save
								</button>
								<button
									onClick={() => {
										setEditTitle(false);
									}}
									className="text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5"
								>
									Cancel
								</button>
							</div>
						) : (
							<div className="font-normal">{chapter.chapterTitle}</div>
						)}
					</div>
				</div>
				<div className="mb-8 w-full lg:w-1/2 pr-3">
					<div className="rounded-lg bg-indigo-50 p-3 mb-6">
						<div className="flex flex-row justify-between mb-4 text-lg">
							<div className="font-semibold w-1/2">Chapter description</div>
							<button
								onClick={() => {
									setEditDescription(true);
									setNewDescription(chapter.chapterDescription);
								}}
								className="font-semibold w-autobutton text-right items-center"
							>
								<span className="inline-block mr-2">
									<Pencil />
								</span>
								Edit description
							</button>
						</div>

						{editDescription ? (
							<div>
								<input
									className="w-full p-3 h-11 rounded-md overflow-y-scroll"
									type="text"
									value={newDescription}
									onChange={(e) => setNewDescription(e.target.value)}
								/>
								<button
									className="text-md bg-gray-800 text-white font-semibold px-5 py-2 rounded-md mt-5"
									onClick={handleUpdateDescription}
								>
									Save
								</button>
								<button
									onClick={() => {
										setEditDescription(false);
									}}
									className="text-md bg-sky-500 float-right text-white font-semibold px-5 py-2 rounded-md mt-5"
								>
									Cancel
								</button>
							</div>
						) : (
							<div className="font-normal">{chapter.chapterDescription}</div>
						)}
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-between md:flex-row flex-wrap">
				<div className="w-full text-2xl font-semibold mb-5">
					Chapter Lessons and Tests
				</div>
				<div className="mb-8 w-full lg:w-1/2 pr-3">
					<div className="rounded-lg bg-indigo-50 p-3 mb-6">
						<div className="flex flex-row justify-between items-center mb-4 text-lg">
							<div className="font-semibold w-1/2">Chapter lessons</div>
							<Link
								to={`/Chapter/${chapter.chapterId}/Lesson/Create`}
								className="font-semibold w-auto text-right items-center"
							>
								<span className="inline-block mr-2">
									<IconAddCircleOutline height="16px" width="16px" />
								</span>
								Add a lesson
							</Link>
						</div>

						<div className="flex flex-col p-2">
							{chapter.lessons.$values.map((lesson) => (
								<div
									key={lesson.lessonId}
									className="mb-4 flex py-3 flex-row justify-between bg-indigo-100 p-2 rounded-lg"
								>
									<h3 className=" font-semibold w-1/2">{lesson.lessonTitle}</h3>
									<Link
										to={`/Lesson/${lesson.lessonId}/Edit`}
										className="w-auto font-semibold text-right"
									>
										Edit
										<span className="inline-block ml-2">
											<Pencil />
										</span>
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mb-8 w-full lg:w-1/2 pr-3">
					<div className="rounded-lg bg-indigo-50 p-3 mb-6">
						<div className="flex flex-row justify-between items-center mb-4 text-lg">
							<div className="font-semibold w-1/2">Chapter tests</div>
							<Link
								to={`/Chapter/${chapter.chapterId}/Test/Create`}
								className="font-semibold w-auto text-right items-center"
							>
								<span className="inline-block mr-2">
									<IconAddCircleOutline height="16px" width="16px" />
								</span>
								Add a test
							</Link>
						</div>

						<div className="flex flex-col p-2">
							{chapter.tests.$values.map((test) => (
								<div
									key={test.testId}
									className="mb-4 flex py-3 flex-row justify-between bg-indigo-100 p-2 rounded-lg"
								>
									<h3 className=" font-semibold w-1/2">{test.testTitle}</h3>
									<Link
										to={`/Test/${test.testId}/Edit`}
										className="w-auto font-semibold text-right"
									>
										Edit
										<span className="inline-block ml-2">
											<Pencil />
										</span>
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChapterEditor;
