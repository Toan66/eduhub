import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CourseEditor() {
    const { courseId } = useParams(); // Lấy ID của khóa học từ URL
    const [course, setCourse] = useState(null); // State lưu trữ thông tin khóa học

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
            <h1 className="text-2xl font-bold mb-4">{course.courseName}</h1>
            <p className="mb-2">{course.courseDescription}</p>
            <div>
                <h2 className="text-xl font-semibold">Chapters</h2>
                {course.chapters.$values.map((chapter) => (
                    <div key={chapter.chapterId} className="mb-4">
                        <h3 className="text-lg font-semibold">{chapter.chapterTitle}</h3>
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