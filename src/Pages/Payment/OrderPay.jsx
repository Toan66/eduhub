import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderPay() {
	const { orderId } = useParams();
	const [orderData, setOrderData] = useState(null);

	useEffect(() => {
		const fetchOrderData = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Payment/order/${orderId}`,
					{ withCredentials: true }
				);
				setOrderData(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchOrderData();
	}, []);

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
		<div className="container mx-auto sm:max-w-screen-lg">
			<div className="text-3xl font-bold">Payment</div>
			<div className="text-2xl text-center">
				Purchase for Order{" "}
				<span className="text-red-600 font-semibold">{orderId}</span> with MOMO
				<div className="text-green-600 font-semibold">
					{orderData?.amount?.toLocaleString()} VND
				</div>
				<img
					className="m-auto mt-10 size-80 rounded-3xl"
					src="../../src/assets/momo.png"
				/>
				<button
					onClick={() => handlePayment()}
					className="mt-10 bg-blue-500 py-3 px-6 text-white font-semibold rounded-lg"
				>
					Go
				</button>
			</div>
		</div>
	);
}

export default OrderPay;
