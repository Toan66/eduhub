import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";

const Layout = () => {
    return (
        <>
            <Header />
            <Breadcrumbs />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout