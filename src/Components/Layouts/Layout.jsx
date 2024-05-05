import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";

const Layout = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]); // Cuộn lên đầu trang mỗi khi đường dẫn thay đổi

	return (
		<>
			<Header />
			<Breadcrumbs />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;
