import React, { useState, useEffect } from "react";
import axios from "axios";

const AllUsers = () => {
	const [users, setUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/User/users",
					{ withCredentials: true }
				);
				setUsers(response.data.$values);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	const indexOfLastUser = currentPage * itemsPerPage;
	const indexOfFirstUser = indexOfLastUser - itemsPerPage;
	const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const getUserType = (userTypeId) => {
		switch (userTypeId) {
			case 1:
				return "Student";
			case 2:
				return "Teacher";
			case 3:
				return "Admin";
			default:
				return "Unknown";
		}
	};

	return (
		<div className="p-5">
			<div className="bg-white rounded-lg">
				<table className="min-w-full bg-white border border-gray-300">
					<thead>
						<tr>
							<th className="py-2 border border-gray-300">User ID</th>
							<th className="py-2 border border-gray-300">Username</th>
							<th className="py-2 border border-gray-300">Full Name</th>
							<th className="py-2 border border-gray-300">Email</th>
							<th className="py-2 border border-gray-300">Phone Number</th>
							<th className="py-2 border border-gray-300">Address</th>
							<th className="py-2 border border-gray-300">User Type</th>
						</tr>
					</thead>
					<tbody>
						{currentUsers.map((user) => (
							<tr key={user.userId}>
								<td className="py-2 border border-gray-300 text-center">
									{user.userId}
								</td>
								<td className="py-2 border border-gray-300">{user.username}</td>
								<td className="py-2 border border-gray-300">
									{user.userInfos.$values[0]?.fullName}
								</td>
								<td className="py-2 border border-gray-300">
									{user.userInfos.$values[0]?.email}
								</td>
								<td className="py-2 border border-gray-300 text-center">
									{user.userInfos.$values[0]?.phoneNumber}
								</td>
								<td className="py-2 border border-gray-300">
									{user.userInfos.$values[0]?.userAddress}
								</td>
								<td className="py-2 border border-gray-300 text-center">
									{getUserType(user.userTypeId)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="flex justify-center mt-4">
					{Array.from(
						{ length: Math.ceil(users.length / itemsPerPage) },
						(_, i) => (
							<button
								key={i + 1}
								onClick={() => paginate(i + 1)}
								className={`px-3 py-1 mx-1 rounded ${
									currentPage === i + 1
										? "bg-blue-500 text-white"
										: "bg-gray-200"
								}`}
							>
								{i + 1}
							</button>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default AllUsers;
