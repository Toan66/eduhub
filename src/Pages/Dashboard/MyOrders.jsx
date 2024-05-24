import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default () => {
	const [userOrders, setUserOrders] = useState([]);

	useEffect(() => {
		const fetchUserOrders = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Payment/ByUser",
					{ withCredentials: true }
				);
				setUserOrders(response.data.$values);
				console.log(response.data.$values);
			} catch (error) {
				console.error("Error fetching user courses:", error);
			}
		};

		fetchUserOrders();
	}, []);

	return (
		<div className="p-10">
			<h2 className="text-2xl font-bold mb-4">My Order</h2>

			<table className="min-w-full">
				<thead className="border-b text-xl font-semibold">
					<tr>
						<th className="font-semibold text-gray-900 px-6 py-4 text-left">
							Order ID
						</th>
						<th className="font-semibold text-gray-900 px-6 py-4 text-left">
							Course
						</th>
						<th className="font-semibold text-gray-900 px-6 py-4 text-left">
							Amount
						</th>
						<th className="font-semibold text-gray-900 px-6 py-4 text-left">
							Order Date
						</th>
						<th className="font-semibold text-gray-900 px-6 py-4 text-left">
							Status
						</th>
						<th className="font-semibold text-gray-900 px-6 py-4 text-left">
							Payment
						</th>
					</tr>
				</thead>

				<tbody>
					{userOrders.map((order) => (
						<tr className="border-b" key={order.orderId}>
							<td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
								{order.orderId}
							</td>
							<td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								<Link
									to={`/Course/${order.courseId}`}
									className="text-blue-500 hover:text-blue-700"
								>
									Course
								</Link>
							</td>
							<td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								{order.amount.toLocaleString()} VND
							</td>
							<td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
								{new Date(order.orderDate).toLocaleString()}
							</td>
							{order.status === "Paid" ? (
								<>
									<td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{order.status}
									</td>
									<td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										Already paid
									</td>
								</>
							) : (
								<>
									<td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{order.status}
									</td>
									<td className="text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										<Link
											to={`/Order/${order.orderId}/Payment`}
											className="text-blue-500 hover:text-blue-700"
										>
											Pay
										</Link>
									</td>
								</>
							)}
						</tr>
					))}
				</tbody>
			</table>
			{!userOrders.length ? (
				<div className="text-3xl">You don't have any order yet!</div>
			) : (
				<></>
			)}
		</div>
	);
};
