import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://localhost:7291/api/Course');
                // Cập nhật dòng này để xử lý cấu trúc dữ liệu mới
                setCourses(response.data.$values);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 sm:max-w-screen-lg">
            <h1 className="font-bold text-3xl mb-10">All Courses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map(course => (
                    <div key={course.courseId} className="max-w-sm rounded overflow-hidden shadow-lg">
                        <img className="w-full" src={course.featureImage} alt="Course Image" />
                        <div className="px-6 py-4">
                            <Link to={`/Course/${course.courseId}`} className="font-bold text-lg mb-2">{course.courseName}</Link>
                            <p className="text-gray-700 text-base line-clamp-3">
                                {course.courseDescription}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <Link to={`/Course/${course.courseId}`} className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded">
                                Learn More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;