import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { storage } from '../firebase.jsx';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function CreateLesson() {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonContent, setLessonContent] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const quillRef = useRef(null);

    useEffect(() => {
        // Cấu hình custom toolbar và image handler cho Quill
        const quill = document.querySelector('.ql-editor');
        if (quill) {
            quill.setAttribute('data-gramm', false); // Disable Grammarly in Quill editor
        }
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setVideoFile(e.target.files[0]);
        }
    };

    const uploadFile = (file, folder) => {
        return new Promise((resolve, reject) => {
            const fileRef = ref(storage, `${folder}/${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                    console.log(`${file.name} is ${progress}% uploaded.`);
                },
                (error) => {
                    console.error('Upload failed:', error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(`${file.name} available at`, downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    input.onchange = async () => {
        const file = input.files[0];
        const imageUrl = await uploadFile(file, 'lessonImages');
        const editor = quillRef.current.getEditor(); // Lấy đối tượng editor từ ref
        editor.focus(); // Đảm bảo editor được focus
        const range = editor.getSelection(); // Lấy vị trí hiện tại của con trỏ
        if (range) {
            editor.insertEmbed(range.index, 'image', imageUrl);
        } else {
            editor.insertEmbed(0, 'image', imageUrl); // Nếu không có vị trí nào, chèn ảnh ở đầu trình soạn thảo
        }
    };
};

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block']
            ],
            handlers: {
                'image': imageHandler
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const videoUrl = await uploadFile(videoFile, 'lessonVideos');

            await axios.post(`https://localhost:7291/api/Lesson/Chapter/${chapterId}/addLesson`, {
                lessonTitle,
                lessonContent,
                video: videoUrl
            }, { withCredentials: true });

            alert('Lesson has been created successfully!');
            navigate(-1); // Navigate back to the previous page
        } catch (error) {
            console.error('Error creating lesson:', error);
            alert('An error occurred while creating the lesson.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 sm:max-w-screen-xl">
            <h1 className="text-2xl font-bold mb-4">Create New Lesson</h1>
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="mb-4">
                    <label htmlFor="lessonTitle" className="block text-gray-700 text-sm font-bold mb-2">Lesson Title</label>
                    <input type="text" id="lessonTitle" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Lesson Content</label>
                    <ReactQuill ref={quillRef} value={lessonContent} onChange={setLessonContent} modules={modules} />
                </div>
                <div className="mb-4">
                    <label htmlFor="videoFile" className="block text-gray-700 text-sm font-bold mb-2">Video File</label>
                    <input type="file" id="videoFile" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                {uploadProgress > 0 && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Upload Progress</label>
                        <progress value={uploadProgress} max="100" className="progress-bar"></progress>
                        <div>{uploadProgress < 100 ? `Uploading: ${uploadProgress.toFixed(2)}%` : 'Upload Complete'}</div>
                    </div>
                )}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Lesson</button>
            </form>
        </div>
    );
}

export default CreateLesson;