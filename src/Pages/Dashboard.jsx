import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7291/api/Auth/detail', { withCredentials: true });
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4">
            {userData ? (
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>
                    <div className="mb-3">
                        <h3 className="text-xl font-semibold">User Information</h3>
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>User Type:</strong> {userData.userType}</p>
                        <p><strong>Full Name:</strong> {userData.userInfo.fullName}</p>
                        <p><strong>Email:</strong> {userData.userInfo.email}</p>
                        <p><strong>Date of Birth:</strong> {new Date(userData.userInfo.dateOfBirth).toLocaleDateString()}</p>
                        <p><strong>Gender:</strong> {userData.userInfo.gender}</p>
                        <p><strong>Phone Number:</strong> {userData.userInfo.phoneNumber}</p>
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Dashboard;