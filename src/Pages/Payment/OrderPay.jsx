import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderPay() {
	const { orderId } = useParams();
	const [orderData, setOrderData] = useState(null);
	const [courseData, setCourseData] = useState(null);

	useEffect(() => {
		const fetchOrderData = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Payment/order/${orderId}`,
					{ withCredentials: true }
				);
				setOrderData(response.data);
				console.log(response.data);

				const courseResponse = await axios.get(
					`https://localhost:7291/api/course/${response.data.courseId}/details`,
					{ withCredentials: true }
				);
				setCourseData(courseResponse.data);
				console.log(courseResponse.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchOrderData();
	}, [orderId]);

	const handlePayment = async () => {
		try {
			const response = await axios.post(
				"https://localhost:7291/api/Payment/create",
				{
					orderId: orderId,
					orderInfo: "123",
					amount: orderData.amount,
				},
				{ withCredentials: true }
			);
			console.log(response.data);

			if (response.data && response.data.url) {
				window.location.href = response.data.url;
			} else {
				console.error("URL wrong!");
			}
		} catch (error) {
			console.error("Error creating payment:", error);
		}
	};

	return (
		<div className="container mx-auto sm:max-w-screen-lg p-6">
			<div className="bg-white shadow-md rounded-lg p-6">
				{courseData && (
					<div className="flex space-x-14">
						<div className="flex justify-center">
							<img
								className="w-auto h-40 object-cover rounded-lg"
								src={courseData.featureImage}
								alt={courseData.courseName}
							/>
						</div>
						<div className="flex w-1/3 flex-col justify-between">
							<h2 className="text-xl font-bold mb-2">
								{courseData.courseName}
							</h2>
							<p className="text-gray-700 mb-4 truncate">
								{courseData.courseDescription}
							</p>
							<p className="text-gray-700 mb-4">
								Course Level: {courseData.courseLevel.courseLevelName}
							</p>
							<p className="text-gray-700 mb-4">
								Course Category: {courseData.category.courseCategoryName}
							</p>
						</div>
						<div className="">
							<p className="text-gray-700 text-xl font-bold mb-4 text-center">
								Price
							</p>
							<p className="text-gray-700 text-3xl font-bold mb-4 mt-10">
								{courseData.coursePrice.toLocaleString()} VND
							</p>
						</div>
					</div>
				)}

				<div className="mt-10">
					<div className="text-2xl mb-4">Order ID: {orderData?.orderId}</div>
					{/* <div className="text-center text-green-600 font-semibold text-2xl mb-6">
						{orderData?.amount?.toLocaleString()} VND
					</div>
					<div className="flex justify-center">
						<img
							className="w-32 h-32 object-cover rounded-full"
							src="../../src/assets/momo.png"
							alt="MOMO"
						/>
					</div> */}
					<div className="flex justify-end mt-10">
						<button
							onClick={handlePayment}
							className="bg-blue-500 flex items-center text-xl hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
						>
							Purchase with MOMO
							<img
								className="w-10 ml-2"
								src="../../src/assets/momo.png"
								alt="MOMO"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderPay;
