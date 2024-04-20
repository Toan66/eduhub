import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.jsx';

function CreateCourse() {
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [featureImage, setFeatureImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setFeatureImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!featureImage) {
            console.error('No image selected');
            return;
        }
        const imageRef = ref(storage, `featureImages/${featureImage.name}`);
        const uploadTask = uploadBytesResumable(imageRef, featureImage);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Tính toán phần trăm hoàn thành
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error('Upload failed:', error);
            },
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // Here, directly use downloadURL in your post request
                    axios.post('https://localhost:7291/api/Course/create', {
                        courseName,
                        courseDescription,
                        categoryId,
                        featureImage: downloadURL // Use the direct URL here
                    }, { withCredentials: true }).then(response => {
                        console.log(response.data);
                    }).catch(error => {
                        console.error('Error creating course:', error);
                    });
                });
            }
        );
    };

    return (
        <div className="container mx-auto px-6 sm:max-w-screen-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                    <input type="text" id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">Course Description</label>
                    <textarea id="courseDescription" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3"></textarea>
                </div>
                <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
                    <select id="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option value="">Select a category</option>
                        {/* Populate with actual category options */}
                        <option value="1">Programming</option>
                        <option value="2">Skill Development</option>
                        <option value="3">Marketing</option>
                        <option value="4">Music</option>
                        <option value="5">Design</option>
                        <option value="6">Finance</option>
                        <option value="7">Health and Fitness</option>
                        <option value="8">Language Learning</option>
                        <option value="9">Photography & Video</option>
                        <option value="10">Business</option>
                        <option value="11">Office Productivity</option>
                        
                        {/* Add more categories as needed */}
                    </select>
                </div>
                <div>
                    <label htmlFor="featureImage" className="block text-sm font-medium text-gray-700">Feature Image</label>
                    <input type="file" id="featureImage" onChange={handleImageChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                {uploadProgress > 0 && (
                    <div>
                        <label htmlFor="uploadProgress" className="block text-sm font-medium text-gray-700">Upload Progress</label>
                        <progress id="uploadProgress" value={uploadProgress} max="100" className="mt-1 block w-full"></progress>
                        {uploadProgress < 100 ? <p>Uploading: {uploadProgress.toFixed(2)}%</p> : <p>Upload Complete</p>}
                    </div>
                )}
                {/* Submit button */}
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Create Course</button>
            </form>
        </div>
    );
}

export default CreateCourse;