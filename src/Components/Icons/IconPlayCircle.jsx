import * as React from "react";

function IconPlayCircle(props) {
	return (
		<svg
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			viewBox="0 0 24 24"
			height="16px"
			width="16px"
			{...props}
		>
			<path d="M22 12 A10 10 0 0 1 12 22 A10 10 0 0 1 2 12 A10 10 0 0 1 22 12 z" />
			<path d="M10 8l6 4-6 4V8z" />
		</svg>
	);
}

export default IconPlayCircle;
