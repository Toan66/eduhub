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
        <div>
            <h1>All Courses</h1>
            <div>
                {courses.map(course => (
                    <div key={course.courseId}>
                        <Link to={`/course/${course.courseId}`}>
                            <h2>{course.courseName}</h2>
                        </Link>
                        <p>{course.courseDescription}</p>
                        {/* Thêm nhiều thông tin khác của khóa học tại đây */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;