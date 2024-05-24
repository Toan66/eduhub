import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../../../Contexts/AuthContext";

export default () => {
	const [state, setState] = useState(false);
	const navigate = useNavigate();
	const { userRole } = useAuth();
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userAvatar, setUserAvatar] = useState("");

	const location = useLocation();
	const lastPathItem = location.pathname.split("/").pop();

	const jwt = localStorage.getItem("jwt");

	useEffect(() => {
		setState(false);
	}, [location.pathname]);

	useEffect(() => {
		const fetchUserName = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/User/nameemail",
					{ withCredentials: true }
				);
				if (response.status === 200) {
					setUserName(response.data.name);
					setUserEmail(response.data.email);
					console.log(response.data);
				} else {
					console.error("Error");
				}
			} catch (error) {
				console.error("Error", error);
			}
		};

		const fetchUserAvatar = async () => {
			try {
				const response = await axios.get(
					"https://localhost:7291/api/User/avatar",
					{ withCredentials: true }
				);
				if (response.status === 200) {
					setUserAvatar(response.data);
				} else {
					console.error("Error");
				}
			} catch (error) {
				console.error("Error", error);
			}
		};

		fetchUserAvatar();
		fetchUserName();
	}, [[location.pathname]]);

	const navigation = [
		{ title: "Course", path: "/Course" },
		{ title: "Create Course", path: "/Course/Create" },
		{ title: "Customers", path: "#" },
		{ title: "Pricing", path: "#" },
	];

	const logoutHandle = async () => {
		try {
			const response = await axios.post(
				"https://localhost:7291/api/Auth/logout",
				{ withCredentials: true }
			);

			if (response.status === 200) {
				// console.log('Đã đăng xuất thành công');
				localStorage.clear();
				Cookies.remove("jwt");
				navigate("/");
				navigate(0);
			} else {
				console.error("Lỗi khi đăng xuất:", response);
			}
		} catch (error) {
			console.error("Lỗi khi đăng xuất:", error);
		}
	};

	return (
		<header className="bg-white z-10 border-b w-full h-20">
			<div className="items-center flex justify-between p-3">
				<div className="flex items-center text-4xl font-bold">
					{lastPathItem}
				</div>
				<div className="flex items-center">
					<ul className="justify-end items-center">
						<div className="items-center gap-x-6">
							{/* role */}
							{!userRole ? (
								<>
									<li>
										<Link
											to="/Login"
											className="text-gray-700 hover:text-indigo-600 font-semibold"
										>
											Log in
										</Link>
									</li>
									<li>
										<Link
											to="/Register"
											className="block py-3 px-4 font-semibold text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline w-auto"
										>
											Register
										</Link>
									</li>
								</>
							) : (
								<li className="flex items-center">
									{/* <div className="inline-block text-center text-base font-medium mr-2">Hello {userName}</div> */}

									<div className="relative text-left ">
										<div className="group">
											<button
												type="button"
												className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium border text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-700"
											>
												{/* avatar */}
												<img
													title="avatar"
													className="size-10 rounded-full"
													src={userAvatar}
												/>

												<svg
													className="w-4 h-4 ml-2 -mr-1 hover:white"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="black"
												>
													<path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
												</svg>
											</button>

											<div className="absolute z-10 right-0 w-80 origin-top-left bg-white divide-y divide-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
												<div className="py-1">
													<div className="pl-3 py-4 text-xl flex flex-row items-center justify-between border-black border-b">
														<div className="w-2/12">
															<img
																className="size-10 rounded-full"
																src={userAvatar}
															/>
														</div>
														<div className="w-10/12">
															<div className="font-semibold">{userName}</div>
															<div className="text-base mt-2">{userEmail}</div>
														</div>
													</div>
													{userRole === "Admin" && (
														<>
															<Link
																to="/Admin/Dashboard"
																className="block px-4 py-4 text-xl hover:bg-gray-100"
															>
																Admin Dashboard
															</Link>
														</>
													)}
													{userRole === "Teacher" && (
														<>
															<Link
																to="/Teacher/Dashboard"
																className="block px-4 py-4 text-xl hover:bg-gray-100"
															>
																Teacher Dashboard
															</Link>
														</>
													)}
													<Link
														to="/DashBoard"
														className="block px-4 py-4 text-xl hover:bg-gray-100"
													>
														Dashboard
													</Link>
													<Link
														to="/DashBoard/Order"
														className="block px-4 py-4 text-xl hover:bg-gray-100"
													>
														Order History
													</Link>
													<Link
														to="/Profile"
														className="block px-4 py-4 text-xl hover:bg-gray-100"
													>
														Profile
													</Link>
													<button
														onClick={logoutHandle}
														className="w-full text-left block pointer-events-auto px-4 py-4 text-xl hover:bg-gray-100"
													>
														Log out
													</button>
												</div>
											</div>
										</div>
									</div>
								</li>
							)}
						</div>
					</ul>
				</div>
			</div>
		</header>
	);
};
