import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ChapterEditor() {
    const { chapterId } = useParams(); // Lấy ID của khóa học và chapter từ URL
    const [chapter, setChapter] = useState(null); // State lưu trữ thông tin chapter
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch thông tin chapter sử dụng API mới
        const fetchChapter = async () => {
            try {
                // Sử dụng API mới để lấy thông tin chi tiết của chapter
                const response = await axios.get(`https://localhost:7291/api/Chapter/${chapterId}/details`);
                setChapter(response.data);
                // API trả về thông tin chi tiết của chapter bao gồm cả các bài học
            } catch (error) {
                console.error('Error fetching chapter details:', error);
            }
        };

        fetchChapter();
    }, [chapterId]); // Chỉ cần chapterId vì API mới không yêu cầu courseId

    if (!chapter) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 w">
            <h1 className="text-2xl font-bold mb-4">Edit Chapter: {chapter.chapterTitle}</h1>
            <p className="mb-2">Description: {chapter.chapterDescription || 'Dont have description'}</p>
            <div className="">
                <h2 className="text-xl font-semibold inline-block mr-16">Lesson</h2>
                <Link to={`/Chapter/${chapter.chapterId}/CreateLesson`} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 inline-block rounded">
                    Add Lesson
                </Link>
                {chapter.lessons && chapter.lessons.$values.map((lesson) => (
                    <div key={lesson.lessonId} className="mb-4">
                        <h3 className="text-lg font-semibold">{lesson.lessonTitle}</h3>
                        <p>{lesson.lessonContent}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Back
            </button>
        </div>
    );
}

export default ChapterEditor;