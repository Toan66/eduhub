import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCategory() {
	const [categoryName, setCategoryName] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				"https://localhost:7291/api/Course/category/add",
				{
					courseCategoryName: categoryName,
				},
				{ withCredentials: true }
			);
			Swal.fire("Created", "Category created successfully!", "success");
			navigate("/Admin/Category");
		} catch (error) {
			console.error("Error when creating category:", error);
			Swal.fire("Error", "Error when creating category.", "error");
		}
	};

	return (
		<div className="container mx-auto px-4 py-8 sm:max-w-screen-lg">
			<button
				onClick={() => navigate(-1)}
				type="button"
				className="flex text-lg items-center"
			>
				<svg
					className="w-5 h-5 rtl:rotate-180"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
					/>
				</svg>
				<span>Back to Categories</span>
			</button>

			<h1 className="text-3xl font-bold mb-4">Add New Category</h1>
			<form onSubmit={handleSubmit} className="max-w-lg">
				<div className="mb-4">
					<label
						htmlFor="categoryName"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Category Name
					</label>
					<input
						type="text"
						id="categoryName"
						value={categoryName}
						onChange={(e) => setCategoryName(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Add Category
				</button>
			</form>
		</div>
	);
}

export default AddCategory;
