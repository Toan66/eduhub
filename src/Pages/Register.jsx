import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [userTypeId, setUserTypeId] = useState(1); // Mặc định là Student
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [gender, setGender] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [expertise, setExpertise] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://localhost:7291/api/Auth/register",
				{
					username,
					password,
					userTypeId,
					fullName,
					email,
					dateOfBirth,
					gender,
					phoneNumber,
					avatar:
						"https://firebasestorage.googleapis.com/v0/b/eduhub-598c1.appspot.com/o/userAvatars%2Fimages.jpg?alt=media&token=3a681e78-ee22-4abf-a837-af3bd6a56261",
					expertise,
				},
				{ withCredentials: true }
			);
			console.log(response.data.message);

			// Perform login after successful registration
			const loginResponse = await axios.post(
				"https://localhost:7291/api/Auth/login",
				{
					username,
					password,
				},
				{ withCredentials: true }
			);

			const token = loginResponse.data.token;
			localStorage.setItem("token", token);
			localStorage.setItem("role", loginResponse.data.role);

			navigate("/Profile");
			navigate(0);
		} catch (error) {
			setError(
				error.response?.data?.message ||
					"Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại."
			);
		}
	};

	return (
		<div className="bg-stone-900 flex justify-center items-center flex-col ">
			<div className="bg-white my-10 px-20 py-20 rounded-xl shadow-2xl w-1/3 flex flex-col items-center justify-center">
				<div className="w-8/12">
					<Link to={"/"} className="">
						<img src="/images/logo.jpg" alt="123" className="mb-5" />
					</Link>
				</div>

				<div className="font-bold uppercase text-2xl mb-5">
					Welcome to EDUHUB
				</div>
				<div className="mb-5 text-xl">Create your account</div>

				<form className="w-full max-w-sm" onSubmit={handleRegister}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<input
							required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="**********"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							User Type
						</label>
						<div className="inline-flex mr-4 items-center mb-2">
							<input
								id="student"
								type="radio"
								name="userType"
								value="1"
								checked={userTypeId === 1}
								onChange={(e) => setUserTypeId(Number(e.target.value))}
								className="mr-2"
							/>
							<label
								htmlFor="student"
								className="text-gray-700 text-sm font-bold"
							>
								Student
							</label>
						</div>
						<div className="inline-flex items-center">
							<input
								id="teacher"
								type="radio"
								name="userType"
								value="2"
								checked={userTypeId === 2}
								onChange={(e) => setUserTypeId(Number(e.target.value))}
								className="mr-2"
							/>
							<label
								htmlFor="teacher"
								className="text-gray-700 text-sm font-bold"
							>
								Teacher
							</label>
						</div>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="fullName"
						>
							Full Name
						</label>
						<input
							required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="fullName"
							type="text"
							placeholder="Full Name"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="dateOfBirth"
						>
							Date of Birth
						</label>
						<input
							required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="dateOfBirth"
							type="date"
							value={dateOfBirth}
							onChange={(e) => setDateOfBirth(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="gender"
						>
							Gender
						</label>
						<select
							className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="gender"
							value={gender}
							onChange={(e) => setGender(e.target.value)}
						>
							<option value="">Select Gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="phoneNumber"
						>
							Phone Number
						</label>
						<input
							required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="phoneNumber"
							type="text"
							placeholder="Phone Number"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="expertise"
						>
							Expertise
						</label>
						<input
							required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="expertise"
							type="text"
							placeholder="Expertise"
							value={expertise}
							onChange={(e) => setExpertise(e.target.value)}
						/>
					</div>

					{error && <p className="text-red-500 text-xs italic">{error}</p>}
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
