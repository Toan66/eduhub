// File: src/Pages/CourseDetail.jsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CourseDetail() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`https://localhost:7291/api/courses/`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (!course) return <div>Loading...</div>;

    return (
        <div>
            <h1>{course.title}</h1>
            <img src={course.imageUrl} alt={course.title} />
            <p>{course.description}</p>
            {/* Thêm nhiều thông tin khác của khóa học tại đây */}
        </div>
    );
}

export default CourseDetail;