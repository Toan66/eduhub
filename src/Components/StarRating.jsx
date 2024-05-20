import React, { useState } from "react";

const StarRating = ({ onChange }) => {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);

	return (
		<div className="flex">
			{[...Array(5)].map((star, index) => {
				index += 1;
				return (
					<button
						type="button"
						key={index}
						className={
							index <= (hover || rating) ? "text-orange-500" : "text-gray-400"
						}
						onClick={() => {
							setRating(index);
							onChange(index); // Pass the selected rating to the parent component
						}}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(rating)}
					>
						<span className="text-2xl">&#9733;</span>
					</button>
				);
			})}
		</div>
	);
};

export default StarRating;
