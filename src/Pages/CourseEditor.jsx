import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function CourseEditor() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    useEffect(() => {
        // Fetch thông tin khóa học
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`https://localhost:7291/api/Course/${courseId}/details`);
                setCourse(response.data);
                // Giả sử API trả về cả thông tin các chapter trong khóa học
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (!course) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">{course.courseName}</h1>
                <p className="mb-2">{course.courseDescription}</p>
                {course.featureImage && (
                    <img src={course.featureImage} alt="Feature" className="w-full max-w-xs object-cover rounded-lg" />
                )}
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Chapters</h2>
                    <Link to={`/Course/${course.courseId}/CreateChapter`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Chapter
                    </Link>
                </div>
                {course.chapters.$values.map((chapter) => (
                    <div key={chapter.chapterId} className="mb-4">
                        <h3 className="text-lg font-semibold">{chapter.chapterTitle}</h3>
                        <Link to={`/Chapter/${chapter.chapterId}/Edit`} className="bg-blue-50">Edit</Link>
                        <ul className="list-disc pl-5">
                            {chapter.lessons.$values.map((lesson) => (
                                <li key={lesson.lessonId}>{lesson.lessonTitle}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseEditor;