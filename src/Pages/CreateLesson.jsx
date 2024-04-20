import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { storage } from '../firebase'; // Đảm bảo bạn đã cấu hình Firebase Storage
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

class FirebaseUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const storageRef = ref(storage, `images/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Optional: Update progress
                    },
                    (error) => {
                        console.error('Upload error:', error);
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve({
                                default: downloadURL
                            });
                        });
                    }
                );
            }));
    }
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new FirebaseUploadAdapter(loader);
    };
}
function CreateLesson() {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonContent, setLessonContent] = useState('');
    const [video, setVideo] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storageRef = ref(storage, `videos/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Tính toán phần trăm tiến trình upload
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error('Upload error:', error);
                alert('Error uploading video: ', error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('Video available at', downloadURL);
                    setVideo(downloadURL); // Cập nhật state với URL của video
                    setUploadProgress(0); // Reset tiến trình sau khi upload thành công
                });
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://localhost:7291/api/Lesson/Chapter/${chapterId}/addLesson`, {
                lessonTitle,
                lessonContent,
                video
            }, { withCredentials: true });

            if (response.status === 200) {
                alert('Lesson has been created successfully!');
                navigate(-1); // Navigate back to the previous page
            }
        } catch (error) {
            console.error('Error creating lesson:', error);
            alert('An error occurred while creating the lesson.');
        }
    };

    return (
        <div className="container mx-auto max-w-screen-lg">
            <h1 className="text-2xl font-bold mb-4">Create New Lesson</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="lessonTitle" className="block text-gray-700 text-sm font-bold mb-2">Lesson Title</label>
                    <input type="text" id="lessonTitle" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Lesson Content</label>
                    <div className='prose'>
                        <CKEditor
                            editor={ClassicEditor}
                            data={lessonContent}
                            config={{
                                extraPlugins: [MyCustomUploadAdapterPlugin]
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setLessonContent(data);
                            }}
                        />
                    </div>

                </div>
                <div className="mb-4">
                    <label htmlFor="video" className="block text-gray-700 text-sm font-bold mb-2">Video URL</label>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    {uploadProgress > 0 && (
                        <div className="text-sm text-gray-600">Uploading: {uploadProgress.toFixed(2)}%</div>
                    )}
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Lesson</button>
            </form>
        </div>
    );
}

export default CreateLesson;