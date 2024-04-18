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
            navigate(`/Course/${courseId}/Edit`);
        } catch (error) {
            console.error('Có lỗi khi tạo chapter:', error);
            alert('Có lỗi xảy ra khi tạo chapter.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 sm:max-w-screen-xl">
            <button onClick={() => navigate(-1)} type="button" class="my-4 flex items-center justify-center w-1/2 px-5 py-2 text-smtransition-colors duration-200 bg-blue-500 hover:bg-blue-700 font-semibold text-white border rounded-lg gap-x-2 sm:w-auto">
                <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                <span>Back to Course</span>
            </button>
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