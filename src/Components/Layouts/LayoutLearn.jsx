import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderLearn from "./HeaderLearn";

const LayoutLearn = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]); // Cuộn lên đầu trang mỗi khi đường dẫn thay đổi

	return (
		<>
			<HeaderLearn />
			<Outlet />
		</>
	);
};

export default LayoutLearn;
