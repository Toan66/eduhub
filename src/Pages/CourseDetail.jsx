import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CourseDetail() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // Ensure the URL is correctly pointing to the course ID
                const response = await axios.get(`https://localhost:7291/api/course/${courseId}`);
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
            {/* Update these fields to match the API response */}
            <h1>{course.courseName}</h1>
            {/* Assuming there's an image URL property you want to add or replace */}
            {/* <img src={course.imageUrl} alt={course.courseName} /> */}
            <p>{course.courseDescription}</p>
            {/* You can add more course information here */}
            <p>Teacher ID: {course.teacherId}</p>
            <p>Category ID: {course.categoryId}</p>
            {/* Assuming you might want to display the approval status */}
            <p>Approval Status: {course.approvalStatus ? 'Approved' : 'Not Approved'}</p>
            {/* Add more details as needed */}
        </div>
    );
}

export default CourseDetail;