import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import IconBxsBook from "../../Components/Icons/IconBxsBook";
import IconShoppingCart from "../../Components/Icons/IconShoppingCart";
import IconDashboard3Fill from "../../Components/Icons/IconDashboard3Fill";

function DashBoard() {
	const navigate = useNavigate();
	useEffect(() => {}, []);

	return (
		<>
			<div className="flex w-full p-10 text-4xl font-semibold">
				<Link
					to={`/DashBoard/MyCourses`}
					className="w-64 h-64 mr-10 bg-white justify-center flex flex-col items-center rounded-3xl hover:text-white hover:bg-blue-500 duration-300"
				>
					<div>
						<IconBxsBook width="60px" height="60px" />
					</div>
					My Course
				</Link>
				<Link
					to={`/DashBoard/Order`}
					className="w-64 h-64 mr-10 bg-white justify-center flex flex-col items-center rounded-3xl hover:text-white hover:bg-blue-500 duration-300"
				>
					<div>
						<IconShoppingCart width="60px" height="60px" />
					</div>
					My Order
				</Link>
			</div>
		</>
	);
}

export default DashBoard;
