import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import IconStar from "../../Components/Icons/IconStar";

function CourseLearn() {
	const { courseId } = useParams();
	const [courseDetails, setCourseDetails] = useState(null);

	useEffect(() => {
		const fetchCourseDetails = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/course/${courseId}/details`
				);
				console.log(response.data);
				setCourseDetails(response.data);
			} catch (error) {
				console.error("Error fetching course details:", error);
			}
		};

		fetchCourseDetails();
	}, [courseId]);

	return (
		<div className=" mx-auto p-3">
			{courseDetails && (
				<div className="flex">
					<div className="w-full lg:w-2/3">
						<div className=" mb-8">
							<h2 className="text-5xl font-bold">{courseDetails.courseName}</h2>
							<p className="text-xl mt-2">{courseDetails.courseDescription}</p>
							<p className="text-lg mt-2">
								Price: {courseDetails.coursePrice.toLocaleString()} VND
							</p>
							<p className="text-lg mt-2 flex items-center">
								Average Rating: {courseDetails.averageRating || 0}
								<span>
									<IconStar />
								</span>
							</p>
						</div>
						<div className="flex flex-col">
							{courseDetails.chapters.$values.map((chapter) => (
								<div
									key={chapter.chapterId}
									className="border p-4 rounded-lg mb-5"
								>
									<h3 className="font-semibold text-xl mb-2">
										{chapter.chapterTitle}
									</h3>
									{chapter.lessons.$values.length > 0 && (
										<div>
											<h4 className="font-semibold">Lessons:</h4>
											<ul className="list-disc list-inside">
												{chapter.lessons.$values.map((lesson) => (
													<li key={lesson.lessonId}>{lesson.lessonTitle}</li>
												))}
											</ul>
										</div>
									)}
									{chapter.tests.$values.length > 0 && (
										<div className="mt-4">
											<h4 className="font-semibold">Tests:</h4>
											<ul className="list-disc list-inside">
												{chapter.tests.$values.map((test) => (
													<li key={test.testId}>{test.testTitle}</li>
												))}
											</ul>
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					<div className="w-full lg:w-1/3 lg:pl-5">
						<img
							src={courseDetails.featureImage}
							className="w-full rounded-md"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default CourseLearn;
