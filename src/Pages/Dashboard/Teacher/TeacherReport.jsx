import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export default () => {
	const [chartData, setChartData] = useState({});
	const [orders, setOrders] = useState([]);
	const [totalEarnings, setTotalEarnings] = useState(0);

	useEffect(() => {
		const fetchCompletedOrders = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/Payment/completedOrdersByTeacherCourses",
					{ withCredentials: true }
				);
				const orders = response.data.$values;
				setOrders(orders);

				const groupedByDate = orders.reduce((acc, order) => {
					const date = new Date(order.orderDate).toLocaleDateString();
					if (!acc[date]) {
						acc[date] = 0;
					}
					acc[date] += order.amount;
					return acc;
				}, {});

				const labels = Object.keys(groupedByDate);
				const data = Object.values(groupedByDate);

				setChartData({
					labels,
					datasets: [
						{
							label: "Amount by Date",
							data,
							borderColor: "rgba(75, 192, 192, 1)",
							backgroundColor: "rgba(75, 192, 192, 0.2)",
						},
					],
				});

				const total = orders.reduce((sum, order) => sum + order.amount, 0);
				setTotalEarnings(total);
			} catch (error) {
				console.error("Error fetching completed orders:", error);
			}
		};

		fetchCompletedOrders();
	}, []);

	return (
		<div className="p-3">
			<h2 className="text-xl font-semibold mb-4">
				Total Earnings: {totalEarnings.toLocaleString()} VND
			</h2>
			<table className="table-auto w-full mb-4">
				<thead>
					<tr>
						<th className="px-4 py-2">Order ID</th>
						<th className="px-4 py-2">Order Date</th>
						<th className="px-4 py-2">Amount</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.orderId}>
							<td className="border px-4 py-2">{order.orderId}</td>
							<td className="border px-4 py-2">
								{new Date(order.orderDate).toLocaleDateString()}
							</td>
							<td className="border px-4 py-2">
								{order.amount.toLocaleString()} VND
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{chartData.labels ? (
				<Line data={chartData} />
			) : (
				<p>Loading chart data...</p>
			)}
		</div>
	);
};
