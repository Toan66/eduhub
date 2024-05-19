const ProgressBar = ({ completed }) => {
	// Đảm bảo giá trị completed không vượt quá 100 hoặc dưới 0
	const completedPercentage = Math.max(0, Math.min(100, completed));

	return (
		<div className="w-full bg-gray-200 rounded-full h-7">
			<div
				className="bg-green-500 h-7 rounded-full text-white items-center flex justify-center font-semibold"
				style={{ width: `${completedPercentage}%` }}
			>
				{completedPercentage}%
			</div>
		</div>
	);
};

export default ProgressBar;
