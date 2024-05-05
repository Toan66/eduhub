import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function TeacherDetail() {
	const { userId } = useParams();
	const { userRole } = useAuth();
	const [userCourses, setUserCourses] = useState([]);
	const navigate = useNavigate();
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/User/${userId}/detail`,
					{ withCredentials: true }
				);
				setUserData(response.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, [userId]);
	useEffect(() => {
		const fetchUserCourses = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Course/${userId}/TeacherCourses`,
					{ withCredentials: true }
				);
				setUserCourses(response.data.$values);
			} catch (error) {
				console.error("Error fetching user courses:", error);
			}
		};

		fetchUserCourses();
	}, [userData]);

	const goBack = () => navigate(-1);

	return (
		<div className="container mx-auto px-4 sm:max-w-screen-lg">
			{userData ? (
				<>
					<div className="bg-white h-auto">
						<h2 className="text-2xl font-bold mb-4">Teacher Detail</h2>
						<div className="mb-3 shadow-xl rounded-lg p-10 h-auto flex flex-col lg:flex-row lg:h-auto flex-wrap">
							<div className="flex flex-row items-center lg:w-full align-middle mb-5">
								<h3 className="text-xl w-full font-semibold"></h3>
							</div>
							<div className="w-full mb-5">
								{userData.userInfo?.avatar ? (
									<img
										className="size-32 m-auto rounded-full"
										src={userData.userInfo.avatar}
									/>
								) : (
									<>Don't have an avatar</>
								)}
								<div className="mt-5 text-center">
									<p className="">
										<strong>Description: </strong>{" "}
										{userData.userInfo?.userDescription}
									</p>
								</div>
							</div>

							<div className="w-full md:w-1/2 inline-block">
								<p>
									<strong>Full Name:</strong> {userData.userInfo?.fullName}
								</p>
								<p>
									<strong>Date of Birth:</strong>{" "}
									{new Date(
										userData.userInfo?.dateOfBirth
									).toLocaleDateString()}
								</p>
								<p>
									<strong>Gender:</strong> {userData.userInfo?.gender}
								</p>
							</div>
							<div className="w-full md:w-1/2 float-right inline-block">
								<p>
									<strong>Address:</strong> {userData.userInfo?.userAddress}
								</p>
								<p>
									<strong>Email:</strong> {userData.userInfo?.email}
								</p>
								<p>
									<strong>Phone Number:</strong>{" "}
									{userData.userInfo?.phoneNumber}
								</p>
							</div>
						</div>
					</div>

					<div className="mt-20">
						<h3 className="text-2xl font-semibold mb-4">Teacher Course</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-md rounded-lg p-6">
							{userCourses.map((course) => (
								<Link
									to={`/Course/${course.courseId}`}
									key={course.courseId}
									className="bg-gray-100 rounded-lg p-4 shadow"
								>
									<h4 className="text-lg font-semibold">{course.courseName}</h4>
									{course.featureImage && (
										<img
											src={course.featureImage}
											alt="Course"
											className="w-full h-32 object-cover mt-2 rounded"
										/>
									)}
								</Link>
							))}
						</div>
					</div>
				</>
			) : (
				<div className="bg-white h-auto text-2xl font-bold mb-4">
					User Not Found
					<div className="flex flex-row">
						<button
							onClick={goBack}
							className="text-2xl inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded m-3"
						>
							Go Back
						</button>
						<Link
							reloadDocument
							to="/"
							className="text-2xl inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded m-3"
						>
							Home
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default TeacherDetail;
