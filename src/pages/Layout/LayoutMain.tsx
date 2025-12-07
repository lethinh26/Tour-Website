import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

export const LayoutMain = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    
    return (
        <>
            <Header/>
            <Outlet />
            <Footer />
        </>
    );
};
