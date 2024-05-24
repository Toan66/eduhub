import axios from "axios";
import React, { useState, useEffect } from "react";

function PaymentResult() {
	const [paymentDetails, setPaymentDetails] = useState({
		partnerCode: "",
		accessKey: "",
		requestId: "",
		amount: "",
		orderId: "",
		orderInfo: "",
		orderType: "",
		transId: "",
		message: "",
		localMessage: "",
		responseTime: "",
		errorCode: "",
		payType: "",
		extraData: "",
		signature: "",
	});
	const [orderData, setOrderData] = useState(null);

	useEffect(() => {
		// Giả sử URL là 'https://yourdomain.com/payment?partnerCode=MOMO&accessKey=F8BBA842ECF85...'
		const fetchOrderData = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Payment/order/${paymentDetails.orderId}`,
					{ withCredentials: true }
				);
				setOrderData(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching order data:", error);
			}
		};

		const fetchParams = () => {
			const searchParams = new URLSearchParams(window.location.search);
			let details = {};
			for (let param of searchParams) {
				const [key, value] = param;
				details[key] = value;
			}
			setPaymentDetails(details);
			console.log(details);
			if (details.errorCode === "0") fetchOrderData();
		};

		fetchParams();
	}, [paymentDetails.orderId]);

	const createPayment = async () => {
		try {
			const response = await axios.post(
				"https://localhost:7291/api/Payment/addPayment",
				{
					orderId: orderData.orderId,
					transactionId: paymentDetails.transId,
					amount: paymentDetails.amount,
					status: paymentDetails.localMessage,
				},
				{ withCredentials: true }
			);
			console.log(response.data);
		} catch (error) {
			console.error("Error enrolling in course:", error);
		}
	};

	const updateOrder = async () => {
		try {
			const response = await axios.post(
				`https://localhost:7291/api/Payment/order/${paymentDetails.orderId}/paid`,
				{ withCredentials: true }
			);
			console.log(response.data);
		} catch (error) {
			console.error("Error enrolling in course:", error);
		}
	};

	const createEnroll = async () => {
		try {
			const response = await axios.post(
				"https://localhost:7291/api/Course/enroll",
				{
					courseId: orderData.courseId,
				},
				{ withCredentials: true }
			);
			console.log(response.data);
		} catch (error) {
			console.error("Error enrolling in course:", error);
		}
	};
	const handleOk = () => {
		if (paymentDetails.errorCode === "0") {
			createPayment();
			createEnroll();
			updateOrder();
		}
		window.location.href = "/DashBoard/MyCourses";
	};

	return (
		<div className="w-full lg:max-w-screen-sm m-auto text-xl shadow-xl">
			<h2 className="text-3xl font-semibold text-center my-8">
				{paymentDetails.errorCode === "0" ? (
					<>
						<div className="flex justify-center">
							<img src="/images/greencheck.png" className="size-20" />
						</div>
						<div className="text-green-600">Payment successful</div>
					</>
				) : (
					<>
						<div className="flex justify-center">
							<img src="/images/Cross_red_circle.svg.png" className="size-20" />
						</div>
						<div className="text-red-600">Payment failled</div>
					</>
				)}
			</h2>
			<div className="bg-white rounded-lg p-8 mb-6">
				<div className="mb-4 flex justify-between">
					<span className="font-bold">Payment type:</span>
					{paymentDetails.partnerCode} QR CODE
				</div>
				<div className="mb-4 flex justify-between">
					<span className="font-bold">Amount paid:</span>{" "}
					{paymentDetails.amount} VND
				</div>
				<div className="mb-4 flex justify-between">
					<span className="font-bold">Order ID:</span> {paymentDetails.orderId}
				</div>
				<div className="mb-4 flex justify-between">
					<span className="font-bold">Transaction ID:</span>{" "}
					{paymentDetails.transId}
				</div>
				<div className="mb-4 flex justify-between">
					<span className="font-bold">Response time:</span>{" "}
					{paymentDetails.responseTime}
				</div>
				<div className="mb-4 flex justify-between">
					<span className="font-bold">Order Info:</span>
					{paymentDetails.orderInfo}
				</div>
				<div className="mb-4 flex justify-between">
					<span className="font-bold">Message:</span> {paymentDetails.message}
				</div>
				<div className="text-center">
					<button
						onClick={() => handleOk()}
						className="mt-5 text-xl bg-blue-500 hover:bg-blue-700 py-3 px-6 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
					>
						OK
					</button>{" "}
				</div>
			</div>
		</div>
	);
}

export default PaymentResult;
