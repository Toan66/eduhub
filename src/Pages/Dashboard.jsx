import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [userCourses, setUserCourses] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://localhost:7291/api/Auth/detail', { withCredentials: true });
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData && userData.userType === 'Teacher') {
            const fetchUserCourses = async () => {
                try {
                    const response = await axios.get('https://localhost:7291/api/Course/ByTeacher', { withCredentials: true });
                    setUserCourses(response.data.$values);
                } catch (error) {
                    console.error("Error fetching user courses:", error);
                }
            };

            fetchUserCourses();
        }
    }, [userData]);

    return (
        <div className="container mx-auto px-4 mt-1 sm:max-w-screen-xl">
            {userData ? (
                <div className="bg-white">
                    <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
                    <div className="mb-3 shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold">User Information</h3>
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>User Type:</strong> {userData.userType}</p>
                        <p><strong>Full Name:</strong> {userData.userInfo.fullName}</p>
                        <p><strong>Email:</strong> {userData.userInfo.email}</p>
                        <p><strong>Date of Birth:</strong> {new Date(userData.userInfo.dateOfBirth).toLocaleDateString()}</p>
                        <p><strong>Gender:</strong> {userData.userInfo.gender}</p>
                        <p><strong>Phone Number:</strong> {userData.userInfo.phoneNumber}</p>
                    </div>
                    {userData.userType === 'Teacher' && userCourses.length > 0 && (
                        <div className="mt-20">
                            <h3 className="text-2xl font-semibold mb-4">Your Courses</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-md rounded-lg p-6">
                                {userCourses.map(course => (
                                    <div key={course.courseId} className="bg-gray-100 rounded-lg p-4 shadow">
                                        <h4 className="text-lg font-semibold">{course.courseName}</h4>
                                        <p className="text-sm text-gray-600">{course.courseDescription}</p>
                                        <p className="text-sm">{course.approvalStatus ? 'Approved' : 'Pending Approval'}</p>
                                        {course.featureImage && (
                                            <img src={course.featureImage} alt="Course" className="w-full h-32 object-cover mt-2 rounded" />
                                        )}
                                        <div className="mt-4">
                                            <Link to={`/Course/${course.courseId}/Edit`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">Edit</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Dashboard;