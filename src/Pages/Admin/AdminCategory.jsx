import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default () => {
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const responseCategory = await axios.get(
					"https://localhost:7291/api/Course/category"
				);
				setCategories(responseCategory.data.$values);
				console.log(responseCategory.data.$values);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	return (
		<div className="p-3">
			<div>
				<button
					className="bg-blue-500 text-white text-lg font-semibold px-4 py-2 rounded mb-4"
					onClick={() => navigate("/Category/new")}
				>
					+ Add New Category
				</button>
				<table className="min-w-full bg-white">
					<thead>
						<tr>
							<th className="py-2">ID</th>
							<th className="py-2">Category Name</th>
							<th className="py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{categories.map((category) => (
							<tr key={category.courseCategoryId}>
								<td className="border px-4 py-2 text-center">
									{category.courseCategoryId}
								</td>
								<td className="border px-4 py-2">
									{category.courseCategoryName}
								</td>
								<td className="border px-4 py-2">
									<Link
										to={`/Category/${category.id}`}
										className="text-blue-500 hover:underline"
									>
										View
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
