import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CreateChapter() {
    const [chapterTitle, setChapterTitle] = useState('');
    const [chapterDescription, setChapterDescription] = useState('');
    const navigate = useNavigate();
    const { courseId } = useParams(); // Giả sử bạn đã setup đường dẫn là /course/:courseId/create-chapter

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Thay đổi URL dưới đây theo API của bạn
            await axios.post(`https://localhost:7291/api/Chapter/Course/${courseId}/addChapter`, {
                chapterTitle: chapterTitle,
                chapterDescription: chapterDescription,
            }, {withCredentials: true});
            alert('Chapter đã được tạo thành công!');
            navigate(`/CourseEditor/${courseId}`);
        } catch (error) {
            console.error('Có lỗi khi tạo chapter:', error);
            alert('Có lỗi xảy ra khi tạo chapter.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Create New Chapter</h1>
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="mb-4">
                    <label htmlFor="chapterTitle" className="block text-gray-700 text-sm font-bold mb-2">Chapter Title</label>
                    <input type="text" id="chapterTitle" value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="chapterDescription" className="block text-gray-700 text-sm font-bold mb-2">Chapter Description</label>
                    <textarea id="chapterDescription" value={chapterDescription} onChange={(e) => setChapterDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Tạo Chapter</button>
            </form>
        </div>
    );
}

export default CreateChapter;