import React, { useState } from "react";
import axios from "axios";

function CreatePayment() {
	const [paymentInfo, setPaymentInfo] = useState({
		fullName: "",
		orderInfo: "",
		orderId: "1000",
		amount: 0,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPaymentInfo((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://localhost:7291/api/Payment/create",
				paymentInfo,
				{ withCredentials: true }
			);
			console.log(response.data);

			if (response.data && response.data.url) {
				window.location.href = response.data.url;
			} else {
				// Xử lý trường hợp không nhận được URL
				console.error("URL thanh toán không khả dụng.");
			}
		} catch (error) {
			console.error("Error creating payment:", error);
		}
	};

	return (
		<div className="w-full md:max-w-screen-lg m-auto">
			<form className="flex" onSubmit={handleSubmit}>
				<input
					type="text"
					name="fullName"
					value={paymentInfo.fullName}
					onChange={handleChange}
					placeholder="Full Name"
					required
				/>

				<input
					type="text"
					name="orderInfo"
					value={paymentInfo.orderInfo}
					onChange={handleChange}
					placeholder="Order Info"
					required
				/>
				<input
					type="number"
					name="amount"
					value={paymentInfo.amount}
					onChange={handleChange}
					placeholder="Amount"
					required
				/>
				<button type="submit">Create Payment</button>
			</form>
		</div>
	);
}

export default CreatePayment;
