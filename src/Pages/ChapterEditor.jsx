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
        <div className="container mx-auto px-4 sm:max-w-screen-lg">

            <button onClick={() => navigate(-1)} type="button" className="my-4 flex items-center justify-center w-1/2 px-5 py-2 text-smtransition-colors duration-200 bg-blue-500 hover:bg-blue-700 font-semibold text-white border rounded-lg gap-x-2 sm:w-auto">
                <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                <span>Back</span>
            </button>


            <h1 className="text-2xl font-bold mb-4">Edit Chapter: {chapter.chapterTitle}</h1>
            <p className="mb-2">Description: {chapter.chapterDescription || 'Dont have description'}</p>
            <div className="flex">
                <div className='w-1/2'>
                    <h2 className="text-xl font-semibold inline-block mr-16">Lesson</h2>
                    <Link to={`/Chapter/${chapter.chapterId}/Lesson/Create`} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 inline-block rounded">
                        Add Lesson
                    </Link>
                    {chapter.lessons && chapter.lessons.$values.map((lesson) => (
                        <div key={lesson.lessonId} className="mb-4">
                            <h3 className="text-lg font-semibold">{lesson.lessonTitle}</h3>

                            {/* <div className='prose' dangerouslySetInnerHTML={{ __html: lesson.lessonContent }}></div>

                        <p>{lesson.video}</p> */}
                        </div>
                    ))}
                </div>

                <div className='w-1/2 '>
                    <h2 className="text-xl font-semibold inline-block mr-16">Test</h2>
                    <Link to={`/Chapter/${chapter.chapterId}/Test/Create`} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 inline-block rounded">
                        Add Test
                    </Link>
                    {chapter.tests && chapter.tests.$values.map((test) => (
                        <div key={test.testId} className="mb-4">
                            <h3 className="text-lg font-semibold">{test.testTitle}</h3>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default ChapterEditor;